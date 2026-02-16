import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition',
        {
          'bg-yellow-500 text-white': variant === 'primary',
          'bg-gray-200 text-black': variant === 'secondary',
          'bg-red-500 text-white': variant === 'danger',
        },
        className
      )}
      {...props}
    />
  )
}
