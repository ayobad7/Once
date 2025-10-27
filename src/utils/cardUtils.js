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

// Color mappings for regions
export const regionColors = {
  'North America': 'error',
  Europe: 'info',
  'South America': 'warning',
  'Southeast Asia': 'success',
  Asia: 'warning',
  'Other Regions': 'secondary',
  'Custom Server': 'primary',
};

// Color mappings for build categories
export const buildColors = {
  'Base Design': 'error',
  'Room Design': 'secondary',
  'City Build': 'primary',
  Tutorial: 'info',
  Outfit: 'primary',
  Character: 'warning',
  Decoration: 'success',
  Bug: 'error',
  'Weapon Build': 'secondary',
  Deviation: 'warning',
  Update: 'info',
  Class: 'success',
};

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
    return { label: 'Upcoming', color: 'info' };
  } else if (today >= startDate && today <= endDate) {
    return { label: 'Ongoing', color: 'success' };
  } else {
    return { label: 'Event Ended', color: 'default' };
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
