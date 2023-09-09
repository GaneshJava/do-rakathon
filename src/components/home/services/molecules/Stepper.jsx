import React from 'react';
import { steps, DEFAULT_STEP } from '../constants';
import rightIcon from 'assets/images/tickmarkIcon.svg'

const Stepper = ({
    complete,
    currentStep = DEFAULT_STEP
}) => {
    return (
        <div className='stepper flex w-full items-center'>
            <div className="flex w-full justify-between">
                {steps.map(step =>
                    <div
                        key={step.key}
                        className={`step-item relative w-full flex flex-col items-center ${currentStep === step.id && "active"} ${(step.id < currentStep || complete) && "complete"}`}>
                        <div className="step">
                            {step.id < currentStep || complete ? <img src={rightIcon} alt="?"/> : ''}
                        </div>
                        <p className="text-sm my-3">{step.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;