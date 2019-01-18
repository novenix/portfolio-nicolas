// los nombres de shared components van con Capital letter
import React from 'react';
// para SPA(single page applications)
import Link from 'next/link'
import '../../styles/main.scss'
// para SPA 
            // href referencia de ruta 
                
                                
                
            //para MPA
            //<a href="/portfolios">portfolios</a>
            //<a href="/blogs">Blogs</a>

            //<a href="/cv">cv</a> 

class Header extends React.Component{
    render(){
        // debugger;
        const title= this.props.title;
        return(
            
            // react.fragments es como un div
            <React.Fragment>
                
              
                <Link href="/">
                    <a style={{'fontSize':'20px'}}> Home </a>
                </Link>
                <Link href="/about">
                    <a> acerca de </a>
                </Link>
                <Link href="/portfolios">
                    <a> portfolios </a>
                </Link>
                <Link href="/blogs" >
                    <a> blogs </a>
                </Link>
                <Link href="/cv" >
                    <a> cv </a>
                </Link>
                <style jsx>
                    {
                    `
                        a{
                            font-size:20px
                        };
                        .customClass{
                            color:red;
                        }
                    `
                    }
                </style>
            </React.Fragment>
        )
    }
}
export default Header;