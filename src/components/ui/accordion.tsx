'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';

type AccordionContextValue = {
  value: string | string[];
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
  collapsible?: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('Accordion components must be used within Accordion');
  return context;
}

type AccordionProps = {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  className?: string;
};

export function Accordion({
  type,
  collapsible,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (itemValue: string) => {
      let newValue: string | string[];

      if (type === 'multiple') {
        const currentValues = Array.isArray(value) ? value : [];
        newValue = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue];
      } else {
        newValue = value === itemValue && collapsible ? '' : itemValue;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue as any);
    },
    [type, value, collapsible, controlledValue, onValueChange]
  );

  return (
    <AccordionContext.Provider
      value={{ value: value as string | string[], onValueChange: handleValueChange, type, collapsible }}
    >
      <div className={cn('space-y-2', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b border-border', className)} data-value={value}>
      {children}
    </div>
  );
}

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { value: accordionValue, onValueChange } = useAccordion();
  const itemElement = React.useRef<HTMLButtonElement>(null);

  const itemValue = itemElement.current?.closest('[data-value]')?.getAttribute('data-value') || '';

  const isOpen = Array.isArray(accordionValue)
    ? accordionValue.includes(itemValue)
    : accordionValue === itemValue;

  return (
    <button
      ref={itemElement}
      type="button"
      className={cn(
        'flex w-full items-center justify-between py-4 font-medium transition-all hover:underline text-left',
        className
      )}
      onClick={() => onValueChange(itemValue)}
    >
      {children}
      <Icon
        icon="lucide:chevron-down"
        className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
}

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { value: accordionValue } = useAccordion();
  const itemElement = React.useRef<HTMLDivElement>(null);

  const itemValue = itemElement.current?.closest('[data-value]')?.getAttribute('data-value') || '';

  const isOpen = Array.isArray(accordionValue)
    ? accordionValue.includes(itemValue)
    : accordionValue === itemValue;

  if (!isOpen) return null;

  return (
    <div ref={itemElement} className={cn('pb-4 pt-0', className)}>
      {children}
    </div>
  );
}
