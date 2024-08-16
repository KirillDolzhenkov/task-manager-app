import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import CheckIcon from '@/assets/icons/svg/CheckboxIcon'
import { useAutoId } from '@/hooks/useAutoId'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from '@/components/ui/checkbox/Checkbox.module.scss'

export type CheckboxPropsProps = {
  label?: ReactNode
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxPropsProps>(
  (props: CheckboxPropsProps, ref) => {
    const { checked, className, disabled, id, label, onCheckedChange, ...rest } = props
    const generatedId = useAutoId(id)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        onCheckedChange && onCheckedChange(!checked)
      }
    }

    const classNames = {
      indicator: clsx(s.CheckboxIndicator, {
        [s.checked]: checked,
        [s.disabled]: disabled,
      }),
      label: clsx(s.Label, { [s.disabled]: disabled }, className),
      root: clsx(
        s.CheckboxRoot,
        {
          [s.checked]: checked,
          [s.disabled]: disabled,
        },
        className
      ),
    }

    return (
      <div className={s.CheckboxContainer}>
        <CheckboxRadix.Root
          {...rest}
          checked={checked}
          className={classNames.root}
          id={generatedId}
          onCheckedChange={onCheckedChange}
          onKeyDown={handleKeyDown}
          ref={ref}
        >
          {checked && (
            <CheckboxRadix.Indicator asChild className={classNames.indicator}>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
        <label className={classNames.label} htmlFor={generatedId}>
          {label}
        </label>
      </div>
    )
  }
)

export default Checkbox
