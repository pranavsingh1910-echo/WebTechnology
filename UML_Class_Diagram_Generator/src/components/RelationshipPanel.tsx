import React, { useState } from "react";

import type {
  UMLClass,
  UMLRelationship,
  UMLRelationshipType,
} from "../models/uml";


interface RelationshipPanelProps {
  classes: UMLClass[];

  relationships: UMLRelationship[];

  onAddRelationship: (
    relationship: UMLRelationship
  ) => void;

  onDeleteRelationship: (
    id: string
  ) => void;
}


export default function RelationshipPanel({
  classes,
  relationships,
  onAddRelationship,
  onDeleteRelationship,
}: RelationshipPanelProps) {

  const [source, setSource] =
    useState("");

  const [target, setTarget] =
    useState("");

  const [type, setType] =
    useState<UMLRelationshipType>(
      "association"
    );

  const [label, setLabel] =
    useState("");


  const addRelationship = () => {

    if (!source || !target) {
      alert(
        "Please select both source and target classes."
      );

      return;
    }


    if (source === target) {
      alert(
        "Source and target classes must be different."
      );

      return;
    }


    const relationship: UMLRelationship = {

      id:
        `relationship-${Date.now()}`,

      source,

      target,

      type,

      label:
        label.trim() || undefined,

    };


    onAddRelationship(
      relationship
    );


    // Reset
    setLabel("");

  };


  const getClassName = (
    id: string
  ) => {

    const found =
      classes.find(
        (item) =>
          item.id === id
      );

    return found?.name || id;

  };


  return (

    <section className="relationship-panel">

      <div className="relationship-header">

        <h3>
          Relationships
        </h3>

      </div>


      {/* SOURCE */}

      <label>
        Source Class
      </label>

      <select
        value={source}
        onChange={(e) =>
          setSource(e.target.value)
        }
      >

        <option value="">
          Select source class
        </option>

        {classes.map((umlClass) => (

          <option
            key={umlClass.id}
            value={umlClass.id}
          >
            {umlClass.name}
          </option>

        ))}

      </select>


      {/* TARGET */}

      <label>
        Target Class
      </label>

      <select
        value={target}
        onChange={(e) =>
          setTarget(e.target.value)
        }
      >

        <option value="">
          Select target class
        </option>

        {classes.map((umlClass) => (

          <option
            key={umlClass.id}
            value={umlClass.id}
          >
            {umlClass.name}
          </option>

        ))}

      </select>


      {/* RELATIONSHIP TYPE */}

      <label>
        Relationship Type
      </label>

      <select
        value={type}
        onChange={(e) =>
          setType(
            e.target.value as UMLRelationshipType
          )
        }
      >

        <option value="association">
          Association
        </option>

        <option value="inheritance">
          Inheritance
        </option>

        <option value="aggregation">
          Aggregation
        </option>

        <option value="composition">
          Composition
        </option>

        <option value="dependency">
          Dependency
        </option>

      </select>


      {/* LABEL */}

      <label>
        Label
      </label>

      <input
        type="text"
        placeholder="e.g. teaches, contains, uses"
        value={label}
        onChange={(e) =>
          setLabel(e.target.value)
        }
      />


      {/* ADD BUTTON */}

      <button
        type="button"
        onClick={addRelationship}
      >
        + Add Relationship
      </button>


      {/* EXISTING RELATIONSHIPS */}

      <div className="relationship-list">

        {relationships.length === 0 ? (

          <p className="relationship-empty">
            No relationships created.
          </p>

        ) : (

          relationships.map(
            (relationship) => (

              <div
                key={relationship.id}
                className="relationship-item"
              >

                <div>

                  <strong>
                    {getClassName(
                      relationship.source
                    )}
                  </strong>

                  <span>
                    {" "}
                    {getRelationshipSymbol(
                      relationship.type
                    )}{" "}
                  </span>

                  <strong>
                    {getClassName(
                      relationship.target
                    )}
                  </strong>

                </div>


                <div className="relationship-info">

                  <span>
                    {formatType(
                      relationship.type
                    )}
                  </span>

                  {relationship.label && (
                    <span>
                      {" "}
                      — {relationship.label}
                    </span>
                  )}

                </div>


                <button
                  type="button"
                  className="relationship-delete"
                  onClick={() =>
                    onDeleteRelationship(
                      relationship.id
                    )
                  }
                >
                  ×
                </button>

              </div>

            )
          )

        )}

      </div>

    </section>

  );
}


/* =========================================================
   RELATIONSHIP SYMBOL
========================================================= */

function getRelationshipSymbol(
  type: UMLRelationshipType
): string {

  switch (type) {

    case "inheritance":
      return "△";

    case "aggregation":
      return "◇";

    case "composition":
      return "◆";

    case "dependency":
      return "⇢";

    default:
      return "—";
  }
}


/* =========================================================
   DISPLAY NAME
========================================================= */

function formatType(
  type: UMLRelationshipType
): string {

  switch (type) {

    case "inheritance":
      return "Inheritance";

    case "aggregation":
      return "Aggregation";

    case "composition":
      return "Composition";

    case "dependency":
      return "Dependency";

    default:
      return "Association";
  }
}