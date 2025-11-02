import React from 'react';
import { Box } from './Box';
import { Text } from './Text';
import { Flex } from './Flex';

type ChartType = 'bar' | 'line' | 'pie';
type ChartColor = 'primary' | 'success' | 'warning' | 'error';

interface ChartProps {
  data: number[];
  labels: string[];
  type?: ChartType;
  color?: ChartColor;
  title?: string;
  height?: 'small' | 'medium' | 'large';
}

export const Chart: React.FC<ChartProps> = ({
  data,
  labels,
  type = 'bar',
  color = 'primary',
  title,
  height = 'medium'
}) => {
  const getHeightValue = (): string => {
    const heights = {
      small: '120px',
      medium: '200px',
      large: '280px'
    };
    return heights[height];
  };

  const getColorValue = (): string => {
    const colors = {
      primary: '#1976d2',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545'
    };
    return colors[color];
  };

  const maxValue = Math.max(...data);
  const chartHeight = getHeightValue();

  return (
    <Box padding="medium" backgroundColor="paper" borderRadius="medium" fullWidth>
      {title && (
        <Text variant="h3" size="lg" weight="bold" margin="small">
          {title}
        </Text>
      )}
      
      <Box padding="medium" backgroundColor="secondary" borderRadius="small" fullWidth>
        {/* Chart Bars */}
        <Flex justify="around" align="end" fullWidth>
          {data.map((value, index) => {
            const percentage = (value / maxValue) * 100;
            return (
              <Box
                key={index}
                backgroundColor={'primary'}
                margin="none"
                padding="none"
              >
                {''}
              </Box>
            );
          })}
        </Flex>
        
        {/* Chart Labels */}
        <Flex justify="around" margin="small" fullWidth padding="none">
          {labels.map((label, index) => (
            <Text key={index} size="sm" color="muted" margin="none" align="center">
              {label}
            </Text>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};