// src/components/chips/EventStatusChip.jsx
import React from 'react';
import { Chip } from '@mui/material';

/**
 * Reusable Event Status Chip Component
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
  if (!eventStatus) return null;

  return (
    <Chip
      label={eventStatus.label}
      size={size}
      color={eventStatus.color}
      variant='filled'
      sx={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        height: height,
        border: 'none',
        color: (theme) =>
          eventStatus.color === 'default'
            ? undefined
            : theme.palette.mode === 'dark'
            ? '#000'
            : undefined,
        ...sx,
      }}
    />
  );
};

export default EventStatusChip;

