import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { serviceState, updateStep, resetServiceState } from 'store';
import MultiSelectField from 'core-modules/Selectlist';
import Drawer from 'core-modules/Drawer';
import { DEFAULT_STEP, STEPPER_LENGTH } from './constants';
import { validate } from './validate';
import SelectService from './molecules/SelectService';
import Button from 'core-modules/Button';
import '../homescreen.css';
import Stepper from './molecules/Stepper';
import './service.css';
import ConfigurationService from './molecules/ConfigurationService';
import ConnectionDetails from './molecules/ConnectionDetails';
import mysqlLogo from 'assets/images/mysqlLogo.svg';
import snowflakeLogo from 'assets/images/snowflakeLogo.svg';
import LabelField from 'core-modules/LabelField';
import { saveConnection } from 'store';

const FORWARD = 1;
const BACKWARD = -1;
const Components = {
  1: <SelectService />,
  2: <ConfigurationService />,
  3: <ConnectionDetails />,
  4: <ConnectionDetails />
};

const Serviceindex = () => {
  const stateData = useSelector(serviceState);
  const { selectedService = 'mysql' } = stateData.service;
  const currentStep = stateData.currentStep || DEFAULT_STEP;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    service: null,
    isOpen: false,
    complete: false
  })

  const handleSelectChange = (e) => {
    setState({ ...state, service: e });
  }
  const closeServiceDrawer = () => {
    dispatch(resetServiceState());
    setState({ ...state, isOpen: false });
  }

  const handleDrawer = (val) => {
    setState({ ...state, isOpen: val })
  }

  const handleStepChange = async (stepChangeVal) => {
    if (currentStep === STEPPER_LENGTH) {
      let postData = {
        service: stateData.service,
        configure: {
          connectionName: stateData.configure.connectionName,
          userName: stateData.configure.userName,
          password: stateData.configure.password,
          host: stateData.configure.host,
          port: stateData.configure.port,
          databaseSchema: stateData.configure.databaseSchema
        }
      };
      let response = await dispatch(saveConnection(postData)).unwrap();
      let {status, message } = response;
      if(Number(status) === 200) {
        alert(message);
        closeServiceDrawer();
      } 
      else 
        alert('Error while saving connection');  
    }
    let updatedStep = currentStep + stepChangeVal;
    if (stepChangeVal === FORWARD) {
      if (validate.proceedToNextStep(stateData, dispatch)) {
        dispatch(updateStep(updatedStep > 4 ? 4 : updatedStep));
      }
    } else {
      dispatch(updateStep(updatedStep < 1 ? 1 : updatedStep));
    }
  }

  return (
    <div className='flex flex-row gap-4 -mt-3 h-12'>

      <div className='font-RakutenSansUI'>
        <MultiSelectField
          id={9}
          options={[]}
          standards={state.service}
          disabled={false}
          handleChange={handleSelectChange}
          isMulti={false}
          placeholder="All Services"
          classNamePrefix="react-select-custom"
        />
      </div>
      <div>
        <Button handleSubmit={() => handleDrawer(true)} subText='+ ' subTextClass="text-[30px] opacity-75 pr-2" text=" Add Service" className='button-color' />
      </div>

      <Drawer isOpen={state.isOpen} setIsOpen={handleDrawer} title="Add new service" customClass='mt-[6.5rem]' >
        <div className='flex flex-col force-magin-zero'>
          <div className='flex bg-[#181b1e] h-40 text-white px-10'>
            <Stepper
              currentStep={currentStep}
              complete={state.complete}
            />
          </div>
          {currentStep > 1 &&
            <div className="bg-[#131315] flex w-full h-[6.3rem] px-10 py-4 ">
              <div className="bg-[#fff4e5] flex rounded w-[4.5rem] h-[4.5rem] px-2 py-2">
                <img src={selectedService === 'mysql' ? mysqlLogo : snowflakeLogo} alt="?" />
              </div>
              <div className="px-3 mt-6">
                <LabelField
                  title={selectedService === 'mysql' ? 'MySQL Configuration' : 'Snowflake Configuration'}
                  className="font-RakutenSemibold"
                  customStyle={{ fontSize: '16px' }}
                />
                <LabelField
                  title={selectedService === 'mysql' ? 'Mysql service configuration details' : 'Snowflake service configuration details'}
                  className="font-RakutenRegular -mt-[0.5rem]"
                  customStyle={{ fontSize: '14px', color: '#959595' }}
                />
              </div>
            </div>
          }
          <div className='flex flex-col bg-[#2d3032] text-white  overflow-y-auto'>
            <div className='min-h-[49vh] max-h-[50vh]'>
              {Components[currentStep]}
            </div>
          </div>
          <div className='bg-[#2d3032] footer-shadow h-[5.5rem] py-2 text-white mb-28'>
            <div className='flex justify-between footer-shadow h-[4rem] py-3 px-10 border-t border-[#565657]'>
              <p
                onClick={() => handleStepChange(BACKWARD)}
                className='font-RakutenRegular mb-4 text-[#f59600] text-base hover:border-b border-[#f59600] cursor-pointer'> Back </p>
              <div className='flex flex-row w-44 justify-between'>
                <button className='flex items-center bg-transparent hover:bg-[#f59600] p-4 text-[#f59600] hover:text-[#000] border border-[#f59600] hover:border-transparent rounded'
                  onClick={closeServiceDrawer}
                > Cancel </button>
                <button className='flex items-center bg-[#f59600] hover:bg-[#bc7709] text-black p-4 rounded'
                  onClick={() => handleStepChange(FORWARD)}
                > {currentStep === STEPPER_LENGTH ? "Save" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>

  );
};
export default Serviceindex;
