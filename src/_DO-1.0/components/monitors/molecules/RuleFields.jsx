import classNames from "classnames";
import Input from "core-modules/Input";
import LabelField from "core-modules/LabelField";
import MultiSelect from "core-modules/Selectlist";
import React from "react"
import { handleSelectionUpdates, NUMERIC, ruleGroupsOptions, SELECT, TEXT_AREA, TEXT_FIELD } from "../reducers/ruleReducer";
import {
    ruleGroupsControlFields,
    ruleDropDownOptions
} from "../reducers/ruleReducer";

const RuleFields = ({
    handleRuleTypeSelect,
    ruleData,
    ruleKey,
    ruleConfigIndex,
    state,
    setState
}) => {
    const controlFields = ruleGroupsControlFields[ruleData?.ruleGroup];


    const getControlInputElement = (field) => {
        const { component, value, required, isMulti } = field;
        if (component === SELECT) {
            return <MultiSelect
                id='rule-select'
                options={getOptionsBasedOnField(value)}
                standards={getOptionsBasedOnField(value)?.filter(item => isMulti ? (ruleData?.[value]).includes(item.value) : (item.value === (ruleData?.[value])))}
                disabled={false}
                handleChange={(e) => handleSelectChange(e, field, isMulti)}
                isMulti={isMulti}
                placeholder={"Select Value"}
                className='flex-1 w-full'
                classNamePrefix="rules-select-custom"
            />
        } else if ([TEXT_FIELD, TEXT_AREA, NUMERIC].includes(component)) {
            let attributes = {
                handleChange: ({ target }) => handleTextInput(target, field),
                customClass: classNames('bg-[#1e2021] text-white focus:outline-none focus:border-[#B9B6B6] border-none border-[#808080] px-2 w-full rounded placeholder:text-[#808080] placeholder:text-sm border',
                    false && 'border-errorTextColor', component !== TEXT_AREA ? 'h-[2.8rem]' : 'min-h-[7rem]'),
                name: value,
                value: ruleData?.[value],
                type: component,
                isRequired: required,
                placeholder: field.placeholder
            }
            return <>
                <Input {...attributes} />
                {false && <p className="text-errorTextColor text-sm"> {field.warningText} </p>}
            </>
        }
    }

    const getOptionsBasedOnField = (value) => {
        return ruleDropDownOptions?.[ruleData.ruleGroup]?.[value];
    }

    const handleSelectChange = (e, field, multiSelect = false) => {
        const value = multiSelect ? e.map(val => val.value) : e.value;
        let setObj = { ...state };
        setObj = handleSelectionUpdates(setObj, value, ruleKey, ruleConfigIndex);
        setObj.ruleData[ruleKey][ruleConfigIndex][field.value] = value;
        setState(setObj);
    }

    const handleTextInput = (target, field) => {
        updateRuleDataState(field.value, target.value)
    }

    const updateRuleDataState = (key, value) => {
        let setObj = { ...state };
        setObj.ruleData[ruleKey][ruleConfigIndex][key] = value;
        setState(setObj);
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="font-RakutenSemibold text-[16px]"> Rule Type </p>
            <MultiSelect
                id='rule-select'
                key={'rule_index'}
                options={ruleGroupsOptions}
                standards={ruleGroupsOptions.filter(item => item.value === (ruleData?.ruleGroup))}
                disabled={false}
                handleChange={(e) => handleRuleTypeSelect(e, ruleKey, ruleConfigIndex)}
                isMulti={false}
                placeholder={"Select Rule Type"}
                className={`${true ? 'flex-1 w-full' : 'w-[40%]'}`}
                classNamePrefix="rules-select-custom"
            />
            <div className="flex w-full flex-wrap">
                {controlFields?.map(parentField => {
                    const dependentField = ruleData.dependentKey ? parentField?.[ruleData.dependentKey] : parentField?.[ruleData?.ruleName];
                    if (!parentField.value && !dependentField) {
                        return null;
                    }
                    const arrayOfFields = dependentField || [parentField];
                    return arrayOfFields.map(field =>
                        <div key={`control_${field.id}`} className={`my-2 flex flex-col gap-2 ${field.fieldClass}`} >
                            <LabelField
                                title={field.label}
                                mandotory={field.required}
                                className="font-RakutenSemibold text-[16px]"
                                astrickClass="after:content-['*'] after:text-[#f59600]"
                                customStyle={{ fontSize: '16px' }}
                                informationText={field.informationText}
                            />
                            {field.helpText && <small className="text-[#777] block -mt-3 text-sm"> {field.helpText} </small>}
                            {getControlInputElement(field)}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default React.memo(RuleFields)