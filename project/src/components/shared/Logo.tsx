import React from 'react';
import { Gift } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const iconSizes = {
    small: 20,
    medium: 24,
    large: 36
  };

  return (
    <div className="flex items-center">
      <div className="bg-blue-600 text-white p-2 rounded-lg">
        <Gift size={iconSizes[size]} />
      </div>
      <div className={`ml-2 font-bold ${sizeClasses[size]} text-blue-800`}>
        FASS-Gadget
      </div>
    </div>
  );
};

export default Logo;