import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';
type HorizontalAlignment = 'left' | 'center' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  margin?: 'none' | 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  horizontalAlignment = 'center',
  verticalAlignment = 'center',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  fullWidth = false,
  margin = 'none',
}) => {
  // Predefined styles - no arbitrary CSS allowed
  const getVariantStyle = (): string => {
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
    };
    return variants[variant];
  };

  const getSizeStyle = (): string => {
    const sizes: Record<ButtonSize, string> = {
      small: 'px-3 py-1 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };
    return sizes[size];
  };

  const getHorizontalAlignmentStyle = (): string => {
    const alignments: Record<HorizontalAlignment, string> = {
      left: 'justify-start text-left',
      center: 'justify-center text-center',
      right: 'justify-end text-right',
    };
    return alignments[horizontalAlignment];
  };

  const getVerticalAlignmentStyle = (): string => {
    const alignments: Record<VerticalAlignment, string> = {
      top: 'items-start',
      center: 'items-center',
      bottom: 'items-end',
    };
    return alignments[verticalAlignment];
  };

  const getMarginStyle = (): string => {
    const margins: Record<typeof margin, string> = {
      none: 'm-0',
      small: 'm-1',
      medium: 'm-2',
      large: 'm-4',
    };
    return margins[margin];
  };

  const getWidthStyle = (): string => {
    return fullWidth ? 'w-full' : 'w-auto';
  };

  const getStateStyle = (): string => {
    if (disabled) return 'opacity-50 cursor-not-allowed';
    if (loading) return 'opacity-70 cursor-wait';
    return 'cursor-pointer';
  };

  const baseStyle = 'rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex';

  const combinedClasses = [
    baseStyle,
    getVariantStyle(),
    getSizeStyle(),
    getHorizontalAlignmentStyle(),
    getVerticalAlignmentStyle(),
    getMarginStyle(),
    getWidthStyle(),
    getStateStyle(),
  ].join(' ');

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};