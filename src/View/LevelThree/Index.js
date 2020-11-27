import React, {useEffect, useState} from 'react';
import {Grid,Select,MenuItem} from '@material-ui/core'
import {useDispatch} from "react-redux";
import {LevelOne,LevelTwo,LevelThree,Header} from '../../Model/Urls';
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
    const [selectedTwo,setSelectedTwo]=useState(null);
    const [levelThree,setLevelThree]=useState([]);
    const [loading,setLoading]=useState(false);
    const loadData=()=>{
        axios.get(LevelOne.get,{headers:Header(true)}).then((response)=>{
            setLevelOne(response.data.data);
            setSelectedOne(response.data.data[0].id);
        })
    };
    const loadDataLevelTwo=(select)=>{
        if(select){
            axios.get(`${LevelTwo.get}/${select}`,{headers:Header(true)}).then((response)=>{
                setLevelTwo(response.data.data);
                if(response.data.data.length){
                    setSelectedTwo(response.data.data[0].id);
                }else{
                    setLevelThree([]);
                }

            })
        }
    }
    const loadDataLevelThree=(select)=>{
        if(select){
            setLoading(true);
            axios.get(`${LevelThree.get}/${select}`,{headers:Header(true)}).then((response)=>{
                setLevelThree(response.data.data);
                setLoading(false);
            })
        }
    }
    useEffect(()=>{
        loadData();
    },[]);
    useEffect(()=>{
        loadDataLevelTwo(selectedOne);
    },[selectedOne]);
    useEffect(()=>{
        loadDataLevelThree(selectedTwo);
    },[selectedTwo])
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
                                {
                                    levelOne &&
                                    <Select value={selectedOne} onChange={(e)=>setSelectedOne(e.target.value)}>
                                        {levelOne.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                }
                            </div>
                            <div>
                                <label htmlFor="selectOne">سطح دوم انتخابی:    </label>
                                {
                                    levelTwo &&
                                    <Select value={selectedTwo} onChange={(e)=>setSelectedTwo(e.target.value)}>
                                        {levelTwo.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                }
                            </div>
                        </Grid>
                        {

                                    <Grid>

                                        <Table
                                            title={"مدیریت سطح سوم"}
                                            data={levelThree}
                                            column={[
                                                { title: 'شماره', field: 'id', editable: 'never'},
                                                { title: 'فیلد سطح شماره دوم', field: 'categoryLevelTwoName',editable:'never'},
                                                {title:'نام',field:'name'}
                                            ]}
                                            actions={{
                                                onRowAdd: newData =>
                                                    new Promise((resolve,reject) => {
                                                        let body={...newData,"IsActive":true,"CategoryLevelTwoId" : selectedTwo};
                                                        axios.post(LevelThree.post,body,{headers:Header(true)}).then((response)=>{
                                                            loadDataLevelThree(selectedTwo);
                                                            resolve();
                                                        }).catch((e)=>{
                                                            dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
                                                            resolve();
                                                        })
                                                    }),
                                                onRowUpdate: (newData) =>
                                                    new Promise((resolve) => {
                                                        let body={...newData,"IsActive":true,"CategoryLevelTwoId":newData.categoryLevelTwoId};
                                                        axios.put(LevelThree.edit,body,{headers:Header(true)}).then((response)=>{
                                                            loadDataLevelThree(selectedTwo);
                                                            resolve()
                                                        }).catch(()=>{
                                                            dispatch(showError({showError:true,content:'خطا در ,ویرایش اطلاعات'}));
                                                            resolve();
                                                        })
                                                    }),
                                                onRowDelete: oldData =>
                                                    new Promise((resolve,reject) => {
                                                        let param=oldData["id"];
                                                        axios.delete(LevelThree.delete +"/"+ param,{headers:Header(true)}).then((response)=>{
                                                            loadDataLevelThree(selectedTwo);
                                                            resolve();
                                                        }).catch((err)=>{
                                                            dispatch(showError({showError:true,content:'خطا در حذف اطلاعات'}));
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