import { useEffect, useState } from "react";
import "./snippetEditorStyles.css";
import categories from "../../categories.json";
import React from 'react';
import AceEditor from 'react-ace';
import SplitPane from "react-split-pane";
import { HotKeys, configure } from "react-hotkeys";

// import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai';
// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

configure({
    ignoreTags: []
});

const SnippetEditor = () => {

    const [selectedEditorTab, setSelectedEditorTab] = useState("JS");
    const [visibility, setVisibility] = useState("private");
    const [selectedCategoryList, setSelectedCategoryList] = useState([]);

    const [categoryInput, setCategoryInput] = useState("");

    const [structureCode, setStructureCode] = useState(` 
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My New Snippet</title>
</head>

<body>
  <div id="app"> </div>
</body>
</html>`);
    const [styleCode, setStyleCode] = useState("");
    const [functionCode, setFunctionCode] = useState(`


  const { useState } = React;
  const { createRoot } = ReactDOM;

  const App = (props) => { 
    const [text, setText] = useState('hello');

    return (
      <div>
        <h1>{text}</h1>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    );
  }

  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<App />);
  `);

    const [srcDoc, setSrcDoc] = useState("");


    // Override CTRL S
    const keyMap = {
        SAVE: "Control+s"
    };
    
    const handlers = {
        SAVE: event => {
            event.preventDefault();
            console.log("Ctrl + S was called!");
            //TODO: call method to compile code here 
            compileCode();
        }
    };


    const compileCode = () => {
        let splithtml, headSplit;
        if(structureCode.includes("</body>")) {
            splithtml = structureCode.split("</body>");
        }
        if(splithtml && splithtml[0].includes("<head>")) {
            headSplit = splithtml[0].split("<head>");
        }
        // <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin="anonymous"></script>
        // <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin="anonymous"></script>
        setSrcDoc(`
    
        ${headSplit ? `${headSplit[0]} <head> <style>${styleCode}</style>`: `<head><style>${styleCode}</style></head>`}
        ${headSplit ? `${headSplit[1]}` : splithtml? splithtml[0] : ""}
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    <script defer type="text/babel">
      ${functionCode}

    </script>
        ${splithtml && splithtml.length > 1 ? `</body> ${splithtml[1]}` : "</body>"}
        `);
    }

    useEffect(() => {
        compileCode();
    }, []);



    // const htmlString = `
    // <!DOCTYPE HTML>
    // <html lang="en">
    //  <head> <style></style>
            
    //   <meta charset="utf-8">
    //   <title>My New Snippet</title>
    // </head>
    
    // <body>
    //   <div id="app"> </div>
    
    //     <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    //     <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    //     <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    //     <script defer type="text/babel">
    //     console.log(React);
          
    
    // const { useState } = React;
    // const { createRoot } = ReactDOM;
    //   const App = (props) => { 
    //     const [text, setText] = useState('hello');
    
    //     return (
    //       <div>
    //         <h1>{text}</h1>
    //         <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    //       </div>
    //     );
    //   }
    
    //   const container = document.getElementById('app');
    //   const root = createRoot(container);
    //   root.render(<App />);
    
    //     </script>
    //         </body> 
    // </html>`;




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
    <HotKeys keyMap={keyMap} handlers={handlers}>
        <SplitPane split="vertical" minSize={"50%"} className="editor-content">
            <div className="editor-section">
                <div className="editor-bar">
                    <div className="tabs">
                        <div className={selectedEditorTab === "HTML" ? "selected" : ""} onClick={() => selectTab("HTML")}>HTML</div>
                        <div className={selectedEditorTab === "JS" ? "selected" : ""} onClick={() => selectTab("JS")}>JS</div>
                        <div className={selectedEditorTab === "CSS" ? "selected" : ""} onClick={() => selectTab("CSS")}>CSS</div>
                    </div>
                    <div className="run-btn" onClick={compileCode}>Run ▶</div>
                </div>
                {selectedEditorTab === "HTML" ?
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
                <iframe
                    srcDoc={srcDoc}
                    width="100%"
                    height="100%"
                    title="output"
                    sandbox="allow-scripts"
                />

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
        </SplitPane>
      </HotKeys>
    );
  };
  
  export default SnippetEditor;