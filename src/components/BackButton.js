import React from "react";
import './BackButton.css';

function BackButton() {
    const text = "← Back";
    const onClick = () => {
        window.history.back();
        // history.back();
    }
    return (
        <div className="backbutton-button" onClick={onClick}>
            {text}
        </div>
    )
}

export default BackButton;