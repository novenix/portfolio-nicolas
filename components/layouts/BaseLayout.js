import React from 'react'
import Header from '../shared/Header'
import Head from 'next/head';

// funcional
// dumb component
// get data
// return data
// functional component
const BaseLayout =(props)=>{
    const {className , children,isAuthenticated,user,isSiteOwner,cannonical} = props;
    const headerType=props.headerType||'default';
    const title=props.title||'Nicolas Torres - Portafolio'
    
    return(
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content ='Mi Nombre es Nicolás Torres.Soy estudiante de la Escuela Colombiana De Ingenieria Julio Garavito.Desde que empecé mi carrera he tenido mucha curiosidad por la programación web en general y desde que aprendí todo lo necesario de next.js (react.js) y Node.js junto con MongoDB he podido realizar pequeños proyectos para servicios web con api rest.' ></meta>
                <meta name='keywords' content='nicolas torres,nicolas torres paez,nicolas torres desarrollador web, desarrollador web Nicolas Torres,nicolas torres desarrollador web node,nicolas torres desarrollador web react,nicolas torres desarrollador mongodb nodejs y react, desarrollador react,desarrollador react.js,desarrollador node,desarrollador next.js,desarrollador next ' ></meta>
                <meta property='og:title' conten='Nicolas Torres Desarrollador Web'></meta>
                <meta property='og:locale' content='es-CO'></meta>
                <meta property='og:url' content={`${process.env.BASE_URL}`}></meta>
                <meta property='og:type' content='website'></meta>
                <meta property="og:image"  itemprop="image" content="https://github.com/novenix/portfolio-nicolas/blob/master/static/images/section-1-min.jpg?raw=true" />
                <meta property='og:description' content='Mi Nombre es Nicolás Torres. 
                Soy estudiante De Ingenieria De Software.Desde que empecé mi carrera he tenido mucha curiosidad por la programación web.
                y '></meta>
                
                <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans|Reenie+Beanie|Titillium+Web:400,700&display=swap" rel="stylesheet"/>
                {cannonical && <link rel='cannonical' href={`${process.env.BASE_URL}/${cannonical}`} />}
                {/* <link rel="icon" type="image/ico" href="/static/favicon.ico"/> */}
                <link rel="icon" type="image/ico" href="/static/favicon.ico"/>
                
                <script src="https://kit.fontawesome.com/52781db4ba.js"></script>
            </Head>
            <div className="layout-container" >
            

                <Header className={`port-nav-${headerType}`}
                                isAuthenticated={isAuthenticated}
                                user={user} 
                                isSiteOwner={isSiteOwner}
                                />
                           
                    <main className={`cover ${className}`} >
                        <div  className="wrapper" >
                            {children}
                        </div>
                    </main>      
            </div>
    </React.Fragment>
    // <React.Fragment>
    //   <Head>
    //     <title>{text}</title>
    //     <meta name="description" content="My name is Filip Jerga and I am an experienced software engineer and freelance developer. I have a Master's degree in Artificial Intelligence and several years of experience working on a wide range of technologies and projects from C++ development for ultrasound devices to modern mobile and web applications in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to take my course, where I have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and understandable way." />
    //     <meta name="keywords" content="jerga portfolio, jerga developer, jerga freelancig, jerga programming"/>
    //     <meta property="og:title" content="Filip Jerga - programmer, developer, bloger" />
    //     <meta property="og:locale" content="en_EU" />
    //     <meta property="og:url" content={`${process.env.BASE_URL}`}/>
    //     <meta property="og:type" content="website"/>
    //     <meta property="og:description" content="My name is Filip Jerga and I am an experienced software engineer and freelance developer."/>
    //     <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>
    //     {cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/>}
    //     <link rel="icon" type="image/ico" href="/static/favicon.ico"/>
    //   </Head>
    //   <div className="layout-container" >
    //     <Header className={`port-nav-${headerType}`}
    //             isAuthenticated={isAuthenticated}
    //             user={user}
    //             isSiteOwner={isSiteOwner}/>
    //     <main className={`cover ${className}`}>
    //       <div className="wrapper">
    //         {children}
    //       </div>
    //     </main>
    //   </div>
    // </React.Fragment>
    )
}
export default BaseLayout;