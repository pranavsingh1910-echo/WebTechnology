import {
  Plus,
  Save,
  Code,
  Download,
  Trash2,
} from "lucide-react";

interface ToolbarProps {
  onAddClass: () => void;
  onGenerateCode: () => void;
  onSave: () => void;
  onDelete: () => void;
  onDownload: () => void;
}

export default function Toolbar({
  onAddClass,
  onGenerateCode,
  onSave,
  onDelete,
  onDownload,
}: ToolbarProps) {
  return (
    <div className="toolbar">

      <div className="toolbar-title">
        UML Class Diagram Generator
      </div>

      <div className="toolbar-actions">

        <button onClick={onAddClass}>
          <Plus size={18} />
          <span>Add Class</span>
        </button>

        <button onClick={onGenerateCode}>
          <Code size={18} />
          <span>Generate Java</span>
        </button>

        <button onClick={onSave}>
          <Save size={18} />
          <span>Save</span>
        </button>

        <button onClick={onDownload}>
          <Download size={18} />
          <span>Download</span>
        </button>

        <button
          className="danger-button"
          onClick={onDelete}
        >
          <Trash2 size={18} />
          <span>Clear</span>
        </button>

      </div>

    </div>
  );
}