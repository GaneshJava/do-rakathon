/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Input from "core-modules/Input";
import classNames from "classnames";
import '../../monitors/monitors.css';
import Button from "core-modules/Button";
import {
    changeTypeOption,
    severityOption,
    scheduleTime,
    repeateMonitor,
    setVolumeMonitor,
    INCREASES,
    DECREASES,
    BETWEEN
} from '../reducers';
import RadioButton from "core-modules/RadioButton";
import { Calendar } from 'react-date-range';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FRESHNESS, SCHEMA_CHANGE, VOLUME } from "_DO-1.0/reducers";
import { saveAssetsForMonitor } from "store";
import MultiSelect from "core-modules/Selectlist";
import { customToaster } from "helpers";

const ConfigureTableMonitor = ({ tenantId, connId, selectedEventType, configureData, getAssetListForMonitor }) => {
    const [validationError, setValidationError] = useState('');
    const calenderRef = useRef(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        type: selectedEventType,
        severity: '',
        monitorFrequency: 'hours',
        setBreachTime: '',
        setVolumeMonitor: '',
        tableSize: 'rows',
        isOpen: false,
        showCalendar: false,
        //....
        frequency: 1,
        selectedDate: new Date(),
        breachValue: null,
        volumeMinValue: '',
        volumeMaxValue: '',
        volumeValue: '',
        breachFrequency: 'minutes',
        ...getCurrentTime12hr()
    });

    useEffect(() => {
        document.addEventListener('click', closeDatePicker, true);
        return () => document.removeEventListener('click', closeDatePicker)
    }, [])

    const closeDatePicker = (e) => {
        if (calenderRef.current && !calenderRef.current.contains(e.target)) {
            toggleCustomDate(false);
        }
    };



    const toggleCustomDate = (show) => setOpen(show);


    const handleSubmit = async (e) => {
        setValidationError('');
        if (!validateFields()) {
            return;
        }
        try {
            const postData = getPostData();
            const response = await dispatch(saveAssetsForMonitor(postData)).unwrap();
            console.log("Table level monitor save response:", response);
            if (response.status === 200) {
                customToaster('success', 'Monitor saved successfully');
                getAssetListForMonitor()
            }
        } catch (error) {
            customToaster('error', 'Error occured while saving monitor');
        }
    };

    const validateFields = () => {
        if (!state.monitorName || !state.severity || !state.frequency) {
            setValidationError('This field is mandatory');
            return false;
        }
        setValidationError('');
        return true;
    };

    const getPostData = () => {
        return {
            monitorName: state.monitorName,
            frequency: getCronExpression(state.monitorFrequency, state.frequency),
            description: state.monitorDesc,
            isActive: true,
            tenantId: tenantId,
            connId: connId,
            rulesConfigured: getRuleConfigDataForSelectedAssets()
        }
    }

    const getRuleConfigDataForSelectedAssets = () => {
        let rulesConfiguredData = [];
        let selectedAssets = configureData?.selectedFields ?? [];
        selectedAssets.forEach(item => {
            rulesConfiguredData.push({
                ruleId: "",
                ruleType: state.type,
                ruleSubType: getRuleSubTypeBasedOnType(),
                pillar: state.type,
                entityLevel1: item.entity_level_1,
                entityLevel2: item.entity_level_2,
                entityLevel3: item.entity_level_3,
                level: "entity_level_3",
                config: getConfigBasedOnType(),
                severity: state.severity
            })
        })
        return rulesConfiguredData;
    }

    const getConfigBasedOnType = () => {
        let config = {};
        if (selectedEventType === FRESHNESS) {
            config = {
                min_value: convertBreachValueIntoHours()
            }
        }
        if (selectedEventType === VOLUME) {
            if (state.setVolumeMonitor === INCREASES) {
                config = {
                    min_value: state.volumeValue
                };
            } else if (state.setVolumeMonitor === DECREASES) {
                config = {
                    max_value: state.volumeValue
                };
            }
            else {
                config = {
                    min_value: state.volumeMinValue,
                    max_value: state.volumeMaxValue
                }
            }
    }
    return JSON.stringify(config);
}

const getRuleSubTypeBasedOnType = () => {
    if (selectedEventType === FRESHNESS) {
        return "expect_change_in_freshness_to_be_lesser_than";
    } else if (selectedEventType === VOLUME) {
        if (state.tableSize === 'rows') {
            switch (state.setVolumeMonitor) {
                case INCREASES:
                    return "expect_change_in_row_count_to_be_greater_than";
                case DECREASES:
                    return "expect_change_in_row_count_to_be_lesser_than";
                case BETWEEN:
                    return "expect_change_in_row_count_to_be_between";
                default:
                    return null;
            }
        } else {
            switch (state.setVolumeMonitor) {
                case INCREASES:
                    return "expect_change_in_size_to_be_greater_than";
                case DECREASES:
                    return "expect_change_in_size_to_be_lesser_than";
                case BETWEEN:
                    return "expect_change_in_size_to_be_between";
                default:
                    return null;
            }
        }
    }
};

