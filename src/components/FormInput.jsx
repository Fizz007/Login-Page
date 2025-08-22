import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';

export const FormInput = React.forwardRef(
  ({ label, error, showPasswordToggle = false, type = 'text', className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder=" "
            className={cn(
              "peer w-full bg-input px-4 pt-6 pb-2 text-card-foreground",
              "border-b-2 border-input-border focus:border-input-focus",
              "focus:outline-none transition-colors duration-200",
              "placeholder-transparent",
              error && "border-destructive focus:border-destructive",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <label className={cn(
            "absolute left-4 top-4 text-muted-foreground transition-all duration-200 pointer-events-none",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base",
            "peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-input-focus",
            "peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs",
            error && "peer-focus:text-destructive"
          )}>
            {label}
          </label>
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';