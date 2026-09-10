import type {
  UMLClass,
  UMLRelationship,
} from "../models/uml";


/* =========================================================
   VISIBILITY HELPERS
========================================================= */

function javaVisibility(
  visibility: string
): string {

  if (visibility === "public")
    return "public";

  if (visibility === "private")
    return "private";

  if (visibility === "protected")
    return "protected";

  return "";

}


/* =========================================================
   JAVA
========================================================= */

function generateJava(
  umlClass: UMLClass
): string {

  const attributes =
    umlClass.attributes
      .map(
        (attribute) =>
          `    ${javaVisibility(attribute.visibility)} ${attribute.type} ${attribute.name};`
      )
      .join("\n");


  const methods =
    umlClass.methods
      .map(
        (method) => {

          const parameters =
            method.parameters
              .map(
                (parameter) =>
                  `${parameter.type} ${parameter.name}`
              )
              .join(", ");


          return `    ${javaVisibility(method.visibility)} ${method.returnType} ${method.name}(${parameters}) {
    }`;

        }
      )
      .join("\n\n");


  return `public class ${umlClass.name} {

${attributes}

${methods}

}`;

}


/* =========================================================
   PYTHON
========================================================= */

function generatePython(
  umlClass: UMLClass
): string {

  let code =
    `class ${umlClass.name}:\n`;


  code +=
    `    def __init__(self):\n`;


  if (
    umlClass.attributes.length === 0
  ) {

    code +=
      `        pass\n`;

  } else {

    umlClass.attributes.forEach(
      (attribute) => {

        code +=
          `        self.${attribute.name} = None\n`;

      }
    );

  }


  umlClass.methods.forEach(
    (method) => {

      const parameters =
        method.parameters
          .map(
            (parameter) =>
              parameter.name
          )
          .join(", ");


      const allParameters =
        parameters
          ? `self, ${parameters}`
          : "self";


      code += `\n`;
      code +=
        `    def ${method.name}(${allParameters}):\n`;
      code +=
        `        pass\n`;

    }
  );


  return code;

}


/* =========================================================
   C++
========================================================= */

function generateCpp(
  umlClass: UMLClass
): string {

  const attributes =
    umlClass.attributes
      .map(
        (attribute) =>
          `    ${attribute.type} ${attribute.name};`
      )
      .join("\n");


  const methods =
    umlClass.methods
      .map(
        (method) => {

          const parameters =
            method.parameters
              .map(
                (parameter) =>
                  `${parameter.type} ${parameter.name}`
              )
              .join(", ");


          return `    ${method.returnType} ${method.name}(${parameters}) {
    }`;

        }
      )
      .join("\n\n");


  return `class ${umlClass.name} {

public:

${attributes}

${methods}

};`;

}


/* =========================================================
   C
========================================================= */

function generateC(
  umlClass: UMLClass
): string {

  const structFields =
    umlClass.attributes
      .map(
        (attribute) =>
          `    ${attribute.type} ${attribute.name};`
      )
      .join("\n");


  let code =
    `typedef struct ${umlClass.name} {\n`;

  code +=
    `${structFields}\n`;

  code +=
    `} ${umlClass.name};\n\n`;


  umlClass.methods.forEach(
    (method) => {

      const parameters =
        method.parameters
          .map(
            (parameter) =>
              `${parameter.type} ${parameter.name}`
          )
          .join(", ");


      code +=
        `${method.returnType} ${method.name}(${parameters}) {\n`;

      code +=
        `}\n\n`;

    }
  );


  return code;

}


/* =========================================================
   PUBLIC GENERATOR
========================================================= */

export type ProgrammingLanguage =
  | "java"
  | "python"
  | "cpp"
  | "c";


export function generateCode(
  language: ProgrammingLanguage,
  umlClass: UMLClass,
  relationships: UMLRelationship[]
): string {

  switch (language) {

    case "java":
      return generateJava(
        umlClass
      );

    case "python":
      return generatePython(
        umlClass
      );

    case "cpp":
      return generateCpp(
        umlClass
      );

    case "c":
      return generateC(
        umlClass
      );

    default:
      return "";

  }

}


/* =========================================================
   GENERATE ALL FILES
========================================================= */

export function generateAllCode(
  language: ProgrammingLanguage,
  classes: UMLClass[],
  relationships: UMLRelationship[]
): Record<string, string> {

  const files:
    Record<string, string> = {};


  classes.forEach(
    (umlClass) => {

      let extension = "java";

      if (language === "python")
        extension = "py";

      if (language === "cpp")
        extension = "cpp";

      if (language === "c")
        extension = "c";


      files[
        `${umlClass.name}.${extension}`
      ] =
        generateCode(
          language,
          umlClass,
          relationships
        );

    }
  );


  return files;

}