import React, {useEffect, useState} from 'react';
import {Grid,Select,MenuItem,} from '@material-ui/core'
import {useDispatch} from "react-redux";
import {LevelOne,LevelTwo,Header} from '../../Model/Urls';
import axios from 'axios';
import Table from '../Command/Table';
import RTL from '../RTL';
import {showError} from '../../Actions/ErrorActions';
import Loading from "../Command/Loading";
import Alert from "@material-ui/lab/Alert";
const Index=()=>{
    const dispatch=useDispatch();
    const [levelOne,setLevelOne]=useState([]);
    const [selectedOne,setSelectedOne]=useState(null);
    const [levelTwo,setLevelTwo]=useState([]);
    const [loading,setloading]=useState(false);
    const loadData=()=>{
        setloading(true);
        axios.get(LevelOne.get,{headers:Header(true)}).then((response)=>{
            setLevelOne(response.data.data);
            setSelectedOne(response.data.data[0].id);
            setloading(false);
        })
    };
    const loadDataLevelTwo=(one)=>{
        setloading(true);
        if(one){
            axios.get(`${LevelTwo.get}/${one}`,{headers:Header(true)}).then((response)=>{

                setLevelTwo(response.data.data);
                setloading(false);

            })
        }

    }
    useEffect(()=>{
        loadData();
    },[]);
    useEffect(()=>{
        loadDataLevelTwo(selectedOne);
    },[selectedOne])
    return(
        <RTL>
            {
                loading?
                    <Loading/>
                    :
                    <>
                        <Grid className={"header_input"}>
                            <div>
                                <label htmlFor="selectOne">سطح اول انتخابی:    </label>
                                {levelOne &&
                                <Select id={"selectOne"} value={selectedOne} onChange={(e)=>setSelectedOne(e.target.value)}>
                                    {levelOne.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                </Select>

                                }
                            </div>

                        </Grid>
                        {

                                <Grid>

                                    <Table
                                        title={"مدیریت سطح دوم"}
                                        data={levelTwo}
                                        column={[
                                            {title: 'شماره', field: 'id', editable: 'never'},
                                            {title: 'فیلد سطح شماره یک', field: 'categoryLevelOneName', editable: 'never'},
                                            {title: 'نام', field: 'name'}
                                        ]}
                                        actions={{
                                            onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    let body = {
                                                        ...newData,
                                                        "IsActive": true,
                                                        "CategoryLevelOneId": selectedOne
                                                    };
                                                    axios.post(LevelTwo.post, body, {headers: Header(true)}).then((response) => {
                                                        resolve();
                                                        loadDataLevelTwo(selectedOne);
                                                    }).catch(() => {
                                                        dispatch(showError({
                                                            showError: true,
                                                            content: 'خطا در ثبت اطلاعات'
                                                        }));
                                                        resolve();
                                                    })
                                                }),
                                            onRowUpdate: (newData) =>
                                                new Promise((resolve) => {
                                                    let body = {...newData, "IsActive": true,"CategoryLevelOneId":newData.categoryOneId};
                                                    axios.put(LevelTwo.edit, body, {headers: Header(true)}).then((response) => {
                                                        loadDataLevelTwo(selectedOne);
                                                        resolve()
                                                    }).catch(() => {
                                                        dispatch(showError({
                                                            showError: true,
                                                            content: 'خطا در ,ویرایش اطلاعات'
                                                        }));
                                                        resolve();
                                                    })
                                                }),
                                            onRowDelete: oldData =>
                                                new Promise((resolve, reject) => {
                                                    let param = oldData["id"];
                                                    axios.delete(LevelTwo.delete + "/" + param, {headers: Header(true)}).then((response) => {
                                                        loadDataLevelTwo(selectedOne);
                                                        resolve();
                                                    }).catch((err) => {
                                                        dispatch(showError({
                                                            showError: true,
                                                            content: 'خطا در حذف اطلاعات'
                                                        }));
                                                        resolve();
                                                    })
                                                }),
                                        }}
                                    />

                                </Grid>
                        }
                    </>
            }

        </RTL>
    );
};
export default Index;