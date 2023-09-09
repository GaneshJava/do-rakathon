export const GET_REFRESH_TOKEN = 'auth/refreshtoken';
export const AUTH_SIGN_IN = 'auth/signin';
export const AUTH_SIGN_OUT = 'auth/signout';

export const TEST_CONNECTION = 'connection/test';
export const SAVE_CONNECTION = 'connection/save';

export const ACCESS_TOKEN = 'control-plane-jwt-access-token';
export const REFRESH_TOKEN = 'control-plane-jwt-refresh-token';
export const USER_OBJ = 'userObj';
export const IS_AUTHENTICATED = 'isAuthenticated';

export const CONNECTIONS_TREE = 'data/connections';

//Dashborad api's constant
export const GET_EVENTS_DATA = 'data/events';
export const GET_METRICS_DATA = 'data/metrics';

//Metrics api's constants
export const FETCH_RULE_CONFIG = 'rules/config';
export const STORE_RULE_CONFIG = 'rules/config';
export const GET_MASTER_RULES = 'rules/master';
export const DELETE_RULE = 'rules/config';

//Email api's constants
export const EMAIL_API = 'email-details/';

//for these api's auth token in headers not neeeded
export const PUBLIC_APIS = [GET_REFRESH_TOKEN, AUTH_SIGN_IN, AUTH_SIGN_OUT];

//DO-1.0 API's routes
const ALERTS_ENDPOINT = 'alerts';
const EVENTS_ENDPOINT = 'events';
export const FETCH_ALL_ANOMALIES = ALERTS_ENDPOINT;
export const FETCH_ANOMALY_HEADER_DATA = ALERTS_ENDPOINT;
export const FETCH_ANOMALY_FOR_AN_ASSET = ALERTS_ENDPOINT;
export const UPDATE_STATUS_OF_AN_ANOMALY = ALERTS_ENDPOINT;
export const FETCH_ANOMALY_GRAPH_BASED_ON_TYPE = EVENTS_ENDPOINT;


//MONITORS APIS
export const FETCH_MONITOR_ASSETS = 'monitors/asset-tree';
export const FETCH_MONITOR_FIELD_LEVEL = 'monitors/field-level/asset-tree';
export const FETCH_LAST_N_EXECUTION_RESULTS = 'events/rule-details';
export const SAVE_CONFIGURED_MONITOR_ASSETS = '/monitors';


//AIRFLOW DAGS APIs
export const FETCH_LIST_OF_DAGS = 'airflow/dags';
export const FETCH_LIST_OF_DAGS_RUNS = (dagId) => `airflow/dag/${dagId}`;

export const GET_ALL_CONNECTIONS = 'connections/tenant';
export const DASHBOARD_ASSET_COUNTS = 'dashboard/asset-count/tenant';
export const GET_DASHBOARD_EVENTS_DATA = 'dashboard/anomaly-count/tenant/event';

//MATILLIION APIs
export const MATILLIION = 'matillion';
export const MATILLION_GROUPS = `${MATILLIION}/group`;
export const MATILLION_PROJECTS = (groupId) => `${MATILLIION}/group/name/${groupId}/project`;
export const MATILLION_VERSIONS = (groupId, projectId) => `${MATILLIION}/group/name/${groupId}/project/name/${projectId}/version`;
export const MATILLION_JOBS_LIST = (groupId, projectId, versionId) => `${MATILLIION}/group/name/${groupId}/project/name/${projectId}/version/name/${versionId}/export`;
export const MATILLION_JOBS_EXECUTION = (groupId, projectId, jobName) => `${MATILLIION}/group/name/${groupId}/project/name/${projectId}/task/filter/by/job/name/${jobName}`;
