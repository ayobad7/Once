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
      const textBefore = description.substring(lastIndex, match.index);
      parts.push(
        <span key={`text-${lastIndex}`} style={{ whiteSpace: 'pre-wrap' }}>
          {textBefore}
        </span>
      );
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
    parts.push(
      <span key={`text-${lastIndex}`} style={{ whiteSpace: 'pre-wrap' }}>
        {description.substring(lastIndex)}
      </span>
    );
  }

  // If no links found, just return the plain text with line breaks preserved
  if (parts.length === 0) {
    return (
      <span {...props} style={{ whiteSpace: 'pre-wrap' }}>
        {description}
      </span>
    );
  }

  return <span {...props}>{parts}</span>;
}

export default DescriptionWithLinks;
