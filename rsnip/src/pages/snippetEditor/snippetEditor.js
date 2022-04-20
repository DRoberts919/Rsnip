import { useEffect, useState } from "react";
import "./snippetEditorStyles.css";
import categories from "../../categories.json";

import AceEditor from 'react-ace'

// import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'


const SnippetEditor = () => {

    const [selectedEditorTab, setSelectedEditorTab] = useState("JSX");
    const [visibility, setVisibility] = useState("private");
    const [selectedCategoryList, setSelectedCategoryList] = useState([]);

    const [categoryInput, setCategoryInput] = useState("");

    const [structureCode, setStructureCode] = useState("");
    const [styleCode, setStyleCode] = useState("");
    const [functionCode, setFunctionCode] = useState("");



    const selectTab = (tab) => {
        setSelectedEditorTab(tab);
    }

    const isCategoryReal = (category) => {
        return categories.indexOf(category) !== -1;
    }

    const isCategoryInList = (category) => {
        return selectedCategoryList.indexOf(category) !== -1;
    }

    const addCategoryToList = (event) => {
        let category = event.target.value;
        if(isCategoryReal(category) && !isCategoryInList(category)) {
            // console.log(`Adding ${category}`);
            let temp = [...selectedCategoryList];
            temp.push(category);
            setSelectedCategoryList(temp);

            //Clear input field
            setCategoryInput("");
        }
    }
    const removeCategoryFromList = (category) => {
        if(isCategoryInList(category)) {
            // console.log(`Removing ${category}`);

            let temp = [...selectedCategoryList];
            temp.splice(selectedCategoryList.indexOf(category) , 1);
            setSelectedCategoryList(temp);
        }
    }


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
            {selectedEditorTab === "JSX" ?
            <AceEditor
                style={{
                    height: 'calc(100vh - 7.5rem)',
                    width: '100%',
                }}
                className="ace-editor"
                placeholder='Start Coding'
                mode='html'
                theme='monokai'
                name='structure-code-editor'
                onChange={currentCode => setStructureCode(currentCode)}
                fontSize={18}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={structureCode}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                />
            : selectedEditorTab === "JS" ? 
            <AceEditor
            style={{
                height: 'calc(100vh - 7.5rem)',
                width: '100%',
            }}
            className="ace-editor"
            placeholder='Start Coding'
            mode='javascript'
            theme='monokai'
            name='script-code-editor'
            onChange={currentCode => setFunctionCode(currentCode)}
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={functionCode}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
            /> : 
            <AceEditor
                style={{
                    height: 'calc(100vh - 7.5rem)',
                    width: '100%',
                }}
                className="ace-editor"
                placeholder='Start Coding'
                mode='css'
                theme='monokai'
                name='style-code-editor'
                onChange={currentCode => setStyleCode(currentCode)}
                fontSize={18}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={styleCode}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                />} 
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
                    <input type="text" id="category" list="categories" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} onKeyPress={event => {addCategoryToList(event)}}/>
                    <datalist id="categories">
                        {
                            categories.map(c => {
                                return (<option key={c} value={c} />)
                            })
                        }
                    </datalist>
                    <div className="selected-categories"> 
                        {
                            selectedCategoryList.map(category => {
                                return (<div key={category} className="selected-category-tag">{category} <span onClick={() => removeCategoryFromList(category)}>&#10006;</span></div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default SnippetEditor;