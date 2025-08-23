import { useCombobox } from 'downshift';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import React, { useState, useEffect, useRef } from 'react';
import { mergeClass } from '@utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectItem {
  id: string;
  label: string;
  value?: unknown;
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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    setInputItems(items);
  }, [items]);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    highlightedIndex: highlightedIndex ?? undefined,
    items: inputItems,
    initialSelectedItem: defaultSelectedItem || undefined,
    itemToString: (item) => item?.label || '',
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSelectionChange?.(selectedItem);
        // delay blur to ensure touch/click handlers complete on mobile
        setTimeout(() => inputRef.current?.blur(), 50);
      } else {
        onSelectionChange?.(null);
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        setInputItems(items);
        setHighlightedIndex(null);
        return;
      }

      const lower = inputValue.toLowerCase();
      const filtered = items.filter((it) =>
        it.label.toLowerCase().includes(lower),
      );
      setInputItems(filtered);
      if (filtered.length > 0) setHighlightedIndex(0);
      else setHighlightedIndex(null);
    },
    onHighlightedIndexChange: ({ highlightedIndex }) => {
      setHighlightedIndex(highlightedIndex ?? null);
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
            (changes.highlightedIndex as number | undefined) ??
            highlightedIndex ??
            0;
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

  function computePosition() {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setShouldOpenUp(spaceBelow < 225 && spaceAbove > spaceBelow);
  }

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
          {...getInputProps({ ref: inputRef })}
          className="w-full h-full px-3 pr-10 bg-transparent border-none outline-none text-text-1 placeholder:text-text-2 focus:outline-none focus:ring-1 transition-colors focus:ring-text-3"
          placeholder={placeholder}
        />
        <button
          {...getToggleButtonProps({ onClick: () => computePosition() })}
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
            {inputItems.length === 0 ? (
              <li className="px-3 py-2 text-text-2 text-sm">
                No options found
              </li>
            ) : (
              inputItems.map((item, index) => {
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
                      itemProps.onClick?.(e);
                    }}
                    className={`cursor-pointer text-sm select-none leading-none text-text-1 transition-colors`}
                    aria-selected={chosen}
                  >
                    <div
                      className={mergeClass(
                        'px-2 py-2 leading-none my-1',
                        chosen
                          ? 'bg-surface-4-active'
                          : highlighted
                            ? 'bg-surface-4-hover ring-1 ring-text-3'
                            : 'bg-surface-4 hover:bg-surface-4-hover',
                      )}
                    >
                      {item.label}
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
