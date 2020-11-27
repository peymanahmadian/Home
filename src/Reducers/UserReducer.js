import {UserAction} from '../Model/ActionType';
import {UserModel} from '../Model/Entity'
const User=(state=new UserModel(),action)=>{
    switch (action.type) {
        case UserAction.ChangeState:
            return {...action.param}
        default:
            return state;
    }
};
export default User;