export const DEFAULT_STEP = 1;
export const STEPPER_LENGTH = 3;

export const steps = [
    {
        id: 1,
        name: 'Select service type',
        key: 'select_service_type'
    },
    {
        id: 2,
        name: 'Configure service',
        key: 'configure_service'
    },
    {
        id: 3,
        name: 'Connection details',
        key: 'connection_details'
    }
];

const commonFields = service => [
    {
        id: 99,
        name: 'name',
        type: 'text',
        label: 'Service name',
        value: '',
        required: true,
        placeholder: 'Enter Service name',
        helpText: '',
        warningText: 'Service scheme is required field'
    },
    {
        id: 1,
        name: 'connectionName',
        type: 'text',
        label: 'Connection Name',
        value: service,
        required: true,
        placeholder: 'Enter Connection name/schema',
        helpText: 'SQLAIchemy driver scheme options',
        warningText: 'Connection scheme is required field'
    },
    {
        id: 2,
        name: 'userName',
        label: 'Username',
        type: 'text',
        required: true,
        placeholder: 'Enter username to connect to ' + service,
        helpText: 'The user should have privileges to view all the metadata on ' +  service,
        warningText: 'Username is required field'
    },
    {
        id: 3,
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Enter password to connect to ' + service,
        helpText: '',
        warningText: 'Password is required field'
    }
];

export const mySqlFields = [
    ...commonFields('MySQL'), 
    {
        id: 4,
        name: 'databaseSchema',
        type: 'text',
        label: 'Database schema',
        required: false,
        placeholder: 'Enter database schema of the data source',
        helpText: '',
        warningText: '',
        informationText: 'information',
    }
];

export const snowFlakeFields = [
    ...commonFields('Snowflake'),
    {
        id: 5,
        name: 'account',
        type: 'text',
        label: 'Account',
        required: true,
        placeholder: 'Snowflake account',
        helpText: '',
        warningText: 'Account is required field',
        informationText: 'information',
    },
    {
        id: 6,
        name: 'role',
        type: 'text',
        label: 'Role',
        required: true,
        placeholder: 'Snowflake role',
        helpText: '',
        warningText: 'Role is required field'
    },
    {
        id: 7,
        name: 'database',
        type: 'text',
        label: 'Database',
        required: false,
        placeholder: 'Enter database of the data source',
        helpText: '',
        warningText: '',
        informationText: 'information',
    },
    {
        id: 8,
        name: 'wareHouse',
        type: 'text',
        label: 'Warehouse',
        required: false,
        placeholder: 'Snowflake warehouse',
        helpText: '',
        warningText: 'Warehouse key is required field'
    },
    {
        id: 9,
        name: 'privateKey',
        type: 'password',
        label: 'Private key',
        required: false,
        placeholder: 'Enter private key',
        helpText: 'Connection to snowflake instance via private key',
        warningText: 'Private key is required field'
    },
    {
        id: 10,
        name: 'snowflakePassphraseKey',
        type: 'password',
        label: 'Snowflake passphrase key',
        required: false,
        placeholder: 'Enter passphrase key',
        helpText: 'Snowflake passphrase key used with private key',
        warningText: 'Passphrase key is required field'
    }
];

export const multiLevelFields = [
    {
        id: 1,
        name: 'connectionOptions',
        label: 'Connection options',
        helpText: 'Additional connection options to build the URL that can be sent to service during the connection'
    },
    {
        id: 2,
        name: 'connectionArguments',
        label: 'Connection arguments',
        helpText: 'Connection arguments such as security or protocol configurations that can be sent to service during the connection'
    }
];