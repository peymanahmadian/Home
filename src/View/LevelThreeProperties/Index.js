import React, {useEffect, useState} from 'react';
import {Grid,Select,MenuItem} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch} from "react-redux";
import {LevelOne,LevelTwo,LevelThree,LevelThreeProperties,Properties,Header} from '../../Model/Urls';
import axios from 'axios';
import Table from '../Command/Table';
import RTL from '../RTL';
import {showError} from '../../Actions/ErrorActions';
import Loading from "../Command/Loading";
const Index=()=>{
    const dispatch=useDispatch();
    const [levelOne,setLevelOne]=useState([]);
    const [selectedOne,setSelectedOne]=useState(null);
    const [levelTwo,setLevelTwo]=useState([]);
    const [selectedTwo,setSelectedTwo]=useState(null);
    const [levelThree,setLevelThree]=useState([]);
    const [selectedThree,setSelectedThree]=useState(null);
    const [levelThreeProperties,setLevelThreeProperties]=useState([]);
    const [properties,setProperties]=useState([]);
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
                    setLevelThreeProperties([]);

                }
            })
        }
    }
    const loadDataLevelThree=(select)=>{
        if(select){
            axios.get(`${LevelThree.get}/${select}`,{headers:Header(true)}).then((response)=>{
                setLevelThree(response.data.data);
                setSelectedThree(response.data.data[0].id);
            })
        }
    }
    const loadProperties=(select)=>{
        if(select){
            axios.get(`${LevelThreeProperties.get}/${select}`,{headers:Header(true)}).then((response)=>{
                setLevelThreeProperties(response.data.data);
            })
        }
    }
    const loadPropertiesObj=()=>{
        setLoading(true);
        axios.get(Properties.get,{headers:Header(true)}).then((response)=>{
            setProperties(response.data.data);
            setLoading(false);
        })
    }
    useEffect(()=>{
        loadData();
    },[]);
    useEffect(()=>{
        setLevelTwo([]);
        setLevelThree([]);
        setLevelThreeProperties([]);
        loadDataLevelTwo(selectedOne);
    },[selectedOne]);
    useEffect(()=>{
        setLevelThree([]);
        setLevelThreeProperties([]);
        loadDataLevelThree(selectedTwo);
        loadPropertiesObj();
    },[selectedTwo])
    useEffect(()=>{
        setLevelThreeProperties([]);
        loadProperties(selectedThree);
    },[selectedThree])
    console.log(properties)
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
                            <div>
                                <label htmlFor="selectOne">سطح سوم انتخابی:    </label>
                                {
                                    levelThree &&
                                    <Select value={selectedThree} onChange={(e)=>setSelectedThree(e.target.value)}>
                                        {levelThree.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                    </Select>

                                }

                            </div>
                        </Grid>
                        <Grid>

                            <Table
                                title={"مدیریت خصوصیات سطح سوم"}
                                data={levelThreeProperties}
                                column={[
                                    { title: 'شماره', field: 'id', editable: 'never'},
                                    { title: 'نام خصوصیت', field: 'propertyName',
                                        editComponent: props => (
                                            <Select
                                                value={props.value && properties.find(pro=>pro.name=props.value).id}
                                                onChange={e => props.onChange(e.target.value)}
                                            >
                                                {
                                                    properties.map(item=><MenuItem value={item.id}>{item.name}</MenuItem>)
                                                }
                                            </Select>
                                        )
                                    },
                                    { title: 'نام دسته بندی سطح سوم', field: 'categoryLevelThreeName', editable: 'never'},
                                    { title: 'فعال', field: 'isActive',render:(rowdata)=>(rowdata.isActive===true)?<CheckIcon/>:<CloseIcon/>,
                                        editComponent: props => (
                                            <Select
                                                value={props.value}
                                                onChange={e => props.onChange(e.target.value)}
                                            >
                                                <MenuItem value={true}>فعال</MenuItem>
                                                <MenuItem value={false}>غیرفعال</MenuItem>
                                            </Select>
                                        )
                                    },
                                ]}
                                actions={{
                                    onRowAdd: (newData) =>
                                        new Promise((resolve,reject) => {
                                            let body={...newData,"CategoryLevelThreeId":selectedThree,"propertyID":newData.propertyName}
                                            axios.post(LevelThreeProperties.post,body,{headers:Header(true)}).then((response)=>{
                                                loadProperties(selectedThree);
                                                resolve();
                                            }).catch((e)=>{
                                                dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
                                                resolve();
                                            })
                                        }),
                                    onRowUpdate: (newData) =>
                                        new Promise((resolve) => {
                                            debugger;
                                            let body={Id:newData.id,PropertyId:properties.find(pro=>pro.name=newData.propertyName).id,IsActive:newData.isActive,CategoryLevelThreeId:newData.categoryLevelThreeId};
                                            axios.put(LevelThreeProperties.edit,body,{headers:Header(true)}).then((response)=>{
                                                loadProperties(selectedThree);
                                                resolve()
                                            }).catch(()=>{
                                                dispatch(showError({showError:true,content:'خطا در ,ویرایش اطلاعات'}));
                                                resolve();
                                            })
                                        }),
                                    onRowDelete: oldData =>
                                        new Promise((resolve,reject) => {
                                            let param=oldData["id"];
                                            axios.delete(LevelThreeProperties.delete +"/"+ param,{headers:Header(true)}).then((response)=>{
                                                loadProperties(selectedThree);
                                                resolve();
                                            }).catch((err)=>{
                                                dispatch(showError({showError:true,content:'خطا در حذف اطلاعات'}));
                                                resolve();
                                            })
                                        }),
                                }}
                            />

                        </Grid>
                    </>
            }

        </RTL>
    );
};
export default Index;