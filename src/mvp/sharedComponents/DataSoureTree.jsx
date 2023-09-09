import React, { useEffect } from "react";
import TreeMenu from 'react-simple-tree-menu';
import { useSelector, useDispatch } from "react-redux";
import { stateData, nodeUpdateCallback, getConnectionTreeData, storeConnectionTreeData } from "store";
import { useNavigate, useLocation } from "react-router-dom";
import TreeGroup from "../../components/dataSource/molecules/TreeGroup";
import { Loading } from "core-modules/Loader";
import { authState } from 'store/slices/authSlice';

const DataSourceTree = (props) => {
    const { user } = useSelector(authState);
    const navigate = useNavigate();
    const location = useLocation();
    const { comingFrom = 'dashboard', navlink } = props || {};

    const dispatch = useDispatch();
    const treeState = useSelector(stateData[comingFrom]);
    const { treeLoaded, treeArray } = useSelector(stateData.treeArray);

    //Select particular update callback for dispatch function based on comingFrom prop
    const updateNodes = nodeUpdateCallback[comingFrom];

    useEffect(() => {
        fetchConnectionTreeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchConnectionTreeData = async () => {
        if (!treeLoaded) {
            let response = await dispatch(getConnectionTreeData(user.tenantId)).unwrap();
            const payload = {
                treeArray: response?.nodes ?? [],
                loaded: true
            }
            dispatch(storeConnectionTreeData(payload));
        }
    }

    const handleNodeClick = (props) => {
        let openNodes = [...treeState.openNodes] || [];
        if (props.allDatabases) {
            dispatch(updateNodes({ openNodes, allDatabases: 'allDatabases' }));
        } else {
            const activeNode = props.key;
            let alreadyOpened = openNodes.indexOf(activeNode);
            if (alreadyOpened !== -1)
                openNodes.splice(alreadyOpened, 1)
            else
                openNodes.push(activeNode);
            dispatch(updateNodes({ activeNode, openNodes, activeNodeObj: props }));
        }
        navigate('/' + navlink, { replace: true })   
    }

    return (
        <div className="flex w-full text-[15px] font-RakutenLight tree-parent h-[93vh] overflow-auto my-4">
            {
                treeLoaded === false ? <div className="flex w-full justify-around mt-4"> <Loading /> </div>
                    :
                    <TreeMenu
                        data={treeArray}
                        resetOpenNodesOnDataUpdate
                        onClickItem={handleNodeClick}
                        debounceTime={125}
                        activeKey={treeState.activeNode || ''}
                        openNodes={treeState.openNodes || []}
                    >
                        {({ search, items }) => <TreeGroup
                            items={items}
                            search={search}
                            state={treeState}
                            handleNodeClick={handleNodeClick}
                        />
                        }
                    </TreeMenu>
            }

        </div>
    )
}

export default DataSourceTree;