import { useCombobox } from 'downshift';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import WarningIcon from '@assets/icons/alert.svg';
import { useState, useEffect, useRef } from 'react';
import { mergeClass } from '@utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectItem {
  id: string;
  label: string;
  value?: unknown;
  invalid?: boolean;
}

interface SelectProps {
  items?: SelectItem[];
  placeholder?: string;
  label?: string;
  onSelectionChange?: (item: SelectItem | null) => void;
  defaultSelectedItem?: SelectItem | null;
  className?: string;
  strict?: boolean;
}

export function Select({
  items = [],
  placeholder = 'Select an option...',
  label = '',
  onSelectionChange,
  defaultSelectedItem = null,
  className = '',
  strict = true,
}: SelectProps) {
  const [inputItems, setInputItems] = useState(items);
  const [shouldOpenUp, setShouldOpenUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(
    defaultSelectedItem ? defaultSelectedItem.label : '',
  );
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    setInputItems(items);
  }, [items]);

  useEffect(() => {
    // sync when default selection changes
    if (defaultSelectedItem) {
      setInputValue(defaultSelectedItem.label);
      setHasTyped(false);
      setInputItems(items);
    }
  }, [defaultSelectedItem, items]);

  const {
    isOpen,
    selectedItem,
    highlightedIndex: highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    inputValue: inputValue,
    items: inputItems,
    initialSelectedItem: defaultSelectedItem || undefined,
    itemToString: (item) => item?.label || '',
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelectionChange?.(selectedItem);
        setInputValue(selectedItem.label);
        setInputItems(items);
        setHasTyped(false);
        setTimeout(() => {
          if (inputRef.current && document.activeElement === inputRef.current) {
            inputRef.current.blur();
          }
        }, 120);
      } else {
        onSelectionChange?.(null);
      }
    },
    onInputValueChange: ({ inputValue }) => {
      // keep the controlled inputValue in sync
      const val = inputValue ?? '';
      setInputValue(val);
      // track whether the user has typed anything
      setHasTyped(val !== '');

      if (!val) {
        setInputItems(items);
        return;
      }

      const lower = val.toLowerCase();
      const filtered = items.filter((it) =>
        it.label.toLowerCase().includes(lower),
      );
      setInputItems(filtered);
    },
    stateReducer: (
      state: { selectedItem: SelectItem | null; inputValue?: string },
      actionAndChanges: { changes: Record<string, unknown>; type: string },
    ) => {
      if (!strict) return actionAndChanges.changes;
      const { changes, type } = actionAndChanges;

      if (
        changes.selectedItem &&
        typeof (changes.selectedItem as SelectItem).id === 'string' &&
        !items.some((it) => it.id === (changes.selectedItem as SelectItem).id)
      ) {
        return {
          ...changes,
          selectedItem: state.selectedItem,
          inputValue: state.selectedItem ? state.selectedItem.label : '',
        };
      }

      const attemptCommit =
        type === useCombobox.stateChangeTypes.InputBlur ||
        type === useCombobox.stateChangeTypes.InputKeyDownEnter;

      if (attemptCommit) {
        const currentInput =
          (changes.inputValue as string) ?? state.inputValue ?? '';
        const exact = items.find(
          (it) => it.label.toLowerCase() === currentInput.toLowerCase(),
        );
        if (!exact) {
          const pickIndex =
            (changes.highlightedIndex as number | undefined) ?? 0;
          const pick = inputItems[pickIndex];
          if (pick) {
            return {
              ...changes,
              selectedItem: pick,
              inputValue: pick.label,
            };
          }

          return {
            ...changes,
            selectedItem: state.selectedItem,
            inputValue: state.selectedItem ? state.selectedItem.label : '',
          };
        }
        return {
          ...changes,
          selectedItem: exact,
          inputValue: exact.label,
        };
      }

      return changes;
    },
  });

  useEffect(() => {
    if (isOpen) {
      setHasTyped(false);
      setInputItems(items);
    }
  }, [isOpen, items]);

  function computePosition() {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setShouldOpenUp(spaceBelow < 225 && spaceAbove > spaceBelow);
  }

  const displayItems = hasTyped ? inputItems : items;

  return (
    <div
      ref={containerRef}
      className={mergeClass('flex flex-col w-50 relative', className)}
    >
      {label && (
        <label {...getLabelProps()} className="hidden">
          {label}
        </label>
      )}
      <div className="relative w-full h-11 bg-surface-3 hover:bg-surface-3-hover transition-all duration-200 border border-border">
        <input
          {...getInputProps({
            ref: inputRef,
            onFocus: () => {
              computePosition();
              if (!hasTyped) setInputItems(items);
            },
          })}
          className="w-full h-full px-3 pr-10 bg-transparent border-none outline-none text-text-1 placeholder:text-text-2 focus:outline-none focus:ring-1 transition-colors focus:ring-text-3"
          placeholder={placeholder}
        />
        <div
          className="absolute right-9 top-1/2 -translate-y-1/2 text-xs text-red font-bold flex items-center gap-1 pointer-events-none"
          aria-hidden={!selectedItem?.invalid}
        >
          {selectedItem?.invalid ? (
            <span className="h-5 w-5">
              <WarningIcon />
            </span>
          ) : null}
          {selectedItem?.invalid ? 'Invalid' : ''}
        </div>
        <button
          {...getToggleButtonProps({
            onClick: () => {
              computePosition();
              if (!hasTyped) setInputItems(items);
            },
          })}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text-2 "
          type="button"
        >
          <ChevronDownIcon />
        </button>
      </div>

      {!isOpen && (
        <ul
          {...getMenuProps({}, { suppressRefError: true })}
          style={{ display: 'none' }}
          aria-hidden
        />
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            {...getMenuProps({}, { suppressRefError: false })}
            ref={listRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 z-50 bg-surface-4 border border-border shadow-lg pt-1 px-1 pb-1 max-h-60 overflow-auto duration-100 ${
              shouldOpenUp
                ? 'bottom-full mb-1 origin-bottom'
                : 'top-full mt-1 origin-top'
            }`}
            style={{
              minWidth: containerRef.current?.offsetWidth,
            }}
          >
            {displayItems.length === 0 ? (
              <li className="px-3 py-2 text-text-2 text-sm">
                No options found
              </li>
            ) : (
              displayItems.map((item, index) => {
                const chosen = selectedItem?.id === item.id;
                const highlighted = index === highlightedIndex;
                const itemProps = getItemProps({
                  item,
                  index,
                }) as React.LiHTMLAttributes<HTMLLIElement> & {
                  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
                  onPointerDown?: (
                    e: React.PointerEvent<HTMLLIElement>,
                  ) => void;
                };
                return (
                  <li
                    key={item.id}
                    {...itemProps}
                    onPointerDown={(e) => {
                      itemProps.onPointerDown?.(e);
                    }}
                    className={`cursor-pointer text-sm select-none leading-none text-text-1 transition-colors`}
                    aria-selected={chosen}
                  >
                    <div
                      className={mergeClass(
                        'px-2 py-2 leading-none my-1 flex gap-1 justify-between items-center',
                        chosen
                          ? 'bg-surface-4-active'
                          : highlighted
                            ? 'bg-surface-4-hover ring-1 ring-text-3'
                            : 'bg-surface-4 hover:bg-surface-4-hover',
                      )}
                    >
                      {item.label}
                      <div
                        className="ml-2 text-xs text-red flex items-center gap-1 font-bold"
                        aria-hidden={!item.invalid}
                      >
                        {item.invalid ? (
                          <span className="h-5 w-5">
                            <WarningIcon />
                          </span>
                        ) : null}
                        {item.invalid ? 'Invalid' : ''}
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
