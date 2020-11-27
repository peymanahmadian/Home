import React from 'react';
import {withRouter} from "react-router-dom";
class NotFound extends React.Component{
    render() {
        return(
            <div className="section-vertical-padding">
                <div className="page-container">
                   <div>
                       404
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(NotFound);