import React from "react";
import SlideQuestion from "./SlideQuestion";

function LastQuestion({lastQuestion}) {

    if (!lastQuestion) {
        return '';
    }

    return (
        <>
            <h2 className={'last-question-title'}>The latest question:</h2>
            <div className={'slide last-slide'}>
                <SlideQuestion question={lastQuestion}/>
            </div>
        </>
    )
}

export default LastQuestion

