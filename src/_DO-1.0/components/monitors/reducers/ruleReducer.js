import { getEntityLevels } from "../molecules/DQRuleConfiguration";
import { READABLE_SEVERITY, CRITICAL, MAJOR, MINOR, DQ_RULES } from "_DO-1.0/reducers";
export const CHECKBOX = 'checkbox';
export const TEXT_FIELD = 'text';
export const TEXT_AREA = 'textarea';
export const NUMERIC = 'numeric';
export const SELECT = 'select';
export const NULL_VALUES = 'null_values';
export const DUPLICATE_VALUES = 'duplicate_values';
export const DUPLICATE_CHECK = 'duplicate_check';
export const PATTERN_MATCH = 'pattern_match';
export const SCHEMA_MATCH = 'schema_match';
export const FIELD_VALUE_RANGE = 'field_value_range';
export const ENUMERATIONS = 'enumerations';
export const RULE_NAME = 'ruleName';
export const RULE_CONDITION = 'ruleCondition';
export const RULE_SEVERITY = 'ruleSeverity';
export const RULE_VALUE = 'ruleValue';

export const ruleSeverityOptions = [
    { label: READABLE_SEVERITY[CRITICAL], value: CRITICAL },
    { label: READABLE_SEVERITY[MAJOR], value: MAJOR },
    { label: READABLE_SEVERITY[MINOR], value: MINOR }
];

export const ruleGroupsOptions = [
    {
        key: 'rule_group_1',
        value: NULL_VALUES,
        label: 'Null values'
    },
    {
        key: 'rule_group_2',
        value: DUPLICATE_VALUES,
        label: 'Duplicate Values'
    },
    {
        key: 'rule_group_3',
        value: PATTERN_MATCH,
        label: 'Pattern Match'
    },
    {
        key: 'rule_group_4',
        value: SCHEMA_MATCH,
        label: 'Schema Match'
    },
    {
        key: 'rule_group_5',
        value: FIELD_VALUE_RANGE,
        label: 'Field Value Range'
    },
    {
        key: 'rule_group_6',
        value: ENUMERATIONS,
        label: ENUMERATIONS,
    },
];

export const ruleGroupsControlFields = {
    [NULL_VALUES]: [
        getRuleNameObject('rule_group_1_field_1'),
        getRuleConditionObject('rule_group_1_field_2'),
        getSeverityObject('rule_group_1_field_4')
    ],
    [DUPLICATE_VALUES]: [
        getRuleNameObject('rule_group_2_field_1'),
        getSeverityObject('rule_group_2_field_4')
    ],
    [PATTERN_MATCH]: [
        getRuleNameObject('rule_group_3_field_1'),
        getRuleConditionObject('rule_group_3_field_2'),
        getRuleValueObject('rule_group_3_field_3'),
        getSeverityObject('rule_group_3_field_4')
    ],
    [SCHEMA_MATCH]: [
        getRuleNameObject('rule_group_4_field_1'),
        getDependentValueObject('rule_group_4_field_3'),
        getSeverityObject('rule_group_4_field_4')
    ],
    [FIELD_VALUE_RANGE]: [
        getRuleNameObject('rule_group_5_field_1', 'Metrics'),
        getDependentValueObject('rule_group_5_field_3'),
        getSeverityObject('rule_group_5_field_4', 'w-full')
    ],
    [ENUMERATIONS]: [
        getRuleNameObject('rule_group_6_field_1'),
        getDependentValueObject('rule_group_6_field_3'),
        getSeverityObject('rule_group_5_field_6', 'w-full')
    ]
};

