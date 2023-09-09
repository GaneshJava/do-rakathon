import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stateData, updateGlobalDateRange } from 'store';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import calendarIcon from 'mvp/assets/calendarIcon.svg';
import tableIcon from 'mvp/assets/tableIcon.svg';
import columnIcon from 'mvp/assets/column_icon.svg';
import alldatasourceIcon from 'mvp/assets/all_dashboard.svg';
import '../dashboard.css';
import { _COLUMN, _DATABASE, _OVERALL, _TABLE } from 'mvp/constants';

const GlobalFilters = () => {
  const dispatch = useDispatch();
  const dashboardTreeState = useSelector(stateData['dashboard']);
  let range = dashboardTreeState.globalDateRange;
  let type = dashboardTreeState.activeNodeObj.type;
  let label = dashboardTreeState.activeNodeObj.label;

  const getIcon = (type) => {
    let icon, width, height;
    if (type === _OVERALL || type === _DATABASE) {
      icon = alldatasourceIcon;
      width = 'w-8';
      height = 'h-8';
    }
    if (type === _TABLE) {
      icon = tableIcon;
      width = 'w-6';
      height = 'h-6';
    }
    if (type === _COLUMN) {
      icon = columnIcon;
      width = 'w-5';
      height = 'h-6';
    }
    return <img src={icon} alt="typeIcon" className={`${width} ${height}`} />;
  };

  const [date, setDate] = useState(range)

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  useEffect(() => {
    if (open === false)
      setDate(range)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const updateDate = () => {
    dispatch(updateGlobalDateRange(date));
    setOpen(false);
  }

  const convertToDate = (dateVal) => new Date(dateVal)

  return (
    <div className="pt-[1.5rem] flex flex-row pb-[2rem]">
      <div className="basis-1/2 flex gap-3 items-center">
        {getIcon(type)}
        <span className="text-xl font-RakutenSemibold"> {label} </span>
      </div>
      <div className="relative flex gap-3 basis-1/2 justify-end ">
        <img
          src={calendarIcon}
          alt="calendarIcon"
          onClick={() => setOpen((open) => !open)}
          className="cursor-pointer w-5"
        />
        <input
          value={`${format(convertToDate(date[0].startDate), 'MMM dd,yyyy')} - ${format(
            convertToDate(date[0].endDate),
            'MMM dd, yyyy'
          )}`}
          readOnly
          className="bg-inherit w-[15rem]  mr-[1rem] border-none focus:outline-none cursor-pointer"
          onClick={() => setOpen((open) => !open)}
        />

        <div ref={refOne} className="absolute z-40 top-10">
          {open && (
            <div className="relative ">
              <DateRange
                onChange={(item) => setDate([{ startDate: item.selection.startDate.toISOString(), endDate: item.selection.endDate.toISOString() }])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={[{
                  startDate: convertToDate(date[0].startDate),
                  endDate: convertToDate(date[0].endDate),
                  key: 'selection',
                }]}
                months={1}
                direction="horizontal"
                rangeColors={['#F59502']}
                className=" h-[26rem] text-white flex rounded-lg customStyles"
              />
              <button
                onClick={() => updateDate()}
                className="absolute right-[20px] top-[370px] bg-[#F59502] w-10 h-7 rounded-md border font-RakutenRegular">
                Ok
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalFilters;
