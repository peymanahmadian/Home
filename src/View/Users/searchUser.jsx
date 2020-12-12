import React, {useState} from "react";
import {TextField,Checkbox,FormControlLabel,Grid,makeStyles,Button} from "@material-ui/core";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali";
import axios from "axios";
import {Header} from "../../Model/Urls";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    fullWidth:{
        width:"100% !important"
    },
    drop:{
        position: "absolute",
        zIndex: "99999999",
        backgroundColor: "white",
        width: "80%",
        boxShadow: "0 0 4px grey",
        padding: "12px",
        maxHeight: "200px",
        overflow: "auto"
    }
}));

const SearchUser=(props)=>{
    const classes = useStyles();
    const [search]=useState(null);
    const [list,setList]=useState([]);
    const [fromDate,setFromDate]=useState(null);
    const [toDate,setToDate]=useState(null);
    const [phoneNumber,setPhoneNumber]=useState(null);

    const [usersList,setUsersList]=useState([]);
    const selectUser=(status,item)=>{

        let cash=usersList;
        if(status){
            cash.push(item);
        }else{
            cash=cash.filter(arr=>arr.userId!=item.userId);
        }
        setUsersList(cash);
    }
    const searchUser=()=>{
        if((fromDate && toDate) || search){
            setList([]);
            let searchParam=`http://pg.sandboxdevelop.ir/Idp/api/User/GetUsers?`;
            let filter="";
            if(phoneNumber) {
                filter = `fromDate=${moment(fromDate).format("YYYY-MM-DD")}&toDate=${moment(toDate).format("YYYY-MM-DD")}&phoneNumber=${phoneNumber}`;
            }
            else{
                filter = `fromDate=${moment(fromDate).format("YYYY-MM-DD")}&toDate=${moment(toDate).format("YYYY-MM-DD")}`;

            }
            axios.get(`${searchParam}${filter}`,{headers:Header(true)}).then(data=>{
                setList(data.data.data)
            })
        }

    }

    return(
        <div style={{position:"relative"}}>
            <Grid container>
                    <Grid item xs={12} md={4} className={classes.container}>
                        <lable>از تاریخ:</lable>
                        <DatePicker
                            className={classes.fullWidth}
                            isGregorian={false}
                            value={fromDate}
                            onChange={e => setFromDate(e)}
                            timePicker={false}
                        />


                    </Grid>
                    <Grid item xs={12} md={4} className={classes.container}>
                        <lable>تا تاریخ:</lable>
                        <DatePicker
                            className={classes.fullWidth}
                            isGregorian={false}
                            value={toDate}
                            onChange={e => setToDate(e)}
                            timePicker={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} style={{marginTop:"15px"}}>
                        <TextField variant="filled" label={"شماره تلفن"} value={phoneNumber}  id="standard-basic"  onChange={e=>setPhoneNumber(e.target.value)} />
                    </Grid>
                </Grid>
            <Grid container>
                {/*<Grid item xs={9}>*/}
                {/*    <TextField disabled	={dateSaerch} value={search} fullWidth id="standard-basic"  onChange={e=>setSearch(e.target.value)} />*/}
                {/*</Grid>*/}
                <Grid item xs={3}>
                    <Button color={"primary"} onClick={()=>searchUser()}> جستجو </Button>
                    {!props.singleCheck && <Button color={"primary"} onClick={()=>{setList([]);props.onSelect(usersList)}}>انتخاب</Button>}
                </Grid>
            </Grid>
            {list.length>0 &&
                <div className={classes.drop} >
                    {list.map(item=>
                        <div
                                 // onClick={()=>{setSearch(item.firstName+" "+item.lastName);props.onSelect(item);setList([])}}
                                 id={item.userId}>
                                <FormControlLabel
                                    control={
                                        props.singleCheck?
                                            <Button color="primary" style={{margin:"2px 4px"}} variant="contained" onClick={()=>{props.onSelect(item);setList([])}}>انتخاب</Button>
                                            :
                                            <Checkbox
                                            onChange={(e)=>{selectUser(e.target.checked,item)}}
                                            color="primary"
                                            />
                                    }
                                    label={item.firstName + " " + item.lastName}
                                />
                             </div>)



                    }
                </div>
            }

        </div>
    )
}
export default SearchUser;