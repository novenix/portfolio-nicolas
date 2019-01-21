// para autenticacion logeo y deslogueo
import auth0 from 'auth0-js';
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from 'axios';
class Auth0 {
  
    constructor(){
            this.auth0 = new auth0.WebAuth({
            domain: 'novenix.auth0.com',
            clientID: 'SBe4dxaK317aYsr9HKbC1XIb0X80V6gn',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile '
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
        // debugger;
        //   save tokens
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        // this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        Cookies.set('user',authResult.idTokenPayload);
        Cookies.set('jwt',authResult.idToken);
        Cookies.set('expiresAt',expiresAt);

    }

    logout(){
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');
        this.auth0.logout({
            returnTo:'',
            clientID:'SBe4dxaK317aYsr9HKbC1XIb0X80V6gn'
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
                    const verifiedToken=jwt.verify(token,cert)
                    const expiresAt=verifiedToken.exp=1000;
                    return(verifiedToken&& new Date().getTime()<expiresAt) ? verifiedToken : undefined;
                }
                catch(err){
                    return undefined;
                }
            }

           
            
        }

        return undefined;

    }
    async clientAuth(){
        // debugger;
        // const tokenCookie=req.headers.cookie.split(';').find(c=> c.trim().startsWith('jwt='))
        // const token=tokenCookie.split('=')[1];
        const token = Cookies.getJSON('jwt=')
        const verifiedToken=await this.verifyToken(token);
        // console.log(Cookies)
        // console.log(this.verifyToken(token),2)
        // console.log(verifiedToken,1)
        return verifiedToken;
    }
    async serverAuth(req){
        if(req.headers.cookie){
            const tokenCookie=req.headers.cookie.split(';').find(c=> c.trim().startsWith('jwt='))
            // const cookies=req.headers.cookie;
            // console.log(cookies);
            // const splitedCookies=cookies.split(';')
            // console.log(splitedCookies);
            // const expiresAtCookie=splitedCookies.find(c=> c.trim().startsWith('expiresAt='))
            // console.log(expiresAtCookie)
            // const expiresAtArray=expiresAtCookie.split('=');
            // console.log(expiresAtArray)
            // const expiresAt=expiresAtArray[1];
            // console.log(expiresAt,1)

            if(!tokenCookie){ return undefined};
            const token=tokenCookie.split('=')[1];
            const verifiedToken=await this.verifyToken(token);

            return verifiedToken;
        }
        return undefined;
        
    }


}
const auth0Client =new Auth0();
export default auth0Client;
