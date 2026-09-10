/* =========================================================
   UML DATA MODELS
========================================================= */

export type Visibility =
  | "public"
  | "private"
  | "protected"
  | "package";


/* =========================================================
   UML ATTRIBUTE
========================================================= */

export interface UMLAttribute {
  id: string;

  name: string;

  type: string;

  visibility: Visibility;
}


/* =========================================================
   UML METHOD PARAMETER
========================================================= */

export interface UMLParameter {
  id: string;

  name: string;

  type: string;
}


/* =========================================================
   UML METHOD
========================================================= */

export interface UMLMethod {
  id: string;

  name: string;

  returnType: string;

  visibility: Visibility;

  parameters: UMLParameter[];
}


/* =========================================================
   UML CLASS
========================================================= */

export interface UMLClass {
  id: string;

  name: string;

  attributes: UMLAttribute[];

  methods: UMLMethod[];

  x?: number;

  y?: number;
}


/* =========================================================
   UML RELATIONSHIP TYPES
========================================================= */

export type UMLRelationshipType =
  | "association"
  | "inheritance"
  | "aggregation"
  | "composition"
  | "dependency";


/* =========================================================
   UML RELATIONSHIP
========================================================= */

export interface UMLRelationship {
  id: string;

  source: string;

  target: string;

  type: UMLRelationshipType;

  label?: string;
}


/* =========================================================
   UML PROJECT
========================================================= */

export interface UMLProject {
  classes: UMLClass[];

  relationships: UMLRelationship[];
}