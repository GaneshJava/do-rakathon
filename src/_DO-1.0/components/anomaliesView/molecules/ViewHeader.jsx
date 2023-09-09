/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getStatusText } from '_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly';
import mysqlLogo from 'assets/images/mysqlLogo.svg';
import snowflakeLogo from 'assets/images/snowflakeLogo.svg';
import airflowLogo from "_DO-1.0/assets/airflowIcon.svg";
import { SiMicrosoftazure, SiSnowflake } from 'react-icons/si';
import schemaicon from '../../../assets/schema.svg';
import tableIcon from '../../../assets/table.svg';
import rightArrow from '../../../assets/rightArrow.svg';
import openStatusIcon from '../../../assets/openStatus.svg';
import doneStatusIcon from '../../../assets/doneStatus.svg';
import pendingStatusIcon from '../../../assets/pendingStatus.svg';
import columnIcon from '../../../assets/column.svg';
import classNames from "classnames";
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Menu } from 'primereact/menu';
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { statusOptions } from '_DO-1.0/components/anomaliesList/reducers';
import {
    statusTemplate,
    timeBodyTemplate,
    collaboratorsTemplate
} from '_DO-1.0/components/anomaliesList/molecules/AnomaliesOverview';
import { useState, useEffect, useRef } from 'react';
//
import { updateStatusOfAnAnomaly } from 'store';
import { useDispatch } from 'react-redux';
import { READBLE_STATUS_TEXT, API_KEY, FIELD_HEALTH, FIXED, INPROGRESS, OPEN } from "_DO-1.0/reducers";
import { toast } from 'react-toastify';
import { getIconsBasedOnEventType } from '_DO-1.0/components/dashboard/molecules/EngineeringDashboard/MonitorReport';
import { SNOWFLAKE } from '_DO-1.0/components/source/reducers';

const ViewHeader = ({ state, getAnomalyHeaderData }) => {
    const { user, anomalyObject, timeLine, eventType, anomalyObject: { current_status: currentStatus } } = state;
    const dispatch = useDispatch();
    const statusMenuRef = useRef(null)
    const [resolutionOpen, setResolutionOpen] = useState(false);
    const [resolutionText, setResolutionText] = useState('');

    const handleStatusChange = ({ option: statusObj }) => {
        if (statusObj.key === FIXED)
            setResolutionOpen(true);
        else updateStatus(statusObj.key)
    }

    const toggleOpenResolution = (toggle) => setResolutionOpen(toggle)

    const updateStatus = async (status) => {
        let response = await dispatch(updateStatusOfAnAnomaly({
            key: API_KEY.updateAnomalyStatus, eventId: anomalyObject.id,
            postData: {
                user_id: user.id,
                status: status,
                comments: resolutionText,
            }
        })).unwrap();
        setResolutionOpen(false);
        console.log('update status:', response);
        if (response.status === 200) {
            toast.success('Anomaly status updated successfully!', {
                position: toast.POSITION.TOP_CENTER,
                style: { backgroundColor: 'white', color: 'black' }
            });
            getAnomalyHeaderData();
        } else {
            toast.error('Failed to update status', {
                position: toast.POSITION.TOP_CENTER, style: { backgroundColor: '#F59502', color: 'black' }, className: "bg-toast"
            });
        }
    }
    const entitySeparator = () => <img src={rightArrow} alt="" />

    const getEntityLevelJsx = (imgSrc, label, textClass = '', azure = 0) => {
        return <div
            className={classNames('flex gap-2 items-center', textClass)} >
            {azure === 1 ? getConnectionIcon()
                :
                <img
                    src={imgSrc}
                    alt=""
                    className='w-5 h-5'
                />}
            <span> {label} </span>
        </div>
    }

    const getConnectionIcon = () => {
        const connId = anomalyObject.conn_id;
        let icon = null;
        if (connId === 'azure01')
            icon = <SiMicrosoftazure color="#0389d0" size={20} />
        if (connId === 'airflow01')
            icon = <img src={airflowLogo} alt="" className="h-5 w-5" />
        if (connId === 'snowflake01')
            icon = <SiSnowflake color="#0389d0" size={20} />
        if (connId === 'mysql01')
            icon = <img src={mysqlLogo} alt="" className="h-8 w-8" />
        return icon;
    }

    const getStatusOptionsByCurrentStatus = () => {
        return currentStatus === FIXED ?
            statusOptions.filter(item => item.key !== 'all' && item.key !== INPROGRESS && item.key !== OPEN) :
            currentStatus === INPROGRESS ? statusOptions.filter(item => item.key !== 'all' && item.key !== OPEN) :
                statusOptions.filter(item => item.key !== 'all')
    }

    return <>
        <div className='pt-3 bg-secondaryBgColor rounded-lg h-80'>
            <div className='px-8 flex gap-2'>
                <img src={getIconsBasedOnEventType(anomalyObject.event_type)} alt='' />
                <div className='flex flex-col gap-1'>
                    <p className='text-4xl font-PrimaryFont font-semibold'> {`${getStatusText(anomalyObject.event_type)} issue detected`} </p>
                    <span className='text-lg font-RakutenLight text-secondaryTextColor'> {anomalyObject.event_description} </span>
                </div>
            </div>
            <div className='px-8 mx-12 flex mt-10 mb-8 gap-3 items-center'>
                {getEntityLevelJsx('', anomalyObject.entity_level1, 'text-secondaryTextColor', 1)}
                {entitySeparator()}
                {getEntityLevelJsx(schemaicon, anomalyObject.entity_level2, 'text-secondaryTextColor')}
                {entitySeparator()}
                {getEntityLevelJsx(tableIcon, anomalyObject.entity_level3)}
                {eventType === FIELD_HEALTH && <>
                    {entitySeparator()}
                    {getEntityLevelJsx(columnIcon, anomalyObject.entity_level4)}
                </>}
            </div>
            <Divider />
            <div className='flex px-8 mx-12 justify-between'>
                <div className={getClassName('items-start')}>
                    <span> STATUS </span>
                    {statusTemplate(anomalyObject)}
                    <span
                        className='text-sm font-PrimaryFont text-primaryTheme hover:border-b hover:border-primaryTheme cursor-pointer'
                        onClick={(event) => statusMenuRef.current.toggle(event)}
                    > Change </span>
                    <Menu
                        model={customMenuTemplate({
                            options: getStatusOptionsByCurrentStatus(),
                            onClick: handleStatusChange,
                            closeMenuAfterSelect: true,
                            selectedOption: currentStatus
                        })}
                        popup
                        ref={statusMenuRef}
                        id={"popup_menu"}
                    />
                    {ResolutionText({ resolutionText, setResolutionText, updateStatus, toggleOpenResolution, open: resolutionOpen })}
                </div>

                <div className={getClassName()}>
                    <span> CREATED TIME </span>
                    {timeBodyTemplate(anomalyObject, 'flex-col-reverse')}
                </div>
                <div className={getClassName()}>
                    <span> COLLABARATORS </span>
                    {collaboratorsTemplate(anomalyObject)}
                </div>
                <div className={getClassName('w-[20rem]')}>
                    <span> TIMELINE </span>
                    {getTimelineTracker(timeLine, currentStatus)}
                </div>
            </div>
        </div>
    </>
}

