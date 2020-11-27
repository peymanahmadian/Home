import React,{useState,useEffect} from "react";
import {Header, Report} from "../../Model/Urls";
import RTL from "../RTL";
import {Grid,TextField,Button} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from '@material-ui/icons/Save';
import Table from "../Command/Table";
import axios from "axios";
import Loading from "../Command/Loading";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";
const Index=()=>{
    const [type,setType]=useState(Report.types[0].value);
    const [data,setData]=useState(null);
    const [col,setCol]=useState(null);
    const [loading,setLoading]=useState(false);
    const [formVal,setFormVal]=useState({fromDate:null,toDate:null,phoneNumber:"",cityId:"",neighborhoodId:""});
    const loadData=(type)=>{
        setLoading(true);
        setData(null);
        setCol(null);
        //create body
        let body= {};
        //cal form
        for(let item in formVal){
            if(formVal[item]){
                body[item]=formVal[item];
            }
        }
        axios.get(`${Report.url}/${type}`,{headers:Header(true),params:body}).then(result=>{
            setLoading(false);
            setData(result.data.data);
            //set col
            let colName=[];
            for(let col in result.data.data[0]){
                let word=null;
                switch (col.toLowerCase()) {
                    case "userid":
                        word="شماره";
                        break;
                    case "phonenumber":
                        word="شماره تلفن";
                        break;
                    case "firstname":
                        word="نام";
                        break;
                    case "lastname":
                        word="نام خانوادگی";
                        break;
                    case "isactive":
                        word="فعال";
                        break;
                    case "email":
                        word="ایمیل";
                        break;
                    case "tel":
                        word="شماره تلفن";
                        break;
                    case "id":
                        word="شماره";
                        break;
                    case "name":
                        word="نام";
                        break;
                    case "ischat":
                        word="قابلیت چت";
                        break;
                    case "cityname":
                        word="نام شهر";
                        break;
                    case "neighborhoodname":
                        word="نام شهرستان";
                        break;
                    case "address":
                        word="آدرس";
                        break;
                    case "registerdate":
                        word="شماره ثبت";
                        break;
                    default:
                        word=col;
                        break;


                }
                if(col==="registerDate"){
                    colName.push({title:word ,field:col,render:(rowdata)=>moment(rowdata.registerDate).format("jYYYY-jMM-jDD")});
                }else{
                    colName.push({title:word ,field:col});
                }

            }
            debugger;
            setCol(colName)
        }).catch(()=>{
            setLoading(false);
            setData([])
        })
    }
    useEffect(()=>{
        setLoading(true);
        setData(null);
        setCol(null);
        //create body
        let body= {};
        //cal form
        for(let item in formVal){
            if(formVal[item]){
                body[item]=formVal[item];
            }
        }
        axios.get(`${Report.url}/${type}`,{headers:Header(true),params:body}).then(result=>{
            setLoading(false);
            setData(result.data.data);
            //set col
            let colName=[];
            for(let col in result.data.data[0]){
                let word=null;
                switch (col.toLowerCase()) {
                    case "userid":
                        word="شماره";
                        break;
                    case "phonenumber":
                        word="شماره تلفن";
                        break;
                    case "firstname":
                        word="نام";
                        break;
                    case "lastname":
                        word="نام خانوادگی";
                        break;
                    case "isactive":
                        word="فعال";
                        break;
                    case "email":
                        word="ایمیل";
                        break;
                    case "tel":
                        word="شماره تلفن";
                        break;
                    case "id":
                        word="شماره";
                        break;
                    case "name":
                        word="نام";
                        break;
                    case "ischat":
                        word="قابلیت چت";
                        break;
                    case "cityname":
                        word="نام شهر";
                        break;
                    case "neighborhoodname":
                        word="نام شهرستان";
                        break;
                    case "address":
                        word="آدرس";
                        break;
                    case "registerdate":
                        word="شماره ثبت";
                        break;
                    default:
                        word=col;
                        break;


                }
                if(col==="registerDate"){
                    colName.push({title:word ,field:col,render:(rowdata)=>moment(rowdata.registerDate).format("jYYYY-jMM-jDD")});
                }else{
                    colName.push({title:word ,field:col});
                }
            }
            debugger;
            setCol(colName)
        }).catch(()=>{
            setLoading(false);
            setData([])
        })

    },[type,formVal]);
    return(
        loading ?
        <Loading/>
            :
        <RTL>
            <Grid className={"header_input"}>
                <div>
                    <label htmlFor="selectOne"> نوع گزارش </label>
                    {
                        Report.types &&
                        <Select value={type} onChange={(e)=>setType(e.target.value)}>
                            {Report.types.map(item=><MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
                        </Select>
                    }
                </div>
            </Grid>
            <div style={{flexGrow:"1"}}>
                <Grid container>
                    {
                        (type===Report.types[3].value || type===Report.types[6].value || type===Report.types[8].value)&&
                        <>
                            <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    value={formVal.fromDate}
                                           onChange={(e)=>setFormVal({...formVal,fromDate:e.target.value})}
                                           variant="outlined" id="standard-basic" label="از روز" fullWidth/>
                            </Grid>
                            <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                value={formVal.toDate}
                                onChange={(e)=>setFormVal({...formVal,toDate:e.target.value})}
                                variant="outlined" id="standard-basic" label="تا روز" fullWidth/>
                            </Grid>
                        </>
                    }
                    {
                        (type===Report.types[3].value || type===Report.types[6].value)&&
                            <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    value={formVal.phoneNumber}
                                    onChange={(e)=>setFormVal({...formVal,phoneNumber:e.target.value})}
                                    variant="outlined" id="standard-basic" label="شماره تلفن" fullWidth/>
                            </Grid>
                    }
                    {
                        type===Report.types[8].value &&
                            <>
                                <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                                    <TextField
                                        value={formVal.cityId}
                                        onChange={(e)=>setFormVal({...formVal,cityId:e.target.value})}
                                        variant="outlined" id="standard-basic" label="شهر" fullWidth/>
                                </Grid>
                                <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                                    <TextField
                                        value={formVal.neighborhoodId}
                                        onChange={(e)=>setFormVal({...formVal,neighborhoodId:e.target.value})}
                                        variant="outlined" id="standard-basic" label="محله" fullWidth/>
                                </Grid>
                            </>
                    }
                    {
                        (type===Report.types[3].value || type===Report.types[6].value || type===Report.types[8].value)&&
                        <Grid className={"col_item"} item xs={12} sm={6} md={4} lg={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type={"button"}
                                startIcon={<SaveIcon />}
                                onClick={()=>{
                                    loadData(type)
                                }}
                            >
                                اعمال فیلتر
                            </Button>
                        </Grid>
                    }

                </Grid>
            </div>
            <Grid>
                {
                    (data && col && data.length>0 && col.length>0)?
                    <Table
                        title={"گزارش گیری"}
                        data={data}
                        column={col}
                    />
                    :
                    <div>اطلاعاتی وجود ندارد</div>

                }

            </Grid>

        </RTL>
    )
}
export default Index;