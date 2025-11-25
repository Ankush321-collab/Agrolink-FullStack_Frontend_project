const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseClasses = 'px-6 py-2 rounded-md font-medium transition duration-300';
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
