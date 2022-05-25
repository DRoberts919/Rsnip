import { useEffect, useState, useContext } from "react";
import "./snippetEditorStyles.css";
import categories from "../../categories.json";
import React from "react";
import AceEditor from "react-ace";
import SplitPane from "react-split-pane";
import { HotKeys, configure } from "react-hotkeys";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import useInterval from "../../hooks/useInterval";
import { UserContext } from "../../hooks/useContext";

// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
// there are many themes to import, I liked monokai.
import "ace-builds/src-noconflict/theme-monokai";
// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import EditNav from "../../components/navbar/editNavbar";

configure({
  ignoreTags: [],
});

const SnippetEditor = () => {
  const navigate = useNavigate();
  const { snippetId } = useParams();
  const [selectedEditorTab, setSelectedEditorTab] = useState("JS");
  const [visibility, setVisibility] = useState("private");
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [saveMessage, setSaveMessage] = useState("Autosaved at 5:00 PM");
  const [snippetPublished, setSnippetPublished] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [newChanges, setNewChanges] = useState(false);

  const [redirect, setRedirect] = useState(false);

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

  // Override CTRL S
  const keyMap = {
    SAVE: "Control+s",
  };
  const [srcDoc, setSrcDoc] = useState("");

  //save snippet every 10 seconds
  useInterval(() => {
    if (newChanges) saveSnippet();
  }, 10000);

  //Detect changes in code editors
  useEffect(() => {
    setNewChanges(true);
  }, [structureCode, styleCode, functionCode]);

  const handlers = {
    SAVE: (event) => {
      event.preventDefault();
      console.log("Ctrl + S was called!");
      //TODO: call method to compile code here
      //Doesnt really work :shrug:
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

  

  //   const getData = () => {
  //       return {
  //           visibility:	visibility,
  //           title: title,
  //           description: description,
  //           categories:	selectedCategoryList,
  //           code: {
  //               structureLanguage: "HTML",
  //               structure: structureCode,
  //               styleLanguage: "CSS",
  //               styles: styleCode,
  //               functionLanguage: "JS",
  //               functionality: functionCode,
  //               imports: []
  //           }
  //       }

  // };

  // const goToPrevPage = () => {
  //     navigate("/");
  // }

  // const saveSnippet = () => {
  //     let data = getData();
  //     //TODO: Fetch put data
  //     console.log(data);
  //     //TODO: Update display message
  //     let date = new Date();
  //     setSaveMessage(`Saved at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  //     console.log("save");
  //     setNewChanges(false);
  // }

  // const publishSnippet = () => {
  //     let data = getData();
  //     //TODO: Fetch put data
  //     //TODO: Update display message
  //     let date = new Date();
  //     setSaveMessage(`Published at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  //     console.log("publish");
  //     setNewChanges(false);
  // }

  //TODO: fetch data from backend. If bad, then redirect
  useEffect(() => {
    console.log(user?.user_id);
    fetch(`${process.env.REACT_APP_BASE_URL}snippet/${snippetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Item);
        if (user?.user_id !== "TODO: insert user_id from fetch here") {
            //setRedirect(true); //Uncomment this line
          }
        const savedData = data.Item.saved;
        setTitle(savedData.title);
        setDescription(savedData.description);
        setSelectedCategoryList(savedData.categories);
        setFunctionCode(savedData.code.functionality);
        setStructureCode(savedData.code.structure);
        setStyleCode(savedData.code.styles);
        setSnippetPublished(data.Item.isPublished);
      })
      .catch((err) => console.log(err));
    compileCode();
  }, []);

  const getData = (publishBool) => {
    return {
      user_id: user.user_id,
      snippet_id: snippetId,
      isPublished: publishBool,
      saved: {
        title: title,
        description: description,
        categories: selectedCategoryList,
        code: {
          structureLanguage: "HTML",
          structure: structureCode,
          styleLanguage: "CSS",
          styles: styleCode,
          functionLanguage: "JS",
          functionality: functionCode,
          imports: [],
        },
        dateUpdated: "3-12-22",
        visibility: visibility,
      },
      published: {
        title: title,
        description: description,
        categories: selectedCategoryList,
        code: {
          structureLanguage: "HTML",
          structure: structureCode,
          styleLanguage: "CSS",
          styles: styleCode,
          functionLanguage: "JS",
          functionality: functionCode,
          imports: [],
        },
        dateUpdated: "3-12-22",
        visibility: visibility,
      },
    };
  };

  const goToPrevPage = () => {
    navigate("/");
  };

  const saveSnippet = () => {
    let data = getData(snippetPublished);
    //TODO: Fetch put data
    fetch(`${process.env.REACT_APP_BASE_URL}snippet/${snippetId}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(data);
    //TODO: Update display message
    let date = new Date();
    setSaveMessage(
      `Saved at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    console.log("save");
    setNewChanges(false);
  };

  const publishSnippet = () => {
    let data = getData(true);
    //TODO: Fetch put data
    fetch(`${process.env.REACT_APP_BASE_URL}snippet/${snippetId}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(data);
    //TODO: Update display message
    let date = new Date();
    setSaveMessage(
      `Published at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    console.log("publish");
    setNewChanges(false);
  };

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
  };

  const isCategoryReal = (category) => {
    return categories.indexOf(category) !== -1;
  };

  const isCategoryInList = (category) => {
    return selectedCategoryList.indexOf(category) !== -1;
  };

  const addCategoryToList = (event) => {
    let category = event.target.value;
    if (isCategoryReal(category) && !isCategoryInList(category)) {
      // console.log(`Adding ${category}`);
      let temp = [...selectedCategoryList];
      temp.push(category);
      setSelectedCategoryList(temp);

      //Clear input field
      setCategoryInput("");
    }
  };
  const removeCategoryFromList = (category) => {
    if (isCategoryInList(category)) {
      // console.log(`Removing ${category}`);

      let temp = [...selectedCategoryList];
      temp.splice(selectedCategoryList.indexOf(category), 1);
      setSelectedCategoryList(temp);
    }
  };

  if (redirect) return <Navigate to="/" replace />;
  return (
    <>
      <EditNav
        goToPrevPage={goToPrevPage}
        saveSnippet={saveSnippet}
        publishSnippet={publishSnippet}
        saveMessage={saveMessage}
      />
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <SplitPane split="vertical" minSize={"50%"} className="editor-content">
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
            {selectedEditorTab === "HTML" ? (
              <AceEditor
                style={{
                  height: "calc(100vh - 7.5rem)",
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
                  height: "calc(100vh - 7.5rem)",
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
                  height: "calc(100vh - 7.5rem)",
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
          </div>
          <div className="input-output-section">
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
            <div className="input-section">
              <div className="input-field type2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              <div className="input-field type2">
                <label htmlFor="visibility">Visibility</label>
                {/* Button group */}
                <div className="btn-group">
                  <button
                    onClick={() => setVisibility("public")}
                    className={`btn ${
                      visibility === "public" ? "selected" : ""
                    }`}
                  >
                    Public
                  </button>
                  <button
                    onClick={() => setVisibility("private")}
                    className={`btn ${
                      visibility === "private" ? "selected" : ""
                    }`}
                  >
                    Private
                  </button>
                </div>
              </div>
              <div className="input-field type2">
                <label htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <div className="input-field type2">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  list="categories"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(event) => {
                    addCategoryToList(event);
                  }}
                />
                <datalist id="categories">
                  {categories.map((c) => {
                    return <option key={c} value={c} />;
                  })}
                </datalist>
                <div className="selected-categories">
                  {selectedCategoryList.map((category) => {
                    return (
                      <div key={category} className="selected-category-tag">
                        {category}{" "}
                        <span onClick={() => removeCategoryFromList(category)}>
                          &#10006;
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </SplitPane>
      </HotKeys>
    </>
  );
};

export default SnippetEditor;
