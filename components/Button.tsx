import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
  
  const variants = {
    primary: "bg-black text-white hover:bg-roseGold focus:ring-black border border-transparent disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300",
    secondary: "bg-roseGold text-white hover:bg-black focus:ring-roseGold border border-transparent disabled:bg-gray-200 disabled:text-gray-400",
    outline: "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-white focus:ring-charcoal disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400",
    ghost: "bg-transparent text-charcoal hover:text-roseGold hover:bg-primary/10 disabled:text-gray-300 disabled:hover:bg-transparent",
    white: "bg-white text-charcoal hover:bg-gray-100 hover:text-black focus:ring-white border border-transparent disabled:bg-gray-200 disabled:text-gray-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;