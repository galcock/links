'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        success:
          'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
        warning:
          'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
        info:
          'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        student:
          'border-transparent bg-student-100 text-student-700 dark:bg-student-900/30 dark:text-student-400',
        instructor:
          'border-transparent bg-instructor-100 text-instructor-700 dark:bg-instructor-900/30 dark:text-instructor-400',
        parent:
          'border-transparent bg-parent-100 text-parent-700 dark:bg-parent-900/30 dark:text-parent-400',
        admin:
          'border-transparent bg-admin-100 text-admin-700 dark:bg-admin-900/30 dark:text-admin-400',
        services:
          'border-transparent bg-services-100 text-services-700 dark:bg-services-900/30 dark:text-services-400',
        community:
          'border-transparent bg-community-100 text-community-700 dark:bg-community-900/30 dark:text-community-400',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

function Badge({ className, variant, size, dot, dotColor, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', dotColor || 'bg-current')}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
