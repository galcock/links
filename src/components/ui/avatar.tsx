'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn, getInitials } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
        '3xl': 'h-24 w-24 text-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, status, ...props }, ref) => {
  const initials = fallback ? getInitials(fallback) : '?';

  return (
    <div className="relative inline-block">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src || undefined}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className={cn(
            'flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/80 to-primary text-primary-foreground font-medium'
          )}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
            size === 'xs' || size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
            {
              'bg-green-500': status === 'online',
              'bg-gray-400': status === 'offline',
              'bg-yellow-500': status === 'away',
              'bg-red-500': status === 'busy',
            }
          )}
        />
      )}
    </div>
  );
});
Avatar.displayName = 'Avatar';

// Avatar Group for showing multiple avatars
interface AvatarGroupProps {
  avatars: Array<{ src?: string | null; alt?: string; fallback?: string }>;
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
  className?: string;
}

const AvatarGroup = ({ avatars, max = 4, size = 'default', className }: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn('flex -space-x-3', className)}>
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="ring-2 ring-background"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            'flex items-center justify-center bg-muted text-muted-foreground ring-2 ring-background font-medium'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup, avatarVariants };