export const ruleDropDownOptions = {
    [NULL_VALUES]: {
        [RULE_NAME]: [{ label: 'Null Check', value: 'null_check' }],
        [RULE_CONDITION]: [
            { label: 'Equal to Null', value: 'is_equal_to_null' },
            { label: 'Not Equal to Null', value: 'is_not_equal_to_null' }
        ],
        [RULE_SEVERITY]: ruleSeverityOptions,
    },
    [DUPLICATE_VALUES]: {
        [RULE_NAME]: [{ label: 'Duplicate Check', value: DUPLICATE_CHECK }],
        [RULE_SEVERITY]: ruleSeverityOptions,
    },
    [PATTERN_MATCH]: {
        [RULE_NAME]: [
            { label: 'Pattern Match by Value', value: 'pattern_by_value' },
            { label: 'Pattern Match by List', value: 'pattern_by_list' }
        ],
        [RULE_CONDITION]: [
            { label: 'Is Equal to', value: 'is_equal_to' },
            { label: 'Is Not Equal to', value: 'is_not_equal_to' }
        ],
        [RULE_SEVERITY]: ruleSeverityOptions,
    },
    [SCHEMA_MATCH]: {
        [RULE_NAME]: [
            { label: 'Data Type Check', value: 'data_type_check' },
            { label: 'JSON Schema Check', value: 'json_schema_check' }
        ],
        [RULE_VALUE]: [
            { value: 'int', label: 'Int' },
            { value: 'float', label: 'Float' },
            { value: 'string', label: 'String' },
            { value: 'boolean', label: 'Boolean' },
        ],
        [RULE_SEVERITY]: ruleSeverityOptions,
    },
    [FIELD_VALUE_RANGE]: {
        [RULE_NAME]: [
            { label: 'Max', value: 'max' },
            { label: 'Min', value: 'min' },
            { label: 'Median', value: 'median' },
            { label: 'Mean', value: 'mean' },
            { label: 'Unique', value: 'unique' },
            { label: 'Quantile', value: 'quantile' },
            { label: 'Standard Deviation', value: 'standard_deviation' },
            { label: 'Sum', value: 'sum' },
            // { label: 'Z-score', value: 'z_score' },
            { label: 'Length', value: 'length' }
        ],
        lengthCondition: [
            { label: 'Is Between', value: 'length_is_between' },
            { label: 'Is Equal to', value: 'length_is_equal_to' }
        ],
        zScoreCondition: [
            { label: 'Is Less Than', value: 'is_less_than' }
        ],
        [RULE_SEVERITY]: ruleSeverityOptions,
    },
    [ENUMERATIONS]: {
        [RULE_NAME]: [
            { label: 'Values in Set', value: 'values_in_set' },
            { label: 'Distinct Values in Set', value: 'distinct_values_in_set' },
            { label: 'Distinct Values Equal to Set', value: 'distinct_values_equal_to_set' },
            { label: 'Distinct Values Contain Set', value: 'distinct_values_contain_set' },
            { label: 'Values Not in Set', value: 'values_not_in_set' },
            { label: 'Most Common Value in Set', value: 'most_common_value_in_set' },
            { label: 'Pair of Values in Set', value: 'pair_of_values_in_set' },
            { label: 'Values in Type List', value: 'values_in_type_list' }
        ],
        [RULE_VALUE]: [
            { value: 'int', label: 'Int' },
            { value: 'float', label: 'Float' },
            { value: 'string', label: 'String' },
            { value: 'boolean', label: 'Boolean' },
        ],
        columnsPaired: [],
        [RULE_SEVERITY]: ruleSeverityOptions,
    }
}


function getRuleNameObject(key, label = '') {
    return {
        id: key,
        value: RULE_NAME,
        label: label || 'Rule Name',
        required: true,
        helpText: '',
        warningText: '',
        informationText: '',
        className: 'w-full',
        component: SELECT,
        fieldClass: 'w-full'
    }
}

function getRuleConditionObject(key, valueKey = '', fieldClsKey = 'w-full') {
    return {
        id: key,
        value: valueKey || RULE_CONDITION,
        label: 'Rule Condition',
        required: true,
        helpText: '',
        warningText: 'Rule condition is required field',
        informationText: '',
        className: 'w-full',
        component: SELECT,
        fieldClass: fieldClsKey
    }
}

function getRuleValueObject(key, label = '', valueKey = '', componentKey = '', fieldClsKey = '', isMulti = false) {
    return {
        id: key,
        value: valueKey || RULE_VALUE,
        label: label || 'Value',
        required: true,
        helpText: '',
        warningText: 'Value is required field',
        informationText: '',
        className: 'w-full',
        component: componentKey || TEXT_FIELD,
        fieldClass: fieldClsKey || 'w-full',
        isMulti: isMulti,
    }
}

