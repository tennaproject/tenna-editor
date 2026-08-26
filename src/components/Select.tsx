import { useCombobox } from 'downshift';
import ChevronDownIcon from '@assets/icons/chevron-down.svg?react';
import InvalidIcon from '@assets/icons/alert.svg?react';
import UnusedIcon from '@assets/icons/hidden.svg?react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useCanHover } from '@hooks';
import { mergeClass } from '@utils/merge-class';
import { useTranslation } from '../i18n';
import { Tooltip } from './Tooltip';

export type InvalidReason =
  'unknown' | 'notInChapter' | 'notAvailableTo' | 'dogcheck';

const INVALID_REASON_TEXT: Record<InvalidReason, [key: string, text: string]> =
  {
    unknown: ['ui.common.invalidUnknown', 'Not a known item'],
    notInChapter: [
      'ui.common.invalidNotInChapter',
      'Not available in this chapter',
    ],
    notAvailableTo: [
      'ui.common.invalidNotAvailableTo',
      'Not available to this character',
    ],
    dogcheck: [
      'ui.common.invalidDogcheck',
      'The game sends the player to the dog room',
    ],
  };

export interface SelectItem {
  id: string;
  label: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  value?: unknown;
  invalidReasons?: InvalidReason[];
  unused?: boolean;
  tooltip?: ReactNode;
}

const DETAIL_PANEL_WIDTH = 336;
const DETAIL_PANEL_CLASS = 'w-84';
const DETAIL_PANEL_MARGIN = 8;
// scrollHeight rounds up, rects don't, so an exact fit reads as overflow
const FIT_TOLERANCE_PX = 2;
// widest icon is a 32px
const ICON_SLOT_CLASS = 'flex h-6 w-8 shrink-0 items-center justify-center';

interface StatusBadgesProps {
  invalid?: boolean;
  unused?: boolean;
  t: (key: string, fallback: string) => string;
}

function StatusBadges({ invalid, unused, t }: StatusBadgesProps) {
  const invalidLabel = t('ui.common.invalid', 'Invalid');
  const unusedLabel = t('ui.common.unused', 'Unused');

  return (
    <>
      {invalid ? (
        <span className="h-5 w-5 shrink-0 text-red">
          <InvalidIcon />
          <span className="sr-only">{invalidLabel}</span>
        </span>
      ) : null}
      {unused ? (
        <span className="h-5 w-5 shrink-0 text-yellow">
          <UnusedIcon />
          <span className="sr-only">{unusedLabel}</span>
        </span>
      ) : null}
    </>
  );
}

interface StatusNoteProps {
  invalidReasons?: InvalidReason[];
  unused?: boolean;
  t: (key: string, fallback: string) => string;
  divided?: boolean;
}

function StatusNote({ invalidReasons, unused, t, divided }: StatusNoteProps) {
  if (!invalidReasons?.length && !unused) return null;

  return (
    <div
      className={mergeClass(
        'flex flex-col gap-1',
        divided && 'border-b border-divider pb-2 mb-2',
      )}
    >
      {invalidReasons?.map((reason) => {
        const [key, text] = INVALID_REASON_TEXT[reason];

        return (
          <span
            key={reason}
            className="flex items-center gap-2 text-xs text-red"
          >
            <span className="h-4 w-4 shrink-0">
              <InvalidIcon />
            </span>
            {t(key, text)}
          </span>
        );
      })}
      {unused ? (
        <span className="flex items-center gap-2 text-xs text-yellow">
          <span className="h-4 w-4 shrink-0">
            <UnusedIcon />
          </span>
          {t(
            'ui.common.unusedExplained',
            'Exists in the game files, but is never obtainable',
          )}
        </span>
      ) : null}
    </div>
  );
}

interface SelectProps {
  items?: SelectItem[];
  placeholder?: string;
  label?: string;
  onSelectionChange?: (item: SelectItem | null) => void;
  defaultSelectedItem?: SelectItem | null;
  selectedItem?: SelectItem | null;
  className?: string;
  strict?: boolean;
  tooltip?: ReactNode;
}

