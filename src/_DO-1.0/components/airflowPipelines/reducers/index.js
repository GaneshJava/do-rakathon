export const pipelineTableColumns = [
  {
    key: 'dag_id',
    name: 'Pipelines',
    field: 'dag_id',
    width: '40%'
  },
  {
    key: 'timetable_description',
    name: 'Description',
    field: 'timetable_description',
    width: '30%'
  },
  {
    key: 'last_parsed_time',
    name: 'Last Modified time',
    field: 'last_parsed_time',
    width: '30%'
  }
];

export const runListTableColumns = [
  {
    key: 'dag_id',
    name: 'Pipelines',
    field: 'dag_id',
  },
  {
    key: 'state',
    name: 'Status',
    field: 'state',
  },
  {
    key: 'start_date',
    name: 'Start Time',
    field: 'start_date',
  },
  {
    key: 'end_date',
    name: 'End Time',
    field: 'end_date',
  },
  {
    key: 'run_type',
    name: 'Run Type',
    field: 'run_type',
  },
  {
    key: 'dag_run_id',
    name: 'Run Name',
    field: 'dag_run_id',
  }
];



export const pipelineData = [
  {
    id: '1',
    pipeline: 'customer-data-movement',
    description: 'moves consumer data',
    creation_time: '2023-07-15T14:30:00Z',
    last_run: '2023-07-15, 14:30:00PM',
    status: 'FAIL',
  },
  {
    id: '2',
    pipeline: 'customer-data-movement',
    description: 'moves consumer data',
    creation_time: '2023-07-15T14:30:00Z',
    last_run: '2023-07-15, 14:30:00PM',
    status: 'PASS',
  }
];

export const runlistData = [
  {
    id: '1',
    pipeline: 'customer-data-movement',
    status: 'FAIL',
    start_time: '2023-07-15, 14:30:00PM',
    retries: '10',
    run_name: 'Manual_2023-07-15T14:30:00Z',
  },
  {
    id: '2',
    pipeline: 'customer-data-movement',
    status: 'PASS',
    start_time: '2023-07-15, 14:30:00PM',
    retries: '10',
    run_name: 'Manual_2023-07-15T14:30:00Z',
  }
]