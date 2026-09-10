import { useMemo, useState } from "react";

import Toolbar from "../components/Toolbar";
import UMLCanvas from "../components/UMLCanvas";
import PropertiesPanel from "../components/PropertiesPanel";
import CodeEditor from "../components/CodeEditor";
import RelationshipPanel from "../components/RelationshipPanel";

import type {
  UMLClass,
  UMLProject,
  UMLRelationship,
} from "../models/uml";

import {
  generateAllCode,
  type ProgrammingLanguage,
} from "../utils/codeGenerator";

import {
  saveProject,
  loadProject,
} from "../utils/storage";


/* =========================================================
   CREATE EMPTY PROJECT
========================================================= */

function createEmptyProject(): UMLProject {
  return {
    classes: [],
    relationships: [],
  };
}


/* =========================================================
   EDITOR
========================================================= */

export default function Editor() {

  /* =======================================================
     PROJECT STATE
  ======================================================= */

  const [project, setProject] =
    useState<UMLProject>(() => {

      return (
        loadProject() ||
        createEmptyProject()
      );

    });


  /* =======================================================
     SELECTED CLASS
  ======================================================= */

  const [
    selectedClassId,
    setSelectedClassId,
  ] = useState<string | null>(null);


  /* =======================================================
     SELECTED FILE
  ======================================================= */

  const [
    selectedFile,
    setSelectedFile,
  ] = useState<string | null>(null);


  /* =======================================================
     PROGRAMMING LANGUAGE
  ======================================================= */

  const [
    language,
    setLanguage,
  ] = useState<ProgrammingLanguage>(
    "java"
  );


  /* =======================================================
     GENERATED CODE
  ======================================================= */

  const generatedFiles = useMemo(() => {

    if (project.classes.length === 0) {
      return {};
    }

    return generateAllCode(
      language,
      project.classes,
      project.relationships
    );

  }, [
    language,
    project.classes,
    project.relationships,
  ]);


  /* =======================================================
     SELECTED CLASS
  ======================================================= */

  const selectedClass =
    project.classes.find(
      (umlClass) =>
        umlClass.id ===
        selectedClassId
    ) || null;


  /* =======================================================
     CURRENT CODE
  ======================================================= */

  const code = selectedFile
    ? generatedFiles[selectedFile] || ""
    : Object.values(
        generatedFiles
      )[0] || "";


  /* =======================================================
     ADD CLASS
  ======================================================= */

  const addClass = () => {

    const newClass: UMLClass = {

      id:
        `class-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}`,

      name:
        `Class${project.classes.length + 1}`,

      attributes: [],

      methods: [],

    };


    setProject((current) => ({

      ...current,

      classes: [
        ...current.classes,
        newClass,
      ],

    }));


    setSelectedClassId(
      newClass.id
    );

  };


  /* =======================================================
     UPDATE CLASS
  ======================================================= */

  const updateClass = (
    updatedClass: UMLClass
  ) => {

    setProject((current) => ({

      ...current,

      classes:
        current.classes.map(
          (umlClass) =>
            umlClass.id ===
            updatedClass.id
              ? updatedClass
              : umlClass
        ),

    }));

  };


  /* =======================================================
     ADD RELATIONSHIP
  ======================================================= */

  const addRelationship = (
    relationship: UMLRelationship
  ) => {

    /*
     * Prevent connecting a class to itself.
     */

    if (
      relationship.source ===
      relationship.target
    ) {

      alert(
        "A class cannot have a relationship with itself."
      );

      return;
    }


    /*
     * Prevent exact duplicates.
     */

    const alreadyExists =
      project.relationships.some(
        (existing) =>

          existing.source ===
            relationship.source &&

          existing.target ===
            relationship.target &&

          existing.type ===
            relationship.type
      );


    if (alreadyExists) {

      alert(
        "This relationship already exists."
      );

      return;
    }


    setProject((current) => ({

      ...current,

      relationships: [
        ...current.relationships,
        relationship,
      ],

    }));

  };


  /* =======================================================
     DELETE RELATIONSHIP
  ======================================================= */

  const deleteRelationship = (
    relationshipId: string
  ) => {

    setProject((current) => ({

      ...current,

      relationships:
        current.relationships.filter(
          (relationship) =>
            relationship.id !==
            relationshipId
        ),

    }));

  };


  /* =======================================================
     UPDATE RELATIONSHIPS
     Used when creating connections directly
     on the React Flow canvas.
  ======================================================= */

  const handleRelationshipsChange = (
    relationships: UMLRelationship[]
  ) => {

    setProject((current) => ({

      ...current,

      relationships,

    }));

  };


  /* =======================================================
     SAVE PROJECT
  ======================================================= */

  const save = () => {

    try {

      saveProject(project);

      alert(
        "Project saved successfully!"
      );

    } catch (error) {

      console.error(
        "Save failed:",
        error
      );

      alert(
        "Failed to save project."
      );

    }

  };


  /* =======================================================
     CLEAR PROJECT
  ======================================================= */

  const clearProject = () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to clear the entire diagram?"
      );


    if (!confirmed) {
      return;
    }


    setProject(
      createEmptyProject()
    );


    setSelectedClassId(
      null
    );


    setSelectedFile(
      null
    );

  };


  /* =======================================================
     CHANGE LANGUAGE
  ======================================================= */

  const changeLanguage = (
    newLanguage: ProgrammingLanguage
  ) => {

    setLanguage(
      newLanguage
    );


    /*
     * Select the first generated file
     * for the new language.
     */

    const files =
      generateAllCode(
        newLanguage,
        project.classes,
        project.relationships
      );


    const fileNames =
      Object.keys(files);


    setSelectedFile(
      fileNames[0] || null
    );

  };


  /* =======================================================
     GENERATE CODE
  ======================================================= */

  const generateCode = () => {

    if (
      project.classes.length === 0
    ) {

      alert(
        "Please create at least one class first."
      );

      return;
    }


    const files =
      generateAllCode(
        language,
        project.classes,
        project.relationships
      );


    const fileNames =
      Object.keys(files);


    setSelectedFile(
      fileNames[0] || null
    );


    alert(
      `${getLanguageName(language)} code generated successfully!`
    );

  };


  /* =======================================================
     DOWNLOAD CODE
  ======================================================= */

  const downloadCode = () => {

    if (!code) {

      alert(
        "No generated code available."
      );

      return;
    }


    let fileName =
      selectedFile ||
      Object.keys(
        generatedFiles
      )[0];


    if (!fileName) {

      fileName =
        `GeneratedClass${getExtension(language)}`;

    }


    const blob =
      new Blob(
        [code],
        {
          type:
            "text/plain;charset=utf-8",
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );


    link.href = url;

    link.download =
      fileName;


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="editor-page">


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <Toolbar

        onAddClass={
          addClass
        }

        onGenerateCode={
          generateCode
        }

        onSave={
          save
        }

        onDelete={
          clearProject
        }

        onDownload={
          downloadCode
        }

      />


      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="main-layout">


        {/* ===============================================
            LEFT PANEL
        =============================================== */}

        <div className="properties-panel">

          <PropertiesPanel

            selectedClass={
              selectedClass
            }

            onUpdateClass={
              updateClass
            }

          />


          {/* =============================================
              RELATIONSHIPS
          ============================================= */}

          <RelationshipPanel

            classes={
              project.classes
            }

            relationships={
              project.relationships
            }

            onAddRelationship={
              addRelationship
            }

            onDeleteRelationship={
              deleteRelationship
            }

          />

        </div>


        {/* ===============================================
            CENTER UML CANVAS
        =============================================== */}

        <div className="center-panel">

          <UMLCanvas

            classes={
              project.classes
            }

            relationships={
              project.relationships
            }

            onSelectClass={
              setSelectedClassId
            }

            onRelationshipsChange={
              handleRelationshipsChange
            }

          />

        </div>


        {/* ===============================================
            RIGHT CODE PANEL
        =============================================== */}

        <div className="right-panel">


          {/* =============================================
              LANGUAGE SELECTOR
          ============================================= */}

          <div className="language-selector">

            <button

              type="button"

              className={
                language === "java"
                  ? "active"
                  : ""
              }

              onClick={() =>
                changeLanguage(
                  "java"
                )
              }

            >
              Java
            </button>


            <button

              type="button"

              className={
                language === "python"
                  ? "active"
                  : ""
              }

              onClick={() =>
                changeLanguage(
                  "python"
                )
              }

            >
              Python
            </button>


            <button

              type="button"

              className={
                language === "cpp"
                  ? "active"
                  : ""
              }

              onClick={() =>
                changeLanguage(
                  "cpp"
                )
              }

            >
              C++
            </button>


            <button

              type="button"

              className={
                language === "c"
                  ? "active"
                  : ""
              }

              onClick={() =>
                changeLanguage(
                  "c"
                )
              }

            >
              C
            </button>

          </div>


          {/* =============================================
              GENERATED FILE TABS
          ============================================= */}

          <div className="file-tabs">

            {Object.keys(
              generatedFiles
            ).map(
              (fileName) => (

                <button

                  type="button"

                  key={
                    fileName
                  }

                  className={
                    selectedFile ===
                    fileName
                      ? "active-file"
                      : ""
                  }

                  onClick={() =>
                    setSelectedFile(
                      fileName
                    )
                  }

                >

                  {fileName}

                </button>

              )
            )}

          </div>


          {/* =============================================
              CODE EDITOR
          ============================================= */}

          <CodeEditor

            code={
              code
            }

          />

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   LANGUAGE NAME
========================================================= */

function getLanguageName(
  language: ProgrammingLanguage
): string {

  switch (language) {

    case "java":
      return "Java";

    case "python":
      return "Python";

    case "cpp":
      return "C++";

    case "c":
      return "C";

    default:
      return "Programming";

  }

}


/* =========================================================
   FILE EXTENSION
========================================================= */

function getExtension(
  language: ProgrammingLanguage
): string {

  switch (language) {

    case "java":
      return ".java";

    case "python":
      return ".py";

    case "cpp":
      return ".cpp";

    case "c":
      return ".c";

    default:
      return ".txt";

  }

}