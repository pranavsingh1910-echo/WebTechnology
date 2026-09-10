import type { UMLProject } from "../models/uml";

const STORAGE_KEY = "uml-class-diagram-project";

export function saveProject(project: UMLProject): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(project)
  );
}

export function loadProject(): UMLProject | null {
  const savedProject = localStorage.getItem(STORAGE_KEY);

  if (!savedProject) {
    return null;
  }

  try {
    return JSON.parse(savedProject) as UMLProject;
  } catch (error) {
    console.error("Failed to load project:", error);
    return null;
  }
}

export function deleteSavedProject(): void {
  localStorage.removeItem(STORAGE_KEY);
}