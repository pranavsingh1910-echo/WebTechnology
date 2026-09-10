import { useState } from "react";
import type {
  UMLClass,
  UMLAttribute,
  UMLMethod,
  Visibility,
} from "../models/uml";

interface PropertiesPanelProps {
  selectedClass: UMLClass | null;
  onUpdateClass: (updatedClass: UMLClass) => void;
}

export default function PropertiesPanel({
  selectedClass,
  onUpdateClass,
}: PropertiesPanelProps) {

  const [attributeName, setAttributeName] =
    useState("");

  const [attributeType, setAttributeType] =
    useState("String");

  const [attributeVisibility, setAttributeVisibility] =
    useState<Visibility>("private");

  const [methodName, setMethodName] =
    useState("");

  const [returnType, setReturnType] =
    useState("void");

  const [methodVisibility, setMethodVisibility] =
    useState<Visibility>("public");

  if (!selectedClass) {
    return (
      <aside className="properties-panel">
        <h2>Properties</h2>

        <p className="empty-message">
          Select a class to edit its properties.
        </p>
      </aside>
    );
  }

  const updateClassName = (
    name: string
  ) => {
    onUpdateClass({
      ...selectedClass,
      name,
    });
  };

  const addAttribute = () => {
    if (!attributeName.trim()) {
      return;
    }

    const attribute: UMLAttribute = {
      id: `attribute-${Date.now()}`,
      name: attributeName,
      type: attributeType,
      visibility: attributeVisibility,
    };

    onUpdateClass({
      ...selectedClass,
      attributes: [
        ...selectedClass.attributes,
        attribute,
      ],
    });

    setAttributeName("");
  };

  const deleteAttribute = (
    id: string
  ) => {
    onUpdateClass({
      ...selectedClass,
      attributes:
        selectedClass.attributes.filter(
          (attribute) =>
            attribute.id !== id
        ),
    });
  };

  const addMethod = () => {
    if (!methodName.trim()) {
      return;
    }

    const method: UMLMethod = {
      id: `method-${Date.now()}`,
      name: methodName,
      returnType,
      visibility: methodVisibility,
      parameters: [],
    };

    onUpdateClass({
      ...selectedClass,
      methods: [
        ...selectedClass.methods,
        method,
      ],
    });

    setMethodName("");
  };

  const deleteMethod = (
    id: string
  ) => {
    onUpdateClass({
      ...selectedClass,
      methods:
        selectedClass.methods.filter(
          (method) =>
            method.id !== id
        ),
    });
  };

  return (
    <aside className="properties-panel">

      <h2>Properties</h2>

      <section>
        <label>Class Name</label>

        <input
          value={selectedClass.name}
          onChange={(event) =>
            updateClassName(
              event.target.value
            )
          }
        />
      </section>

      <hr />

      <section>
        <h3>Attributes</h3>

        {selectedClass.attributes.map(
          (attribute) => (
            <div
              className="property-item"
              key={attribute.id}
            >
              <span>
                {attribute.visibility}{" "}
                {attribute.name} :{" "}
                {attribute.type}
              </span>

              <button
                onClick={() =>
                  deleteAttribute(
                    attribute.id
                  )
                }
              >
                ×
              </button>
            </div>
          )
        )}

        <input
          placeholder="Attribute name"
          value={attributeName}
          onChange={(event) =>
            setAttributeName(
              event.target.value
            )
          }
        />

        <input
          placeholder="Type"
          value={attributeType}
          onChange={(event) =>
            setAttributeType(
              event.target.value
            )
          }
        />

        <select
          value={attributeVisibility}
          onChange={(event) =>
            setAttributeVisibility(
              event.target.value as Visibility
            )
          }
        >
          <option value="private">
            private
          </option>

          <option value="public">
            public
          </option>

          <option value="protected">
            protected
          </option>

          <option value="package">
            package
          </option>
        </select>

        <button
          className="secondary-button"
          onClick={addAttribute}
        >
          + Add Attribute
        </button>
      </section>

      <hr />

      <section>
        <h3>Methods</h3>

        {selectedClass.methods.map(
          (method) => (
            <div
              className="property-item"
              key={method.id}
            >
              <span>
                {method.visibility}{" "}
                {method.name}() :{" "}
                {method.returnType}
              </span>

              <button
                onClick={() =>
                  deleteMethod(
                    method.id
                  )
                }
              >
                ×
              </button>
            </div>
          )
        )}

        <input
          placeholder="Method name"
          value={methodName}
          onChange={(event) =>
            setMethodName(
              event.target.value
            )
          }
        />

        <input
          placeholder="Return type"
          value={returnType}
          onChange={(event) =>
            setReturnType(
              event.target.value
            )
          }
        />

        <select
          value={methodVisibility}
          onChange={(event) =>
            setMethodVisibility(
              event.target.value as Visibility
            )
          }
        >
          <option value="public">
            public
          </option>

          <option value="private">
            private
          </option>

          <option value="protected">
            protected
          </option>

          <option value="package">
            package
          </option>
        </select>

        <button
          className="secondary-button"
          onClick={addMethod}
        >
          + Add Method
        </button>
      </section>

    </aside>
  );
}