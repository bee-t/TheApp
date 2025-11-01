import React from 'react';

type LinkVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type LinkSize = 'sm' | 'md' | 'lg';
type LinkUnderline = 'none' | 'hover' | 'always';

interface LinkProps {
  children: React.ReactNode;
  href: string;
  variant?: LinkVariant;
  size?: LinkSize;
  underline?: LinkUnderline;
  onClick?: () => void;
  newTab?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  underline = 'always',
  onClick,
  newTab = false,
}) => {
  const getVariantStyle = (): string => {
    const variants: Record<LinkVariant, string> = {
      default: 'text-gray-900',
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      error: 'text-red-600',
    };
    return variants[variant];
  };

  const getSizeStyle = (): string => {
    const sizes: Record<LinkSize, string> = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };
    return sizes[size];
  };

  const getUnderlineStyle = (): string => {
    const underlines: Record<LinkUnderline, string> = {
      none: 'no-underline',
      hover: 'no-underline hover:underline',
      always: 'underline',
    };
    return underlines[underline];
  };

  const baseStyle = 'transition-colors duration-200 cursor-pointer';

  const combinedClasses = [
    baseStyle,
    getVariantStyle(),
    getSizeStyle(),
    getUnderlineStyle(),
  ].join(' ');

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      className={combinedClasses}
      onClick={handleClick}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};