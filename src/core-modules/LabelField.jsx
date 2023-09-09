import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

const style = {
  display: 'block',
  padding: '0.25rem 0rem',
  fontSize: '12px',
  fontWeight: '400',
  color: '#ffff'
};

const LabelField = ({ 
  title, 
  customStyle, 
  mandotory = false, 
  informationText = '', 
  className = '', 
  astrickClass = '',
  titleClass = ''
}) => {

  return (
    <div className={"flex items-center gap-1 " + className}>
      <label
        style={{ ...style, ...customStyle }}
        className={`${titleClass} ${mandotory ? 'custom_astrick ' + astrickClass : ''}`}>
        {title}
      </label>
      {informationText && <span className='cursor-pointer'> <AiOutlineInfoCircle color="#f59600" title={informationText}/> </span>}
    </div>
  );
};

LabelField.propTypes = {
  title: PropTypes.any,
  customStyle: PropTypes.object,
  mandotory: PropTypes.bool,
  className: PropTypes.string,
  informationText: PropTypes.string,
  astrickClass: PropTypes.string,
  titleClass: PropTypes.string
};

export default LabelField;
