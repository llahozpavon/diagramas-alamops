import React, { useRef, useCallback } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    MiniMap,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background, Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from "./components/customNode/index.jsx";
import CustomConnectionLine from './components/CustomConnectionLine';
import Sidebar from './components/Sidebar/index.jsx';
import {Provider, useDiagram} from './components/context/index.jsx';
import {MarkerType} from "reactflow";
import FloatingEdge from "./components/floatingEdge/index.jsx";

const nodeTypes = {
    custom: CustomNode
};
const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
   /* style: {
        borderRadius: '100%',
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },*/
};
const initialNodes = [
    {
        id: '1',
        type: "custom",
        data: { label: 'Resourcegroups', backgroundImage:'data:image/jpg;base64,'+'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' },
        position: { x: 0, y: 30 },
        //...nodeDefaults,
    },  {
        id: '2',
        type: "custom",
        data: { label: 'StorageAccounts', backgroundImage:'data:image/jpg;base64,'+'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' },
        position: { x: 200, y: 30 },
        //...nodeDefaults,
    },
];
const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type:'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },

];
const defaultEdgeOptions = {
    type: 'smoothstep',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#b1b1b7',
    },
};
const edgeTypes = {
    floating: FloatingEdge,
};
let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [node,newNodeData] = useDiagram();
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!node) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type:node.type,
                position,
                data: { label: node.name, backgroundImage: node.imagen_base64 },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, node, newNodeData],
    );


    return (
        <div className="dndflow">
            <Sidebar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineComponent={CustomConnectionLine}
                    defaultEdgeOptions={defaultEdgeOptions}
                    style={{ backgroundColor: "#F7F9FB" }}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>

        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <Provider>
            <Flow />
        </Provider>
    </ReactFlowProvider>
);
