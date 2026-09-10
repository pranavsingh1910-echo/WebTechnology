import type {
  UMLClass,
  UMLAttribute,
  UMLMethod,
  UMLRelationship,
} from "../models/uml";


function visibilitySymbol(
  visibility: string
): string {

  switch (visibility) {

    case "public":
      return "+";

    case "private":
      return "-";

    case "protected":
      return "#";

    default:
      return "~";

  }
}


function javaVisibility(
  visibility: string
): string {

  switch (visibility) {

    case "public":
      return "public";

    case "private":
      return "private";

    case "protected":
      return "protected";

    default:
      return "";

  }
}


function generateAttribute(
  attribute: UMLAttribute
): string {

  const visibility =
    javaVisibility(
      attribute.visibility
    );

  return `    ${visibility} ${attribute.type} ${attribute.name};`
    .replace(/\s+/g, " ")
    .replace(" ;", ";");

}


function generateMethod(
  method: UMLMethod
): string {

  const visibility =
    javaVisibility(
      method.visibility
    );

  const parameters =
    method.parameters
      .map(
        (parameter) =>
          `${parameter.type} ${parameter.name}`
      )
      .join(", ");


  return [
    `    ${visibility} ${method.returnType} ${method.name}(${parameters}) {`,
    `    }`,
  ].join("\n");

}


export function generateJavaClass(
  umlClass: UMLClass,
  relationships: UMLRelationship[]
): string {

  const inheritance =
    relationships.find(
      (relationship) =>
        relationship.source === umlClass.id &&
        relationship.type === "inheritance"
    );


  const parentName =
    inheritance
      ? relationships
          .find(
            (relationship) =>
              relationship.id ===
              inheritance.id
          )
          ?.target
      : undefined;


  let classDeclaration =
    `public class ${umlClass.name}`;


  if (parentName) {
    classDeclaration +=
      ` extends ${parentName}`;
  }


  const attributes =
    umlClass.attributes
      .map(generateAttribute)
      .join("\n");


  const methods =
    umlClass.methods
      .map(generateMethod)
      .join("\n\n");


  return `${classDeclaration} {

${attributes}

${methods}

}`;
}


/* =========================================================
   GENERATE ALL JAVA CLASSES
========================================================= */

export function generateJavaCode(
  classes: UMLClass[],
  relationships: UMLRelationship[]
): Record<string, string> {

  const result:
    Record<string, string> = {};


  classes.forEach((umlClass) => {

    result[
      `${umlClass.name}.java`
    ] =
      generateJavaClass(
        umlClass,
        relationships
      );

  });


  return result;
}