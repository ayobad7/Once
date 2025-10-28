// src/components/chips/RegionChip.jsx
import React from 'react';
import { Chip, useTheme } from '@mui/material';
import { RegionIcon, regionColors, pastelColors } from '../../utils/cardUtils';

/**
 * Reusable Region Chip Component with Pastel Colors
 * @param {string} region - Region name
 * @param {string} size - Chip size ('small' or 'medium')
 * @param {string} fontSize - Font size (e.g., '0.65rem', '0.75rem')
 * @param {string} height - Chip height (e.g., '20px', '24px')
 * @param {string} iconSize - Icon size (e.g., '0.75rem', '0.8rem')
 */
const RegionChip = ({
  region,
  size = 'small',
  fontSize = '0.65rem',
  height = '20px',
  iconSize = '0.75rem',
  fontWeight = 'normal',
}) => {
  const theme = useTheme();
  const colorKey = regionColors[region] || 'gray';
  const mode = theme.palette.mode;
  const colors = pastelColors[colorKey]?.[mode] || pastelColors.gray[mode];

  return (
    <Chip
      icon={
        <RegionIcon
          sx={{
            fontSize: `${iconSize} !important`,
            color: 'inherit !important',
          }}
        />
      }
      label={region}
      size={size}
      sx={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        height: height,
        border: 'none',
        backgroundColor: colors.bg,
        color: colors.text,
        '& .MuiChip-label': {
          color: colors.text,
        },
        '& .MuiChip-icon': {
          marginLeft: fontSize === '0.65rem' ? '6px' : '8px',
          color: colors.text,
        },
      }}
    />
  );
};

export default RegionChip;
