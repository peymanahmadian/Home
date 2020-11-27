import React, {useEffect, useState} from 'react';
import {Grid,Select,MenuItem,} from '@material-ui/core'
import {useDispatch} from "react-redux";
import {City,CityPart,Header} from '../../Model/Urls';
import axios from 'axios';
import Table from '../Command/Table';
import RTL from '../RTL';
import {showError} from '../../Actions/ErrorActions';
const Parts=()=>{
    const dispatch=useDispatch();
    const [cities,setCities]=useState([]);
    const [selectedCity,setSelectedCities]=useState(null);
    const [parts,setParts]=useState([]);

    const loadCity=()=>{
        axios.get(City.get,{headers:Header(true)}).then((response)=>{
            setCities(response.data.data);
            setSelectedCities(response.data.data[0].id);
        })
    };
    const loadCityPart=(city)=>{
        if(setSelectedCities){
            axios.get(`${CityPart.get}/${city}`,{headers:Header(true)}).then((response)=>{
                setParts(response.data.data);
            })
        }
    };
    useEffect(()=>{
        loadCity();
    },[]);
    useEffect(()=>{
        loadCityPart(selectedCity);
    },[selectedCity])
    return(
        <RTL>
            <Grid className={"header_input"}>
                <div>
                    <label htmlFor="selectOne">شهر انتخابی:    </label>
                    {cities &&
                    <Select id={"selectOne"} value={selectedCity} onChange={(e)=>setSelectedCities(e.target.value)}>
                        {cities.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </Select>

                    }
                </div>

            </Grid>
            <Grid>

                <Table
                    title={"مدیریت بخش های شهر"}
                    data={parts}
                    column={[
                        { title: 'شماره', field: 'id', editable: 'never'},
                        {title:'نام',field:'name'}
                    ]}
                    actions={{
                        onRowAdd: newData =>
                            new Promise((resolve,reject) => {

                                let body={...newData,"IsActive":true,"CityId" : selectedCity};
                                axios.post(CityPart.post,body,{headers:Header(true)}).then((response)=>{
                                    loadCityPart(selectedCity);
                                    resolve();
                                }).catch(()=>{
                                    dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
                                    resolve();
                                })
                            }),
                        onRowUpdate: (newData) =>
                            new Promise((resolve) => {
                                let body={...newData,"IsActive":true,"CityId" : selectedCity};
                                axios.put(CityPart.edit,body,{headers:Header(true)}).then((response)=>{
                                    loadCityPart(selectedCity);
                                    resolve()
                                }).catch(()=>{
                                    dispatch(showError({showError:true,content:'خطا در ,ویرایش اطلاعات'}));
                                    resolve();
                                })
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve,reject) => {

                                let param=oldData["id"];
                                axios.delete(CityPart.delete +"/"+ param,{headers:Header(true)}).then((response)=>{
                                    loadCityPart(selectedCity);
                                    resolve();
                                }).catch((err)=>{
                                    dispatch(showError({showError:true,content:'خطا در حذف اطلاعات'}));
                                    resolve();
                                })
                            }),
                    }}
                />

            </Grid>
        </RTL>
    );
};
export default Parts;