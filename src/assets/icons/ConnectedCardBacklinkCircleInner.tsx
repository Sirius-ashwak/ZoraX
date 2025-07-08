import React from 'react';

interface ConnectedCardBacklinkCircleInnerProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const ConnectedCardBacklinkCircleInner: React.FC<ConnectedCardBacklinkCircleInnerProps> = ({
  className = '',
  width = 24,
  height = 24,
  color = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Connected Card Backlink Circle Inner - Based on typical Figma patterns */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className="transition-all duration-200"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        fill={color}
        className="transition-all duration-200"
      />
      <path
        d="M8 12L10.5 14.5L16 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-200"
      />
    </svg>
  );
};

// Alternative version if it's more of a connection/link indicator
export const ConnectedCardBacklinkAlt: React.FC<ConnectedCardBacklinkCircleInnerProps> = ({
  className = '',
  width = 24,
  height = 24,
  color = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Connection/Link indicator with circles */}
      <circle
        cx="8"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="16"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="11"
        y1="12"
        x2="13"
        y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="1.5"
        fill={color}
      />
    </svg>
  );
};
