import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Account/Login";
import Home from "./Home";
import Alert from "./Command/Alert";
import ErrorBoundary from "../Error/ErrorBoundary";
import { isUser } from "../Actions/UserActions";
import RTL from "./RTL";
const Layout = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.UserReducer.isLogin);
  const Error = useSelector((state) => state.ErrorReducer);
  useEffect(() => {
    dispatch(isUser());
  });
  return (
    <ErrorBoundary>
      {Error.showError && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "10px",
            zIndex: "9999",
          }}
        >
          <RTL>
            <Alert content={Error.errorText} />
          </RTL>
        </div>
      )}
      {!isLogin ? <Login /> : <Home />}
    </ErrorBoundary>
  );
};
export default Layout;
