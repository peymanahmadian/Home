import React from 'react';
import {default as AlertContainer} from '@material-ui/lab/Alert';
import {Snackbar} from "@material-ui/core";
import {default as AlertComponent} from "@material-ui/lab/Alert";
import {ErrorModel} from '../../Model/Entity'
import {showError} from '../../Actions/ErrorActions';
import {useDispatch, useSelector} from "react-redux";
const Alert=()=>{

    const dispatch=useDispatch();
    const Error=useSelector(state=>state.ErrorReducer);
    const hide=()=>{
        let error=new ErrorModel();
        error.showError=false;
        error.errorText=null;
        dispatch(showError(error));
    }

    return(
        // <Snackbar open={true} autoHideDuration={4000}  >
        //     <AlertComponent onClose={hide} severity={Error.showError?"error":"success"}>
        //         {Error.content}
        //     </AlertComponent>
        // </Snackbar>
        <AlertContainer  variant="filled" onClose={hide} severity={"info"}>
            {Error.content}
        </AlertContainer>

)
}
export default Alert;