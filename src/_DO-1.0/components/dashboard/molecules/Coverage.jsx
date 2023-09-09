import React from 'react';
import stackIcon1 from '../../../assets/stack_1.svg';
import stackIcon3 from '../../../assets/stack_3.svg';
import mysqlLogo from 'assets/images/mysqlLogo.svg';
import matillionIcon from "../../../assets/matillion.svg";
import { SiMicrosoftazure } from 'react-icons/si';
// import { ProgressBar } from 'primereact/progressbar';
// import { coverageStats } from '../reducers';
// import classNames from 'classnames';
// import stackIcon2 from '../../../assets/stack_2.svg';
// import stackIcon4 from '../../../assets/stack_4.svg';

const stackIcons = [
    {icon: stackIcon1, label: 'Snowflake'},
    {icon: mysqlLogo,  label: 'Mysql'},
    {icon: stackIcon3, label: 'Airflow'},
    {icon: '', label: 'Azure'},
    {icon: matillionIcon, label: 'Matillion'},
];
const Coverage = () => {
    return <>
        <div className='flex gap-4 mx-6 gap-2'>
            {/* <div className='border border-2 border-quaternaryBgColor grow-[2] bg-secondaryBgColor rounded-[16px] p-8'>
                <p className='text-xl'> Coverage </p>
                <div className='mt-7 flex flex-col gap-1'>
                    {coverageStats.map(item =>
                        <div key={item.key} className={classNames(
                            item.key,
                            'flex coverage-progress-bar',
                            'gap-8',
                            'items-center',
                            'text-[#d6d6d6]'
                        )}>
                            <ProgressBar
                                value={item.percentageValue}
                                displayValueTemplate={() => null}
                                className={"basis-[83%]"}
                            />
                            <p className="basis-[5%] font-bold"> {`${item.percentageValue}%`} </p>
                            <p className="basis-[13%]"> {item.label} </p>
                        </div>)}
                </div>
            </div> */}
            <div className='border border-2 border-quaternaryBgColor bg-secondaryBgColor rounded-[16px] py-2 px-6 w-full'>
                <p className='text-lg'> Coverage </p>
                <div className='mt-2 my-3 flex justify-center gap-28'>
                    {stackIcons.map((_img, key) => _img.icon ? 
                         <img key={`asset_${key}`} src={_img.icon} alt={_img.label} title={_img.label} className='w-16 h-16' /> : 
                        <SiMicrosoftazure color="#0389d0" size={60} title={_img.label}/>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default React.memo(Coverage);