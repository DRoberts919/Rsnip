import { useEffect, useState } from "react";
import "./snippetEditorStyles.css";
import categories from "../../categories.json";

const SnippetEditor = () => {

    const [selectedEditorTab, setSelectedEditorTab] = useState("JSX");
    const [visibility, setVisibility] = useState("private");
    const [categoryJSXList, setCategoryJSXList] = useState(<></>);

    const [structureCode, setStructureCode] = useState("");
    const [styleCode, setStyleCode] = useState("");
    const [functionCode, setFunctionCode] = useState("");

    const selectTab = (tab) => {
        setSelectedEditorTab(tab);
    }

    //On page load
    useEffect(() => {
        
    }, []);


    return (
      <div className="editor-content">
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
                        {
                            categories.map(c => {
                                return (<option key={c} value={c} />)
                            })
                        }
                    </datalist>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default SnippetEditor;