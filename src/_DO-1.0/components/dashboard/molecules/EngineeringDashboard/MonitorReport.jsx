import React, { useRef } from "react";
import fieldHealthIcon from '../../../../assets/field_health.svg';
import dqRuleIcon from '../../../../assets/dqRule.svg';
import freshnessIcon from '../../../../assets/freshness.svg';
import volumeIcon from '../../../../assets/volume.svg';
import schemaChangeIcon from '../../../../assets/schemaChange.svg';
import inforMarkIcon from '../../../../assets/informark.svg';
import forwardIcon from '../../../../assets/forward.svg';
import {
    FRESHNESS,
    VOLUME,
    SCHEMA_CHANGE,
    FIELD_HEALTH,
    DQ_RULES
} from '_DO-1.0/reducers'
import { monitorDetails } from "../../reducers";
import { Link } from 'react-router-dom';

const MonitorReport = ({ section, anomaliesCount }) => {
    const op = useRef(null);
    return <>
        <div className="px-6 flex gap-4 items-start mb-5">
            <div className="flex gap-2 items-start">
                <img src={getIconsBasedOnEventType(section.type)} alt="" />
                <div className="flex flex-col gap-1">
                    <label className="text-primaryTextColor font-RakutenSemibold"> {section.label} </label>
                    <span className="font-PrimaryFont text-sm text-primaryTextColor"> {section.description} </span>
                </div>
            </div>
            {monitorDetails.map(item =>
                <div key={item.key} className="flex flex-col gap-1">
                    <p className="flex gap-2 text-primaryTextColor text-lg font-RakutenSemibold">
                        <span> {item.label} </span> {item.inforMark &&
                            <img
                                src={inforMarkIcon}
                                alt=''
                                onClick={(e) => op.current.toggle(e)}
                                className="px-2 bg-[#3e3f40] rounded-full cursor-pointer information-tooltip"
                            />
                        }
                    </p>
                    <p className="flex items-center gap-2 text-secondaryTextColor">
                        <span className=" tracking-wide text-[20px]"> {anomaliesCount} </span>
                        {item.forwardLink &&
                            <Link to={`/anomalies?filter=${section.type}`}>
                                <img src={forwardIcon} alt='' className="p-2 bg-[#3e3f40] rounded-full" />
                            </Link>}
                    </p>
                </div>
            )}
        </div>
    </>
}
export default React.memo(MonitorReport);


export const getIconsBasedOnEventType = (type) => {
    let imgSrc = ''
    switch (type) {
        case FRESHNESS:
            imgSrc = freshnessIcon;
            break;
        case VOLUME:
            imgSrc = volumeIcon;
            break;
        case SCHEMA_CHANGE:
            imgSrc = schemaChangeIcon
            break;
        case FIELD_HEALTH:
            imgSrc = fieldHealthIcon
            break;
        case DQ_RULES:
            imgSrc = dqRuleIcon
            break;
        default:
            imgSrc = null;
            break;
    }
    return imgSrc;
}