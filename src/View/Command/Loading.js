import React from "react";
import {CircularProgress} from "@material-ui/core";
const style={
    position:"fixed",
    height:"100vh",
    width:"100vw",
    backgroundColor:"rgba(190,190,190,0.3)"
}
const center={
    position: "absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    textAlign:"center"
}
const Loading=()=>{
    return(
        <div style={style}>
            <div style={center}>
                <CircularProgress />
                <div>در حال بار گذاری داده</div>
            </div>

        </div>
    )
}
export default Loading;