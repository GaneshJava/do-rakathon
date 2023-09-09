import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { serviceState, updateService } from 'store';
import LabelField from 'core-modules/LabelField';
import mysqlLogo from 'assets/images/mysqlLogo.svg';
import snowflakeLogo from 'assets/images/snowflakeLogo.svg';
import postgresqlLogo from 'assets/images/postgresqlLogo.svg';
import bigqueryLogo from 'assets/images/bigqueryLogo.svg';
import rightIcon from 'assets/images/tickmarkIcon.svg'

const SelectService = () => {
    const { service: { selectedService }, warning } = useSelector(serviceState);
    const dispatch = useDispatch();

    const handleChange = (value) => {
        dispatch(updateService({
            key: 'selectedService',
            value
        }));
    }
    
    return (
        <>
            <div className='px-10'>
                {/*<div >
                    <LabelField
                        title={'Select service type'}
                        mandotory={true}
                        className="font-RakutenSemibold text-[16px] mt-7"
                        astrickClass="after:content-['*'] after:text-[#f59600]"
                        customStyle={{ fontSize: '16px' }}
                    />
                    <div className='pt-3'>
                        <MultiSelectField
                            options={[]}
                            standards={null}
                            disabled={false}
                            handleChange={handleSelectChange}
                            isMulti={false}
                            placeholder="Database services"
                            classNamePrefix="react-db-custom" />
                    </div>
                 </div>*/}
                <div>
                    <LabelField
                        title={'Select service'}
                        mandotory={true}
                        className="font-RakutenSemibold text-[16px] mt-7"
                        astrickClass="after:content-['*'] after:text-[#f59600]"                        
                        customStyle={{ fontSize: '16px' }}
                    />
                    <div className='flex flex-column gap-6 pt-3'>
                        <div className=' w-[8.25rem] h-[9.6em] border rounded-lg cursor-pointer' onClick={() => handleChange('mysql')}>
                            <div className='bg-[#fff4e5] flex rounded-t-md'>
                                <img src={mysqlLogo} alt='?' className='my-8 mx-5' />
                            </div>
                            <div className={`bg-${selectedService === 'mysql' ? '[#f59600]' : 'white'} flex justify-between items-center rounded-b-md py-[0.1rem] px-3  text-black text-sm font-RakutenRegular h-[1.55rem]`} >
                                <span>MySQL</span>
                                {selectedService === 'mysql' && <img src={rightIcon} alt="?" />}
                            </div>
                        </div>
                        <div className=' w-[8.25rem] h-[9.6em] border rounded-lg cursor-pointer' onClick={() => handleChange('snowflake')}>
                            <div className='bg-[#e5f6ff] flex rounded-t-md '>
                                <img src={snowflakeLogo} alt='?' className='my-[2.4rem] mx-[2.5rem]' />
                            </div>
                            <div className={`bg-${selectedService === 'snowflake' ? '[#f59600]' : 'white'} bg-white flex  justify-between items-center rounded-b-md py-[0.1rem] px-3  text-black text-sm font-RakutenRegular h-[1.53rem]`}>
                                <span>Snowflake</span>
                                {selectedService === 'snowflake' && <img src={rightIcon} alt="?" className='-ml-5'/>}
                            </div>
                        </div>
                        <div className=' w-[8.25rem] h-[9.6em] border rounded-lg opacity-25'>
                            <div className='bg-[#e5f6ff] flex rounded-t-md '>
                                <img src={postgresqlLogo} alt='?' className='my-[1.95rem] mx-[2rem]' />
                            </div>
                            <div className='bg-[ #252629] flex rounded-b-md py-1 px-5 text-white text-sm font-RakutenRegular h-[1.6rem]'>Coming soon</div>
                        </div>
                        <div className=' w-[8.25rem] h-[9.6em] border rounded-lg opacity-25'>
                            <div className='bg-[#e5f6ff] flex rounded-t-md '>
                                <img src={bigqueryLogo} alt='?' className='my-[2.3rem] mx-[2.2rem]' />
                            </div>
                            <div className='bg-[ #252629] flex rounded-b-md py-1 px-5 text-white text-sm font-RakutenRegular h-[1.6rem]'>Coming soon</div>
                        </div>
                    </div>
                </div>
                {warning[`selectedServiceWarning`] && <p className="text-[#e26b6b] text-sm mt-3"> Please select service </p>}
            </div>

        </>
    )
}

export default SelectService;