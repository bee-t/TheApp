import React from 'react';

type Spacing = 'none' | 'small' | 'medium' | 'large' | 'xlarge';
type BackgroundColor = 'transparent' | 'white' | 'gray' | 'primary' | 'secondary';
type BorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
type Shadow = 'none' | 'small' | 'medium' | 'large';

interface BoxProps {
  children: React.ReactNode;
  padding?: Spacing;
  margin?: Spacing;
  backgroundColor?: BackgroundColor;
  borderRadius?: BorderRadius;
  shadow?: Shadow;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = ({
  children,
  padding = 'medium',
  margin = 'none',
  backgroundColor = 'transparent',
  borderRadius = 'none',
  shadow = 'none',
  fullWidth = false,
  fullHeight = false,
  onClick,
}) => {
  const getPaddingValue = (): string => {
    const paddings: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
      xlarge: '32px',
    };
    return paddings[padding];
  };

  const getMarginValue = (): string => {
    const margins: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
      xlarge: '32px',
    };
    return margins[margin];
  };

  const getBackgroundColorValue = (): string => {
    const backgrounds: Record<BackgroundColor, string> = {
      transparent: 'transparent',
      white: '#ffffff',
      gray: '#f8f9fa',
      primary: '#e3f2fd',
      secondary: '#f5f5f5',
    };
    return backgrounds[backgroundColor];
  };

  const getBorderRadiusValue = (): string => {
    const radii: Record<BorderRadius, string> = {
      none: '0',
      small: '2px',
      medium: '4px',
      large: '8px',
      full: '50%',
    };
    return radii[borderRadius];
  };

  const getShadowValue = (): string => {
    const shadows: Record<Shadow, string> = {
      none: 'none',
      small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
      large: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    };
    return shadows[shadow];
  };

  const boxStyle: React.CSSProperties = {
    padding: getPaddingValue(),
    margin: getMarginValue(),
    backgroundColor: getBackgroundColorValue(),
    borderRadius: getBorderRadiusValue(),
    boxShadow: getShadowValue(),
    width: fullWidth ? '100%' : 'auto',
    height: fullHeight ? '100%' : 'auto',
    cursor: onClick ? 'pointer' : 'default',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={boxStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};