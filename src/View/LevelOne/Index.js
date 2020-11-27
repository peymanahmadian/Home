import React, {useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import {useDispatch} from "react-redux";
import axios from 'axios';
//import Model
import {LevelOne,Header} from '../../Model/Urls';
//import component
import Table from '../Command/Table';
import RTL from '../RTL';
import {showError} from '../../Actions/ErrorActions';
import Loading from "../Command/Loading";
const Index=()=>{
    const dispatch=useDispatch();
    const [levelOne,setLevelOne]=useState([]);
    const [loading,setLoading]=useState(false);
    const loadData=()=>{
        setLoading(true);
        axios.get(LevelOne.get,{headers:Header(true)}).then((response)=>{
            setLoading(false);
            setLevelOne(response.data.data)
        })
    }
    useEffect(()=>{
        loadData();
    },[])
    return(
        <RTL>
            {
                loading?
                    <Loading/>
                    :
                    (levelOne.length===0) ?
                        <Alert severity="warning">اطلاعاتی یافت نشد</Alert>
                        :
                        <Table
                            title={"مدیریت سطح اول"}
                            data={levelOne}
                            column={[
                                { title: 'شماره', field: 'id', editable: 'never'},
                                { title: 'نام', field: 'name'},
                            ]}
                            actions={{
                                onRowAdd: newData =>
                                    new Promise((resolve,reject) => {
                                        let body={...newData,"IsActive":true};
                                        axios.post(LevelOne.post,body,{headers:Header(true)}).then((response)=>{
                                            loadData();
                                            resolve()
                                        }).catch(()=>{
                                            dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
                                            resolve();
                                        })
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        let body={...newData,"IsActive":true};
                                        axios.put(LevelOne.edit,body,{headers:Header(true)}).then((response)=>{
                                            loadData();
                                            resolve()
                                        }).catch(()=>{
                                            dispatch(showError({showError:true,content:'خطا در ,ویرایش اطلاعات'}));
                                            resolve();
                                        })
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve,reject) => {
                                        let param=oldData["id"];
                                        axios.delete(LevelOne.delete +"/"+ param,{headers:Header(true)}).then((response)=>{
                                            loadData();
                                            resolve();
                                        }).catch((err)=>{
                                            dispatch(showError({showError:true,content:'خطا در حذف اطلاعات'}));
                                            resolve();
                                        })
                                    }),
                            }}
                        />
            }

        </RTL>
    );
};
export default Index;