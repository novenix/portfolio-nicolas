// para hacer una accion de endpoint
// aqui se hace crear modificar o borrar desde ladodelcliente
import axios from 'axios'
import Cookies from 'js-cookie'
import {getCookieFromReq} from '../helpers/utils'
const axiosInstance=axios.create({
    baseURL:'http://localhost:3000/api/v1',
    // si se demora mas de 3 segundos es una peticion fail
    timeout:3000
})

const setAuthHeader=(req)=>{
    const token = req ? getCookieFromReq(req,'jwt') : Cookies.getJSON('jwt');
    if (token){
        return{
            headers:{'authorization':`Bearer ${token}`}
        }
    }
    
    return undefined;
    
}

export const getSecretData=async (req)=>{
    const url='/secret';
    return await axiosInstance.get(url,setAuthHeader(req)).then(response=>response.data);
}
// funcion para obtener todos los portafolios llamando a api get portfolios
export const getPortfolios=async()=>{
    const url='/portfolios';

    return await axiosInstance.get('/portfolios').then(response=>response.data);
}
const createPortfolio=async(req)=>{
    // return await axiosInstance.get(url,setAuthHeader(req)).then(response=>response.data);
}

// export const getSecretDataServer=async (req)=>{
    
   
//     return await axios.get(url,setAuthHeader(req)).then(response=>response.data);
// }