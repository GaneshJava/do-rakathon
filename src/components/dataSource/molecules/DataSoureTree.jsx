import React from "react";
import TreeMenu from 'react-simple-tree-menu';
import { treeArray } from "../../../components/dataSource/constants";
import TreeGroup from "../../../components/dataSource/molecules/TreeGroup";

const DataSourceTree = () => {
    return (
        <div className="flex w-full text-[15px] font-RakutenLight tree-parent">
            <TreeMenu
                data={treeArray}
                resetOpenNodesOnDataUpdate
                initialOpenNodes={[]}
                onClickItem={({ key, label, ...props }) => {
                    console.log(key, label, props);
                }}
                debounceTime={125}
            >
                {({ search, items }) => <TreeGroup items={items} search={search} /> }
            </TreeMenu>
        </div>
    )
}

export default DataSourceTree;