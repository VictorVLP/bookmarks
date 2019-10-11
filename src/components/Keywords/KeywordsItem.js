import React from "react";

const KeywordsItem = (props) => {

    return (
        <div className="keywords-item">
            <a onClick={() => props.handleKeyDelete(props.title, props.url)}>
                 &times;
             </a>
            {props.title}
        </div>
    )    
}

export default KeywordsItem