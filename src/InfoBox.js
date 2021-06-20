import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core";
import "./InfoBox.css"
function InfoBox({title,isRed,cases,active,total,...props}) {
    return (
        <Card 
        onClick = {props.onClick}
        className={`infoBox ${active && 'infoBox--selected' } ${isRed && 'infoBox--red'}`}>
            <CardContent>
                {/* Title corona virus cases*/}
                <Typography className="infoBox__title" color = "textSecondary">
                    {title}
                </Typography>
                  {/* 120kNumber of cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__bases--green"}`}>{cases}</h2>
              
                {/*  1.2M Totel*/}
                <Typography color ="textSecondary" className="infoBox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
