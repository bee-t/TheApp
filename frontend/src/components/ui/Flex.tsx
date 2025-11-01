import React from 'react';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type AlignItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
type Spacing = 'none' | 'small' | 'medium' | 'large';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface FlexProps {
  children: React.ReactNode;
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  gap?: Spacing;
  wrap?: FlexWrap;
  margin?: Spacing;
  padding?: Spacing;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 'none',
  wrap = 'nowrap',
  margin = 'none',
  padding = 'none',
  fullWidth = false,
  fullHeight = false,
}) => {
  const getGapValue = (): string => {
    const gaps: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
    };
    return gaps[gap];
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

  const getJustifyContentValue = (): string => {
    const justifies: Record<JustifyContent, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    return justifies[justify];
  };

  const getAlignItemsValue = (): string => {
    const aligns: Record<AlignItems, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    };
    return aligns[align];
  };

  const flexStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: getJustifyContentValue(),
    alignItems: getAlignItemsValue(),
    gap: getGapValue(),
    flexWrap: wrap,
    margin: getMarginValue(),
    padding: getPaddingValue(),
    width: fullWidth ? '100%' : 'auto',
    height: fullHeight ? '100%' : 'auto',
  };

  return (
    <div style={flexStyle}>
      {children}
    </div>
  );
};