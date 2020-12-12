import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Grid} from "@material-ui/core"
//url
import {Header, LevelOne} from "../Model/Urls";
import axios from "axios";
import RTL from "./RTL";
const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});
const style={
    paddingV:{
        padding:"10px"

    }
}
const Dashboard=()=>{
    const classes = useStyles();
    const [treeModel,setModel]=useState(null);
    useEffect(()=>{
        axios.get(LevelOne.getAll,{headers:Header(true)}).then((data)=>{
            let cache=data.data.data;
            let newRes= [];
            for(let item in cache){
                let cacheItem={};
                for(let itemIn in cache[item]){
                    if(itemIn==="categoryLevelTwoChilds"){
                        cacheItem["children"]=cache[item][itemIn];
                    }else{
                        cacheItem[itemIn]=cache[item][itemIn];
                    }
                }
                //in

                let cnt=cacheItem.children;
                let sample=[];
                for(let cachOut in cnt){
                    let ccacheItem={};
                    for(let cachIn in cnt[cachOut]){
                        if(cachIn==="categoryLevelThreeChilds"){
                            ccacheItem["children"]=cnt[cachOut][cachIn];
                        }else{
                            ccacheItem[cachIn]=cnt[cachOut][cachIn];
                        }
                    }
                    sample.push(ccacheItem);
                }
                cacheItem.children=sample;
                //in
                newRes.push(cacheItem);
            }
            let robote={
                id: 'root',
                name: 'ساختار سلسله مراتبی ',
                children:newRes
            }
            console.log(robote);
            setModel(robote);
        })
    },[]);
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <Grid xs={12} style={style.paddingV}>
            {
                treeModel &&
                <RTL>
                    <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={['root']}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {renderTree(treeModel)}
                    </TreeView>
                </RTL>
            }
        </Grid>


    );
}
export default Dashboard;