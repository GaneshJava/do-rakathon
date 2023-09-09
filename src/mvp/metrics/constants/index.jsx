import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stateData } from "store";
import tableIcon from 'mvp/assets/tableIcon.svg';
import columnIcon from 'mvp/assets/column_icon.svg';
import alldatasourceIcon from 'mvp/assets/all_dashboard.svg';
import { getDispatchObject } from 'mvp/dashboard/molecules/Graph';
import { _COLUMN, _DATABASE, _OVERALL, _TABLE } from 'mvp/constants';
import { capitalize } from 'helpers';
export const CHECKBOX = 0;
export const TEXT_FIELD = 1;
export const NUMERIC = 2;
export const SELECT = 3;


export const SETUP = 1000;
export const NON_SETUP = 0;


//Helper function
export function updateNestedKey(obj, keyPath, value = '', get = 0) {
    const keys = keyPath.split('.');
    let nestedObj = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!nestedObj.hasOwnProperty(key)) {
            nestedObj[key] = {};
        }
        nestedObj = nestedObj[key];
    }
    if (get)
        return nestedObj[keys[keys.length - 1]];
    else {
        nestedObj[keys[keys.length - 1]] = value;
        return obj;
    }
}

export function getValueUsingKey(obj, keyPath) {
    return updateNestedKey(obj, keyPath, '', 1);
}

export function getRuleObj(nodeObj, user, rule, newConfig) {
    let finalObj = getDispatchObject('', user, nodeObj);
    finalObj.config = newConfig;
    finalObj.ruleId = rule.stateKey;
    finalObj.temporaryConfigId = -999_999;
    finalObj.ruleName = rule.ruleName;
    return finalObj;
}

export function decodeJsonDataToObject(data) {
    Object.keys(data).map(ruleId => {
        let config = data[ruleId]?.config ?? '';
        config = typeof config === 'string' ? JSON.parse(config) : { value: '' };
        data[ruleId].config = config;
        return true;
    })
    return data;
}

export function updateNodeValuesUsingNodeId(ruleObj) {
    Object.keys(ruleObj).map(nodeId => document.getElementById(nodeId).innerHTML = ruleObj[nodeId])
}

export function getCountOfEntities(tree, selectedEntity) {
    let count = 0;
    if (selectedEntity.level === _OVERALL)
        count = tree.length
    else if (selectedEntity.level === _DATABASE) {
        tree.forEach(database => {
            if (database.id === selectedEntity.connId)
                count += database.nodes.length;
        });
    } else if (selectedEntity.level === _TABLE) {
        tree.forEach(database => {
            if (database.id === selectedEntity.connId) {
                database.nodes.forEach(table => {
                    if (table.key === selectedEntity.tableName)
                        count = table.nodes.length;
                });
            }
        });
    }
    return count;
}


export function getOptions(nodeObj, directValues = 3) {
    if (directValues === 1) {
        return [
            { value: 'int', label: 'Int' },
            { value: 'float', label: 'Float' },
            { value: 'string', label: 'String' },
            { value: 'boolean', label: 'Boolean' },
            { value: 'categorical', label: 'Categorical' },
        ]
    } else if (directValues === 2) {
        return [{ value: nodeObj.columnName, label: nodeObj.columnName }]
    } else {
        return getSiblingEntities(nodeObj);
    }
}

function getSiblingEntities(nodeObject) {
    const tree = GetTree();
    if (tree && tree.length) {
        const { connId, tableName, columnName } = nodeObject;
        const database = tree.find(node => node.id === connId) || {};
        const table = database.nodes.find(node => node.key === tableName) || {};
        if (columnName) {
            const column = table.nodes.find(node => node.label === columnName) || {};
            const siblings = table.nodes.filter(node => node.id !== column.id) || [];
            return siblings.map(node => ({ value: node.label, label: node.label })) || [];
        } else {
            return (table?.nodes ?? []).map(node => ({ value: node.label, label: node.label })) || [];
        }
    }
}


