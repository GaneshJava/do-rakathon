import React from 'react';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { Button } from 'primereact/button';
import '../anomalies.css';

const CalendarComponent = ({ dateRange, updateCustomDate, toggleCustomDate }) => {
  const convertToDate = (dateVal) => new Date(dateVal);
  const [state, setState] = useState(dateRange);

  const handleDateChange = (item) => {
    const userTimezoneOffset = new Date().getTimezoneOffset();
    let startDate = item.selection.startDate;
    let endDate = item.selection.endDate;
    startDate.setMinutes(startDate.getMinutes() - userTimezoneOffset);
    endDate.setMinutes(endDate.getMinutes() - userTimezoneOffset);
    setState([{ startDate: startDate.toISOString(), endDate: endDate.toISOString() }]) 
  }

  return (
    <div className="relative w-[20rem] rounded-lg">
      <DateRangePicker
        onChange={handleDateChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={[{
          startDate: convertToDate(state[0].startDate),
          endDate: convertToDate(state[0].endDate),
          key: 'selection',
        }]}
        direction="horizontal"
        className=" h-[30rem] text-[#ffffff] rounded-md"
        rangeColors={['#F59502']}
      />
      <div className="flex gap-3 absolute bottom-4 right-2">
        <Button outlined className="border-secondaryBorderColor text-tertiaryBtnText" severity='warning' onClick={() => toggleCustomDate(false)}>
          Cancel
        </Button>
        <Button outlined className="border-secondaryBorderColor text-tertiaryBtnText" severity='warning' onClick={() => updateCustomDate(state)}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default CalendarComponent;
