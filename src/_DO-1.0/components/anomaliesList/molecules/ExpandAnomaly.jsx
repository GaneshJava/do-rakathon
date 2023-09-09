import React, { useState, useEffect } from 'react';
import { Divider } from 'primereact/divider';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';
import { statusOptions } from '../reducers';
import AnomalyChart from '_DO-1.0/components/anomaliesView/molecules/AnomalyChart';
import { Link } from 'react-router-dom';
import DQChart from '_DO-1.0/components/anomaliesView/molecules/DQDetails';
//
import { updateStatusOfAnAnomaly } from 'store';
import { useDispatch } from 'react-redux';
import { READBLE_EVENT_TEXT, API_KEY, DQ_RULES, FIELD_HEALTH, FRESHNESS, SCHEMA_CHANGE, VOLUME, FIXED } from "_DO-1.0/reducers";
import { encodeDecoder } from 'helpers';
import { ResolutionText } from '_DO-1.0/components/anomaliesView/molecules/ViewHeader';
import { toast } from 'react-toastify';

const ExpandAnomaly = ({ dateRange, user, anomalyObject: anoamlyObjectProps }) => {
    const [anomalyObject, setAnomalyObject] = useState(anoamlyObjectProps || {});
    const attributesStringWithDoubleQuotes = anomalyObject.event_type === DQ_RULES ? ((anomalyObject?.attributes?.replace(/'/g, '"') ?? "{}")) : "{}";
    const attributes = JSON.parse(attributesStringWithDoubleQuotes) || {};

    const dispatch = useDispatch();
    const [statusOptionWithCommand, setStatusOptionWithCommand] = useState([]);
    const [resolutionOpen, setResolutionOpen] = useState(false);
    const [resolutionText, setResolutionText] = useState('');

    const handleStatusChange = async (statusObj) => {
        if (statusObj.key === FIXED)
            setResolutionOpen(true);
        else updateStatus(statusObj.key)
    }

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
        console.log('update status API:', response);
        if (response.status === 200) {
            toast.success('Anomaly status updated successfully!', {
                position: toast.POSITION.TOP_CENTER,
                style: { backgroundColor: 'white', color: 'black' }
            });
            setAnomalyObject({ ...anomalyObject, current_status: status })
        }
    }

    const toggleOpenResolution = (toggle) => setResolutionOpen(toggle)

    useEffect(() => {
        setStatusOptionWithCommand(getStatusDropDownOption(handleStatusChange))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex -m-1 gap-3">
            <div className="flex flex-col w-full rounded-md bg-secondaryBgColor pb-4">
                <div className='flex pt-4 px-9 items-center'>
                    <div className='flex flex-col grow-[1] gap-2'>
                        <p className='text-xl'>{`${anomalyObject.event_type !== DQ_RULES ? 'Latest' : ''}${getStatusText(anomalyObject.event_type)} ${anomalyObject.event_type !== DQ_RULES ? 'Trends' : ''}`} </p>
                        {anomalyObject.event_type !== DQ_RULES && <p className='text-secondaryTextColor'> {anomalyObject.event_description} </p>}
                    </div>
                    <SplitButton
                        label="Change Status"
                        onClick={null}
                        model={statusOptionWithCommand}
                        severity="warning"
                        className="expand-split-btn mr-4"
                    />
                    {ResolutionText({ resolutionText, setResolutionText, updateStatus, toggleOpenResolution, open: resolutionOpen, absClass: 'top-[30px] right-[15px]' })}
                    <div>
                        <Link to={'/anomalies/details?' + encodeDecoder(`eventId=${anomalyObject.id}&connId=${anomalyObject.conn_id}&eventType=${anomalyObject.event_type}&entityLevel1=${anomalyObject.entity_level1}&entityLevel2=${anomalyObject.entity_level2}&entityLevel3=${anomalyObject.entity_level3}`)}>
                            <Button outlined className='border-secondaryBorderColor rounded-md h-[3rem]' aria-controls="popup_menu_left">
                                <div className='flex gap-3'>
                                    <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>Diagnostics</p>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>
                <Divider />
                <div className='flex flex-col'>
                    {anomalyObject.event_type === DQ_RULES ?
                        <DQChart
                            eventType={anomalyObject.event_type}
                            anomalyObject={anomalyObject}
                            fromExpander={true}
                            dateRange={dateRange[0]}
                            user={user}
                            attributes={attributes}
                        /> :
                        <AnomalyChart
                            eventType={anomalyObject.event_type}
                            anomalyObject={anomalyObject}
                            fromExpander={true}
                            dateRange={dateRange[0]}
                            user={user}
                        />}
                </div>
            </div>
        </div>
    )
}

export const getStatusText = (eventType) => {
    let statusText = ''
    if (eventType === FRESHNESS)
        statusText = READBLE_EVENT_TEXT[FRESHNESS];
    else if (eventType === DQ_RULES)
        return READBLE_EVENT_TEXT[DQ_RULES];
    else if (eventType === VOLUME)
        statusText = READBLE_EVENT_TEXT[VOLUME];
    else if (eventType === SCHEMA_CHANGE)
        statusText = READBLE_EVENT_TEXT[SCHEMA_CHANGE];
    else
        statusText = READBLE_EVENT_TEXT[FIELD_HEALTH];
    return ` ${statusText} `;
};

export const getStatusDropDownOption = (handleStatusChange) => {
    const statusOptionWithCommand = [];
    statusOptions.map(item => {
        if (item.key !== 'all')
            statusOptionWithCommand.push({
                key: item.key,
                label: item.label,
                command: (e) => handleStatusChange(e.item),
            })
        return 1;
    })
    return statusOptionWithCommand;
}

export default React.memo(ExpandAnomaly);