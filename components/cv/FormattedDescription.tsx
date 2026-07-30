'use client';

import React from 'react';

interface FormattedDescriptionProps {
  text?: string;
  className?: string;
  bulletColor?: string;
}

export const FormattedDescription: React.FC<FormattedDescriptionProps> = ({
  text,
  className = 'text-slate-700 text-xs sm:text-sm leading-relaxed',
  bulletColor,
}) => {
  if (!text) return null;

  const lines = text.split('\n').filter((line) => line.trim() !== '');

  const isBulletLine = (line: string) => {
    const trimmed = line.trim();
    return (
      trimmed.startsWith('•') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('*') ||
      /^\d+[\.\)]\s/.test(trimmed)
    );
  };

  const cleanLineText = (line: string) => {
    return line.trim().replace(/^([•\-\*]|\d+[\.\)])\s*/, '');
  };

  const hasBullets = lines.some(isBulletLine);

  if (!hasBullets) {
    return (
      <div className={`space-y-1.5 ${className}`}>
        {lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {lines.map((line, idx) => {
        if (isBulletLine(line)) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: bulletColor || 'currentColor' }}
              />
              <span className="flex-1">{cleanLineText(line)}</span>
            </div>
          );
        }
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
};
