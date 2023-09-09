/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import calendarIcon from 'mvp/assets/calendarIcon.svg';

const GraphLocalDate = ({
    state,
    setState,
    getChartData
}) => {
    const { range } = state;

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(range)

    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', hideOnEscape, true);
        document.addEventListener('click', hideOnClickOutside, true);
        // remove event listeners when component unmounts
        return () => {
            document.removeEventListener('keydown', hideOnEscape);
            document.removeEventListener('click', hideOnClickOutside);
        }
    }, []);

    useEffect(() => { if (range) { setDate(range) } }, [range])

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
        getChartData(date, true);
        setOpen(false);
    }

    useEffect(() => {
        // if (open === false)
        // setDate(range)
    }, [open])

    const convertToDate = (dateVal) => new Date(dateVal)

    return (
        <>
            <div className="relative flex gap-2 basis-1/2 justify-end z-[200]">
                <img
                    src={calendarIcon}
                    alt="calendarIcon"
                    onClick={() => setOpen((open) => !open)}
                    className="cursor-pointer w-4"
                />
                <input
                    value={`${format(convertToDate(date[0].startDate), 'MMM dd,yyyy')} - ${format(
                        convertToDate(date[0].endDate),
                        'MMM dd, yyyy'
                    )}`}
                    readOnly
                    className="bg-inherit w-[15rem] text-sm font-RakutenRegular mr-[1rem] border-none focus:outline-none cursor-pointer relative z-0"
                    onClick={() => setOpen((open) => !open)}
                />

                <div ref={refOne} className="absolute z-40 top-8">
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
        </>
    );
}

export default GraphLocalDate;