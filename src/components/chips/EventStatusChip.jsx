// src/components/chips/EventStatusChip.jsx
import React from 'react';
import { Chip, useTheme } from '@mui/material';
import { pastelColors } from '../../utils/cardUtils';

/**
 * Reusable Event Status Chip Component with Pastel Colors
 * @param {Object} eventStatus - { label: string, color: string }
 * @param {string} size - Chip size ('small' or 'medium')
 * @param {string} fontSize - Font size (e.g., '0.7rem', '0.75rem')
 * @param {string} height - Chip height (e.g., '22px', '24px')
 * @param {Object} sx - Additional sx props
 */
const EventStatusChip = ({
  eventStatus,
  size = 'small',
  fontSize = '0.75rem',
  height = '24px',
  fontWeight = 'bold',
  sx = {},
}) => {
  const theme = useTheme();

  if (!eventStatus) return null;

  const colorKey = eventStatus.color || 'gray';
  const mode = theme.palette.mode;
  const colors = pastelColors[colorKey]?.[mode] || pastelColors.gray[mode];

  return (
    <Chip
      label={eventStatus.label}
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
        ...sx,
      }}
    />
  );
};

export default EventStatusChip;
