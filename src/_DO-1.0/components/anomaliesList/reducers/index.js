import { UTC_to_local_timeConversion } from "helpers";
import {
  ALL,
  FRESHNESS,
  VOLUME,
  SCHEMA_CHANGE,
  FIELD_HEALTH,
  DQ_RULES,
  OPEN,
  INPROGRESS,
  FIXED,
  CRITICAL,
  MAJOR,
  MINOR,
  READABLE_SEVERITY
} from "_DO-1.0/reducers";
export const anomalyTableColumns = [
  {
    key: 'assetName',
    name: 'Asset',
    field: 'entity_level3',
  },
  {
    key: 'eventType',
    name: 'Type',
    field: 'event_type',
  },
  {
    key: 'description',
    name: 'Description',
    field: 'event_description',
  },
  {
    key: 'severity',
    name: 'Severity',
    field: 'severity',
  },
  {
    key: 'status',
    name: 'Status',
    field: 'current_status',
  },
  {
    key: 'collaborators',
    name: 'Collaborators',
    field: 'collaborators',
  },
  {
    key: 'event_time',
    name: 'Time',
    field: 'event_time',
  }
];

export const detailedanomalyTableColumns = [
  {
    key: 'description',
    name: 'Description',
    field: 'event_description',
  },
  {
    key: 'eventType',
    name: 'Type',
    field: 'event_type',
  },
  {
    key: 'severity',
    name: 'Severity',
    field: 'severity',
  },
  {
    key: 'status',
    name: 'Status',
    field: 'current_status',
  },
  {
    key: 'collaborators',
    name: 'Collaborators',
    field: 'collaborators',
  },
  {
    key: 'resolution',
    name: 'Resolution',
    field: 'resolution',
  },
  {
    key: 'time',
    name: 'Time',
    field: 'event_time',
  } 
];

export const schemachangecolumns = [
  {
    key: 'field',
    name: 'Field',
    field: 'field',
  },
  {
    key: 'change_type',
    name: 'Change Type',
    field: 'change_type',
  },
  {
    key: 'prev_configuration',
    name: 'Previous Configuration',
    field: 'prev_config',
  },
  {
    key: 'new_configuration',
    name: 'New Configuration',
    field: 'new_config',
  }
];

export const dqRulesDataColumns = [
  {
    key: 'asset_field',
    name: '[Asset]Field',
    field: 'asset_field',
    width: '20%'
  },
  {
    key: 'rule_label',
    name: '[Rule Type]Expression',
    field: 'rule_type',
    width: '28%'
  },
  {
    key: 'status',
    name: 'Status',
    field: 'status',
    width: '12%'
  },
  {
    key: 'rows_scanned',
    name: 'Rows Scanned',
    field: 'rows_scanned',
    width: '12%'
  },
  {
    key: 'rows_failed',
    name: 'Rows Failed',
    field: 'rows_failed',
    width: '10%'
  },
  {
    key: 'start_time',
    name: 'Start Time',
    field: 'start_time',
    width: '11%'
  },
  {
    key: 'end_time',
    name: 'End Time',
    field: 'end_time',
    width: '10%'
  },
];

export const dateDropDownOption = [
  {
    key: 'last24hours',
    label: 'Last 24 Hrs',
  },
  {
    key: 'last7days',
    label: 'Last 7 days',
  },
  {
    key: 'last15days',
    label: 'Last 15 days',
  },
  {
    key: 'last30days',
    label: 'Last 30 days',
  },
  {
    key: 'custom',
    label: 'Custom',
  },
];

export const filterButtons = [
  { key: 'assets', label: 'Assets' },
  { key: 'issueType', label: 'Issue Type' },
  { key: 'status', label: 'Status' },
  // { key: 'severity', label: 'Severity' }
];

export const issueTypeOptions = [
  { key: ALL, label: 'All' },
  { key: FRESHNESS, label: 'Freshness' },
  { key: DQ_RULES, label: 'DQ Rules' },
  { key: SCHEMA_CHANGE, label: 'Schema Change' },
  { key: VOLUME, label: 'Volume' },
  { key: FIELD_HEALTH, label: 'Field Health' },
];

export const statusOptions = [
  { key: ALL, label: 'All', default: false },
  { key: OPEN, label: 'Open', default: true },
  { key: INPROGRESS, label: 'In Progress', default: true },
  { key: FIXED, label: 'Fixed', default: false },
  // { key: NOACTION, label: 'No Action', default: false },
];

export const severityOptions = [
  { key: ALL, label: 'All' },
  { key: CRITICAL, label: READABLE_SEVERITY[CRITICAL] },
  { key: MAJOR, label: READABLE_SEVERITY[MAJOR]  },
  { key: MINOR, label: READABLE_SEVERITY[MINOR] },
];

export const convertTimeToString = (inputTimeString) => {
  const timeString = UTC_to_local_timeConversion(inputTimeString) || inputTimeString;
  const currentDate = new Date();
  const inputDate = new Date(timeString);

  // Check if the input date is today
  if (
    inputDate.getDate() === currentDate.getDate() &&
  inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    return {
      date: 'Today',
      time: inputDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  } else {
    const datePart = inputDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const timePart = inputDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    return {
      date: datePart,
      time: timePart,
    };
  }
};

export const getRelativeTime = (inputTimeString) => {
  const dateString = UTC_to_local_timeConversion(inputTimeString) || inputTimeString;
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - inputDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  if (diffInMilliseconds < 0) return '';

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${diffInSeconds > 1 ? 'seconds' : 'second'} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} ${diffInMonths > 1 ? 'months' : 'month'} ago`;
};

export const getSvgIcons = (name, conditionKey = null) => {
  const svg = {
    expandToggle: (
      <svg
        className={conditionKey ? 'rotate-0' : 'rotate-[270deg]'}
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="#F79009"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    sorting: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.00004 1.33337V10.6667M6.00004 10.6667L10.6667 6.00004M6.00004 10.6667L1.33337 6.00004"
          stroke="#98A2B3"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
  return svg[name];
};

export const sortableColums = ['event_time', 'entity_level3', 'event_type'];