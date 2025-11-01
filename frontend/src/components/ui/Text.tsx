import React from 'react';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type Spacing = 'none' | 'small' | 'medium' | 'large';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  align?: TextAlign;
  margin?: Spacing;
  padding?: Spacing;
  truncate?: boolean;
  uppercase?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'p',
  size = 'md',
  color = 'default',
  weight = 'normal',
  align = 'left',
  margin = 'none',
  padding = 'none',
  truncate = false,
  uppercase = false,
}) => {
  const getSizeValue = (): string => {
    const sizes: Record<TextSize, string> = {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
    };
    return sizes[size];
  };

  const getColorValue = (): string => {
    const colors: Record<TextColor, string> = {
      default: '#1a202c',
      muted: '#718096',
      primary: '#007bff',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545',
    };
    return colors[color];
  };

  const getWeightValue = (): string => {
    const weights: Record<TextWeight, string> = {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    };
    return weights[weight];
  };

  const getMarginValue = (): string => {
    const margins: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
    };
    return margins[margin];
  };

  const getPaddingValue = (): string => {
    const paddings: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
    };
    return paddings[padding];
  };

  const textStyle: React.CSSProperties = {
    fontSize: getSizeValue(),
    color: getColorValue(),
    fontWeight: getWeightValue(),
    textAlign: align,
    margin: getMarginValue(),
    padding: getPaddingValue(),
    overflow: truncate ? 'hidden' : 'visible',
    textOverflow: truncate ? 'ellipsis' : 'clip',
    whiteSpace: truncate ? 'nowrap' : 'normal',
    textTransform: uppercase ? 'uppercase' : 'none',
    lineHeight: '1.5',
  };

  const Component = variant;

  return (
    <Component style={textStyle}>
      {children}
    </Component>
  );
};