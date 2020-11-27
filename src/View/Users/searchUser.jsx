import React, {useEffect, useState} from "react";
import {TextField,Paper,MenuList,MenuItem} from "@material-ui/core";
import axios from "axios";
import {Header} from "../../Model/Urls";
const SearchUser=(props)=>{
    const [search,setSearch]=useState(null);
    const [list,setList]=useState([]);
    const [fullName,setFullName]=useState(null);
    const searchUser=(param)=>{
        setList([]);
        let searchParam=`http://pg.sandboxdevelop.ir/Idp/api/User/GetUsers?`;
        let filter="";
        if(isNaN(param)){
            filter=`firstName=${param}`;
        }else{
            filter=`phoneNumber=${param}`;
        }
        axios.get(`${searchParam}${filter}`,{headers:Header(true)}).then(data=>{
            setList(data.data.data)
        }).catch(err=>{
        })
    }
    useEffect(()=>{
        if(search && search.length>2)
        searchUser(search);
        }
    ,[search])
    return(
        <>
            <TextField value={search} fullWidth id="standard-basic" label="جستجوی کاربران" onChange={e=>setSearch(e.target.value)} />
            {list.length>0 &&
            <Paper>
                <MenuList>
                    {list.map(item=><MenuItem onClick={()=>{setSearch(item.firstName+" "+item.lastName);props.onSelect(item.userId)}} id={item.userId}>{item.firstName} {item.lastName}</MenuItem>)}
                </MenuList>
            </Paper>
            }

        </>
    )
}
export default SearchUser;