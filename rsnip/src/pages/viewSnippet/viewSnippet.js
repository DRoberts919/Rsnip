import { useEffect, useState } from "react";
import "./viewSnippetStyles.css";
import React from 'react';
import AceEditor from 'react-ace';
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

const ViewSnippet = () => {
    const [selectedEditorTab, setSelectedEditorTab] = useState("JS");
    const [visibility, setVisibility] = useState("private");
    const [selectedCategoryList, setSelectedCategoryList] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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


    const selectTab = (tab) => {
        setSelectedEditorTab(tab);
    }

    return (
    <div className="snippet-page">
        <div className="output-section">
            <div className="rendered-output-section">
                <div className="iframe-container">
                    <iframe
                        id="output-iframe"
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                    />
                </div>
            </div>
            
        <div className="editor-section">
            <div className="editor-bar">
                <div className="tabs">
                    <div className={selectedEditorTab === "HTML" ? "selected" : ""} onClick={() => selectTab("HTML")}>HTML</div>
                    <div className={selectedEditorTab === "JS" ? "selected" : ""} onClick={() => selectTab("JS")}>JS</div>
                    <div className={selectedEditorTab === "CSS" ? "selected" : ""} onClick={() => selectTab("CSS")}>CSS</div>
                </div>
                <div className="run-btn" onClick={compileCode}>Run ▶</div>
            </div>
                <HotKeys keyMap={keyMap} handlers={handlers}>
            {selectedEditorTab === "HTML" ?
            <AceEditor
                style={{
                    height: '350px',
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
                height: '350px',
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
                    height: '350px',
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
            </HotKeys>
        </div>
    </div>

    </div>
    );
  };
  
  export default ViewSnippet;