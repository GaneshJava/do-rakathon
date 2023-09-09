import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  handleSubmit, 
  action, 
  text, 
  subText = '', 
  subTextClass = '', 
  className =  '', 
  customStyle={},
  disabled = false
}) => {
  return (
    <>
      <button
        type={action}
        className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-purple-500 button ${className}`}
        onSubmit={handleSubmit}
        style={customStyle}
        onClick={handleSubmit}
        disabled={disabled}
        >
          {subText && <span className={subTextClass}> {subText} </span>}
        {text}
      </button>
    </>
  );
};


Button.defaultProps = {
  handleSubmit: () => console.log(),
  action: 'Button',
  text: 'Click',
  customStyle: {}
};

Button.propTypes = {
  handleSubmit: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.string,
  subText: PropTypes.string,
  subTextClass: PropTypes.string,
  className: PropTypes.string,
  customStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
