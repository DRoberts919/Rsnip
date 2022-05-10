import { useEffect, useState } from "react";
import "./navbarStyles.css";


const EditNav = ({goToPrevPage, saveSnippet, publishSnippet, saveMessage}) => {
    // if(location.pathname.includes("/snippet/edit/")) {
        return (
        <div className="edit-nav">
            <div className="nav-group">
                <div className="left">
                <button className="btn green-btn-outline" onClick={() => goToPrevPage()}>
                    &#8249; Back
                </button>
                </div>
                <div className="right">
                <span>{saveMessage}</span>
                <button className="btn green-btn-outline" onClick={() => saveSnippet()}>
                    Save
                </button>
                <button className="btn green-btn" onClick={() => publishSnippet()}>
                    Publish
                </button>
                </div>
            </div>
        </div>);
    // }
}

export default EditNav;
