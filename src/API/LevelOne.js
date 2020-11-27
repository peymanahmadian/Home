import axios from 'axios';
import {LevelOne as LevelOneLInk,Header} from '../Model/Urls';
class LevelOne{
    get=async ()=>{
        try {
            const response=await axios.get(LevelOneLInk.get,{headers:Header(true)})
            return response;
        }catch (e) {
            return e;
        }
    }

}
export default new LevelOne();