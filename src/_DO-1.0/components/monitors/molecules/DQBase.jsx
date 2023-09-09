/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Input from "core-modules/Input";
import classNames from "classnames";
import '../../monitors/monitors.css';
import Button from "core-modules/Button";
import { changeTypeOption, scheduleTime, repeateMonitor } from '../reducers';
import { Calendar } from 'react-date-range';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { DQ_RULES } from "_DO-1.0/reducers";
import MultiSelect from "core-modules/Selectlist";
import { useRef } from "react";
import { formatDate, getCurrentTime12hr, getValidValue } from "./ConfigureTableMonitors";
import { getCronExpression } from "./ConfigureTableMonitors";
const DQBase = ({tenantId, connId, updateStepChange }) => {
    const calenderRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        type: DQ_RULES,
        monitorName: '',
        description: '',
        monitorFrequency: 'hours',
        frequency: 1,
        selectedDate: new Date(),
        warning: {},
        ...getCurrentTime12hr()
    });

    useEffect(() => {
        document.addEventListener('click', closeDatePicker, true);
        let savedStates = sessionStorage.getItem('dqMonitorDetails');
        savedStates = savedStates && JSON.parse(savedStates) ? JSON.parse(savedStates) : {};
        savedStates = savedStates?.stateData ?? {};
        savedStates['selectedDate'] = savedStates.selectedDate ? new Date(savedStates.selectedDate) : new Date();
        let stateObj = { ...state, ...savedStates }
        setState(stateObj);
        return () => document.removeEventListener('click', closeDatePicker)
    }, [])

    const closeDatePicker = (e) => {
        if (calenderRef.current && !calenderRef.current.contains(e.target)) {
            toggleCustomDate(false);
        }
    };

    const toggleCustomDate = (show) => setOpen(show);

    const handleSubmit = () => {
        if (validateFields()) {
            sessionStorage.setItem('dqMonitorDetails', JSON.stringify(getPostData()));
            updateStepChange('fieldLevel', 1);
        }
    };

    const validateFields = () => {
        let stateObj = { ...state };
        let warningObj = {};
        let proceed = true;
        ['monitorName', 'description', 'frequency'].forEach(stateKey => {
            if (!stateObj[stateKey]) {
                warningObj[stateKey] = true;
                proceed = false;
            }
        });
        stateObj['warning'] = warningObj;
        setState(stateObj)
        return proceed;
    };

    const getPostData = () => {
        return {
            postData: {
                monitorName: state.monitorName,
                frequency: getCronExpression(state.monitorFrequency, state.frequency),
                description: state.description,
                isActive: true,
                tenantId: tenantId,
                connId,
                rulesConfigured: []
            },
            stateData: { ...state }
        }
    }

    const handleSelectChange = (e, key) => {
        setState({ ...state, [key]: e.value })
    }

    const handleSelect = (date) => {
        setState({ ...state, selectedDate: date });
        toggleCustomDate(false)
    }

    const handleFrequencyBreachChange = ({ target }, key) => {
        let value = target.value;
        let valueTemp = Number(value);
        if (key === 'frequency') {
            const monitorFrequency = state.monitorFrequency;
            if (monitorFrequency)
                value = getValidValue(monitorFrequency, valueTemp)
            setState({ ...state, [key]: value, warning: { ...state.warning, frequency: false } })
        }
    }

    const handleTimeChange = ({ target }) => {
        let value = target.value;
        if (value.length > 5) return;
        let temp = value.replaceAll(':', '');
        if (temp === '' || Number(temp)) {
            if (value.indexOf(':') < 0 && value.length === 4) {
                value = value.slice(0, 2) + ':' + value.slice(2);
            }
            setState({ ...state, hourMinutes: value })
        }
    }

    const onBlur = ({ target }) => {
        let value = target?.value ?? '';
        const length = value.length
        if (value === '')
            value = '00:00';
        else if (length === 1)
            value += '0:00';
        else if (length === 2)
            value += ':00';
        else if (length === 3)
            value += ':0';
        setState({ ...state, hourMinutes: value })
    }

    return (
        <div className="flex w-full flex-col gap-12 bg-secondaryBgColor">
            <div className="monitor-form py-7">
                <div className="px-8 flex flex-col gap-5">
                    <div className="flex flex-col">
                        <span className="mb-[8px]">
                            Type
                        </span>
                        <MultiSelect
                            options={[{ value: state.selectedEventType, label: [state.selectedEventType] }]}
                            standards={changeTypeOption.filter(item => item.value === state.type)}
                            disabled={true}
                            handleChange={(e) => handleSelectChange(e, 'type')}
                            isMulti={false}
                            placeholder={"Select Value"}
                            className='w-full border border-[#424242] rounded'
                            classNamePrefix="rules-select-custom"
                        />
                    </div>
                    <div className="flex flex-col">
                        Monitor Name
                        <Input
                            handleChange={({ target }) => setState({ ...state, monitorName: target.value, warning: { ...state.warning, monitorName: false } })}
                            value="SNOWFLAKE_STG_CUST_USER_SECURITY_SCORE"
                            customClass={classNames('bg-[#1e2021] text-white focus:outline-none  border border-[#424242] h-[2.4rem] w-full rounded placeholder:text-[#808080] placeholder:text-sm border mt-[8px]')}
                            placeholder="Enter Rule Name" />
                        {state.warning.monitorName && <p className="text-sm text-errorTextColor">Please enter monitor name</p>}
                    </div>
                    <div className="flex flex-col">
                        Monitor Description
                        <Input
                            type="textarea"
                            handleChange={({ target }) => setState({ ...state, description: target.value, warning: { ...state.warning, description: false } })}
                            value="DB : SNOWFLAKE_STG_CUST TABLE: USER COLUMN: SECURITY_SCORE \n Validate SECURITY_SCORE "
                            placeholder="Add your monitor description"
                            customClass={classNames('bg-[#1e2021] text-white  border border-[#424242] px-2 w-full rounded placeholder:text-[#808080] placeholder:text-sm border',
                                false && 'border-errorTextColor', 'h-[7rem]')}
                        />
                        {state.warning.description && <p className="text-sm text-errorTextColor">Please enter monitor description</p>}
                    </div>
                    <div>
                        <span>Schedule</span>
                        <div className="bg-[#292929] p-6 flex flex-col gap-4 rounded-md mt-[8px]">
                            <div className="flex flex-row gap-4 ">
                                <div className="flex flex-col w-[20rem] calender-monitor" >
                                    Start Date
                                    <div onClick={() => toggleCustomDate(true)} className="  h-[3rem]  flex flex-col calender-monitor">
                                        <Input customClass={classNames('w-[20rem] bg-[#1e2021] text-white focus:outline-none   border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')} placeholder="Select Date"
                                            value={state.selectedDate ? formatDate(state.selectedDate) : ""}
                                        />
                                        {open &&
                                            <div ref={calenderRef} className="z-10 -mt-4">
                                                <Calendar className="border"
                                                    date={state.selectedDate || new Date()}
                                                    onChange={handleSelect}
                                                />
                                            </div>

                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    Time
                                    <div className="flex flex-row items-center gap-1">
                                        <Input
                                            customClass={classNames('bg-[#1e2021] w-[10rem] text-white focus:outline-none  border border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')} placeholder="00:00 (HH:MM)"
                                            value={state.hourMinutes}
                                            handleChange={handleTimeChange}
                                            onBlur={onBlur}
                                        />
                                        <MultiSelect
                                            options={scheduleTime}
                                            standards={scheduleTime.filter(item => item.value === state.timeValue)}
                                            disabled={false}
                                            handleChange={(e) => handleSelectChange(e, 'timeValue')}
                                            isMulti={false}
                                            placeholder={"Select "}
                                            className='w-[10rem] border border-[#424242] rounded'
                                            classNamePrefix="rules-select-custom"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-base">
                                    Repeat this monitor every
                                    <div className="flex flex-row items-center gap-3 w-1/2">
                                        <Input type="number"
                                            min={1}
                                            customClass={classNames('w-[10rem] bg-[#1e2021] text-white focus:outline-none  border border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')}
                                            placeholder="Enter Value"
                                            handleChange={(e) => handleFrequencyBreachChange(e, 'frequency')}
                                            value={state.frequency}
                                        />
                                        <MultiSelect
                                            options={repeateMonitor}
                                            standards={repeateMonitor.filter(item => item.value === state.monitorFrequency)}
                                            disabled={false}
                                            handleChange={(e) => handleSelectChange(e, 'monitorFrequency')}
                                            isMulti={false}
                                            placeholder={"Select"}
                                            className=' w-[15rem] border border-[#424242] rounded'
                                            classNamePrefix="rules-select-custom"
                                        />
                                    </div>
                                </div >
                                {state.warning.frequency && <p className="px-[12rem] text-sm text-errorTextColor">Please enter a value to repeat monitor</p>}
                                <div className="flex flex-row items-center gap-1 text-[#777]">
                                    <AiOutlineInfoCircle className="w-3 h-3" />
                                    <span className="text-xs">
                                        "Repeat monitor" field only accepts positive values
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky justify-end bottom-0 mx-1 flex flex-row gap-3  mb-4 px-10 py-3">
                <div className="flex w-26">
                    <Button text="Save and Next" handleSubmit={handleSubmit} className="text-xl border border-[#f59404] bg-[#efb053] text-black hover:bg-[#f59404] h-[2.2rem] flex items-center" />
                </div>
            </div>
        </div>
    );
}
export default React.memo(DQBase);