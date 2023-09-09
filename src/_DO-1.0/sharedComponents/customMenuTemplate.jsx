import React from 'react';
import classNames from 'classnames';
import selectedRightIcon from '../assets/selectedRight.svg'
import PropTypes from 'prop-types';

const customMenu = ({
    options,
    onClick,
    optionTemplate = null,
    closeMenuAfterSelect = false,
    className,
    selectedOption,
    selectedOptionClass = '',
    selectedOptionIcon = <img src={selectedRightIcon} alt='' />,
    showSelectIcon = true,
    key = 'key',
    label = 'label',
    props = {}
}) => {
    const templateItems = [
        {
            template: (_, _options) => (
                <>
                    {!optionTemplate ? (
                        <>
                            <ul className={classNames('max-h-80 overflow-auto bg-primaryBgColor', 'flex flex-col', 'gap-1 py-3', 'font-PrimaryFont text-primaryTextColor', className)}>
                                {options?.map((option, _index) => (
                                    <li key={`menu_${_index}`}
                                        onClick={e => {
                                            onClick({ option, e, props });
                                            if (closeMenuAfterSelect) _options.onClick(e);
                                        }} className={classNames('pl-3 rounded-md py-2 mx-2', 'cursor-pointer', 'hover:bg-quaternaryBgColor')}>
                                        <div className='w-[90%] flex justify-between'>
                                            <span className={selectedOptionClass}> {option[label]} </span>
                                            {selectedOption === option[key] && showSelectIcon && selectedOptionIcon}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : <> {optionTemplate} </>
                    }
                </>
            )
        }
    ];

    return templateItems;
};

customMenu.defaultProps = {
    customStyle: {},
    closeMenuAfterSelect: false,
    showSelectIcon: true,
    selectedOptionIcon: <img src={selectedRightIcon} alt='' />,

};

customMenu.propTypes = {
    options: PropTypes.array,
    onClick: PropTypes.func,
    optionTemplate: PropTypes.any,
    closeMenuAfterSelect: PropTypes.bool,
    className: PropTypes.string,
    selectedOption: PropTypes.any,
    selectedOptionClass: PropTypes.string,
    selectedOptionIcon: PropTypes.any,
    showSelectIcon: PropTypes.bool
};

export const customMenuTemplate = customMenu;
