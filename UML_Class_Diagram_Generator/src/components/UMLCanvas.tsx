import React, { useCallback, useEffect } from "react";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import type {
  Connection,
  Edge,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

import UMLClassNode from "./UMLClassNode";

import type {
  UMLClass,
  UMLRelationship,
} from "../models/uml";


interface UMLCanvasProps {
  classes: UMLClass[];
  relationships: UMLRelationship[];
  onSelectClass: (id: string) => void;
  onRelationshipsChange?: (
    relationships: UMLRelationship[]
  ) => void;
}


// Custom React Flow node
const nodeTypes = {
  umlClass: UMLClassNode,
};


export default function UMLCanvas({
  classes,
  relationships,
  onSelectClass,
  onRelationshipsChange,
}: UMLCanvasProps) {


  // -----------------------------------------
  // Convert UML classes into React Flow nodes
  // -----------------------------------------

  const createNodes = (): Node[] => {

    return classes.map(
      (umlClass, index) => {

        return {
          id: umlClass.id,

          type: "umlClass",

          position: {
            x:
              100 +
              (index % 3) * 320,

            y:
              100 +
              Math.floor(index / 3) * 280,
          },

          data: {
            umlClass: umlClass,
          },
        };

      }
    );
  };


  // -----------------------------------------
  // Convert UML relationships into edges
  // -----------------------------------------

  const createEdges = (): Edge[] => {

    return relationships.map(
      (relationship) => {

        return {
          id: relationship.id,

          source:
            relationship.source,

          target:
            relationship.target,

          label:
            relationship.label,

          type: "smoothstep",

          animated:
            relationship.type ===
            "dependency",

        };

      }
    );
  };


  // -----------------------------------------
  // React Flow state
  // -----------------------------------------

  const [
    nodes,
    setNodes,
    onNodesChange,
  ] = useNodesState(
    createNodes()
  );


  const [
    edges,
    setEdges,
    onEdgesChange,
  ] = useEdgesState(
    createEdges()
  );


  // -----------------------------------------
  // IMPORTANT:
  // Update nodes when classes change
  // -----------------------------------------

  useEffect(() => {

    setNodes(
      (currentNodes) => {

        return classes.map(
          (umlClass, index) => {

            // Find existing node
            const existingNode =
              currentNodes.find(
                (node) =>
                  node.id ===
                  umlClass.id
              );


            return {

              id: umlClass.id,

              type: "umlClass",

              // Keep existing position
              // when possible
              position:
                existingNode?.position ??
                {
                  x:
                    100 +
                    (index % 3) *
                      320,

                  y:
                    100 +
                    Math.floor(
                      index / 3
                    ) * 280,
                },

              data: {
                umlClass:
                  umlClass,
              },

            };

          }
        );

      }
    );

  }, [classes, setNodes]);


  // -----------------------------------------
  // Update edges when relationships change
  // -----------------------------------------

  useEffect(() => {

    setEdges(
      createEdges()
    );

  }, [
    relationships,
    setEdges,
  ]);


  // -----------------------------------------
  // Connect two classes
  // -----------------------------------------

  const onConnect = useCallback(
    (connection: Connection) => {

      // Make sure source and target exist
      if (
        !connection.source ||
        !connection.target
      ) {
        return;
      }


      // Create UML relationship
      const newRelationship:
        UMLRelationship = {

          id:
            `relationship-${Date.now()}`,

          source:
            connection.source,

          target:
            connection.target,

          type:
            "association",

        };


      // Create React Flow edge
      const newEdge: Edge = {

        id:
          newRelationship.id,

        source:
          newRelationship.source,

        target:
          newRelationship.target,

        type:
          "smoothstep",

      };


      // Add edge to React Flow
      setEdges(
        (currentEdges) =>
          addEdge(
            newEdge,
            currentEdges
          )
      );


      // Update UML relationships
      if (
        onRelationshipsChange
      ) {

        onRelationshipsChange([
          ...relationships,
          newRelationship,
        ]);

      }

    },

    [
      relationships,
      setEdges,
      onRelationshipsChange,
    ]
  );


  // -----------------------------------------
  // Select a class
  // -----------------------------------------

  const handleNodeClick = (
    event: React.MouseEvent,
    node: Node
  ) => {

    event.stopPropagation();

    onSelectClass(
      node.id
    );

  };


  // -----------------------------------------
  // Render canvas
  // -----------------------------------------

  return (

    <div
      className="uml-canvas"
      style={{
        width: "100%",
        height: "100%",
      }}
    >

      <ReactFlow

        nodes={nodes}

        edges={edges}

        onNodesChange={
          onNodesChange
        }

        onEdgesChange={
          onEdgesChange
        }

        onConnect={
          onConnect
        }

        onNodeClick={
          handleNodeClick
        }

        nodeTypes={
          nodeTypes
        }

        fitView

        fitViewOptions={{
          padding: 0.2,
        }}

        nodesDraggable={true}

        nodesConnectable={true}

        elementsSelectable={true}

        zoomOnScroll={true}

        panOnDrag={true}

      >

        {/* Background grid */}
        <Background />

        {/* Zoom controls */}
        <Controls />

        {/* Mini map */}
        <MiniMap />

      </ReactFlow>

    </div>

  );
}