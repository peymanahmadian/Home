import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Properties,LevelOne,Special, Header} from '../../Model/Urls';
import axios from 'axios';
import Table from '../Command/Table';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import RTL from '../RTL';
import {showError} from '../../Actions/ErrorActions';
import {Grid} from "@material-ui/core";
const Index=()=>{
    const dispatch=useDispatch();
    const [category,setCategory]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState(null);
    const [properties,setProperties]=useState([]);
    const [options,setOptions]=useState([]);
    const loadCategory=()=>{
        axios.get(LevelOne.get,{headers:Header(true)}).then((response)=>{
            setCategory(response.data.data);
            setSelectedCategory(response.data.data[0].id);
        })
    }
    const loadProperties=()=>{
        axios.get(Properties.get,{headers:Header(true)}).then((response)=>{

            setProperties(response.data.data);
        })
    };
    const loadSpecial=(param)=>{
        if(param){
            setOptions([]);
            axios.get(`${Special.get}/${param}`,{headers:Header(true)}).then((response)=>{
                setOptions(response.data.data);
            })
        }

    }
    useEffect(()=>{
        loadCategory();
        loadProperties();
    },[]);
    useEffect(()=>{
        setOptions([]);
        loadSpecial(selectedCategory);
    },[selectedCategory])
    return(
        <RTL>
            <Grid className={"header_input"}>
                <div>
                    <label htmlFor="selectOne">سطح اول انتخابی:    </label>
                    {
                        category &&
                        <Select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
                            {category.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    }
                </div>
            </Grid>
            <Grid>
                <Table
                    title={"مدیریت خصوصیات ویژه"}
                    data={options}
                    column={[
                        { title: 'شماره', field: 'id', editable: 'never'},
                        {title:'نام خصوصیات',field:'propertyName',
                            editComponent:(prop)=>{
                                return (
                                    <select value={properties.find(pro=>pro.name=prop.value).id} onChange={(e) => prop.onChange(e.target.value)}>{properties.map(item=><option value={item.id}>{item.name}</option>)}</select>
                                )
                            }},
                        { title: 'نام دسته بندی سطح اول', field: 'categoryLevelOneName', editable: 'never'},
                        {title:'فعال سازی',field:'isActive',render:(rowdata)=>(rowdata.isActive===true)?<CheckIcon/>:<CloseIcon/>,
                            editComponent:(prop)=><select value={prop.value}  onChange={(e) => prop.onChange(e.target.value)}><option value={true}>فعال شده</option><option value={false}>فعال نشده</option></select>
                        }

                    ]}
                    actions={
                        {
                            onRowAdd: newData =>
                                new Promise((resolve) => {
                                    let body={"IsActive":Boolean(newData.isActive),"PropertyId":parseInt(newData.propertyId),"CategoryLevelOneId":selectedCategory}
                                    axios.post(Special.post,body,{headers:Header(true)}).then((response)=>{
                                        loadSpecial(selectedCategory);
                                        resolve()
                                    }).catch(()=>{
                                        dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
                                        resolve();
                                    })
                                }),
                            onRowUpdate: (newData) =>
                                new Promise((resolve) => {
                                    axios.put(Special.edit,newData,{headers:Header(true)}).then((response)=>{
                                        loadSpecial(selectedCategory);
                                        resolve()
                                    }).catch(()=>{
                                        dispatch(showError({showError:true,content:'خطا در ,ویرایش اطلاعات'}));
                                        resolve();
                                    })
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve,reject) => {
                                    let param=oldData["id"];
                                    axios.delete(Special.delete +"/"+ param,{headers:Header(true)}).then((response)=>{
                                        loadSpecial(selectedCategory);
                                        resolve();
                                    }).catch((err)=>{
                                        dispatch(showError({showError:true,content:'خطا در حذف اطلاعات'}));
                                        resolve();
                                    })
                                }),
                        }
                    }
                />
            </Grid>

        </RTL>
    );
};
export default Index;