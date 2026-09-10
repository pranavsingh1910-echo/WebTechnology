import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

import type { UMLClass } from "../models/uml";

interface UMLNodeData {
  umlClass: UMLClass;
}

export default function UMLClassNode({
  data,
}: NodeProps<UMLNodeData>) {
  const umlClass = data.umlClass;

  return (
    <div className="uml-class-node">

      {/* Top connection point */}
      <Handle
        type="target"
        position={Position.Top}
        className="uml-handle"
      />

      {/* ================= CLASS NAME ================= */}
      <div className="uml-class-header">
        <span className="uml-class-name">
          {umlClass.name}
        </span>
      </div>

      {/* ================= ATTRIBUTES ================= */}
      <div className="uml-class-section uml-attributes">

        {umlClass.attributes.length === 0 ? (
          <div className="uml-empty">
            No attributes
          </div>
        ) : (
          umlClass.attributes.map((attribute) => (
            <div
              key={attribute.id}
              className="uml-member"
            >
              <span className="uml-visibility">
                {getVisibilitySymbol(
                  attribute.visibility
                )}
              </span>

              <span className="uml-member-name">
                {attribute.name}
              </span>

              <span className="uml-colon">
                :
              </span>

              <span className="uml-type">
                {attribute.type}
              </span>
            </div>
          ))
        )}

      </div>

      {/* ================= METHODS ================= */}
      <div className="uml-class-section uml-methods">

        {umlClass.methods.length === 0 ? (
          <div className="uml-empty">
            No methods
          </div>
        ) : (
          umlClass.methods.map((method) => (
            <div
              key={method.id}
              className="uml-member"
            >
              <span className="uml-visibility">
                {getVisibilitySymbol(
                  method.visibility
                )}
              </span>

              <span className="uml-member-name">
                {method.name}
              </span>

              <span className="uml-bracket">
                (
              </span>

              <span className="uml-parameters">
                {method.parameters
                  .map(
                    (parameter) =>
                      `${parameter.name}: ${parameter.type}`
                  )
                  .join(", ")}
              </span>

              <span className="uml-bracket">
                )
              </span>

              <span className="uml-colon">
                :
              </span>

              <span className="uml-type">
                {method.returnType}
              </span>
            </div>
          ))
        )}

      </div>

      {/* Bottom connection point */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="uml-handle"
      />

    </div>
  );
}


/* ============================================
   UML VISIBILITY SYMBOL
============================================ */

function getVisibilitySymbol(
  visibility: string
): string {

  switch (visibility) {

    case "public":
      return "+";

    case "private":
      return "-";

    case "protected":
      return "#";

    case "package":
      return "~";

    default:
      return "+";
  }
}