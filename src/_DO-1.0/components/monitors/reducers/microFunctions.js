import { DQ_RULES, EMPTY_KEY, READBLE_EVENT_TEXT } from "_DO-1.0/reducers";
import { removeDuplicateObjects } from "helpers";

const getAllOption = {
    key: 'all',
    label: 'All'
}
export const getDropdownOptions = (assetList) => {
    let databaseOptions = [getAllOption],
        schemaOptions = [getAllOption],
        assetsOptions = [getAllOption];

    assetList.forEach(item => {
        const { entity_level_1, entity_level_2, entity_level_3 } = item;
        databaseOptions.push(filterOption(entity_level_1, entity_level_1));
        schemaOptions.push(filterOption(entity_level_2, entity_level_2));
        assetsOptions.push(filterOption(`${item.entity_level_2}-${item.entity_level_3}`, entity_level_3, entity_level_2));
    })
    return { 
        databaseOptions: removeDuplicateObjects(databaseOptions, 'key'),
        schemaOptions: removeDuplicateObjects(schemaOptions, 'key'),
        assetsOptions: removeDuplicateObjects(assetsOptions, 'key')
    };
}

const filterOption = (key, value, subValue) => {
    return {
        key: key,
        label: <div className="flex flex-col justify-start">
            <p className="flex items-center gap-1 font-PrimaryFont text-primaryTextColor"> {value} </p>
            {subValue && <p className="font-PrimaryFont text-quaternaryTextColor"> {subValue} </p>}
        </div>
    }
}

export const getDrawerTitle = (configureData = {}) => {
    const { selectedEventType, selectedFields, selectedAssets } = configureData;
    let mainText = '';
    if (selectedEventType === DQ_RULES) {
        const fieldText = READBLE_EVENT_TEXT[selectedEventType];
        const fieldCount = selectedFields.length;
        const assetCount = [...new Set(selectedFields.map(val => val.parent_id))].length;
        mainText = `${fieldText} (${fieldCount} fields in ${assetCount} assets)`;
    } else if (selectedEventType === EMPTY_KEY) {
        mainText = 'Select Monitor type'
    } else {
        mainText = `${READBLE_EVENT_TEXT[selectedEventType]} Monitor`;
    }
    return returnTitleText(mainText, selectedEventType !== DQ_RULES ? selectedAssets : []);
}

const returnTitleText = (mainText, entities = []) => {
    const [showItems, restItems] = [entities.slice(0, 2), entities.slice(2)];
    return (
        <div className="flex flex-col justify-baseline">
            <div className="flex gap-1 items-base">
                <p className="text-2xl font-RakutenSemibold ">
                    Auto Generating Monitor
                </p>
                {entities.length > 0 &&
                    <p className="pt-1 text-lg font-RakutenSemibold flex gap-1 items-center">
                        (<span> {showItems.map(item => item.entity_level_3).join(', ')} </span>
                        {restItems.length > 0 && <>,
                            <span title={restItems.map(item => item.entity_level_3).join(', ')} className="text-sm font-RakutenSemibold flex pl-[5px] pr-[8px] py-[4px] cursor-pointer text-black bg-tertiaryTextColor rounded-full justify-center items-center">
                                +{restItems.length}
                            </span></>
                        }
                        )
                    </p>}
            </div>
        </div>
    )
}

export const getMonitorCounts = (assetLists) => {
    assetLists.forEach(item => {
        item.asset_fields?.forEach(field => {
            if(field.monitor_details)
                item.monitorCount = (item.monitorCount || 0) + 1
        })
    })
    return assetLists;
}