function getDependentValueObject(key) {
    return {
        data_type_check: [getRuleValueObject(`${key}_1`, 'Data Type', '', SELECT)],
        json_schema_check: [getRuleValueObject(`${key}_2`, 'Track Field', '', TEXT_AREA)],
        min: getFieldRangeValueObj('min'),
        max: getFieldRangeValueObj('max'),
        median: getFieldRangeValueObj('median'),
        mean: getFieldRangeValueObj('mean'),
        unique: getFieldRangeValueObj('unique'),
        quantile: getFieldRangeValueObj('quantile'),
        standard_deviation: getFieldRangeValueObj('sd'),
        sum: getFieldRangeValueObj('sum'),
        length_is_equal_to: getFieldRangeValueObj('length', 'length_is_equal_to'),
        length_is_between: getFieldRangeValueObj('length', 'length_is_between'),
        z_score: getFieldRangeValueObj('z_score'),
        values_in_set: [getRuleValueObject(`${key}_1`, 'Value Set', '', TEXT_FIELD)],
        distinct_values_in_set: [getRuleValueObject(`${key}_2`, 'Value Set', '', TEXT_FIELD)],
        distinct_values_equal_to_set: [getRuleValueObject(`${key}_3`, 'Value Set', '', TEXT_FIELD)],
        distinct_values_contain_set: [getRuleValueObject(`${key}_4`, 'Value Set', '', TEXT_FIELD)],
        values_not_in_set: [getRuleValueObject(`${key}_5`, 'Value Set', '', TEXT_FIELD)],
        most_common_value_in_set: [getRuleValueObject(`${key}_6`, 'Value Set', '', TEXT_FIELD)],
        pair_of_values_in_set: [getRuleValueObject(`${key}_7`, 'Column to be paired', 'columnsPaired', SELECT)],
        values_in_type_list: [getRuleValueObject(`${key}_8`, 'Type List', '', SELECT, '', true)]
    }
}

function getFieldRangeValueObj(key, subKey = '') {
    let returnFields = [];
    let widthClass = key === 'length' ? 'basis-[38%]' : 'basis-[49%]';
    returnFields = [
        getRuleValueObject(`rule_group_5_field_3_${key}_1`, 'Lower Value', 'lowerValue', TEXT_FIELD, widthClass),
        getRuleValueObject(`rule_group_5_field_3_${key}_2`, 'Upper Value', 'upperValue', TEXT_FIELD, `${widthClass} ml-[2%]`)
    ];
    if (key === 'length' || key === 'z_score') {
        let lengthFields = [getRuleConditionObject(`rule_group_5_field_3_condition_${key}_1`, key === 'z_score' ? 'zScoreCondition' : 'lengthCondition', `basis-[20%] mr-[2%]`)];
        if (subKey === 'length_is_between')
            lengthFields = [...lengthFields, ...returnFields];
        else
            lengthFields = [...lengthFields, getRuleValueObject(`rule_group_5_field_3_${key}_${subKey}_1`, 'Value', '', TEXT_FIELD, 'basis-[78%]')]
        returnFields = lengthFields
    }
    return returnFields;
}

function getSeverityObject(key, fieldClsKey = '') {
    return {
        id: key,
        value: RULE_SEVERITY,
        label: 'Severtity',
        required: true,
        helpText: '',
        warningText: 'Severity is required field',
        informationText: '',
        className: 'w-full',
        component: SELECT,
        fieldClass: fieldClsKey || 'w-full'
    }
}


//-----  FUNCTIONS RELATED TO POSTDATA AND OTHER SELECT HANDLER ----------//

export const getDqRulesConfigData = (ruleData) => {
    let dqRulesConfig = [];
    Object.keys(ruleData)?.forEach(eachRuleKey => {
        const ruleArray = ruleData[eachRuleKey] || [];
        ruleArray.forEach(eachRule => {
            if (eachRule.ruleGroup) {
                const { entityLevel1, entityLevel2, entityLevel3, entityLevel4 } = getEntityLevels(eachRuleKey, 1);
                const { ruleSubType, configValues } = ruleSubTypeCondigMapping(eachRule);
                dqRulesConfig.push({
                    monitorRuleConfigId: "",
                    ruleId: "",
                    ruleType: DQ_RULES,
                    ruleSubType: ruleSubType,
                    pillar: DQ_RULES,
                    level: "entity_level_4",
                    config: configValues ? JSON.stringify(configValues) : "{}",
                    ruleGroup: eachRule.ruleGroup,
                    severity: eachRule.ruleSeverity || CRITICAL,
                    entityLevel1,
                    entityLevel2,
                    entityLevel3,
                    entityLevel4,
                })
            }
        })

    })
    return dqRulesConfig;
}

