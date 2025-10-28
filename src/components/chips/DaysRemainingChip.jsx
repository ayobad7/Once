// src/components/chips/DaysRemainingChip.jsx
import React from 'react';
import { Chip, useTheme } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import { daysRemainingColor, pastelColors } from '../../utils/cardUtils';

/**
 * Reusable Days Remaining Chip Component with Pastel Colors
 * @param {number} daysRemaining - Number of days remaining
 * @param {string} size - Chip size ('small' or 'medium')
 * @param {string} fontSize - Font size (e.g., '0.65rem', '0.75rem')
 * @param {string} height - Chip height (e.g., '20px', '24px')
 * @param {string} iconSize - Icon size (e.g., '0.75rem', '0.8rem')
 * @param {Object} sx - Additional sx props
 */
const DaysRemainingChip = ({
  daysRemaining,
  size = 'small',
  fontSize = '0.65rem',
  height = '20px',
  iconSize = '0.75rem',
  fontWeight = 'normal',
  sx = {},
}) => {
  const theme = useTheme();

  if (daysRemaining === null || daysRemaining === undefined) return null;

  const mode = theme.palette.mode;
  const colors = pastelColors[daysRemainingColor][mode];

  return (
    <Chip
      icon={
        <TimerIcon
          sx={{
            fontSize: `${iconSize} !important`,
            color: 'inherit !important',
          }}
        />
      }
      label={`${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left`}
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
        ...sx,
      }}
    />
  );
};

export default DaysRemainingChip;
