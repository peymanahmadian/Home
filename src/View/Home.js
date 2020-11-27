import React from 'react';
import {Grid} from '@material-ui/core';
import Navbar from "./Navbar";
import {Route, Switch} from "react-router-dom";
import Index from "./LevelOne/Index";
import {default as IndexTwo} from "./LevelTwo/Index";
import {default as IndexThree} from "./LevelThree/Index";
import {default as IndexCity} from "./City/Index";
import {default as IndexProperties} from "./Properties/Index";
import {default as IndexThreeProperties} from "./LevelThreeProperties/Index";
import {default as IndexPropertiesOpt} from "./PropertiesOptions/Index";
import {default as IndexSpecial} from "./SpecialProperties/Index";
import {default as indexCityParts} from "./City/Parts";
import {default as indexTimer} from "./Commercial/Time";
import {default as indexPrice} from "./Commercial/Price";
import {default as indexInformation} from "./Information/Index";
import {default as IndexDiscount} from "./Discount/Index";
import {default as IndexReport} from "./Report/Index";
import {default as IndexUsers} from "./Users/Index";
import {default as IndexAdver} from "./Advertisement/Index";
import Dashboard from "./Dashboard";
import NotFound from "../Error/NotFound";
const Home =()=>{
    return(
        <Grid container>
            <Grid item  xs={12}>
                <Navbar/>
                <Switch>
                    <Route exact={true} path={"/"} component={Dashboard} />
                    <Route exact={true} path={"/level/one"} component={Index}/>
                    <Route exact={true} path={"/level/two"} component={IndexTwo}/>
                    <Route exact={true} path={"/level/three"} component={IndexThree}/>
                    <Route exact={true} path={"/city"} component={IndexCity}/>
                    <Route exact={true} path={"/properties"} component={IndexProperties}/>
                    <Route exact={true} path={"/level/three/option"} component={IndexThreeProperties}/>
                    <Route exact={true} path={"/properties/option"} component={IndexPropertiesOpt}/>
                    <Route exact={true} path={"/properties/special"} component={IndexSpecial}/>
                    <Route exact={true} path={"/city/parts"} component={indexCityParts}/>
                    <Route exact={true} path={"/commercial/time"} component={indexTimer}/>
                    <Route exact={true} path={"/commercial/price"} component={indexPrice}/>
                    <Route exact={true} path={"/information"} component={indexInformation}/>
                    <Route exact={true} path={"/discount"} component={IndexDiscount}/>
                    <Route exact={true} path={"/report"} component={IndexReport}/>
                    <Route exact={true} path={"/users"} component={IndexUsers}/>
                    <Route exact={true} path={"/advertisement"} component={IndexAdver}/>
                    <Route exact={true} component={NotFound}/>
                </Switch>
            </Grid>
        </Grid>
    )
}
export default Home;
