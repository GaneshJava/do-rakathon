import React from 'react';
import PropTypes from 'prop-types';

const fixedInputClass =
  'my-1 rounded-md appearance-none relative block px-3 py-2 border placeholder-gray-500 focus:outline-none  focus:z-10 sm:text-sm ';

  const Input = ({
    handleChange = () => console.log(),
    value,
    id,
    name,
    type,
    isRequired,
    placeholder,
    customClass,
    handleKeyDown,
    min,
    max,
    onBlur = () => null
  }) => {
    let attributes = {
        onChange:handleChange,
        onKeyDown:handleKeyDown,
        value:value,
        id:id,
        name:name,
        type:type,
        required:isRequired,
        className:`${fixedInputClass} ${customClass}`,
        placeholder:placeholder,
        min,
        max,
        onBlur:onBlur
    }
    return (
      type === 'textarea' ? 
      <textarea {...attributes} /> :
      <input
        {...attributes}
      />
    );
  };
  
  Input.defaultProps = {
    handleChange: (e) => console.log(e, 'onChange')
  };
  
  Input.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.any,
    labelText: PropTypes.string,
    labelFor: PropTypes.string,
    id: PropTypes.any,
    name: PropTypes.any,
    type: PropTypes.string,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    customClass: PropTypes.string,
    handleKeyDown: PropTypes.func,
    onClick:PropTypes.func
  };
  
export default Input;
