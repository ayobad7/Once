// src/utils/cardUtils.js
// Shared utilities for cards and build items

import LanguageIcon from '@mui/icons-material/Language';
import FoundationIcon from '@mui/icons-material/Foundation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChairIcon from '@mui/icons-material/Chair';
import BugReportIcon from '@mui/icons-material/BugReport';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PetsIcon from '@mui/icons-material/Pets';
import UpdateIcon from '@mui/icons-material/Update';

// Icon mappings for build categories
export const buildIcons = {
  'Base Design': FoundationIcon,
  'Room Design': MeetingRoomIcon,
  'City Build': LocationCityIcon,
  Tutorial: PlumbingIcon,
  Outfit: CheckroomIcon,
  Character: PersonSearchIcon,
  Decoration: ChairIcon,
  Bug: BugReportIcon,
  'Weapon Build': WhatshotIcon,
  Deviation: PetsIcon,
  Update: UpdateIcon,
  Class: UpdateIcon,
};

// Region icon (same for all regions)
export const RegionIcon = LanguageIcon;

// Pastel color system inspired by modern bookmark designs
// Light mode: pastel backgrounds with darker contrasting text
// Dark mode: dark backgrounds (#090f21) with bright colored text
export const pastelColors = {
  red: {
    light: { bg: '#FFE5E5', text: '#C41E3A' },
    dark: { bg: '#090f21', text: '#FF8FA3' },
  },
  pink: {
    light: { bg: '#FFE5F5', text: '#C2185B' },
    dark: { bg: '#090f21', text: '#FF88CC' },
  },
  purple: {
    light: { bg: '#F0E5FF', text: '#6A1B9A' },
    dark: { bg: '#090f21', text: '#B388FF' },
  },
  blue: {
    light: { bg: '#E5F0FF', text: '#1565C0' },
    dark: { bg: '#090f21', text: '#82B1FF' },
  },
  cyan: {
    light: { bg: '#E5FAFF', text: '#00838F' },
    dark: { bg: '#090f21', text: '#84FFFF' },
  },
  teal: {
    light: { bg: '#E5FFF5', text: '#00695C' },
    dark: { bg: '#090f21', text: '#64FFDA' },
  },
  green: {
    light: { bg: '#E5FFF0', text: '#2E7D32' },
    dark: { bg: '#090f21', text: '#69F0AE' },
  },
  lime: {
    light: { bg: '#F5FFE5', text: '#558B2F' },
    dark: { bg: '#090f21', text: '#B2FF59' },
  },
  yellow: {
    light: { bg: '#FFF9E5', text: '#F57C00' },
    dark: { bg: '#090f21', text: '#FFD54F' },
  },
  orange: {
    light: { bg: '#FFF3E5', text: '#E65100' },
    dark: { bg: '#090f21', text: '#FFAB40' },
  },
  gray: {
    light: { bg: '#F5F5F5', text: '#424242' },
    dark: { bg: '#090f21', text: '#BDBDBD' },
  },
};

// Color mappings for regions (using pastel colors)
export const regionColors = {
  'North America': 'red',
  Europe: 'blue',
  'South America': 'orange',
  'Southeast Asia': 'green',
  Asia: 'yellow',
  'Other Regions': 'gray',
  'Custom Server': 'purple',
};

// Color mappings for build categories (using pastel colors)
export const buildColors = {
  'Base Design': 'red',
  'Room Design': 'purple',
  'City Build': 'blue',
  Tutorial: 'cyan',
  Outfit: 'pink',
  Character: 'orange',
  Decoration: 'green',
  Bug: 'red',
  'Weapon Build': 'orange',
  Deviation: 'yellow',
  Update: 'teal',
  Class: 'lime',
};

// Event status colors
export const eventStatusColors = {
  Upcoming: 'blue',
  Ongoing: 'green',
  'Event Ended': 'gray',
};

// Days remaining color
export const daysRemainingColor = 'yellow';

/**
 * Calculate event status based on start and end dates
 * @param {string} eventStartDate - Event start date
 * @param {string} eventEndDate - Event end date
 * @returns {Object|null} - { label: string, color: string } or null
 */
export const getEventStatus = (eventStartDate, eventEndDate) => {
  if (!eventStartDate || !eventEndDate) {
    return null;
  }

  const today = new Date();
  const startDate = new Date(eventStartDate);
  const endDate = new Date(eventEndDate);

  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (today < startDate) {
    return { label: 'Upcoming', color: eventStatusColors.Upcoming };
  } else if (today >= startDate && today <= endDate) {
    return { label: 'Ongoing', color: eventStatusColors.Ongoing };
  } else {
    return { label: 'Event Ended', color: eventStatusColors['Event Ended'] };
  }
};

/**
 * Calculate days remaining for an event
 * Only returns a value for ongoing events
 * @param {string} eventStartDate - Event start date
 * @param {string} eventEndDate - Event end date
 * @returns {number|null} - Days remaining or null
 */
export const getDaysRemaining = (eventStartDate, eventEndDate) => {
  if (!eventEndDate) return null;

  const today = new Date();
  const endDate = new Date(eventEndDate);

  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Only show for ongoing events
  const eventStatus = getEventStatus(eventStartDate, eventEndDate);
  if (eventStatus?.label !== 'Ongoing') return null;

  const timeDiff = endDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? daysLeft : null;
};
