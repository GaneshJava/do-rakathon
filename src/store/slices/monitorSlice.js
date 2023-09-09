import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    FETCH_MONITOR_ASSETS,
    SAVE_CONFIGURED_MONITOR_ASSETS,
    FETCH_MONITOR_FIELD_LEVEL
} from 'api/constants';
import { __response } from 'api/apiHelper';
import { apiService } from 'api';

export const fetchAssetsForMonitor = createAsyncThunk(FETCH_MONITOR_ASSETS, async ({tenantId, connId, monitorType}) => {
    const response = await __response(apiService.get(`${monitorType === 'field' ? FETCH_MONITOR_FIELD_LEVEL : FETCH_MONITOR_ASSETS}/${tenantId}/${connId}`));
    return {
        "data": [
            {
                "asset_id": "CUSTDOMAIN_DB_STG$CUSTDOMAIN_SC_STG$CUST_CARD_APP_STG",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "CUSTDOMAIN_DB_STG",
                "entity_level_2": "CUSTDOMAIN_SC_STG",
                "entity_level_3": "CUST_CARD_APP_STG",
                "asset_type": null,
                "monitor_details": {
                    "volumeRuleConfig": [
                        {
                            "id": "b5515706-f57a-42b8-8ad3-a2c101ec7d07",
                            "monitorName": "(Auto) CUST_CARD_APP_STG Data In > 9500",
                            "frequency": "0 0 * * * ? *",
                            "description": "Schedule volume rule for table CUST_CARD_APP_STG",
                            "isActive": true,
                            "ruleId": "Rule1",
                            "ruleType": "volume",
                            "ruleSubType": "expect_change_in_row_count_to_be_lesser_than",
                            "pillar": "volume",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {
                                "max_value": 9500
                            },
                            "repeat": "Run every hour",
                            "start_time": "2023-09-07 16:21:04",
                            "last_run_time": "2023-09-08 07:00:00",
                            "next_run_time": "2023-09-08 08:00:00"
                        }
                    ],
                    "freshnessRuleConfig": [],
                    "schemaRuleConfig": [
                        {
                            "id": "caa9e103-f856-48c4-890d-e38dabfb1784",
                            "monitorName": "Schema monitor to test every 10min",
                            "frequency": "0 */10 * * * ? *",
                            "description": "Schema monitor to test every 10min",
                            "isActive": true,
                            "ruleId": "",
                            "ruleType": "schema",
                            "ruleSubType": null,
                            "pillar": "schema",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {},
                            "repeat": "Run every 10 minutes",
                            "start_time": "2023-09-06 09:23:41",
                            "last_run_time": "2023-09-08 07:00:00",
                            "next_run_time": "2023-09-08 07:10:00"
                        }
                    ],
                    "dqRuleConfig": []
                }
            },
            {
                "asset_id": "CUSTDOMAIN_DB_STG$CUSTDOMAIN_SC_STG$CUST_CREDITCARD_RECORD_STG",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "CUSTDOMAIN_DB_STG",
                "entity_level_2": "CUSTDOMAIN_SC_STG",
                "entity_level_3": "CUST_CREDITCARD_RECORD_STG",
                "asset_type": null,
                "monitor_details": {
                    "volumeRuleConfig": [],
                    "freshnessRuleConfig": [
                        {
                            "id": "2f861f36-c5b7-4cf0-a187-cfb5089ccc94",
                            "monitorName": "(Auto) Freshness update every 45 min",
                            "frequency": "0 0 */45 * * ? *",
                            "description": "(Auto)CUSTDOMAIN_DB_STG :  Freshness update every 45 min",
                            "isActive": true,
                            "ruleId": "",
                            "ruleType": "freshness",
                            "ruleSubType": "expect_change_in_freshness_to_be_lesser_than",
                            "pillar": "freshness",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {
                                "min_value": 0.03333333333333333
                            },
                            "repeat": "Run every 45 hours at minute 0",
                            "start_time": null,
                            "last_run_time": "2023-09-08 04:00:00",
                            "next_run_time": "2023-09-08 08:00:00"
                        }
                    ],
                    "schemaRuleConfig": [],
                    "dqRuleConfig": []
                }
            },
            {
                "asset_id": "CUSTDOMAIN_DB_TGT$CUSTDOMAIN_SC_TGT$CUST_HOUSE_ANALYTICS_TGT",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "CUSTDOMAIN_DB_TGT",
                "entity_level_2": "CUSTDOMAIN_SC_TGT",
                "entity_level_3": "CUST_HOUSE_ANALYTICS_TGT",
                "asset_type": null,
                "monitor_details": {
                    "volumeRuleConfig": [],
                    "freshnessRuleConfig": [
                        {
                            "id": "1ea7ffe5-4c87-4f3e-b088-110f47420d87",
                            "monitorName": "Critical Analytics data check",
                            "frequency": "0 0 */5 * * ? *",
                            "description": "This monitor lets us know if the data was not updated at the expected time intervals",
                            "isActive": true,
                            "ruleId": "",
                            "ruleType": "freshness",
                            "ruleSubType": "expect_change_in_freshness_to_be_lesser_than",
                            "pillar": "freshness",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {
                                "min_value": 5
                            },
                            "repeat": "Run every 5 hours at minute 0",
                            "start_time": null,
                            "last_run_time": "2023-09-08 05:00:00",
                            "next_run_time": "2023-09-08 10:00:00"
                        }
                    ],
                    "schemaRuleConfig": [],
                    "dqRuleConfig": []
                }
            },
            {
                "asset_id": "CUSTDOMAIN_DB_TGT$CUSTDOMAIN_SC_TGT$CUST_CARD_APP_TGT",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "CUSTDOMAIN_DB_TGT",
                "entity_level_2": "CUSTDOMAIN_SC_TGT",
                "entity_level_3": "CUST_CARD_APP_TGT",
                "asset_type": null,
                "monitor_details": {
                    "volumeRuleConfig": [],
                    "freshnessRuleConfig": [
                        {
                            "id": "5c845902-6399-4bdc-bc38-9138f0ca8dff",
                            "monitorName": "Customer table to freshness capture",
                            "frequency": "0 0 * * * ? *",
                            "description": "Capture freshness of table",
                            "isActive": true,
                            "ruleId": "Rule1",
                            "ruleType": "freshness",
                            "ruleSubType": "metric_capture",
                            "pillar": "freshness",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {},
                            "repeat": "Run every hour",
                            "start_time": null,
                            "last_run_time": "2023-09-08 07:00:00",
                            "next_run_time": "2023-09-08 08:00:00"
                        }
                    ],
                    "schemaRuleConfig": [],
                    "dqRuleConfig": []
                }
            },
            {
                "asset_id": "CUSTDOMAIN_DB_TGT$CUSTDOMAIN_SC_TGT$CUST_CREDITCARD_RECORD_TGT",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "CUSTDOMAIN_DB_TGT",
                "entity_level_2": "CUSTDOMAIN_SC_TGT",
                "entity_level_3": "CUST_CREDITCARD_RECORD_TGT",
                "asset_type": null,
                "monitor_details": {
                    "volumeRuleConfig": [],
                    "freshnessRuleConfig": [],
                    "schemaRuleConfig": [],
                    "dqRuleConfig": []
                }
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CATALOG_RETURNS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CATALOG_RETURNS",
                "asset_type": null,
                "monitor_details": {
                    "volumeRuleConfig": [
                        {
                            "id": "b5515706-f57a-42b8-8ad3-a2c101ec7d07",
                            "monitorName": "(Auto) CATALOG_RETURNS Data In > 900",
                            "frequency": "0 0 * * * ? *",
                            "description": "Schedule volume rule for table CUST_CARD_APP_STG",
                            "isActive": true,
                            "ruleId": "Rule1",
                            "ruleType": "volume",
                            "ruleSubType": "expect_change_in_row_count_to_be_lesser_than",
                            "pillar": "volume",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {
                                "max_value": 900
                            },
                            "repeat": "Run every hour",
                            "start_time": "2023-09-07 16:21:04",
                            "last_run_time": "2023-09-08 07:00:00",
                            "next_run_time": "2023-09-08 08:00:00"
                        }
                    ],
                    "freshnessRuleConfig": [
                        {
                            "id": "b5515706-f57a-42b8-8ad3-a2c101ec7d07",
                            "monitorName": "(Auto)Freshness update every 40 sec",
                            "frequency": "0 0 * * * ? *",
                            "description": "Schedule volume rule for table CUST_CARD_APP_STG",
                            "isActive": true,
                            "ruleId": "Rule1",
                            "ruleType": "volume",
                            "ruleSubType": "expect_change_in_row_count_to_be_lesser_than",
                            "pillar": "volume",
                            "level": "entity_level_3",
                            "ruleGroup": null,
                            "severity": "CRITICAL",
                            "config": {
                                "max_value": 40
                            },
                            "repeat": "Run every hour",
                            "start_time": "2023-09-07 16:21:04",
                            "last_run_time": "2023-09-08 07:00:00",
                            "next_run_time": "2023-09-08 08:00:00"
                        }
                    ],
                    "schemaRuleConfig": [],
                    "dqRuleConfig": []
                }
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$WEB_SITE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "WEB_SITE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$HOUSEHOLD_DEMOGRAPHICS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "HOUSEHOLD_DEMOGRAPHICS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CALL_CENTER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CALL_CENTER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$DATE_DIM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "DATE_DIM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$STORE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "STORE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CUSTOMER_ADDRESS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CUSTOMER_ADDRESS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$WEB_RETURNS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "WEB_RETURNS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CUSTOMER_DEMOGRAPHICS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CUSTOMER_DEMOGRAPHICS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CATALOG_SALES",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CATALOG_SALES",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$PROMOTION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "PROMOTION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$STORE_SALES",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "STORE_SALES",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$WAREHOUSE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "WAREHOUSE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CUSTOMER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CUSTOMER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$WEB_SALES",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "WEB_SALES",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$INCOME_BAND",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "INCOME_BAND",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$DBGEN_VERSION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "DBGEN_VERSION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$STORE_RETURNS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "STORE_RETURNS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$ITEM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "ITEM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$WEB_PAGE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "WEB_PAGE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$SHIP_MODE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "SHIP_MODE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$CATALOG_PAGE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "CATALOG_PAGE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$TIME_DIM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "TIME_DIM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$REASON",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "REASON",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF10TCL$INVENTORY",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF10TCL",
                "entity_level_3": "INVENTORY",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$WEB_SITE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "WEB_SITE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$WAREHOUSE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "WAREHOUSE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$STORE_SALES",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "STORE_SALES",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$STORE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "STORE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CUSTOMER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CUSTOMER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$STORE_RETURNS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "STORE_RETURNS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$DATE_DIM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "DATE_DIM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$ITEM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "ITEM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CATALOG_RETURNS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CATALOG_RETURNS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$WEB_SALES",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "WEB_SALES",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CATALOG_SALES",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CATALOG_SALES",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$INVENTORY",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "INVENTORY",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$PROMOTION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "PROMOTION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$WEB_RETURNS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "WEB_RETURNS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CUSTOMER_DEMOGRAPHICS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CUSTOMER_DEMOGRAPHICS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CATALOG_PAGE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CATALOG_PAGE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CALL_CENTER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CALL_CENTER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$TIME_DIM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "TIME_DIM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$WEB_PAGE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "WEB_PAGE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$CUSTOMER_ADDRESS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "CUSTOMER_ADDRESS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$INCOME_BAND",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "INCOME_BAND",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$SHIP_MODE",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "SHIP_MODE",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$REASON",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "REASON",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCDS_SF100TCL$HOUSEHOLD_DEMOGRAPHICS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCDS_SF100TCL",
                "entity_level_3": "HOUSEHOLD_DEMOGRAPHICS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$SUPPLIER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "SUPPLIER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$PARTSUPP",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "PARTSUPP",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$ORDERS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "ORDERS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$LINEITEM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "LINEITEM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$NATION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "NATION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$CUSTOMER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "CUSTOMER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$PART",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "PART",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1000$REGION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1000",
                "entity_level_3": "REGION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$SUPPLIER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "SUPPLIER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$LINEITEM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "LINEITEM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$CUSTOMER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "CUSTOMER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$PARTSUPP",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "PARTSUPP",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$PART",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "PART",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$ORDERS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "ORDERS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$REGION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "REGION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF1$NATION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF1",
                "entity_level_3": "NATION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$LINEITEM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "LINEITEM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$PARTSUPP",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "PARTSUPP",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$CUSTOMER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "CUSTOMER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$SUPPLIER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "SUPPLIER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$REGION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "REGION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$PART",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "PART",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$NATION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "NATION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF10$ORDERS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF10",
                "entity_level_3": "ORDERS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$ORDERS",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "ORDERS",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$LINEITEM",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "LINEITEM",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$PART",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "PART",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$CUSTOMER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "CUSTOMER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$SUPPLIER",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "SUPPLIER",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$NATION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "NATION",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$PARTSUPP",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "PARTSUPP",
                "asset_type": null,
                "monitor_details": null
            },
            {
                "asset_id": "SNOWFLAKE_SAMPLE_DATA$TPCH_SF100$REGION",
                "tenant_id": "rak01",
                "conn_id": "snowflake01",
                "connection_name": "Snowflake",
                "connection_type": "snowflake",
                "entity_level_1": "SNOWFLAKE_SAMPLE_DATA",
                "entity_level_2": "TPCH_SF100",
                "entity_level_3": "REGION",
                "asset_type": null,
                "monitor_details": null
            }
        ],
        "status": 200,
        "headers": {}
    }
    // return response;
});

export const saveAssetsForMonitor = createAsyncThunk(SAVE_CONFIGURED_MONITOR_ASSETS, async (postData) => {
    const response = await __response(apiService.post(`${SAVE_CONFIGURED_MONITOR_ASSETS}`, postData)); ///${tenantId}
    return response;
});

export const deleteMonitor = createAsyncThunk(SAVE_CONFIGURED_MONITOR_ASSETS, async (id) => {
    const response = await __response(apiService.delete(`${SAVE_CONFIGURED_MONITOR_ASSETS}/${id}`));
    return response;
  }); 

const initialState = {
}

const monitorSlice = createSlice({
    name: 'monitors',
    initialState,
    reducers: {
    }
})
export const monitorReducer = monitorSlice.reducer;
