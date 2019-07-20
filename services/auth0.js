// para autenticacion logeo y deslogueo
import auth0 from 'auth0-js';
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios';
import {getCookieFromReq}from '../helpers/utils'
const CLIENT_ID=process.env.CLIENT_ID
class Auth0 {
 
    constructor(){
            this.auth0 = new auth0.WebAuth({
            domain: 'novenix.auth0.com',
            clientID: CLIENT_ID,
            redirectUri: `${process.env.BASE_URL}/callback`,
            responseType: 'token id_token',
            scope: 'openid profile'
        });
        //   para bindear en contexto de auth0 (se debe bindear todas las funciones de la case Auth0)
        this.login=this.login.bind(this);
        this.handleAuthentication=this.handleAuthentication.bind(this);
        this.logout=this.logout.bind(this);
 
    }
    login() {
        this.auth0.authorize();
    }
 
    handleAuthentication() {
 
        return new Promise((resolve,reject)=>{
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                resolve();
                } else if (err) {
                reject();
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
                }
            });
        })
 
 
    }
    setSession(authResult) {
        //   ;
        //   save tokens
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
 
        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
       
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        //console.log(authResult);
        Cookies.set('jwt',authResult.idToken);
    }
 
    logout(){
        
        Cookies.remove('jwt');
        
        this.auth0.logout({
            returnTo:'',
            clientID:CLIENT_ID
        })
    }
 
   async getJWKS(){
        const res=await axios.get('https://novenix.auth0.com/.well-known/jwks.json')
        const jwks=res.data;
        return jwks;
   }
 
    async verifyToken(token){
        if (token){
            const decodedToken= jwt.decode(token,{complete:true});
            if(!decodedToken){return undefined;}
            const jwks=await this.getJWKS();
            // console.log(jwks)
            const jwk=jwks.keys[0];
            // console.log(jwk)
 
            // build certificate
            let cert= jwk.x5c[0];
            cert=cert.match(/.{1,64}/g).join('\n')
            cert=`-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
            //
            // console.log('',jwk.kid)
            // console.log('',decodedToken.header.kid)
            if (jwk.kid===decodedToken.header.kid){
                try{
                    const verifiedToken=jwt.verify(token, cert)
                    const expiresAt = verifiedToken.exp * 1000;
                    return(verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
                }
                catch(err){
                    return undefined;
                }
            }
 
        }
 
        return undefined;
 
    }
    async clientAuth(){
        //   ;
        // const tokenCookie=req.headers.cookie.split(';').find(c=> c.trim().startsWith('jwt='))
        // const token=tokenCookie.split('=')[1];
        const token = Cookies.getJSON('jwt')
        const verifiedToken= await this.verifyToken(token);
        // console.log(Cookies)
        // console.log(this.verifyToken(token),2)
        // console.log(verifiedToken,1)
        return verifiedToken;
    }
    // async serverAuth(req){
    //     if(req.headers.cookie){
    //         const token=getCookieFromReq(req,'jwt');
    //         const verifiedToken=await this.verifyToken(token);
 
    //         return verifiedToken;
    //     }
    //     return undefined;
 
    // }
    async serverAuth(req) {
        if (req.headers.cookie) {
    
           const token = getCookieFromReq(req, 'jwt');
          const verifiedToken = await this.verifyToken(token);
    
           return verifiedToken;
        }
    
         return undefined;
      }
    
 
}
const auth0Client =new Auth0();
export default auth0Client;