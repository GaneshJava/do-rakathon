let stateData;
let currentStep;
let currentStepData = {};
let warningObj = {};
let proceed = true;

let commonConfigureRequiredFields = [
    'name',
    'connectionName',
    'userName',
    'password',
];

const mysqlMandatoryFields = [ 'host', 'port' ];
const snowFlakeMandatoryFields = [ 'account', 'role', 'wareHouse', 'privateKey', 'snowflakePassphraseKey' ];

const proceedToNextStep = (state, dispatcher) => {
    stateData = state;
    currentStep = state.currentStep;
    currentStepData = getCurrentStepData(state);
    validateMandatoryFields();
    return {proceed, warningObj};
}


const getCurrentStepData = (state) => {
    return currentStep >= 3 ? state.configure : state.service;
}

const validateMandatoryFields = () => {
    if([1, 2].includes(currentStep))
        basicStepValidation()
    else 
        configureStepValidation();
}

const basicStepValidation = () => {
    const { selectedService, name } = currentStepData;
    if(currentStep === 1) {
        proceed = selectedService && selectedService.length ? true : false;
        warningObj['selectedServiceWarning'] = !proceed;
    }
    else {
        proceed = name && name.length ? true : false;    
        warningObj['nameWarning'] = !proceed;
    }
}

const configureStepValidation = () => {
    const requiredFields = [...commonConfigureRequiredFields, 
        ...stateData?.service?.selectedService === 'mysql' ? mysqlMandatoryFields : snowFlakeMandatoryFields ];
    let focus = false;
    requiredFields.forEach(field => {
        if(!currentStepData[field]) {
            if(!focus) {
                document.getElementById(field).focus();
                focus = true;
            }
            warningObj[`${field}Warning`] = true;
            proceed = !proceed ? proceed : false;
        } else warningObj[`${field}Warning`] = false;
    })
}

export const validate = {
    proceedToNextStep
}
