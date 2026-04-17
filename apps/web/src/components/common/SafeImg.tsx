/**
 * SafeImg — Drop-in replacement for <img> that falls back to the
 * EAOverseas logo whenever the source URL is missing or fails to load.
 *
 * Usage:
 *   <SafeImg src={url} alt="desc" className="w-full h-full object-cover" />
 */
import React, { useState } from 'react';
import logo from '@/assets/logo.webp';

interface SafeImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Extra classes applied to the logo placeholder only */
  logoClassName?: string;
}

const SafeImg: React.FC<SafeImgProps> = ({ src, alt, className, logoClassName, style, ...rest }) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-purple-50 ${className ?? ''}`}
        style={style}
      >
        <img
          src={logo}
          alt="EAOverseas"
          className={logoClassName ?? 'h-10 w-auto object-contain opacity-60'}
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
      onError={() => setErrored(true)}
      {...rest}
    />
  );
};

export default SafeImg;
