import {ErrorAction} from '../Model/ActionType';
import {ErrorModel} from '../Model/Entity'
const Error=(state=new ErrorModel(),action)=>{
    switch (action.type) {
        case ErrorAction.ShowError:
            return {...action.param}
        default:
            return state;
    }
};
export default Error;