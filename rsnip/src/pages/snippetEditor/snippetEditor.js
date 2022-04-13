import { useState } from "react";
import "./snippetEditorStyles.css";

const SnippetEditor = () => {

    const [selectedEditorTab, setSelectedEditorTab] = useState("JSX");
    const [visibility, setVisibility] = useState("private");

    const selectTab = (tab) => {
        setSelectedEditorTab(tab);
    }


    return (
      <div class="editor-content">
        <div className="editor-section">
            <div className="editor-bar">
                <div className="tabs">
                    <div className={selectedEditorTab === "JSX" ? "selected" : ""} onClick={() => selectTab("JSX")}>JSX</div>
                    <div className={selectedEditorTab === "JS" ? "selected" : ""} onClick={() => selectTab("JS")}>JS</div>
                    <div className={selectedEditorTab === "CSS" ? "selected" : ""} onClick={() => selectTab("CSS")}>CSS</div>
                </div>
                <div className="run-btn">Run ▶</div>
            </div>

        </div>
        <div className="input-output-section">
            <div className="rendered-output-section">

            </div>
            <div className="input-section">
                <div className="input-field type2">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" />
                </div>
                
                <div className="input-field type2">
                    <label htmlFor="visibility">Visibility</label>
                    {/* Button group */}
                    <div className="btn-group">
                        <button onClick={() => setVisibility("public")} className={`btn ${visibility === "public" ? "selected" : ""}`}>Public</button>
                        <button onClick={() => setVisibility("private")} className={`btn ${visibility === "private" ? "selected" : ""}`}>Private</button>
                    </div>
                </div>
                <div className="input-field type2">
                    <label htmlFor="desc">Description</label>
                    <textarea id="desc"></textarea>
                </div>
                <div className="input-field type2">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" list="categories" />
                    <datalist id="categories">
                        <option value="Edge" />
                        <option value="Firefox" />
                        <option value="Chrome" />
                        <option value="Opera" />
                        <option value="Safari" />
                    </datalist>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default SnippetEditor;