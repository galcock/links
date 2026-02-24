'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-2xl transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border shadow-sm',
        elevated: 'bg-card text-card-foreground shadow-lg hover:shadow-xl',
        glass: 'glass-card',
        outline: 'border-2 bg-transparent',
        ghost: 'bg-transparent',
        student: 'bg-gradient-to-br from-student-50 to-student-100/50 dark:from-student-950/30 dark:to-student-900/20 border border-student-200 dark:border-student-800/30',
        instructor: 'bg-gradient-to-br from-instructor-50 to-instructor-100/50 dark:from-instructor-950/30 dark:to-instructor-900/20 border border-instructor-200 dark:border-instructor-800/30',
        parent: 'bg-gradient-to-br from-parent-50 to-parent-100/50 dark:from-parent-950/30 dark:to-parent-900/20 border border-parent-200 dark:border-parent-800/30',
        admin: 'bg-gradient-to-br from-admin-50 to-admin-100/50 dark:from-admin-950/30 dark:to-admin-900/20 border border-admin-200 dark:border-admin-800/30',
        services: 'bg-gradient-to-br from-services-50 to-services-100/50 dark:from-services-950/30 dark:to-services-900/20 border border-services-200 dark:border-services-800/30',
        community: 'bg-gradient-to-br from-community-50 to-community-100/50 dark:from-community-950/30 dark:to-community-900/20 border border-community-200 dark:border-community-800/30',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-lg hover:-translate-y-1',
        glow: 'hover:shadow-neon-purple',
        scale: 'hover:scale-[1.02]',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: 'none',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, hover, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold text-lg leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
