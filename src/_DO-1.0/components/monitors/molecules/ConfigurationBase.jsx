/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import SelectConfiguration from "./SelectConfiguration";
import closeButton from 'assets/images/close-btn.svg';
import { EMPTY_KEY, FRESHNESS, VOLUME, SCHEMA_CHANGE, DQ_RULES } from "_DO-1.0/reducers";
import { getDrawerTitle } from "../reducers/microFunctions";
import { MdOutlineArrowBack } from 'react-icons/md';
import ConfigureTableMonitor from "./ConfigureTableMonitors";
import DQBase from "./DQBase";
import DQRuleConfiguration from "./DQRuleConfiguration";
import { authState } from "store";
import { useSelector } from "react-redux";
const ConfigurationBase = ({ connId, configureData, setIsOpen, getAssetListForMonitor }) => {
    const { monitorType, selectedEventType } = configureData;
    const { user } = useSelector(authState);
    const [state, setState] = useState({
        selectedEventType,
        step: 1,
    });

    const onSelectMonitor = (eventKey) => {
        setState({ ...state, selectedEventType: eventKey, step: 2 })
    }

    const updateStepChange = (key, stepVal) => {
        setState({
            ...state,
            selectedEventType: key,
            step: state.step + stepVal
        })
    }

    const handleBackClick = () => {
        let currentStep = state.step - 1;
        let eventType = state.selectedEventType === 'fieldLevel' ? DQ_RULES : state.selectedEventType;
        setState({
            ...state,
            step: currentStep,
            selectedEventType: currentStep === 1 ? EMPTY_KEY : eventType
        })
        if (currentStep === 0)
            setIsOpen(false)
    }

    const returnRespectiveComponent = () => {
        const { selectedEventType } = state;
        let propsToComponents = {
            onSelectMonitor,
            monitorType,
            configureData,
            updateStepChange,
            setIsOpen,
            selectedEventType,
            getAssetListForMonitor,
            connId,
            tenantId: user.tenantId
        };
        let component = null;
        if (selectedEventType === EMPTY_KEY) {
            component = <SelectConfiguration {...propsToComponents} />
        } else if ([VOLUME, SCHEMA_CHANGE, FRESHNESS].includes(selectedEventType)) {
            component = <ConfigureTableMonitor  {...propsToComponents} />
        } else if (selectedEventType === DQ_RULES) {
            component = <DQBase  {...propsToComponents} />
        } else if (selectedEventType === 'fieldLevel')
            component = <DQRuleConfiguration {...propsToComponents} />
        return component;
    }

    return (
        <>
            <div className="sticky z-10 top-0 w-full flex justify-between items-center bg-[#2d3032] border-b border-[#6e6e6e] p-4 ">
                <div className="flex gap-2 items-center">
                    <MdOutlineArrowBack size={28} color={'#f59602'} className="cursor-pointer hover:opacity-70" onClick={handleBackClick} />
                    {getDrawerTitle({ ...configureData, selectedEventType: state.selectedEventType === 'fieldLevel' ? DQ_RULES : state.selectedEventType })}
                </div>
                <div className="mr-6">
                    <img
                        className="cursor-pointer hover:opacity-70"
                        title="Close"
                        src={closeButton}
                        alt="close"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    />
                </div>
            </div>
            <div className="overflow-auto">
                {returnRespectiveComponent()}
            </div>
        </>
    );
}

export default React.memo(ConfigurationBase)
