import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange?: (value: string) => void;
}

export default function CodeEditor({
  code,
  onChange,
}: CodeEditorProps) {
  return (
    <div className="code-editor">

      <div className="code-editor-header">
        <span>Java Source Code</span>

        <button
          onClick={() =>
            navigator.clipboard.writeText(code)
          }
        >
          Copy
        </button>
      </div>

      <Editor
        height="100%"
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        onChange={(value) =>
          onChange?.(value || "")
        }
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          automaticLayout: true,
        }}
      />

    </div>
  );
}