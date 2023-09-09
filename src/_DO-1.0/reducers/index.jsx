export const API_KEY = {
    fetchAllAnomalies: 1,
    fetchAllAnomalyHeader: 2,
    fetchAnomaliesOfAnAsset: 3,
    updateAnomalyStatus: 4,
    fetchAnomalyChartData: 5,
    fetchLastExecutions: 6,
}
// ANOMALY STATUS CONSTANTS: 
export const OPEN = 'OPEN';
export const INPROGRESS = 'INPROGRESS';
export const FIXED = 'FIXED';
export const NOACTION = 'NOACTION';

// ANOMALY STATUS READBLE CONSTANTS: 
export const READBLE_STATUS_TEXT = {
    [OPEN]: 'Open',
    [INPROGRESS]: 'In Progress',
    [FIXED]: 'Fixed',
    [NOACTION]: 'No Action'
};

// ANOMALY EVENTS TYPE:
export const FRESHNESS = 'freshness';
export const VOLUME = 'volume';
export const SCHEMA_CHANGE = 'schema';
export const FIELD_HEALTH = 'field_health';
export const DQ_RULES = 'dq';



// ANOMALY EVENT READBLE CONSTANTS: 
export const READBLE_EVENT_TEXT = {
    [FRESHNESS]: 'Freshness',
    [VOLUME]: 'Volume',
    [SCHEMA_CHANGE]: 'Schema Changes',
    [FIELD_HEALTH]: 'Field Health',
    [DQ_RULES]: 'DQ Rules'
};

export const EMPTY_KEY = 'empty';

//frequently used strings
export const ALL = 'all';

export const getDatesInUTC = (key) => {
    let startDate = {}, endDate = {};
    switch (key) {
        case 'last24hours':
            [startDate, endDate] = getDateRange(1);
            break;
        case 'last7days':
            [startDate, endDate] = getDateRange(7);
            break;
        case 'last15days':
            [startDate, endDate] = getDateRange(15);
            break;
        case 'last30days':
            [startDate, endDate] = getDateRange(30);
            break;
        default:
            [startDate, endDate] = getDateRange(7);
            break;
    }
    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
};

export const getDateRange = (value) => {
    const userTimezoneOffset = new Date().getTimezoneOffset();
    const endDate = new Date();
    const currentDate = new Date(endDate.getTime() - value * 24 * 60 * 60 * 1000);
    currentDate.setMinutes(currentDate.getMinutes() - userTimezoneOffset);
    endDate.setMinutes(endDate.getMinutes() - userTimezoneOffset);
    return [currentDate, endDate];
}

export const CRITICAL = 'CRITICAL';
export const MAJOR = 'MAJOR';
export const MINOR = 'MINOR';

export const READABLE_SEVERITY = {
    [CRITICAL]: 'Critical',
    [MAJOR]: 'Major',
    [MINOR]: 'Minor'
}
