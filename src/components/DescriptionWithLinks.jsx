import React from 'react';
import { Link as MuiLink } from '@mui/material';

/**
 * Component to render description text with markdown-style links as clickable links
 * Converts [text](url) to clickable links
 */
function DescriptionWithLinks({ description, ...props }) {
  if (!description) return null;

  // Regex to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(description)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(description.substring(lastIndex, match.index));
    }

    // Add the link
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <MuiLink
        key={match.index}
        href={linkUrl}
        target='_blank'
        rel='noopener noreferrer'
        underline='hover'
        sx={{
          color: 'primary.main',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {linkText}
      </MuiLink>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last link
  if (lastIndex < description.length) {
    parts.push(description.substring(lastIndex));
  }

  // If no links found, just return the plain text
  if (parts.length === 0) {
    return <span {...props}>{description}</span>;
  }

  return <span {...props}>{parts}</span>;
}

export default DescriptionWithLinks;
