'use client';

import * as React from 'react';

import PropTypes from 'prop-types';

import { cn } from '@/lib/utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value?: number; width?: string }
>(({ className, value, width = '100%', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800',
      className
    )}
    style={{ width }}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='h-full flex-1 bg-slate-900 transition-all dark:bg-slate-50'
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

Progress.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  width: PropTypes.string,
};

export { Progress };