export function Select({
  items = [],
  placeholder,
  label = '',
  onSelectionChange,
  defaultSelectedItem = null,
  selectedItem = null,
  className = '',
  strict = true,
  tooltip,
}: SelectProps) {
  const { t } = useTranslation();
  const canHover = useCanHover();
  const translatedPlaceholder =
    placeholder ?? t('ui.common.selectOption', 'Select an option...');
  const [inputItems, setInputItems] = useState(items);
  const [shouldOpenUp, setShouldOpenUp] = useState(false);
  const [detailOnLeft, setDetailOnLeft] = useState(false);
  const [isDetailHovered, setIsDetailHovered] = useState(false);
  const [detailPosition, setDetailPosition] = useState<{
    top: number;
    maxHeight: number;
  } | null>(null);
  const lastDetailRef = useRef<SelectItem | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const detailBoxRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef({ top: 0, bottom: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(
    defaultSelectedItem ? defaultSelectedItem.label : '',
  );
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const preserveSelectionOnMouseUpRef = useRef(false);
  const selectedLabel = selectedItem?.label ?? defaultSelectedItem?.label ?? '';
  const isShowingSelectedValue = inputValue === selectedLabel;
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setInputItems(items);
  }, [items]);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setInputValue(selectedLabel);
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setInputItems(items);
  }, [items, selectedLabel]);

  function selectInputValue(input: HTMLInputElement) {
    if (!canHover || !input.value || !isShowingSelectedValue) return;
    requestAnimationFrame(() => {
      input.select();
      preserveSelectionOnMouseUpRef.current = true;
    });
  }

  const {
    isOpen,
    highlightedIndex: highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    selectedItem,
    inputValue: inputValue,
    items: inputItems,
    initialSelectedItem: defaultSelectedItem || undefined,
    itemToString: (item) => item?.label || '',
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setMenuMounted(false);
        onSelectionChange?.(selectedItem);
        setInputValue(selectedItem.label);
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
      const val = inputValue ?? '';
      setInputValue(val);

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
    if (isOpen && isShowingSelectedValue) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setInputItems(items);
    }
  }, [isOpen, isShowingSelectedValue, items]);

  // Control mounted vs visible to avoid an empty bar before items render
  useEffect(() => {
    let rafId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const fadeDurationMs = 120;

    if (isOpen) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setMenuMounted(true);
      // next frame: make it visible so content is already rendered
      rafId = requestAnimationFrame(() => {
        setMenuVisible(true);
      });
    } else {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setMenuVisible(false);
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setIsDetailHovered(false);
      // after fade-out completes, unmount to save work
      timeoutId = setTimeout(() => {
        setMenuMounted(false);
      }, fadeDurationMs);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);

  function computePosition() {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let boundaryTop = 0;
    let boundaryBottom = window.innerHeight;
    let parent = containerRef.current.parentElement;

    while (parent) {
      const style = window.getComputedStyle(parent);
      const canScroll = /(auto|scroll|hidden)/.test(
        `${style.overflow}${style.overflowY}`,
      );

      if (canScroll) {
        const boundary = parent.getBoundingClientRect();
        boundaryTop = Math.max(boundaryTop, boundary.top);
        boundaryBottom = Math.min(boundaryBottom, boundary.bottom);
        break;
      }

      parent = parent.parentElement;
    }

    boundaryRef.current = { top: boundaryTop, bottom: boundaryBottom };

    const spaceBelow = boundaryBottom - rect.bottom;
    const spaceAbove = rect.top - boundaryTop;
    setShouldOpenUp(spaceBelow < 250 && spaceAbove > spaceBelow);

    const spaceRight = window.innerWidth - rect.right;
    setDetailOnLeft(spaceRight < DETAIL_PANEL_WIDTH && rect.left > spaceRight);
  }

  const displayItems = isShowingSelectedValue ? items : inputItems;

  const hasIcons = displayItems.some((item) => item.icon);

  const highlightedItem =
    menuVisible && highlightedIndex >= 0
      ? displayItems[highlightedIndex]
      : undefined;

  useEffect(() => {
    if (highlightedItem) lastDetailRef.current = highlightedItem;
  }, [highlightedItem]);

  const detailItem = !canHover
    ? undefined
    : (highlightedItem ??
      (isDetailHovered && menuVisible ? lastDetailRef.current : undefined));

  useLayoutEffect(() => {
    if (!menuVisible) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setDetailPosition(null);
      return;
    }

    if (highlightedIndex < 0) return;

    const container = containerRef.current;
    const list = listRef.current;
    const row = list?.children[highlightedIndex] as HTMLElement | undefined;
    const box = detailBoxRef.current;
    if (!container || !list || !row || !box) return;

    const containerRect = container.getBoundingClientRect();
    const rowTop = row.getBoundingClientRect().top;
    const menuRect = list.getBoundingClientRect();
    const { top: boundaryTop, bottom: boundaryBottom } = boundaryRef.current;

    const capTop = Math.max(menuRect.top, boundaryTop + DETAIL_PANEL_MARGIN);
    const capBottom = Math.min(
      menuRect.bottom,
      boundaryBottom - DETAIL_PANEL_MARGIN,
    );

    // scrollHeight skips borders, max-height doesn't
    const naturalHeight = box.scrollHeight + box.clientTop * 2;
    const maxHeight = Math.max(
      Math.ceil(Math.min(naturalHeight, capBottom - capTop + FIT_TOLERANCE_PX)),
      0,
    );
    const shownHeight = Math.min(naturalHeight, maxHeight);

    let top = Math.min(rowTop, capBottom - shownHeight);
    top = Math.max(top, capTop);

    const next = { top: top - containerRect.top, maxHeight };
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setDetailPosition((prev) =>
      prev && prev.top === next.top && prev.maxHeight === next.maxHeight
        ? prev
        : next,
    );
  }, [highlightedIndex, menuVisible, detailItem?.id]);

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
      <Tooltip
        content={isOpen ? undefined : tooltip}
        focusable={false}
        className="w-full"
      >
        <div className="relative w-full h-10 bg-surface-3 hover:bg-surface-3-hover motion-reduce:transition-none transition-all duration-200 border border-border">
          {selectedItem?.icon ? (
            <span
              className={mergeClass(
                'absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none',
                ICON_SLOT_CLASS,
                selectedItem?.label === 'Empty' ? 'text-text-2' : 'text-text-1',
              )}
              aria-hidden
            >
              {selectedItem.icon}
            </span>
          ) : null}
          <input
            {...getInputProps({
              ref: inputRef,
              onFocus: (event) => {
                computePosition();
                if (isShowingSelectedValue) setInputItems(items);
                selectInputValue(event.currentTarget);
              },
              onMouseUp: (event) => {
                if (!preserveSelectionOnMouseUpRef.current) return;
                event.preventDefault();
                preserveSelectionOnMouseUpRef.current = false;
              },
              onClick: (event) => {
                selectInputValue(event.currentTarget);
              },
            })}
            type="search"
            className={mergeClass(
              'w-full h-full px-3 pr-10 bg-transparent border-none outline-none placeholder:text-text-2 focus:outline-none focus:ring-1 motion-reduce:transition-colors transition-colors focus:ring-text-3 selection:bg-surface-3',
              selectedItem?.icon && 'pl-13',
              selectedItem?.invalidReasons?.length && selectedItem?.unused
                ? 'pr-22'
                : (selectedItem?.invalidReasons?.length ||
                    selectedItem?.unused) &&
                    'pr-16',
              selectedItem?.label === 'Empty'
                ? 'text-text-2 selection:text-text-2'
                : 'text-text-1 selection:text-text-1',
            )}
            placeholder={translatedPlaceholder}
            readOnly={!canHover}
            inputMode={canHover ? 'search' : 'none'}
            data-lpignore="true"
            autoComplete="off"
            spellCheck={false}
          />
          <div
            className="absolute right-9 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
            aria-hidden={
              !selectedItem?.invalidReasons?.length && !selectedItem?.unused
            }
          >
            <StatusBadges
              invalid={!!selectedItem?.invalidReasons?.length}
              unused={selectedItem?.unused}
              t={t}
            />
          </div>
          <button
            {...getToggleButtonProps({
              onClick: () => {
                computePosition();
                if (isShowingSelectedValue) setInputItems(items);
              },
            })}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text-2 "
            type="button"
          >
            <ChevronDownIcon />
          </button>
        </div>
      </Tooltip>

      <ul
        {...getMenuProps({ ref: listRef })}
        className={mergeClass(
          'absolute left-0 z-50 w-full bg-surface-4 border border-border shadow-lg py-1 px-1 max-h-60 overflow-auto duration-200 motion-reduce:transition-none transition-opacity',
          shouldOpenUp
            ? 'bottom-full mb-1 origin-bottom'
            : 'top-full mt-1 origin-top',
          isOpen ? 'auto' : 'hidden',
          menuVisible ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={!menuVisible}
      >
        {menuMounted ? (
          displayItems.length === 0 ? (
            <li className="px-3 py-2 text-text-2 text-sm">
              {t('ui.common.noOptionsFound', 'No options found')}
            </li>
          ) : (
            displayItems.map((item, index) => {
              const chosen = selectedItem?.id === item.id;
              const highlighted = index === highlightedIndex;
              const itemProps = getItemProps({
                item,
                index,
              });
              return (
                <li
                  key={item.id}
                  {...itemProps}
                  className="cursor-pointer text-sm select-none leading-none text-text-1 transition-colors"
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
                    {hasIcons ? (
                      <span
                        className={mergeClass(ICON_SLOT_CLASS, 'mr-1')}
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                    ) : null}
                    <span className="break-words flex-1 min-w-0">
                      {item.label}
                    </span>
                    {item.trailing ? (
                      <span className="shrink-0" aria-hidden>
                        {item.trailing}
                      </span>
                    ) : null}
                    <div
                      className="ml-2 flex items-center gap-2"
                      aria-hidden={!item.invalidReasons?.length && !item.unused}
                    >
                      <StatusBadges
                        invalid={!!item.invalidReasons?.length}
                        unused={item.unused}
                        t={t}
                      />
                    </div>
                  </div>
                </li>
              );
            })
          )
        ) : null}
      </ul>

      {detailItem &&
      (detailItem.tooltip ||
        detailItem.invalidReasons?.length ||
        detailItem.unused) ? (
        <div
          className={mergeClass(
            'absolute z-50',
            detailItem.tooltip ? DETAIL_PANEL_CLASS : 'w-max max-w-3xs',
            detailOnLeft ? 'right-full pr-2' : 'left-full pl-2',
          )}
          style={{
            top: detailPosition?.top,
            visibility: detailPosition ? 'visible' : 'hidden',
          }}
          onMouseEnter={() => setIsDetailHovered(true)}
          onMouseLeave={() => setIsDetailHovered(false)}
          onMouseDown={(event) => event.preventDefault()}
        >
          <div
            ref={detailBoxRef}
            style={{ maxHeight: detailPosition?.maxHeight }}
            className="overflow-y-auto border border-border bg-surface-3 px-3 py-2 text-left shadow-lg"
          >
            <StatusNote
              invalidReasons={detailItem.invalidReasons}
              unused={detailItem.unused}
              t={t}
              divided={!!detailItem.tooltip}
            />
            {detailItem.tooltip}
          </div>
        </div>
      ) : null}
    </div>
  );
}
