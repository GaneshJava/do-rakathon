import React from "react";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";

const RadioButton = ({
    handleRadioClick,
    checked = true,
    label,
    className = '',
    value = '',
    customStyle = {},
    disabled = false,
}) => {
    return (
        <div className={`flex gap-1 items-center cursor-pointer ${className}`}
            onClick={() => disabled ? null : handleRadioClick(value)}
            disabled={disabled}
            style={customStyle}
        >
            {checked ? <IoMdRadioButtonOn size={20} color="f79008"/> : <IoMdRadioButtonOff size={20} color="f79008"/>} {label}
        </div>
    )
}

export default RadioButton;