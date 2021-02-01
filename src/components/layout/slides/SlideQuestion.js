import React from "react";
import {Typography} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

function SlideQuestion({question}) {
    return (
        <>
            <Typography variant="h6" component="h2" className={'slide-sights'}>
                <div className={'slide-sights-sides'}>
                    <PersonIcon className={'left-slide-icon'}/>
                    <span className={'slide-side-content'}>{question.author.nickname}</span>
                </div>
                <div className={'slide-sights-sides'}>
                    <span className={'slide-side-content'}>{question.likes.length}</span>
                    <ThumbUpIcon className={'right-slide-icon'}/>
                </div>
            </Typography>
            <Typography variant="h4" component="h2" className={'slide-text'}>
                {question.text}
            </Typography>
        </>
    )
}

export default SlideQuestion

