import React from 'react';
import { cn } from '../lib/utils';

export const AuthCard = ({ 
  title, 
  subtitle, 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto bg-card rounded-lg shadow-lg overflow-hidden",
      className
    )}>
      <div className="bg-primary text-primary-foreground px-8 py-6 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-primary-foreground/80 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};