export const getTimelineTracker = (timeLine, apiStatusKey) => {
    const timeLineTrackerStatus = [OPEN, INPROGRESS, FIXED];
    let currentStatus = apiStatusKey === FIXED ? 3 : apiStatusKey === INPROGRESS ? 2 : 1;
    let totalStatusLength = timeLineTrackerStatus.length;
    return (
        <div className='flex'>
            {timeLineTrackerStatus.map((item, _index) => {
                let statusIndex = _index + 1;
                let statusPresent = timeLine[item] || null;
                let active = currentStatus === statusIndex;
                let done = currentStatus > statusIndex;
                let complete = currentStatus === totalStatusLength;

                return (
                    <div key={_index + '_statusIndex'} className='flex flex-col justify-start'>
                        <div className='flex w-[8rem]'>
                            <img src={(done || complete) ? doneStatusIcon : active ? openStatusIcon : pendingStatusIcon} alt="" />
                            <Divider className={classNames(
                                totalStatusLength === statusIndex && 'invisible',
                                statusIndex < currentStatus ? 'highlight-divider' : 'pending-divider'
                            )} />
                        </div>
                        <span> {READBLE_STATUS_TEXT[item]} </span>
                        {statusPresent && <span> {timeBodyTemplate(statusPresent, '', 0)} </span>}
                    </div>
                )
            })}
        </div>
    );
}
export const getClassName = (className) => `flex flex-col gap-2 text-sm font-PrimaryFont ${className}`

export const ResolutionText = ({
    resolutionText,
    setResolutionText,
    updateStatus,
    toggleOpenResolution,
    open,
    absClass = ''
}) => {
    const resolutionRef = useRef();
    const [resolutionOpen, setResolutionOpen] = useState(false);
    useEffect(() => setResolutionOpen(open), [open]);
    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true);
        // remove event listeners when component unmounts
        return () => document.removeEventListener('click', hideOnClickOutside);
    }, []);

    const hideOnClickOutside = (e) => {
        if (resolutionRef.current && !resolutionRef.current.contains(e.target)) {
            setResolutionOpen(false);
            toggleOpenResolution(false)
        }
    };

    return (
        <>{resolutionOpen &&
            <div className='relative'>
                <div ref={resolutionRef} className={'bg-[#292929] border bordedr-[#93b7da] z-10 rounded-lg flex flex-col gap-3 absolute w-[22rem] min-h-32 p-3 ' + absClass}>
                    <div className='flex flex-col gap-2 '>
                        <p className='font-RakutenSemibold'>Capture resolution note</p>
                        <p className='text-[#848484] text-xs'>Helps you and your team to trouble shoot future anomalies better</p>
                    </div>
                    <InputTextarea
                        rows={5}
                        cols={30}
                        placeholder="Add your note here"
                        className="custom-textarea rounded-lg "
                        value={resolutionText}
                        onChange={(e) => setResolutionText(e.target.value)}
                    />
                    <div className='flex justify-end'><button
                        outlined
                        className=" border border-secondaryBorderColor  rounded-md text-secondaryBtnText p-1">
                        <span onClick={() => updateStatus(FIXED)} >Save Note</span>
                    </button>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default ViewHeader;