export const masterRuleProperties = [
    {
        id: 'db_rule_3',
        stateKey: 'new_table_added',
        label: 'New Table Added',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        checked: true,
        disabled: false,
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'db_rule_4',
        stateKey: 'existing_table_deleted',
        label: 'Existing Table Deleted',
        type: NON_SETUP,
        elementType: CHECKBOX,
        checked: true,
        disabled: false,
        placeholder: '',
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'table_rule_0.1',
        stateKey: 'expect_table_columns_to_match_set',
        label: 'Table Column Match',
        keysToPush: ['expect_table_columns_to_match_set'],
        type: SETUP,
        commaSeparated: true,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_table_columns_to_match_set',
                placeholder: 'Enter table name',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'table_rule_0.2',
        stateKey: 'expect_table_columns_to_match_ordered_list',
        label: 'Table Column Match - Ordered',
        keysToPush: ['expect_table_columns_to_match_ordered_list'],
        type: SETUP,
        commaSeparated: false,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_table_columns_to_match_ordered_list',
                placeholder: 'Enter values',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'table_rule_1',
        stateKey: 'expect_table_row_count_to_be_between',
        label: 'Row Count Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'table_rule_2',
        stateKey: 'expect_table_row_count_to_equal',
        label: 'Row Column Equals',
        keysToPush: ['expect_table_row_count_to_equal'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_table_row_count_to_equal',
                placeholder: 'Enter value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'table_rule_3',
        stateKey: 'new_column_added',
        label: 'New column added',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        checked: true,
        disabled: false,
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'table_rule_4',
        stateKey: 'existing_column_deleted',
        label: 'Existing column deleted',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        checked: true,
        disabled: false,
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'table_rule_5',
        stateKey: 'table_volume',
        label: 'Table volume',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        checked: true,
        disabled: false,
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'col_rule_1',
        stateKey: 'expect_column_values_to_be_unique',
        label: 'Column Exists',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'col_rule_2',
        stateKey: 'expect_column_to_exist',
        label: 'Unique Columns',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'col_rule_3',
        stateKey: 'expect_column_values_to_not_be_null',
        label: 'Columns Not Null',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'col_rule_4',
        stateKey: 'expect_column_values_to_be_null',
        label: 'Null Percentage',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'col_rule_5',
        stateKey: 'expect_column_values_to_be_of_type',
        keysToPush: ['expect_column_values_to_be_of_type'],
        label: 'Column Type',
        type: SETUP,
        commaSeparated: false,
        elementType: SELECT,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_be_of_type',
                placeholder: 'Select type',
                warningText: '',
                helpText: '',
                informationText: '',
                options: (nodeObj) => getOptions(nodeObj, 1)
            }
        ],
    },
    {
        id: 'col_rule_6',
        stateKey: 'expect_column_values_to_be_in_type_list',
        label: 'Column Type - List',
        keysToPush: ['expect_column_values_to_be_in_type_list'],
        type: SETUP,
        commaSeparated: true,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_be_in_type_list',
                placeholder: 'Enter values',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_7',
        stateKey: 'expect_column_values_to_be_in_set',
        label: 'Column Values - List',
        keysToPush: ['expect_column_values_to_be_in_set'],
        type: SETUP,
        commaSeparated: true,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_be_in_set',
                placeholder: 'Enter values',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_8',
        stateKey: 'expect_column_values_to_not_be_in_set',
        label: 'Column Values - Not in Set',
        keysToPush: ['expect_column_values_to_not_be_in_set'],
        type: SETUP,
        commaSeparated: true,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_not_be_in_set',
                placeholder: 'Enter values',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_9',
        stateKey: 'expect_column_values_to_be_between',
        label: 'Column Values - In Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_10',
        stateKey: 'expect_column_values_to_be_increasing',
        label: 'Increasing Column Values',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: 'Selected column should be increasing',
        informationText: '',
    },
    {
        id: 'col_rule_11',
        stateKey: 'expect_column_values_to_be_decreasing',
        label: 'Decreasing Column Values',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: 'Selected column should be decreasing',
        informationText: '',
    },
    {
        id: 'col_rule_12',
        stateKey: 'expect_column_value_lengths_to_be_between',
        label: 'Column Value Length Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_13',
        stateKey: 'expect_column_value_lengths_to_equal',
        label: 'Column Length',
        keysToPush: ['expect_column_value_lengths_to_equal'],
        type: SETUP,
        commaSeparated: false,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_value_lengths_to_equal',
                placeholder: 'Enter value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_14',
        stateKey: 'expect_column_values_to_match_regex',
        label: 'Column Values - Match Regex',
        keysToPush: ['expect_column_values_to_match_regex'],
        type: SETUP,
        commaSeparated: false,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_match_regex',
                placeholder: 'Enter value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_15',
        stateKey: 'expect_column_values_to_not_match_regex',
        label: 'Column Values - Not Match Regex',
        keysToPush: ['expect_column_values_to_not_match_regex'],
        type: SETUP,
        commaSeparated: false,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_not_match_regex',
                placeholder: 'Enter value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_16',
        stateKey: 'expect_column_values_to_match_regex_list',
        label: 'Column Values - Match Regex List',
        keysToPush: ['expect_column_values_to_match_regex_list'],
        type: SETUP,
        commaSeparated: true,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_values_to_match_regex_list',
                placeholder: 'Enter value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ],
    },
    {
        id: 'col_rule_17',
        stateKey: 'expect_column_mean_to_be_between',
        label: 'Column Mean Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_18',
        stateKey: 'expect_column_median_to_be_between',
        label: 'Column Median Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_19',
        stateKey: 'expect_column_max_to_be_between',
        label: 'Column Max Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_20',
        stateKey: 'expect_column_min_to_be_between',
        label: 'Column Min Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_21',
        stateKey: 'expect_column_sum_to_be_between',
        label: 'Column Sum Between',
        keysToPush: ['min_value', 'max_value'],
        type: SETUP,
        commaSeparated: false,
        elementType: NUMERIC,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'min_value',
                placeholder: 'Min value',
                warningText: '',
                helpText: '',
                informationText: '',
            },
            {
                stateKey: 'max_value',
                placeholder: 'Max value',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_22',
        stateKey: 'expect_compound_columns_to_be_unique',
        label: 'Unique Compound columns',
        keysToPush: ['expect_compound_columns_to_be_unique'],
        type: SETUP,
        commaSeparated: false,
        elementType: SELECT,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_compound_columns_to_be_unique',
                placeholder: 'Select column',
                warningText: '',
                helpText: '',
                informationText: '',
                isMulti: true,
                options: (nodeObj) => getOptions(nodeObj)
            }
        ]
    },
    {
        id: 'col_rule_23',
        stateKey: 'expect_multicolumn_sum_to_equal',
        label: 'Multicolumn Sum',
        keysToPush: ['column', 'sum'],
        type: SETUP,
        commaSeparated: false,
        numberOfFields: 2,
        fields: [
            {
                stateKey: 'column',
                placeholder: 'Select column',
                elementType: SELECT,
                warningText: '',
                helpText: '',
                informationText: '',
                isMulti: true,
                options: (nodeObj) => getOptions(nodeObj)
            },
            {
                stateKey: 'sum',
                placeholder: 'Enter values',
                elementType: TEXT_FIELD,
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },
    {
        id: 'col_rule_24',
        stateKey: 'expect_column_pair_values_to_be_equal',
        label: 'Column Pair Values',
        keysToPush: ['expect_column_pair_values_to_be_equal'],
        type: SETUP,
        commaSeparated: false,
        elementType: SELECT,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'expect_column_pair_values_to_be_equal',
                placeholder: 'Select column',
                warningText: '',
                helpText: '',
                informationText: '',
                options: (nodeObj) => getOptions(nodeObj)
            }
        ]
    },
    {
        id: 'col_rule_25',
        stateKey: 'type_change',
        label: 'Type Change',
        type: NON_SETUP,
        elementType: CHECKBOX,
        placeholder: '',
        warningText: '',
        helpText: '',
        informationText: '',
    },
    {
        id: 'col_rule_26',
        stateKey: 'ordinal',
        label: 'Ordinal',
        keysToPush: ['ordinal'],
        type: SETUP,
        commaSeparated: true,
        elementType: TEXT_FIELD,
        numberOfFields: 1,
        fields: [
            {
                stateKey: 'ordinal',
                placeholder: '',
                warningText: '',
                helpText: '',
                informationText: '',
            }
        ]
    },

];

