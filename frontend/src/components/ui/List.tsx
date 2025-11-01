import React from 'react';
import { Text } from './Text';

type ListType = 'unordered' | 'ordered';
type ListStyle = 'none' | 'disc' | 'decimal' | 'circle' | 'square';
type Spacing = 'none' | 'small' | 'medium' | 'large';
type ListAlignment = 'start' | 'center' | 'end';

interface ListProps {
  children: React.ReactNode;
  type?: ListType;
  style?: ListStyle;
  spacing?: Spacing;
  alignment?: ListAlignment;
  padding?: Spacing;
  margin?: Spacing;
}

interface ListItemProps {
  children: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

// Main List Component
export const List: React.FC<ListProps> = ({
  children,
  type = 'unordered',
  style = 'disc',
  spacing = 'medium',
  alignment = 'start',
  padding = 'none',
  margin = 'none',
}) => {
  const getSpacingValue = (): string => {
    const spacings: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
    };
    return spacings[spacing];
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

  const getMarginValue = (): string => {
    const margins: Record<Spacing, string> = {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '24px',
    };
    return margins[margin];
  };

  const getListStyleType = (): string => {
    const styles: Record<ListStyle, string> = {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      circle: 'circle',
      square: 'square',
    };
    return styles[style];
  };

  const getAlignmentValue = (): string => {
    const alignments: Record<ListAlignment, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
    };
    return alignments[alignment];
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: getListStyleType(),
    gap: getSpacingValue(),
    justifyContent: getAlignmentValue(),
    padding: getPaddingValue(),
    margin: getMarginValue(),
    paddingLeft: '20px',
  };

  const ListComponent = type === 'ordered' ? 'ol' : 'ul';

  return (
    <ListComponent style={listStyle}>
      {children}
    </ListComponent>
  );
};

// ListItem Component
export const ListItem: React.FC<ListItemProps> = ({
  children,
  disabled = false,
  selected = false,
  onClick,
}) => {
  const getStateStyle = (): string => {
    if (disabled) return 'opacity-50 cursor-not-allowed';
    if (selected) return 'bg-blue-50 border-blue-200';
    return 'cursor-default';
  };

  const getInteractiveStyle = (): string => {
    return onClick && !disabled ? 'cursor-pointer hover:bg-gray-50' : '';
  };

  const getPaddingStyle = (): string => {
    return 'py-1 px-2';
  };

  const getBorderStyle = (): string => {
    return selected ? 'border border-solid rounded' : '';
  };

  const baseStyle = 'transition-colors duration-200';

  const combinedClasses = [
    baseStyle,
    getStateStyle(),
    getInteractiveStyle(),
    getPaddingStyle(),
    getBorderStyle(),
  ].join(' ');

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <li
      className={combinedClasses}
      onClick={handleClick}
    >
      <Text color={disabled ? 'muted' : 'default'}>
        {children}
      </Text>
    </li>
  );
};

// Specialized List Components
export const BulletedList: React.FC<Omit<ListProps, 'type' | 'style'>> = (props) => (
  <List type="unordered" style="disc" {...props} />
);

export const NumberedList: React.FC<Omit<ListProps, 'type' | 'style'>> = (props) => (
  <List type="ordered" style="decimal" {...props} />
);

export const UnstyledList: React.FC<Omit<ListProps, 'type' | 'style'>> = (props) => (
  <List type="unordered" style="none" {...props} />
);