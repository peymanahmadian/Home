import {GetLevelOneAction} from '../Model/ActionType';
import {showError} from '../Actions/ErrorActions'
import {LevelOneModel,ErrorModel} from '../Model/Entity';
import LevelOne from '../API/LevelOne';
export const getData=()=>{

    return async (dispatch)=>{
        let levelOneModel=new LevelOneModel();
        levelOneModel.loading=true;
        levelOneModel.data=[];
        dispatch(getLevelOne(levelOneModel));
        const response=await LevelOne.get();
        if(response.isAxiosError){
            let Error=new ErrorModel();
            Error.errorText="خطا در دریافت اطلاعات لطفا مجددا سعی کنید";
            Error.showError=true;
            dispatch(showError(Error));
        }else{
            levelOneModel.loading=false;
            levelOneModel.data=response.data.data;
            dispatch(getLevelOne(levelOneModel));
        }


    }
};
//async actions
export const getLevelOne=(param)=>({type:GetLevelOneAction.GetData,param});