export const ruleSubTypeCondigMapping = (ruleObject) => {
    let {
        ruleGroup,
        ruleName,
        ruleCondition,
        ruleValue,
        lowerValue,
        upperValue,
        lengthCondition
    } = ruleObject;
    let configValues = '', ruleSubType = '';
    switch (ruleGroup) {
        case FIELD_VALUE_RANGE:
            configValues = { min_value: lowerValue, max_value: upperValue }
            if (ruleName === 'max')
                ruleSubType = 'expect_column_max_to_be_between';
            else if (ruleName === 'min')
                ruleSubType = 'expect_column_min_to_be_between';
            else if (ruleName === 'median')
                ruleSubType = 'expect_column_median_to_be_between';
            else if (ruleName === 'mean')
                ruleSubType = 'expect_column_mean_to_be_between';
            else if (ruleName === 'unique')
                ruleSubType = 'expect_column_proportion_of_unique_values_to_be_between';
            else if (ruleName === 'quantile')
                ruleSubType = 'expect_column_quantile_values_to_be_between';
            else if (ruleName === 'standard_deviation')
                ruleSubType = 'expect_column_stdev_to_be_between';
            else if (ruleName === 'sum')
                ruleSubType = 'expect_column_sum_to_be_between';
            else if (ruleName === 'length' && lengthCondition === 'length_is_between')
                ruleSubType = 'expect_column_value_lengths_to_be_between';
            else if (ruleName === 'length' && lengthCondition === 'length_is_equal_to') {
                ruleSubType = 'expect_column_value_lengths_to_equal';
                configValues = { value: ruleValue }
            }
            break;
        case ENUMERATIONS:
            configValues = { value_set: typeof ruleValue === 'string' ? ruleValue.split(',') : [] }
            if (ruleName === 'values_in_set')
                ruleSubType = 'expect_column_values_to_be_in_set';
            else if (ruleName === 'distinct_values_in_set')
                ruleSubType = 'expect_column_distinct_values_to_be_in_set';
            else if (ruleName === 'distinct_values_equal_to_set')
                ruleSubType = 'expect_column_distinct_values_to_equal_set';
            else if (ruleName === 'distinct_values_contain_set')
                ruleSubType = 'expect_column_distinct_values_to_contain_set';
            else if (ruleName === 'values_not_in_set')
                ruleSubType = 'expect_column_values_to_not_be_in_set';
            else if (ruleName === 'most_common_value_in_set')
                ruleSubType = 'expect_column_most_common_value_to_be_in_set';
            else if (ruleName === 'pair_of_values_in_set')
                ruleSubType = 'expect_column_pair_values_to_be_in_set';
            else if (ruleName === 'values_in_type_list') {
                ruleSubType = 'expect_column_values_to_be_in_type_list';
                configValues = { type_list: ruleValue }
            }
            break;
        case PATTERN_MATCH:
            if (ruleName === 'pattern_by_value') {
                ruleSubType = ruleCondition === 'is_equal_to' ? 'expect_column_values_to_match_regex' : 'expect_column_values_to_not_match_regex';
                configValues = { regex: ruleValue }
            } else {
                ruleSubType = ruleCondition === 'is_equal_to' ? 'expect_column_values_to_match_regex_list' : 'expect_column_values_to_not_match_regex_list';
                configValues = { regex: ruleValue.split(',') }
            }
            break;
        case SCHEMA_MATCH:
            if (ruleName === 'data_type_check') {
                ruleSubType = 'expect_column_values_to_be_of_type';
                configValues = { type_: ruleValue }
            } else {
                ruleSubType = 'expect_column_values_to_be_of_type';
                configValues = { json_schema: ruleValue }
            }
            break;
        case NULL_VALUES:
            ruleSubType = ruleCondition === 'is_equal_to_null' ? 'expect_column_values_to_be_null' : 'expect_column_values_to_not_be_null';
            break;
        case DUPLICATE_VALUES:
            ruleSubType = 'expect_column_values_to_be_unique';
            break;
        default:
            break;
    }
    return { ruleSubType, configValues }
}

