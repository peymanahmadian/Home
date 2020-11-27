import {GetLevelOneAction} from '../Model/ActionType';
import {LevelOneModel} from '../Model/Entity'
const LevelOne=(state=new LevelOneModel(),action)=>{
    switch (action.type) {
        case GetLevelOneAction.GetData:
            return {...action.param}
        default:
            return state;
    }
};
export default LevelOne;