import React, {useEffect, useState,useRef} from "react";
import {
    Button,
    Checkbox, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Input,
    MenuItem,
    NativeSelect,
    Select
} from "@material-ui/core";
import {PropertyType} from "../../Model/Enums";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import {Advertisement, City, CityPart, Header, LevelOne, LevelThree, LevelTwo} from "../../Model/Urls";
import {showError} from "../../Actions/ErrorActions";
import {useDispatch} from "react-redux";
//import Model
const AddAdvertisement=(props)=>{
    const dispatch=useDispatch();
    const ref=useRef();
    const style={
        input:{
            width:"100%",
            marginTop:"4px",
            marginBottom:"8px"
        }
    }
    //var

    const [levelOne,setLevelOne]=useState([]);
    const [selectedOne,setSelectedOne]=useState(null);
    const [levelTwo,setLevelTwo]=useState([]);
    const [selectedTwo,setSelectedTwo]=useState(null);
    const [levelThree,setLevelThree]=useState([]);
    const [selectedThree,setSelectedThree]=useState(null);
    const [levelThreeProperties,setLevelThreeProperties]=useState([]);
    const [selectLevelThreePro,setSelectLevelPro]=useState(null);
    const [typeInput,setTypeInput]=useState(PropertyType.Text);
    const [cityInit,setCityInit]=useState(null);
    const [subCityInit,setSubCityInit]=useState(null);
    //output
    const [sliderInput,setSliderInput]=useState([0,100]);
    const [textInput,setTextInput]=useState(null);
    const [optionInput,setOptionInput]=useState(null);
    const [boolInput,setBoolInput]=useState(false);
    const [typeMode,setTypeMode]=useState(PropertyType.Text);
    const [properties,setProperties]=useState([]);
    const [files,setFiles]=useState(null);
    const [citySelect,setCitySelect]=useState(null);
    const [subCitySelect,setSubCitySelect]=useState(null);
    const [name,setName]=useState(null);
    const [desc,setDesc]=useState(null);
    const [periodPriceId,setPeriodPriceId]=useState(null);
    const closeModal=()=>{

        setSliderInput([0,100]);
        setTextInput(null);
        setOptionInput(null);
        setBoolInput(false);
        setTypeMode(PropertyType.Text);
        setProperties([]);
        setFiles(null);
        setCitySelect(cityInit[0].id);
        setSubCitySelect(subCityInit[0].id);
        setName(null);
        setDesc(null);
        setPeriodPriceId(null);
        props.onClose();
    }
    //effect
    useEffect(()=>{
        loadCity();
    },[0]);
    useEffect(()=>{
        loadDataLevelOne();

    },[]);
    useEffect(()=>{
        loadDataLevelTwo(selectedOne);
    },[selectedOne]);
    useEffect(()=>{
        loadDataLevelThree(selectedTwo);
    },[selectedTwo]);
    useEffect(()=>{
        axios.get(`${Advertisement.getProperties}/${selectedThree}`,{headers:Header(true)}).then((response)=>{
            setLevelThreeProperties(response.data.data);
            setSelectLevelPro(response.data.data[0].propertyId);
        });
    },[selectedThree]);
    useEffect(()=>{
        if(levelThreeProperties && levelThreeProperties.length>0){
            if(levelThreeProperties.find(item => item.propertyId === selectLevelThreePro)){
                let typeNumber=levelThreeProperties.find(item => item.propertyId === selectLevelThreePro);
                setTypeInput(typeNumber);
            }

        }
    },[selectLevelThreePro,levelThreeProperties])
    useEffect(()=>{
        if(citySelect)
            loadSubCity(citySelect)
    },[citySelect]);
    //loading data
    const loadDataLevelOne=()=>{
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
            axios.get(`${LevelThree.get}/${select}`,{headers:Header(true)}).then((response)=>{
                setLevelThree(response.data.data);
                setSelectedThree(response.data.data[0].id);
            })
        }
    }
    const loadCity=()=>{
        axios.get(`${City.get}`,{headers:Header(true)}).then((response)=>{
            setCityInit(response.data.data)
            setCitySelect(response.data.data[0].id);
        })
    }
    const loadSubCity=(id)=>{
        axios.get(`${CityPart.get}/${id}`,{headers:Header(true)}).then((response)=>{
            setSubCityInit(response.data.data)
            if(response.data.data.length){
                setSubCitySelect(response.data.data[0].id);
            }
        })
    }
    //event handle
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const handleFile=async (e)=>{
        e.preventDefault();
        let base_64=[];
        let file = e.target.files;
        let cnt=0;
        for(let input of file){
            cnt++;
            let data= await toBase64(input);
            data=data.split(",")[1];
            base_64.push({RowId:cnt,Value:data,Name:input.name.split(".")[0]});
        }
        setFiles(base_64);


    }
    const handleInput=(type,value)=>{

        if(type===PropertyType.Text){
            setTypeMode(PropertyType.Text);
            setTextInput(value);
        }else if(type===PropertyType.Range){
            setTypeMode(PropertyType.Range);
            setSliderInput(value);
        }else if(type===PropertyType.Options){
            setTypeMode(PropertyType.Options);
            setOptionInput(value);
        }else{
            setTypeMode(PropertyType.Bool);
            setBoolInput(value);
        }
    }
    const addProperties=()=>{
        let item=null;
        switch (typeMode) {
            case PropertyType.Text:
                item={
                    PropertyCategoryId:selectLevelThreePro,
                    IsCheck:null,
                    Range:null,
                    Values:null,
                    Text:textInput
                }
                break;
            case PropertyType.Bool:
                item={
                    PropertyCategoryId:selectLevelThreePro,
                    IsCheck:boolInput,
                    Range:null,
                    Values:null,
                    Text:null
                }
                break;
            case PropertyType.Options:
                item={
                    PropertyCategoryId:selectLevelThreePro,
                    IsCheck:null,
                    Range:null,
                    Values:optionInput,
                    Text:null
                }
                break;
            case PropertyType.Range:
                item={
                    PropertyCategoryId:selectLevelThreePro,
                    IsCheck:null,
                    Range:sliderInput.toString(),
                    Values:null,
                    Text:null
                }
                break;
            default:
                return null
        }
        setProperties([...properties,item]);

    }
    const sendData=()=>{

        let item={
            id:props.id,
            images:files,
            Properties:properties,
            Name:name,
            CategoryLevelThreeId:parseInt(selectLevelThreePro),
            CityId:parseInt(citySelect),
            NeighborhoodId:parseInt(subCitySelect),
            Description:desc,
            PeriodPriceId:periodPriceId
        }
        if(item.id){
            item=JSON.stringify(item);

            axios.put(Advertisement.put,item,{headers:Header(true)}).then(data=>{
                dispatch(showError({showError:true,content:'ثبت با موفقیت انجام شد'}));
                closeModal();
            }).catch((e)=>{
                dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
            })
        }else{
            item=JSON.stringify(item);

            axios.post(Advertisement.post,item,{headers:Header(true)}).then(data=>{
                dispatch(showError({showError:true,content:'ثبت با موفقیت انجام شد'}));
                closeModal();
            }).catch((e)=>{
                dispatch(showError({showError:true,content:'خطا در ثبت اطلاعات'}));
            })
        }

    }
    return (
        <Dialog
            open={props.open}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"xl"}
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{props.id ? "ویرایش تبلیغ انتخابی" : "ایجاد یک تبلیغ جدید"} </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <label>نام :</label>
                        <Input type={'text'} style={style.input} value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <label htmlFor="select">شهر :</label>
                        {
                            cityInit &&
                            <NativeSelect style={style.input} onChange={(e)=>setCitySelect(e.target.value)}  labelId="label" id="select" value={citySelect}>
                                {
                                    cityInit.map(cityItem=><option value={cityItem.id}>{cityItem.name}</option>)
                                }
                            </NativeSelect>
                        }
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <label>شهرستان :</label>
                        {
                            subCityInit &&
                            <NativeSelect style={style.input}  onChange={(e)=>setSubCitySelect(e.target.value)} value={subCitySelect}>
                                {
                                    subCityInit.map(subCityItem=><option value={subCityItem.id}>{subCityItem.name}</option>)
                                }
                            </NativeSelect>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <div>
                            <label htmlFor="selectOne"> <b>سطح اول انتخابی :</b> </label>
                            {
                                levelOne &&
                                <Select style={style.input} value={selectedOne} onChange={(e)=>setSelectedOne(e.target.value)}>
                                    {levelOne.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                </Select>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                            <label htmlFor="selectOne"> <b>سطح دوم انتخابی :</b> </label>
                            {
                                levelTwo &&
                                <Select style={style.input} value={selectedTwo} onChange={(e)=>setSelectedTwo(e.target.value)}>
                                    {levelTwo.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                </Select>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                            <label htmlFor="selectOne"> <b>سطح سوم انتخابی :</b> </label>
                            {
                                levelThree &&
                                <Select style={style.input} value={selectedThree} onChange={(e)=>setSelectedThree(e.target.value)}>
                                    {levelThree.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                </Select>

                            }

                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <label htmlFor="propertiesLevelThree"> <b>خصوصیات سطح سوم :</b> </label>
                        {
                            levelThreeProperties && levelThreeProperties.length>0 &&
                            <Select style={style.input} id={"propertiesLevelThree"} value={selectLevelThreePro} onChange={(e)=>setSelectLevelPro(e.target.value)}>
                                {levelThreeProperties.map(properties=><MenuItem key={properties.propertyId} value={properties.propertyId} >{properties.propertyName}</MenuItem>)}
                            </Select>
                        }
                    </Grid>
                    {
                        typeInput &&
                        <Grid item xs={12} sm={6} md={4}>
                            <label> <b>خصوصیات سطح سوم :</b> </label>
                            <>
                                {
                                    (typeInput.type === PropertyType.Bool) &&
                                    <Checkbox value={boolInput} onChange={(e)=>handleInput(PropertyType.Bool,e.target.value)}/>
                                }
                                {
                                    (typeInput.type === PropertyType.Options) &&
                                    <Select style={style.input} value={optionInput}  onChange={(e)=>handleInput(PropertyType.Options,e.target.value)}>
                                        <MenuItem key={0} value={null}>-</MenuItem>
                                        {typeInput.propertiesOption.map(item=><MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}

                                    </Select>
                                }
                                {
                                    (typeInput.type === PropertyType.Range) &&
                                    <Slider
                                        style={style.input}
                                        value={sliderInput}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        onChange={(e,newValue)=>handleInput(PropertyType.Range,newValue)}
                                    />
                                }
                                {
                                    (typeInput.type===PropertyType.Text) &&
                                    <Input style={style.input} value={textInput} onChange={(e)=>handleInput(PropertyType.Text,e.target.value)}/>
                                }
                            </>
                        </Grid>
                    }
                    <Grid item xs={12} sm={6} md={4}>
                        <label><b>انتخاب تصاویر</b></label>
                        <Button style={style.input} variant="contained" color="default" onClick={()=>ref.current.click()}>بارگذاری تصاویر</Button>
                        <input style={{display:"none"}} multiple max={10} min={1} type={"file"} ref={ref} onChange={handleFile} accept={".jpg"}/>
                    </Grid>

                </Grid>
                <Grid xs={12} sm={4} style={{marginTop:"20px"}}>
                    <Button fullWidth variant="contained" color={"secondary"} type={"button"} onClick={addProperties}>اضافه کردن</Button>
                </Grid>
                <Grid container spacing={2} style={{marginTop:"6px"}}>
                    <Grid item xs={12}>
                        {properties && properties.map(item=><Chip label={` شماره دسته بندی :${item.PropertyCategoryId} `} />)}
                    </Grid>


                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <label><b>توضیحات</b> </label>
                        <Input fullWidth={true} type={"textarea"} value={desc} onChange={(e)=>setDesc(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <label><b>قیمت بازه ای</b></label>
                        <Input fullWidth={true} type={"number"} value={periodPriceId} onChange={(e)=>setPeriodPriceId(e.target.value)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    انصراف
                </Button>
                <Button onClick={sendData} color="primary" autoFocus>
                    ایجاد
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default AddAdvertisement;