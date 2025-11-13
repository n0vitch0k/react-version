// Composant Truncate pour remplacer le pipe d'Angular
import React from 'react';

interface TruncateProps {
  children: string;
  limit?: number;
  className?: string;
}

export const Truncate: React.FC<TruncateProps> = ({ 
  children, 
  limit = 30, 
  className = "" 
}) => {
  const truncate = (value: string, limit: number): string => {
    if (!value) return '';
    const v = String(value);
    if (v.length <= limit) return v;
    return v.substring(0, limit).trimEnd() + '…';
  };

  return (
    <span className={className}>
      {truncate(children, limit)}
    </span>
  );
};

export default Truncate;
