import React from 'react';
import PropsTypes from 'prop-types';

const WarningText = ({ text, style = {}, colorCode = '#FF0000' }) => {
  return (
    <>
      <small style={style} className={`text-[${colorCode}] float-left`}>
        {text}
      </small>
    </>
  );
};

WarningText.propTypes = {
  text: PropsTypes.string,
  style: PropsTypes.object,
  colorCode: PropsTypes.string
};

export default WarningText;
