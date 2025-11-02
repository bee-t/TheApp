import React from 'react';
import { useTheme } from '../../context/ThemeContext';

type Spacing = 'none' | 'small' | 'medium' | 'large' | 'xlarge';
type BackgroundColor = 'transparent' | 'default' | 'paper' | 'primary' | 'secondary';
type BorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
type Shadow = 'none' | 'small' | 'medium' | 'large';
type Dimension = 'auto' | 'full' | 'half' | 'quarter' | string;

interface BoxProps {
  children: React.ReactNode;
  padding?: Spacing;
  margin?: Spacing;
  backgroundColor?: BackgroundColor;
  borderRadius?: BorderRadius;
  shadow?: Shadow;
  fullWidth?: boolean;
  fullHeight?: boolean;
  width?: Dimension;
  height?: Dimension;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = ({
  children,
  padding = 'medium',
  margin = 'none',
  backgroundColor = 'default',
  borderRadius = 'none',
  shadow = 'none',
  fullWidth = false,
  fullHeight = false,
  width = 'auto',
  height = 'auto',
  onClick,
}) => {
  const { theme } = useTheme();

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
    const lightColors: Record<BackgroundColor, string> = {
      transparent: 'transparent',
      default: '#ffffff',
      paper: '#f8f9fa',
      primary: '#e3f2fd',
      secondary: '#f5f5f5',
    };
    
    const darkColors: Record<BackgroundColor, string> = {
      transparent: 'transparent',
      default: '#1a1a1a',
      paper: '#2d2d2d',
      primary: '#0d1b2a',
      secondary: '#333333',
    };
    
    return theme === 'light' ? lightColors[backgroundColor] : darkColors[backgroundColor];
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
    const lightShadows: Record<Shadow, string> = {
      none: 'none',
      small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
      large: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    };
    
    const darkShadows: Record<Shadow, string> = {
      none: 'none',
      small: '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)',
      medium: '0 3px 6px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.5)',
      large: '0 10px 20px rgba(0,0,0,0.7), 0 3px 6px rgba(0,0,0,0.6)',
    };
    
    return theme === 'light' ? lightShadows[shadow] : darkShadows[shadow];
  };

  const getWidthValue = (): string => {
    if (fullWidth) return '100%';
    const widths: Record<string, string> = {
      auto: 'auto',
      full: '100%',
      half: '50%',
      quarter: '25%',
    };
    return widths[width] || width;
  };

  const getHeightValue = (): string => {
    if (fullHeight) return '100%';
    const heights: Record<string, string> = {
      auto: 'auto',
      full: '100%',
      half: '50%',
      quarter: '25%',
    };
    return heights[height] || height;
  };

  const boxStyle: React.CSSProperties = {
    padding: getPaddingValue(),
    margin: getMarginValue(),
    backgroundColor: getBackgroundColorValue(),
    borderRadius: getBorderRadiusValue(),
    boxShadow: getShadowValue(),
    width: getWidthValue(),
    height: getHeightValue(),
    cursor: onClick ? 'pointer' : 'default',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
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