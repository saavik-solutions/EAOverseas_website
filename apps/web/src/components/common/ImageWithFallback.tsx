/**
 * ImageWithFallback
 * -----------------
 * Drop-in replacement for <img> that automatically shows the EAOverseas logo
 * whenever the real image fails to load (network error, 404, broken URL, etc.).
 *
 * Usage:
 *   <ImageWithFallback src={url} alt="..." className="w-full h-full object-cover" />
 *
 * The fallback renders the logo centred on a light purple background
 * so it is always visually meaningful.
 */

import React, { useState, ImgHTMLAttributes } from 'react';
import logo from '@/assets/logo.webp';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  /** Optional: override the fallback shown on error */
  fallbackSrc?: string;
  /** Optional: wrapper div className (applied when fallback is active) */
  fallbackContainerClassName?: string;
}

const ImageWithFallback: React.FC<Props> = ({
  src,
  alt,
  fallbackSrc,
  fallbackContainerClassName,
  className,
  style,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Use explicit fallbackSrc if provided, otherwise show logo placeholder
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          style={style}
          {...rest}
        />
      );
    }

    // Logo-over-purple-background placeholder
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-purple-100 to-fuchsia-100 ${fallbackContainerClassName ?? ''}`}
        style={style}
        aria-label={alt}
      >
        <img
          src={logo}
          alt="EAOverseas"
          className="h-16 w-auto object-contain"
          style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(96%) saturate(2000%) hue-rotate(272deg) brightness(80%)' }}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
};

export default ImageWithFallback;
