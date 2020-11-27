import {ErrorAction} from '../Model/ActionType';
export const showError=(param)=>({type:ErrorAction.ShowError,param});