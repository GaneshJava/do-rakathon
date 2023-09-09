import React from "react";
import openTree from 'assets/images/open_tree.svg';
import mysqlLogo from 'assets/images/mySql.svg';
import snowflakeLogo from 'assets/images/snowflake.svg';
import tableIcon from 'assets/images/table_icon.svg';
import columnIcon from 'assets/images/column_icon.svg';
import schemaIcon from 'assets/images/schema_tree.svg';
import { _DATABASE, _TABLE, _COLUMN } from "mvp/constants";

const DEFAULT_PADDING = 0.50;
const ICON_SIZE = 1.5;
const LEVEL_SPACE = 1.25;

const getPaddingBasedOnTreeLevel = (hasNodes, level) =>  
  DEFAULT_PADDING + ICON_SIZE * (hasNodes ? 0 : 1) + level * LEVEL_SPACE;


const TreeItem = ({
    level,
    hasNodes,
    label,
    isOpen,
    toggleNode,
    type,
    serviceVal,
    id,
    activeNodeObj: { id: activeId },
    ...props
}) => {

    const getIconBasedOntype = () => {
        if (type === 'service') 
            return serviceVal === 'mysql' ? mysqlLogo : snowflakeLogo;
        if (type === _DATABASE) 
            return schemaIcon;    
        if (type === _TABLE)
            return tableIcon;
        if (type === _COLUMN)
            return columnIcon;    
    }

    return (
        <div className="" style={{ paddingLeft: `${getPaddingBasedOnTreeLevel(hasNodes, level)}rem` }}>
            <div {...props} className="flex items-center gap-4 py-1 cursor-pointer">
                {hasNodes && <span className="cursor-pointer" >
                    <img src={openTree} alt="" className={isOpen ? 'rotate-90' : ''} />
                </span>}
                <img src={getIconBasedOntype()} alt="" className="w-4 h-4 cursor-pointer" />
                <span className={`cursor-pointer ${id === activeId ? 'text-common-color' : ''}`} > {label || 'Mysql_database'} </span>
            </div>
        </div>
    )
}

export default TreeItem;