import { useEffect, useState } from "react";
import "./viewSnippetStyles.css";
import React from "react";
import AceEditor from "react-ace";
import { HotKeys, configure } from "react-hotkeys";

// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
// there are many themes to import, I liked monokai.
import "ace-builds/src-noconflict/theme-monokai";
// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import { Link, useNavigate, useParams } from "react-router-dom";

import userIcon from "../../assets/images/user-icon.svg";

configure({
  ignoreTags: [],
});

const ViewSnippet = () => {
  let navigate = useNavigate();
  const { snippetId } = useParams();
  const [selectedEditorTab, setSelectedEditorTab] = useState("JS");
  const [visibility, setVisibility] = useState("private");
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});

  const [initialLoad, setInitialLoad] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [structureCode, setStructureCode] = useState("");
  const [styleCode, setStyleCode] = useState("");
  const [functionCode, setFunctionCode] = useState("");

  const [srcDoc, setSrcDoc] = useState("");

  // Override CTRL S
  const keyMap = {
    SAVE: "Control+s",
  };

  const handlers = {
    SAVE: (event) => {
      event.preventDefault();
      console.log("Ctrl + S was called!");
      //TODO: call method to compile code here
      compileCode();
    },
  };

  const compileCode = () => {
    let splithtml, headSplit;
    if (structureCode.includes("</body>")) {
      splithtml = structureCode.split("</body>");
    }
    if (splithtml && splithtml[0].includes("<head>")) {
      headSplit = splithtml[0].split("<head>");
    }
    // <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin="anonymous"></script>
    // <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin="anonymous"></script>
    setSrcDoc(`
    
        ${
          headSplit
            ? `${headSplit[0]} <head> <style>${styleCode}</style>`
            : `<head><style>${styleCode}</style></head>`
        }
        ${headSplit ? `${headSplit[1]}` : splithtml ? splithtml[0] : ""}
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    <script defer type="text/babel">
      ${functionCode}

    </script>
        ${
          splithtml && splithtml.length > 1
            ? `</body> ${splithtml[1]}`
            : "</body>"
        }
        `);
  };

  //TODO: Fetch data and display; if user_id does not exist (data comes back null), display error
  useEffect(() => {
    //
    fetch(`${process.env.REACT_APP_BASE_URL}snippet/${snippetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Item);
        const publishedData = data.Item?.published;
        if (!data.Item.isPublished) {
          //TODO: Redirect to home page
          setRedirect(true);
        }
        //   setSnippets(data);
        //   setFilterSnippets(data);
        setTitle(publishedData.title);
        setDescription(publishedData.description);
        setSelectedCategoryList(publishedData.categories);
        setFunctionCode(publishedData.code.functionality);
        setStructureCode(publishedData.code.structure);
        setStyleCode(publishedData.code.styles);
        setInitialLoad(true);

        fetch(`${process.env.REACT_APP_BASE_URL}user/${data.user_id}`)
          .then((res) => res.json())
          .then((data) => setUser(data));
      })
      .catch((err) => console.log(err));
    // compileCode();


  }, []);
  

  useEffect(() => {
    if(initialLoad) compileCode();
  }, [initialLoad]);

  const selectTab = (tab) => {
    setSelectedEditorTab(tab);
  };
  if (redirect) {
    //redirect to home page
    return navigate("/");
  }
  return (
    <div className="snippet-page content">
      <div className="title-section">
        <div className="title-row">
          <h1>{title}</h1>
          <Link to={`/user/${user?.user_id}`}>
            <img src={userIcon} width={20} alt="User Icon" />
            {user?.username}
          </Link>
        </div>
        <p>{description}</p>
        <div className="category-list">
          {selectedCategoryList.map((category, index) => {
            return (
              <div
                className="selected-category-tag"
                key={`category${category}${index}`}
              >
                {category}
              </div>
            );
          })}
        </div>
      </div>
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
              <div
                className={selectedEditorTab === "HTML" ? "selected" : ""}
                onClick={() => selectTab("HTML")}
              >
                HTML
              </div>
              <div
                className={selectedEditorTab === "JS" ? "selected" : ""}
                onClick={() => selectTab("JS")}
              >
                JS
              </div>
              <div
                className={selectedEditorTab === "CSS" ? "selected" : ""}
                onClick={() => selectTab("CSS")}
              >
                CSS
              </div>
            </div>
            <div className="run-btn" onClick={compileCode}>
              Run ▶
            </div>
          </div>
          <HotKeys keyMap={keyMap} handlers={handlers}>
            {selectedEditorTab === "HTML" ? (
              <AceEditor
                style={{
                  height: "350px",
                  width: "100%",
                }}
                className="ace-editor"
                placeholder="Start Coding"
                mode="html"
                theme="monokai"
                name="structure-code-editor"
                onChange={(currentCode) => setStructureCode(currentCode)}
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
            ) : selectedEditorTab === "JS" ? (
              <AceEditor
                style={{
                  height: "350px",
                  width: "100%",
                }}
                className="ace-editor"
                placeholder="Start Coding"
                mode="javascript"
                theme="monokai"
                name="script-code-editor"
                onChange={(currentCode) => setFunctionCode(currentCode)}
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
              />
            ) : (
              <AceEditor
                style={{
                  height: "350px",
                  width: "100%",
                }}
                className="ace-editor"
                placeholder="Start Coding"
                mode="css"
                theme="monokai"
                name="style-code-editor"
                onChange={(currentCode) => setStyleCode(currentCode)}
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
              />
            )}
          </HotKeys>
        </div>
      </div>
    </div>
  );
};

export default ViewSnippet;
