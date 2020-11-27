import React from 'react';
import {withRouter} from "react-router-dom";
class Error extends React.Component{
    render() {
        return(
            <div className="section-vertical-padding">
                <div className="page-container">
                        500 Error
                </div>
            </div>
        )
    }
}
export default withRouter(Error);