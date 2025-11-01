import React from 'react';

type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | string;
type Spacing = 'none' | 'small' | 'medium' | 'large';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: ContainerMaxWidth;
  center?: boolean;
  padding?: Spacing;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'md',
  center = true,
  padding = 'medium',
  className = '',
}) => {
  const getMaxWidthValue = (): string => {
    const widths: Record<string, string> = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    };
    return typeof maxWidth === 'string' && widths[maxWidth] 
      ? widths[maxWidth] 
      : maxWidth;
  };

  const getPaddingValue = (): string => {
    const paddings: Record<Spacing, string> = {
      none: '0',
      small: '16px',
      medium: '24px',
      large: '32px',
    };
    return paddings[padding];
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: getMaxWidthValue(),
    margin: center ? '0 auto' : '0',
    padding: getPaddingValue(),
    width: '100%',
  };

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
};