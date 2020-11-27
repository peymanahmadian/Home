import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {CommercialTime,Header} from '../../Model/Urls';
import axios from 'axios';
import Table from '../Command/Table';
import RTL from '../RTL';
import {showError} from '../../Actions/ErrorActions';
const Time=()=>{
    const dispatch=useDispatch();
    const [Commercial,setCommercial]=useState([]);
    const loadData=()=>{

        axios.get(CommercialTime.get,{headers:Header(true)}).then((response)=>{
            setCommercial(response.data.data)
        }).catch(()=> setCommercial([]))
    }
    useEffect(()=>{
        loadData();
    },[])
    return(
        <RTL>
            <Table
                title={"مدیریت زمان آگهی"}
                data={Commercial}
                column={[
                    { title: 'شماره', field: 'id', editable: 'never'},
                    { title: 'نام', field: 'name'},
                    { title: 'دوره زمانی', field: 'perDay'},

                ]}
                actions={{
                    onRowAdd: newData =>
                        new Promise((resolve,reject) => {
                            let body={PerDays:newData.perDay,Name:newData.name};
                            axios.post(CommercialTime.post,body,{headers:Header(true)}).then((response)=>{
                                loadData();
                                resolve()
                            }).catch((e)=>{
                                dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
                                resolve();
                            })
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            let body={PerDays:newData.perDay,Name:newData.name,Id:newData.id}
                            axios.put(CommercialTime.edit,body,{headers:Header(true)}).then((response)=>{
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
                            axios.delete(CommercialTime.delete +"/"+ param,{headers:Header(true)}).then((response)=>{
                                loadData();
                                resolve();
                            }).catch((err)=>{
                                dispatch(showError({showError:true,content:'خطا در حذف اطلاعات'}));
                                resolve();
                            })
                        }),
                }}
            />
        </RTL>
    );
};
export default Time;