export const handleSelectionUpdates = (setObj, value, ruleKey, ruleConfigIndex) => {
    if (value === 'pattern_by_value' || value === 'pattern_by_list') {
        setObj.ruleData[ruleKey][ruleConfigIndex].ruleCondition = 'is_equal_to';
    }
    if (value === 'data_type_check' || value === 'json_schema_check') {
        setObj.ruleData[ruleKey][ruleConfigIndex].ruleValue = '';
    }
    if (value === 'length') {
        setObj.ruleData[ruleKey][ruleConfigIndex].dependentKey =
            setObj.ruleData[ruleKey][ruleConfigIndex].lengthCondition = 'length_is_between';
    }
    if (value === 'length_is_between' || value === 'length_is_equal_to') {
        setObj.ruleData[ruleKey][ruleConfigIndex].dependentKey = value;
    }
    if (!['length_is_between', 'length_is_equal_to', 'length', CRITICAL, MAJOR, MINOR].includes(value)) {
        setObj.ruleData[ruleKey][ruleConfigIndex].dependentKey = null;
    }
    if (value === 'z_score') {
        setObj.ruleData[ruleKey][ruleConfigIndex].zScoreCondition = 'is_less_than';
    }
    if (value === 'values_in_type_list' || value === 'pair_of_values_in_set') {
        setObj.ruleData[ruleKey][ruleConfigIndex].ruleValue =
            setObj.ruleData[ruleKey][ruleConfigIndex].columnsPaired = [];
    }
    return setObj;
}

export const readableGreateExpRules = {
    //---FRESHNESS---//
    "expect_change_in_freshness_to_be_lesser_than": "Notify when the table does not update within",
    //--VOLUME---//
    "expect_change_in_row_count_to_be_greater_than": "Expect Change in Row Count to be Greater Than",
    "expect_change_in_row_count_to_be_lesser_than": "Expect Change in Row Count to be Lesser Than",
    "expect_change_in_row_count_to_be_between": "Expect Change in Row Count to be Between",
    "expect_change_in_size_to_be_greater_than": "Expect Change in Size to be Greater Than",
    "expect_change_in_size_to_be_lesser_than": "Expect Change in Size to be Lesser Than",
    "expect_change_in_size_to_be_between": "Expect Change in Size to be Between",
    //---- DQ RULES-----///
    "expect_column_values_to_not_be_null": "Expect Column Values not be Null",
    "expect_column_values_to_be_null": "Expect Column Values to be Null",
    "expect_column_values_to_not_be_null_and_column_to_not_be_empty": "Expect Column Values not be Null and Column not be Empty",
    "expect_column_values_to_be_unique": "Expect Column Values to be Unique",
    "expect_column_values_to_be_of_type": "Expect Column Values to be of Type",
    "expect_column_values_to_match_json_schema": "Expect Column Values to Match JSON Schema",
    "expect_column_values_to_match_regex": "Expect Column Values to Match Regex",
    "expect_column_values_to_not_match_regex": "Expect Column Values to Not Match Regex",
    "expect_column_values_to_match_regex_list": "Expect Column Values to Match Regex List",
    "expect_column_values_to_not_match_regex_list": "Expect Column Values to Not Match Regex List",
    "expect_column_values_to_be_in_set": "Expect Column Values to be in Set",
    "expect_column_distinct_values_to_be_in_set": "Expect Column Distinct Values to be in Set",
    "expect_column_distinct_values_to_equal_set": "Expect Column Distinct Values to Equal Set",
    "expect_column_distinct_values_to_contain_set": "Expect Column Distinct Values to Contain Set",
    "expect_column_values_to_not_be_in_set": "Expect Column Values to Not be in Set",
    "expect_column_most_common_value_to_be_in_set": "Expect Column Most Common Value to be in Set",
    "expect_column_pair_values_to_be_in_set": "Expect Column Pair Values to be in Set",
    "expect_column_values_to_be_in_type_list": "Expect Column Values to be in Type List",
    "expect_column_max_to_be_between": "Expect Column Max to be Between",
    "expect_column_mean_to_be_between": "Expect Column Mean to be Between",
    "expect_column_median_to_be_between": "Expect Column Median to be Between",
    "expect_column_min_to_be_between": "Expect Column Min to be Between",
    "expect_column_proportion_of_unique_values_to_be_between": "Expect Column Proportion of Unique Values to be Between",
    "expect_column_quantile_values_to_be_between": "Expect Column Quantile Values to be Between",
    "expect_column_stdev_to_be_between": "Expect Column Standard Deviation to be Between",
    "expect_column_sum_to_be_between": "Expect Column Sum to be Between",
    "expect_column_value_lengths_to_be_between": "Expect Column Value Lengths to be Between",
    "expect_column_value_lengths_to_equal": "Expect Column Value Lengths to Equal",
    "expect_column_value_z_scores_to_be_less_than": "Expect Column Value Z-Scores to be Less Than"
}