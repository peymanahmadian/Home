import React from 'react';
import {TextField,Button,CircularProgress} from '@material-ui/core';
import {useDispatch,useSelector} from "react-redux";
import HomeICON from "../../Styles/home.svg";
//action
import {loginUser} from '../../Actions/UserActions';
import RTL from '../RTL';
const Login=()=> {
    const dispatch=useDispatch();
    const [username,setusername]=React.useState(null);
    const [password,setpassword]=React.useState(null);
    const userLoading=useSelector(state=>state.UserReducer.loading);

    let  doLogin=()=>{
        dispatch(loginUser({username,password}));
    }
    return (
        <div className={"login-container"}>
            <RTL>
                <div style={{textAlign:"center",padding:"28px"}}>
                    <img src={HomeICON} height={128}/>
                </div>
                <div>
                    <TextField fullWidth id="outlined-helperText"
                        label=" نام کاربری "
                        defaultValue=""
                        helperText="نام کاربری خود را وارد نمایید"
                        variant="outlined"
                        value={username}
                        onChange={(e)=>setusername(e.target.value)}
                    />
                </div>
                <div>
                    <TextField fullWidth id="outlined-helperText"
                        type="password"
                        label="رمز عبور"
                        defaultValue=""
                        helperText="رمز عبور را وارد نمایید"
                        variant="outlined"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                    />
                </div>
                <div>
                    {userLoading?
                        <CircularProgress/>
                        :
                        <Button variant="contained" color="primary" onClick={doLogin}>ورود</Button>
                    }
                </div>
            </RTL>


        </div>
    )
}
export default Login;