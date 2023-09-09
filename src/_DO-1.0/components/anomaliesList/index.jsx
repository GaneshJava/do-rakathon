/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import AnomaliesOverview from './molecules/AnomaliesOverview';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import dateIcon from '../../assets/date.svg';
import downloadIcon from '../../assets/downloadArrow.svg';
import downIcon from '../../assets/downArrow.svg';
import { Menu } from 'primereact/menu';
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { dateDropDownOption } from './reducers';
import selectedRightIcon from '../../assets/selectedRight.svg';
import CalendarComponent from './molecules/Calendar';
import './anomalies.css';
//-------
import { getDatesInUTC } from '_DO-1.0/reducers';

const AnomaliesIndex = () => {
  const menuLeft = useRef(null);
  const [open, setOpen] = useState(true);
  const [state, setState] = useState({
    dateSelected: 'last15days',
    dateSelectedLabel: 'Last 15 days',
    menuOptions: [],
    dateRange: [getDatesInUTC('last15days')]
  });

  useEffect(() => {
    let domElement = document.getElementById('dateSelected');
    document.addEventListener('click', closeDatePicker, true);
    domElement.innerHTML = domElement.innerHTML || state.dateSelectedLabel;
  }, []);

  const handleClick = (e, triggerFrom) => {
    setState({
      ...state,
      menuOptions: dateDropDownOption,
      closeMenuAfterSelect: true,
      triggerFrom
    });
    menuLeft.current.toggle(e);
  };
  const refOne = useRef(null);

  const closeDatePicker = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      toggleCustomDate(false);
    }
  };

  const handleOptionSelect = ({ option }) => {
    let setObj = { ...state };
    if (state.triggerFrom === 'date' && option.key !== 'custom')
      setObj['dateRange'] = [getDatesInUTC(option.key)]
    setObj[`${state.triggerFrom}Selected`] = option.key;
    setObj[`${state.triggerFrom}SelectedLabel`] = option.label;
    setState(setObj);
    if (option.key === 'custom') toggleCustomDate(true);
  };

  const updateCustomDate = (date) => {
    setState({ ...state, dateRange: date })
    toggleCustomDate(false);
  }

  const toggleCustomDate = (show) => setOpen(show);

  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between font-white items-center">
          <div className="flex flex-col gap-1">
            <p className="font-RakutenSemibold text-3xl text-primaryTextColor"> Anomalies </p>
            <p className="font-RakutenLight text-secondaryTextColor">
              Manage your recent anomalies across your data sources{' '}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              outlined
              className="border-secondaryBorderColor rounded-md"
              onClick={(e) => handleClick(e, 'date')}>
              <div className="flex gap-3">
                <img src={dateIcon} alt="date-icon" />
                <p
                  id="dateSelected"
                  className="font-RakutenSemibold text-tertiaryBtnText rounded-md">
                  {state[`${state.triggerFrom}SelectedLabel`]}
                </p>
                <img src={downIcon} alt="down" />
              </div>
            </Button>
            <div className="relative">
              {state.triggerFrom === 'date' && state.dateSelected === 'custom' && open === true && (
                <div ref={refOne} className="absolute right-0 top-[3rem] z-10">
                  <CalendarComponent
                    dateRange={state.dateRange}
                    updateCustomDate={updateCustomDate}
                    toggleCustomDate={toggleCustomDate}
                  />
                </div>
              )}
            </div>
            <Button
              outlined
              disabled={true}
              className="border-secondaryBorderColor">
              <img src={downloadIcon} alt="download" className="px-2" />
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="m-8">
        <AnomaliesOverview
          dateRange={state.dateRange}
        />
      </div>
      <Menu
        model={customMenuTemplate({
          options: state.menuOptions,
          onClick: handleOptionSelect,
          closeMenuAfterSelect: state.closeMenuAfterSelect,
          selectedOptionIcon: <img src={selectedRightIcon} alt="" />,
          selectedOption: state[`${state.triggerFrom}Selected`]
        })}
        popup
        ref={menuLeft}
        id={'popup_menu_left'}
      />
    </>
  );
};

export default AnomaliesIndex;
