import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

// Utility function to mimic 'clsx' functionality
function classNames(...args: any[]) {
  let classes: string[] = [];
  args.forEach(arg => {
    if (!arg) return;
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });
  return classes.join(' ');
}

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
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
