// src/components/chips/CategoryChip.jsx
import React from 'react';
import { Chip } from '@mui/material';
import { buildIcons, buildColors } from '../../utils/cardUtils';

/**
 * Reusable Category/Build Chip Component
 * @param {string} category - Category/build name
 * @param {string} size - Chip size ('small' or 'medium')
 * @param {string} fontSize - Font size (e.g., '0.65rem', '0.75rem')
 * @param {string} height - Chip height (e.g., '20px', '24px')
 * @param {string} iconSize - Icon size (e.g., '0.75rem', '0.8rem')
 */
const CategoryChip = ({
  category,
  size = 'small',
  fontSize = '0.65rem',
  height = '20px',
  iconSize = '0.75rem',
  fontWeight = 'normal',
}) => {
  const IconComponent = buildIcons[category];

  return (
    <Chip
      icon={
        IconComponent ? (
          <IconComponent
            sx={{
              fontSize: `${iconSize} !important`,
              color: 'inherit !important',
            }}
          />
        ) : undefined
      }
      label={category}
      size={size}
      color={buildColors[category] || 'default'}
      variant='filled'
      sx={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        height: height,
        border: 'none',
        color: (theme) => (theme.palette.mode === 'dark' ? '#000' : undefined),
        '& .MuiChip-icon': {
          marginLeft: fontSize === '0.65rem' ? '6px' : '8px',
        },
      }}
    />
  );
};

export default CategoryChip;

