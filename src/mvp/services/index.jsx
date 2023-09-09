import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { serviceState, resetServiceState } from 'store';
import Drawer from 'core-modules/Drawer';
import { DEFAULT_STEP, STEPPER_LENGTH } from './constants';
import { validate } from './validate';
import './service.css';
import ConnectionDetails from './molecules/ConnectionDetails';
import mysqlLogo from 'assets/images/mysqlLogo.svg';
import snowflakeLogo from 'assets/images/snowflakeLogo.svg';
import LabelField from 'core-modules/LabelField';
import { saveConnection, authState } from 'store';
import { toast } from 'react-toastify';

const FORWARD = 1;

const Serviceindex = ({state, setState}) => {
  const { user } = useSelector(authState);
  const stateData = useSelector(serviceState);
  const { selectedService = 'mysql' } = stateData.service;
  const currentStep = stateData.currentStep || DEFAULT_STEP;
  const dispatch = useDispatch();

  const [ warning, setWarning ] = useState({
    selectedServiceWarning: false,
    nameWarning: false,
    connectionNameWarning: false,
    userNameWarning: false,
    passwordWarning: false,
    hostWarning: false,
    portWarning: false,
    accountWarning: false,
    roleWarning: false,
    wareHouseWarning: false,
    snowflakePassphraseKeyWarning: false,
    privateKeyWarning: false,
  })

  const closeServiceDrawer = () => {
    setWarning({});
    dispatch(resetServiceState());
    setState({ ...state, isOpen: false });
  }

  const handleDrawer = (val) => {
    setState({ ...state, isOpen: val })
  }

  const handleStepChange = async (stepChangeVal) => {
    let { proceed, warningObj } = validate.proceedToNextStep(stateData);
    if (!proceed) {
      setWarning({...warning, ...warningObj})
      return;
    }
    if (currentStep === STEPPER_LENGTH) {
      let postData = {
        service: {...stateData.service, name: stateData.configure.name},
        configure: {
          connectionName: stateData.configure.connectionName,
          userName: stateData.configure.userName,
          password: stateData.configure.password,
          host: stateData.configure.host,
          port: stateData.configure.port,
          databaseSchema: stateData.configure.databaseSchema,
        },
        tenantId: user.tenantId
      };
      await dispatch(saveConnection(postData)).unwrap().then(response => {
        let { status, message } = response;
        if (Number(status) === 200) {
          toast.success(message, { position: toast.POSITION.TOP_CENTER, style:{backgroundColor:'white',color: 'black'}});
          closeServiceDrawer();
        }
        else
          toast.error('Error while saving connection', { position: toast.POSITION.TOP_CENTER,style:{backgroundColor:'#F59502', color: 'black'} });
      }).catch(error => {
          toast.error('Error while saving connection', { position: toast.POSITION.TOP_CENTER,style:{backgroundColor:'#F59502',color: 'black'} });
      });
  }
}

  return (
    <div className='flex flex-row gap-4 -mt-3 h-12'>
      <Drawer isOpen={state.isOpen} setIsOpen={handleDrawer} title="Add new service" closeServiceDrawer={closeServiceDrawer}>
        <div className='flex flex-col force-magin-zero'>
          {/* <div className='flex bg-[#181b1e] h-40 text-white px-10'>
            <Stepper
              currentStep={currentStep}
              complete={state.complete}
            />
          </div> */}
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
            <div className='min-h-[60vh] max-h-[65vh]'>
              <ConnectionDetails warning={warning} setWarning={setWarning}/>
            </div>
          </div>
          <div className='bg-[#2d3032] footer-shadow h-[5.5rem] py-2 text-white mb-28'>
            <div className='flex justify-end footer-shadow h-[4rem] py-3 px-10 border-t border-[#565657]'>
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
