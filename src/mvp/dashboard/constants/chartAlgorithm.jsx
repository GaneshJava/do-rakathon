export const constructChartData = (
    eventsData,
    postObj,
    groupBy,
    countKey = 'anomaly_count'
) => {
    const { startDate, endDate } = postObj;
    return generateOutputObject(startDate, endDate, eventsData, groupBy, countKey);
}


export const generateOutputObject = (startDate, endDate, events, groupBy = false, countKey) => {
    const dateMap = new Map();
    const categories = getCategories(startDate, endDate, dateMap, countKey);

    let outPutObject = {};
    if (groupBy)
        outPutObject = generateGroupedDataOutputObject(categories, dateMap, events, groupBy, countKey);
    else {
        outPutObject = generateSerialDataOutputObject(events, dateMap, countKey, categories);
    }
    return outPutObject;
};


export const generateSerialDataOutputObject = (events, dateMap, countKey, categories) => {
    let outPutObject = {};
    events.forEach(event => {
        const eventDate = new Date(event.event_time);
        const eventDateString = getDateString(eventDate);
        if (dateMap.has(eventDateString)) {
            dateMap.set(eventDateString, (countKey === 'anomaly_count' ? (parseInt(dateMap.get(eventDateString) + event[countKey])) : (event[countKey] ? parseFloat(event[countKey]) : event[countKey] )));
        }
    });
    let seriesValues = Array.from(dateMap.values());
    outPutObject = {
        categories,
        series: [{
            name: '',
            data: seriesValues.filter(Boolean).length ? seriesValues : []
        }]
    };
    return outPutObject;
}

export const generateGroupedDataOutputObject = (categories, dateMap, groupedEvents, groupBy, countKey) => {
    let outPutObject = { categories, series: [] }
    Object.keys(groupedEvents).forEach(groupName => {
        const groupEvents = groupedEvents[groupName];
        const groupDateMap = new Map(dateMap);
        groupEvents.forEach(event => {
            const eventDate = new Date(event.event_time);
            const eventDateString = getDateString(eventDate);
            if (groupDateMap.has(eventDateString)) {
                groupDateMap.set(eventDateString, parseInt(groupDateMap.get(eventDateString) + event[countKey]));
            }
        });
        let seriesValues = Array.from(groupDateMap.values());
        outPutObject.series.push({
            name: groupName || `empty_name`,
            data: seriesValues.filter(Boolean).length ? seriesValues : []
        });
    });
    return outPutObject;
}


export const getCategories = (startDate, endDate, dateMap, countKey) => {
    const start = dayEndTime(startDate);
    const end = dayEndTime(endDate)
    while (start <= end) {
        const dateString = getDateString(start);
        dateMap.set(dateString, (countKey === 'anomaly_count' || countKey === 'zero') ? 0 : null);
        start.setDate(start.getDate() + 1);
    }
    return Array.from(dateMap.keys());
}

export const getDateString = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
};

export const dayEndTime = (date) => {
    let dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59);
}

export const _apiResponse = (apiData, section) => {
    let data = apiData?.data ?? [];
    return {
        eventsData: apiData.groupBy ? (apiData?.groupData ?? []) : (Array.isArray(data) ? data : []),
        metadata: {...apiData?.metadata ?? {}, ...section},
        groupBy: apiData.groupBy
    }    
}
