/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { serviceState, updateConfigure } from "store";
import { mySqlFields, snowFlakeFields, multiLevelFields } from "../constants";
import Input from "core-modules/Input";
import LabelField from "core-modules/LabelField";
import { IoIosAdd } from 'react-icons/io';
import deletIcon from 'assets/images/deletIcon.svg'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';


const ConnectionDetails = ({ warning, setWarning }) => {
    let stateData = useSelector(serviceState);
    const { configure: state, service: { selectedService } } = stateData;
    const dispatch = useDispatch();
    const formFields = selectedService === 'mysql' ? mySqlFields : snowFlakeFields;
    const [showPassword, setShowPassword] = useState({
        password: false,
        privateKey: false,
        snowflakePassphraseKey: false,
    })

    useEffect(() => {
        let { connectionName } = state;
        dispatch(updateConfigure({ key: 'connectionName', value: connectionName || 'MYSQL' }))
    }, [])

    const handleChange = ({ target: { id, name, value } }, statekey = '') => {
        setWarning({...warning, [`${name}Warning`]: false })
        if (statekey) {
            let connectionArray = [...state[statekey]];
            connectionArray[id] = { ...connectionArray[id], [name]: value }
            dispatch(updateConfigure({ key: statekey, value: connectionArray }))
        } else
            dispatch(updateConfigure({ key: name, value }))
    }

    const handleAdd = (remove, statekey) => {
        let connectionArray = [...state[statekey]];
        if (remove)
            connectionArray.splice(remove, 1);
        else
            connectionArray.unshift({ key: '', value: '' })
        dispatch(updateConfigure({ key: statekey, value: connectionArray }))
    }

    return (
        <div className="px-10 pb-5">
            {formFields.map(field =>
                <div className="flex flex-col" key={field.id}>
                    <div className="flex flex-col relative">
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
                            value={state[field.name]}
                            placeholder={field.placeholder}
                            type={field.type === 'password' ? (showPassword[field.name] ? 'text' : 'password') : 'text'}
                            handleChange={handleChange}
                            customClass={`bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border h-[2.4rem] px-2 w-full rounded mt-2 placeholder:text-[#808080] placeholder:text-sm border ${warning[`${field.name}Warning`] ? 'border-[#e26b6b]' : 'border-[#808080]'}`} />
                        {field.type === 'password' &&
                            <span
                                className="absolute"
                                onClick={() => setShowPassword({ ...showPassword, [field.name]: !showPassword[field.name] })}
                                style={{
                                    color: 'white',
                                    right: '10px',
                                    bottom: warning[`${field.name}Warning`] ? '35px' : '15px',
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
                        {warning[`${field.name}Warning`] && <p className="text-[#e26b6b] text-sm"> {field.warningText} </p>}
                    </div>
                </div>
            )}
            {selectedService === 'mysql' && <div className="flex flex-col relative">
                <LabelField
                    title="Host and port"
                    className="font-RakutenSemibold text-[16px] mt-7"
                    mandotory={true}
                    astrickClass="after:content-['*'] after:text-[#f59600] after:ml-4"
                    customStyle={{ fontSize: '16px' }}
                />
                <div className="flex">
                    <div className="basis-[50%] ">
                        <Input
                            name='host'
                            value={state.host || ''}
                            placeholder='Enter host'
                            handleChange={handleChange}
                            customClass={`bg-[#2d3032] border-r-0 focus:outline-none focus:border-[#B9B6B6] border h-[2.4rem] px-2 w-full rounded-r-none mt-2 placeholder:text-[#808080] placeholder:text-sm border ${warning[`hostWarning`] ? 'border-[#e26b6b]' : 'border-[#808080]'}`}
                        />
                        {warning[`hostWarning`] && <p className="text-[#e26b6b] text-sm"> Port is required field </p>}
                    </div>
                    <div className="basis-[50%]">
                        <div className="basis-[50%]">
                            {false && <span className="absolute text-[#707070] z-[100] bottom-8"> | </span>}
                            <Input
                                name='port'
                                value={state.port || ''}
                                placeholder='Enter port'
                                handleChange={handleChange}
                                customClass={`bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border h-[2.4rem] px-2 w-full rounded-l-none mt-2 placeholder:text-[#808080] placeholder:text-sm border ${warning[`portWarning`] ? 'border-[#e26b6b]' : 'border-[#808080]'}`}
                            />
                            {warning[`portWarning`] && <p className="text-[#e26b6b] text-sm"> Host is required field </p>}
                        </div>
                    </div>
                </div>
            </div>}
            {multiLevelFields.map(field =>
                <div key={field.id}>
                    <LabelField
                        title={field.label}
                        className="font-RakutenSemibold text-[16px] mt-7"
                        customStyle={{ fontSize: '16px' }}
                    />
                    <small className="text-[#777] block -mt-1 text-sm"> {field.helpText} </small>
                    {state[field.name].map((connection, index) =>
                        <div className="flex justify-between items-center" key={index + 'key'}>
                            <Input
                                id={index}
                                name='key'
                                value={connection.key || ''}
                                placeholder='Enter key'
                                handleChange={(e) => handleChange(e, field.name)}
                                customClass={`bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded mt-2 placeholder:text-[#808080] placeholder:text-sm border basis-[44%]`}
                            />
                            <Input
                                id={index}
                                name='value'
                                value={connection.value || ''}
                                placeholder='Enter value'
                                handleChange={(e) => handleChange(e, field.name)}
                                customClass={`bg-[#2d3032] focus:outline-none focus:border-[#B9B6B6] border border-[#808080] h-[2.4rem] px-2 w-full rounded mt-2 placeholder:text-[#808080] placeholder:text-sm border basis-[44%]`}
                            />
                            <div
                                title={index === 0 ? 'Add' : 'Delete'}
                                className={`flex items-center justify-center basis-[5%] cursor-pointer bg-[${index === 0 ? '#f59600' : ''}] rounded h-[2.4rem] hover:bg-[${index === 0 ? '#bc7709' : ''}]`} onClick={() => handleAdd(index, field.name)}> {index === 0 ? <IoIosAdd style={{ color: "black", height: '35px', width: '25px' }} /> : <img src={deletIcon} alt="deletIcon" className="h-4 w-4" />} </div>
                        </div>
                    )}
                </div>
            )}
        </div >
    )
}
export default ConnectionDetails;