export const dataCard = (type) => [
    {
        id: 'totalNumberOfEntities',
        name: capitalize(type),
        value: '...'
    },
    {
        id: 'totalNumberRules',
        name: 'Total Rules',
        value: '...'
    },
    {
        id: 'totalBreaches',
        name: 'Number of Breaches',
        value: '...'
    }
];


export const getDataIcons = (type) => {
    let icon, width, height;
    if (type === _OVERALL || type === _DATABASE) {
        icon = alldatasourceIcon;
        width = 'w-8';
        height = 'h-8';
    }
    if (type === _TABLE) {
        icon = tableIcon;
        width = 'w-6';
        height = 'h-6';
    }
    if (type === _COLUMN) {
        icon = columnIcon;
        width = 'w-5';
        height = 'h-6';
    }
    return <img src={icon} alt="typeIcon" className={`${width} ${height}`} />;
};


export function updateStateKeys(level, masterRules, localRules = masterRuleProperties) {
    let rulesToConfig = [];
    // Loop through each rule in localRules
    for (let rule of localRules) {
        // Find the corresponding rule in masterRules based on ruleName and stateKey
        const apiRule = masterRules.find(api => [rule.stateKey, rule.ruleName || ''].includes(api.ruleName));
        // If a matching rule is found in masterRules, update the stateKey in localRules
        if (apiRule && apiRule.level === level) {
            rule.stateKey = apiRule.ruleId;
            rule.ruleName = apiRule.ruleName;
            rulesToConfig.push(rule);
        }
    }
    return rulesToConfig;
}


//FUNCTION TO GET TREE STRUCTURE ARRAY
function GetTree() {
    const [tree, setTree] = useState([]);
    const { treeLoaded, treeArray } = useSelector(stateData.treeArray);
    useEffect(() => {
        setTree(treeLoaded ? treeArray : []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeLoaded])

    return tree
}
