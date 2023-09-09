import React, { useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import { mySqlFields, azureFields, multiLevelFields } from "components/home/services/constants";
import Input from "core-modules/Input";
import LabelField from "core-modules/LabelField";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import deletIcon from 'assets/images/deletIcon.svg'
import classNames from "classnames";
import { validateFormFields } from "../reducers";

const SourceForm = ({ state, setState }) => {
    const { warning = {}, selectedDataSource = '' } = state;
    const formFields = selectedDataSource === 'mysql' ? mySqlFields : azureFields;

    const [showPassword, setShowPassword] = useState({
        password: false,
        privateKey: false,
        snowflakePassphraseKey: false,
    })

    const handleChange = ({ target: { id, name, value } }, statekey = '') => {
        let setObj = { ...state };
        if (statekey) {
            let connectionArray = [...state[statekey]];
            connectionArray[id] = { ...connectionArray[id], [name]: value };
            setObj[statekey] = connectionArray;
        } else  
            setObj[name] = value;
        //REMOVE WARNING AND CHECK ALL REQUIRED FIELDS FILLED OR NOT    
        setObj.warning[name] = false;
        const { proceed } = validateFormFields({...setObj});
        setObj.currentStep = proceed ? 3 : 2;
        console.log(setObj);
        setState(setObj);
    }

    const handleAdd = (remove, statekey) => {
        let setObj = { ...state };
        let connectionArray = [...setObj[statekey]];
        if (remove)
            connectionArray.splice(remove, 1);
        else
            connectionArray.unshift({ key: '', value: '' })
        setObj[statekey] = connectionArray;
        setState(setObj);
    }

    return (
        <div id="set-datasourcevalues" className={`flex flex-col ease-in-out duration-300 ${state.selectedDataSource ? 'h-auto translate-x-0' : '-translate-x-[200rem] max-h-0 opacity-0'}`}>
            <Fieldset legend="Set Values" className="mt-2 p-6 datasource-fieldset">
                <div className="flex flex-col w-full">
                    <div className="flex flex-wrap w-full">
                        {formFields.map(field =>
                            <div key={field.name} className={`${field.className} mr-10 relative`}>
                                <LabelField
                                    title={field.label}
                                    mandotory={field.required}
                                    className="font-RakutenSemibold text-[16px] mt-7"
                                    astrickClass="after:content-['*'] after:text-[#f59600]"
                                    customStyle={{ fontSize: '16px' }}
                                    informationText={field.informationText}
                                />
                                {field.helpText && <small className="text-[#777] block -mt-1 text-sm"> {field.helpText} </small>}
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={state[field.name] || ''}
                                    placeholder={field.placeholder}
                                    type={field.type === 'password' ? (showPassword[field.name] ? 'text' : 'password') : 'text'}
                                    handleChange={handleChange}
                                    customClass={classNames('bg-[#2d3032] text-white focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded mt-2 placeholder:text-[#808080] placeholder:text-sm border',
                                        warning[field.name] && 'border-errorTextColor')} />
                                {field.type === 'password' &&
                                    <span
                                        className="absolute"
                                        onClick={() => setShowPassword({ ...showPassword, [field.name]: !showPassword[field.name] })}
                                        style={{
                                            color: 'white',
                                            right: '10px',
                                            bottom: warning[field.name] ? '35px' : '15px',
                                            zIndex: 100,
                                            cursor: 'pointer'
                                        }}>
                                        {' '}
                                        {showPassword[field.name] ? (
                                            <BsFillEyeFill className="force-skyblue" />
                                        ) : (
                                            <BsFillEyeSlashFill className="force-skyblue" />
                                        )}{' '}
                                    </span>
                                }
                                {warning[field.name] && <p className="text-errorTextColor text-sm"> {field.warningText} </p>}
                            </div>
                        )}
                    </div>
                    {/* -- */}
                    {selectedDataSource === 'mysql' && <div className="flex flex-col relative">
                        <LabelField
                            title="Host and port"
                            className="font-RakutenSemibold text-[16px] mt-7"
                            mandotory={true}
                            astrickClass="after:content-['*'] after:text-[#f59600] after:ml-4"
                            customStyle={{ fontSize: '16px' }}
                        />
                        <div className="flex">
                            <div className="basis-[37%] ">
                                <Input
                                    name='host'
                                    value={state.host || ''}
                                    placeholder='Enter host'
                                    handleChange={handleChange}
                                    customClass={classNames('bg-[#2d3032] text-white border-r-0 focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded-r-none mt-2 placeholder:text-[#808080] placeholder:text-sm border',
                                        warning.host && 'border-errorTextColor')}
                                />
                                {warning.host && <p className="text-errorTextColor text-sm"> Host is required field </p>}
                            </div>
                            <div className="basis-[38%]">
                                <div className="basis-[50%]">
                                    {false && <span className="absolute text-[#707070] z-[100] bottom-8"> | </span>}
                                    <Input
                                        name='port'
                                        value={state.port || ''}
                                        placeholder='Enter port'
                                        handleChange={handleChange}
                                        customClass={classNames('bg-[#2d3032] text-white focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded-l-none mt-2 placeholder:text-[#808080] placeholder:text-sm border',
                                            warning.port && 'border-errorTextColor')}
                                    />
                                    {warning.port && <p className="text-errorTextColor text-sm"> Port is required field </p>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {/* --- */}
                    <div>
                        {multiLevelFields[selectedDataSource]?.map(field =>
                            <div key={field.id}>
                                <LabelField
                                    title={field.label}
                                    className="font-RakutenSemibold text-[16px] mt-7"
                                    customStyle={{ fontSize: '16px' }}
                                />
                                <small className="text-[#777] block -mt-1 text-sm"> {field.helpText} </small>
                                {state[field.name]?.map((connection, index) =>
                                    <div className="w-[82%] flex justify-between items-center" key={index + 'key'}>
                                        {selectedDataSource === 'mysql' && <Input
                                            id={`${field.name}_key_${index}`}
                                            name='key'
                                            value={connection.key || ''}
                                            placeholder='Enter key'
                                            handleChange={(e) => handleChange(e, field.name)}
                                            customClass={`text-white bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded mt-2 placeholder:text-[#808080] placeholder:text-sm border basis-[44%]`}
                                        />}
                                        <Input
                                            id={`${field.name}_value_${index}`}
                                            name='value'
                                            value={connection.value || ''}
                                            placeholder='Enter value'
                                            handleChange={(e) => handleChange(e, field.name)}
                                            customClass={classNames('text-white bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded mt-2 placeholder:text-[#808080] placeholder:text-sm border',
                                                selectedDataSource === 'mysql' ? 'basis-[44%]' : 'basis-[92%]')}
                                        />
                                        <div
                                            title={index === 0 ? 'Add' : 'Delete'}
                                            className={`flex items-center justify-center basis-[5%] cursor-pointer bg-[${index === 0 ? '#f59600' : ''}] rounded h-[2.4rem] hover:bg-[${index === 0 ? '#bc7709' : ''}]`}
                                            onClick={() => handleAdd(index, field.name)}>
                                            {index === 0 ?
                                                <IoIosAdd style={{ color: "black", height: '35px', width: '25px' }} />
                                                :
                                                <img src={deletIcon} alt="deletIcon" className="h-4 w-4" />} </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Fieldset>
        </div>
    );
}
export default React.memo(SourceForm)