const convertBreachValueIntoHours = () => {
    const { breachFrequency, breachValue } = state;
    if (breachFrequency === 'minutes')
        return Number(breachValue) / 60;
    if (breachFrequency === 'days')
        return Number(breachValue) * 24;
    else
        return breachValue;
}

const handleSelect = (date) => {
    setState({ ...state, selectedDate: date });
    toggleCustomDate(false)
}

const handleRadioClick = (selectedRadio, field, value) => {
    setState({ ...state, tableSize: selectedRadio })
};

const handleSelectChange = (e, key) => {
    let frequency = state.frequency || 0;
    let breachValue = state.breachValue || 0;
    const value = e.value;
    if (key === 'monitorFrequency')
        frequency = getValidValue(value, frequency);
    if (key === 'breachFrequency')
        breachValue = getValidValue(value, breachValue);
    setState({ ...state, [key]: value, frequency, breachValue })
}

const handleFrequencyBreachChange = ({ target }, key) => {
    let value = target.value;
    let valueTemp = Number(value);
    if (key === 'frequency') {
        const monitorFrequency = state.monitorFrequency;
        if (monitorFrequency) {
            value = getValidValue(monitorFrequency, valueTemp)
        }
    } else {
        const breachFrequency = state.breachFrequency;
        if (breachFrequency) {
            value = getValidValue(breachFrequency, valueTemp)
        }
    }
    setState({ ...state, [key]: value })
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
    <div className="monitor-form py-7 bg-[#18181b] ">
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
                <span className="mb-[8px]">Severity</span>
                <MultiSelect
                    options={severityOption}
                    standards={severityOption.filter(item => item.value === state.severity)}
                    disabled={false}
                    handleChange={(e) => handleSelectChange(e, 'severity')}
                    isMulti={false}
                    placeholder={"Select Value"}
                    className='w-full border border-[#424242] rounded'
                    classNamePrefix="rules-select-custom"
                />
                {validationError && <p className="pt-[4px] text-sm text-red-600">Please select severity</p>}
            </div>
            {selectedEventType === SCHEMA_CHANGE && ''}
            {(selectedEventType === FRESHNESS || selectedEventType === VOLUME) && <div>
                Breach Threshold
                <div className="bg-[#292929] p-6 rounded-md flex gap-4 flex-col mt-[8px]">
                    <>
                        {selectedEventType === FRESHNESS &&
                            <div className="flex flex-col gap-3 ">
                                <span>Notify when the table does not update within the last</span>
                                <div className="flex  items-center gap-3 w-[25rem]">
                                    <Input
                                        customClass={classNames('bg-[#1e2021] text-white focus:outline-none  border border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')}
                                        placeholder="Enter Value"
                                        type="number"
                                        min={1}
                                        value={state.breachValue}
                                        handleChange={(e) => handleFrequencyBreachChange(e, 'breachValue')}
                                    />
                                    <MultiSelect
                                        options={repeateMonitor}
                                        standards={repeateMonitor.filter(item => item.value === state.breachFrequency)}
                                        disabled={false}
                                        handleChange={(e) => handleSelectChange(e, 'breachFrequency')}
                                        isMulti={false}
                                        placeholder={"Select"}
                                        className=' w-full border border-[#424242] rounded'
                                        classNamePrefix="rules-select-custom"
                                    />
                                </div>
                                {validationError && <p className="text-sm text-red-600">Please enter breach frequency</p>}
                            </div>
                        }
                    </>
                    <>
                        {selectedEventType === VOLUME &&
                            <div className="flex flex-col gap-4 ">
                                <div className="flex flex-row gap-4">
                                    <span>Notify when the change in table volume  </span>
                                    <RadioButton
                                        handleRadioClick={handleRadioClick}
                                        checked={state.tableSize === 'rows'}
                                        label="Rows"
                                        value="rows"
                                        className=""
                                        customStyle={{ fontSize: "16px" }}
                                    />
                                    <RadioButton
                                        handleRadioClick={handleRadioClick}
                                        checked={state.tableSize === 'bytes'}
                                        label="Bytes"
                                        className=""
                                        value="bytes"
                                        customStyle={{ fontSize: "16px" }}
                                    /></div>
                                <div className="flex items-center justify-between gap-3">
                                    <MultiSelect
                                        options={setVolumeMonitor}
                                        standards={setVolumeMonitor.filter(item => item.value === state.setVolumeMonitor)}
                                        disabled={false}
                                        handleChange={(e) => handleSelectChange(e, 'setVolumeMonitor')}
                                        isMulti={false}
                                        placeholder={"Select"}
                                        className='w-[20rem] border border-[#424242] rounded'
                                        classNamePrefix="rules-select-custom"
                                    />
                                    {state.setVolumeMonitor === 'is_between' &&
                                        <div className="flex flex-row gap-3 w-full">
                                            <Input type="number"
                                                min={1}
                                                customClass={classNames('bg-[#1e2021] w-[20rem]  text-white focus:outline-none  border border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')}
                                                placeholder="Enter Min Value "
                                                value={state.volumeMinValue}
                                                handleChange={({ target }) => setState({ ...state, volumeMinValue: target.value })}
                                            />
                                            {validationError && <p className="text-sm text-red-600">Please enter breach frequency</p>}
                                            <Input
                                                type="number"
                                                min={1}
                                                customClass={classNames('bg-[#1e2021] w-[20rem]  text-white focus:outline-none  border border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')}
                                                placeholder="Enter Max Value "
                                                value={state.volumeMaxValue}
                                                handleChange={({ target }) => setState({ ...state, volumeMaxValue: target.value })}
                                            />
                                            {validationError && <p className="text-sm text-red-600">Please enter breach frequency</p>}
                                        </div>
                                    }
                                    {state.setVolumeMonitor !== 'is_between' &&

                                        <Input
                                            type="number"
                                            min={1} customClass={classNames('bg-[#1e2021] w-[30rem] text-white focus:outline-none focus:border-[#B9B6B6] border border-[#424242] rounded placeholder:text-[#808080] placeholder:text-sm border')} placeholder="Enter Value"
                                            value={state.volumeValue}
                                            handleChange={({ target }) => setState({ ...state, volumeValue: target.value })} />

                                    }
                                </div>
                            </div>
                        }
                    </>

                </div>
            </div>}
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
                        {validationError && <p className="px-[12rem] text-sm text-red-600">Please enter a value to repeat monitor</p>}
                        <div className="flex flex-row items-center gap-1 text-[#777]">
                            <AiOutlineInfoCircle className="w-3 h-3" />
                            <span className="text-xs">
                                "Repeat monitor" field only accepts positive values
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                Monitor Name
                <Input
                    handleChange={({ target }) => setState({ ...state, monitorName: target.value })}
                    value={state.monitorName}
                    customClass={classNames('bg-[#1e2021] text-white focus:outline-none  border border-[#424242] h-[2.4rem] w-full rounded placeholder:text-[#808080] placeholder:text-sm border mt-[8px]')}
                    placeholder="Enter Rule Name" />
                {validationError && <p className="text-sm text-red-600">Please enter monitor name</p>}
            </div>
            <div className="flex flex-col">
                Monitor Description
                <Input
                    type="textarea"
                    handleChange={({ target }) => setState({ ...state, monitorDesc: target.value })}
                    value={state.monitorDesc}
                    placeholder="Add your monitor description"
                    customClass={classNames('bg-[#1e2021] text-white  border border-[#424242] px-2 w-full rounded placeholder:text-[#808080] placeholder:text-sm border',
                        false && 'border-errorTextColor', 'h-[7rem]')}
                />
            </div>
            <div className="sticky justify-end bottom-0 mx-1 flex flex-row gap-3  mb-4 py-3">
                <div className="flex w-26">
                    <Button text="Save" handleSubmit={handleSubmit} className="text-xl border border-[#f59404] bg-[#efb053] text-black hover:bg-[#f59404] h-[2.2rem] flex items-center" />
                </div>
            </div>
        </div>
    </div>

)
}

export const getCronExpression = (monitorFrequency, frequency) => {
    let cronExpressionObject = {
        seconds: "0",
        minutes: "*",
        hours: "*",
        dayOfMonth: "*",
        month: "*",
        dayOfWeek: "?",
        year: "*"
    };

    if (monitorFrequency === 'minutes') {
        cronExpressionObject.minutes = `*/${frequency}`;
    } else if (monitorFrequency === 'hours') {
        cronExpressionObject.minutes = "0";
        cronExpressionObject.hours = `*/${frequency}`;
    } else if (monitorFrequency === 'day') {
        cronExpressionObject.seconds = "0";
        cronExpressionObject.minutes = "0";
        cronExpressionObject.hours = "0";
        cronExpressionObject.dayOfMonth = `*/${frequency}`;
    }
    return cronExpressionObject;
}

export function getCurrentTime12hr() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
    return {
        hourMinutes: `${hours}:${minutes}`,
        timeValue: ampm
    }
}

export const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
};

export const getValidValue = (key, value) => {
    if (key === 'minutes' && value > 59)
        value = 59
    if (key === 'hours' && value > 23)
        value = 23
    if (key === 'days' && value > 31)
        value = 31
    return value;
}




export default ConfigureTableMonitor;