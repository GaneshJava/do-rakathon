import React, { useState } from 'react';
import SelectDataSource from './molecules/SelectDataSource';
import SourceForm from './molecules/SourceForm';
import rightIcon from 'assets/images/tickmarkIcon.svg'
import { addDataSourceSteps, validateFormFields } from './reducers';
import './source.css';

const DataSource = () => {
    const [state, setState] = useState({
        selectedDataSource: '',
        currentStep: 1,
        //------- STATE FOR SAVING SOURCES -----//
        connectionSchema: '',
        userName: '',
        password: '',
        databaseSchema: '',
        host: '',
        port: '',
        connectionOptions: [{ key: '', value: '' }],
        connectionArguments: [{ key: '', value: '' }],
        connectionString: '',
        containers: [{ value: '' }],
        warning: {}
    });

    const handleSave = () => {
        const { warningObj } = validateFormFields({...state});
        setState({...state, warning: warningObj});
    }

    const getStepData = (complete = false, currentStep = 1) => {
        return (
            <div className='shadow-lg shadow-[#141414] sticky -top-8 bg-primaryBgColor z-10 pt-3 stepper flex w-full items-center'>
                <div className="flex w-full justify-between">
                    {addDataSourceSteps.map(step =>
                        <div
                            key={step.key}
                            className={`step-item relative w-full flex flex-col items-center ${currentStep === step.id && "active"} ${(step.id < currentStep || complete) && "complete"}`}>
                            <div className="step">
                                {step.id < currentStep || complete ? <img src={rightIcon} alt="?" /> : ''}
                            </div>
                            <p className="text-sm my-3">{step.name}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className='mx-5 flex flex-col gap-8 relative'>
            {getStepData(false, state.currentStep)}
            <div className='flex flex-col gap-4'>
                <SelectDataSource
                    state={state}
                    setState={setState}
                />
                <SourceForm
                    state={state}
                    setState={setState}
                />
            </div>
            {state.selectedDataSource && <div className='flex flex-row justify-end gap-8'>
                <button
                    className='flex items-center bg-transparent hover:bg-[#f59600] p-3 text-[#f59600] hover:text-[#000] border border-[#f59600] hover:border-transparent rounded'
                > Cancel
                </button>
                <button
                    className='w-20 justify-center flex items-center bg-[#f59600] hover:bg-[#bc7709] text-black p-3 rounded'
                    onClick={handleSave}
                > Save
                </button>
            </div>}
        </div>
    );
}
export default React.memo(DataSource);
