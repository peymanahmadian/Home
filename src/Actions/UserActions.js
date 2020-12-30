//import Model
import { UserAction } from "../Model/ActionType";
import { showError } from "../Actions/ErrorActions";
import LocalStorage from "../utils/LocalStorage";
import { UserModel, ErrorModel } from "../Model/Entity";
import Account from "../API/Account";
export const loginUser = (params) => {
  return async (dispatch) => {
    dispatch(isUser(true));
    const response = await Account.login(params);
    if (response.isAxiosError) {
      dispatch(isUser(false));
      let Error = new ErrorModel();
      Error.errorText = "خطا در ورود به سیستم لطفا مجددا سعی کنید";
      Error.showError = true;
      dispatch(showError(Error));
    } else {
      LocalStorage.add("home_token", response);
      dispatch(isUser(false));
    }
  };
};
//async actions
export const isUser = (process) => {
  if (process) {
    let userModel = new UserModel();
    userModel.isLogin = false;
    userModel.loading = true;
    userModel.token = null;
    return { type: UserAction.ChangeState, param: userModel };
  } else {
    let isToken = LocalStorage.get("home_token");
    if (isToken) {
      let userModel = new UserModel();
      userModel.isLogin = true;
      userModel.loading = false;
      userModel.token = isToken;
      return { type: UserAction.ChangeState, param: userModel };
    } else {
      let userModel = new UserModel();
      userModel.isLogin = false;
      userModel.loading = false;
      userModel.token = null;
      return { type: UserAction.ChangeState, param: userModel };
    }
  }
};
export const loadingUser = (param) => ({ type: UserAction.Loading, param });
