export const matillionFilters = [
    { key: 'group', label: 'Groups' },
    { key: 'project', label: 'Projects' },
    { key: 'version', label: 'Version' },
];

export const matillianColumns = [
    {
        key: 'id',
        name: 'Job Id',
        field: 'id',
        width: ''
    },
    {
        key: 'name',
        name: 'Job Name',
        field: 'name',
        width: ''
    },
    {
        key: 'type',
        name: 'Job Type',
        field: 'type',
        width: ''
    },
    {
        key: 'description',
        name: 'Job Description',
        field: 'description',
        width: ''
    },
    {
        key: 'created',
        name: 'Created time',
        field: 'created',
        width: ''
    }
];

export const matillianExecutions = [
    {
        key: 'environmentName',
        name: 'Environment Name',
        field: 'environmentName',
        width: ''
    },
    {
        key: 'type',
        name: 'Type',
        field: 'type',
        width: ''
    },
    {
        key: 'state',
        name: 'Status',
        field: 'state',
        width: ''
    },
    {
        key: 'startTime',
        name: 'Start Time',
        field: 'startTime',
        width: ''
    },
    {
        key: 'endTime',
        name: 'End Time',
        field: 'endTime',
        width: ''
    }
];

export const taskListColumns = [
    {
        key: 'taskBatchID',
        name: 'Execution ID',
        field: 'taskBatchID',
        width: ''
    },
    {
        key: 'componentName',
        name: 'Task Name',
        field: 'componentName',
        width: ''
    },
    {
        key: 'type',
        name: 'Type',
        field: 'type',
        width: ''
    },
    {
        key: 'state',
        name: 'Status',
        field: 'state',
        width: ''
    },
    {
        key: 'jobRevision',
        name: 'Revision',
        field: 'jobRevision',
        width: ''
    },
    {
        key: 'startTime',
        name: 'Start Time',
        field: 'startTime',
        width: ''
    },
    {
        key: 'endTime',
        name: 'End Time',
        field: 'endTime',
        width: ''
    }
]


export const matillianData = [
    {
        id: 'job_1234',
        name: 'Job Name',
        type: 'Job Type',
        description: 'Job Description',
        created: new Date().getTime()
    }
];