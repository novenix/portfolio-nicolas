import React,{Children} from 'react'
import {Link} from '../routes'
import {withRouter} from 'next/router'
const ActiveLink=({children,router,...props})=>{
    //   
    const child=Children.only(children);
    let className=child.props.className || '';
// return <Link {...props}>{React.cloneElement(child,{className})} </Link>
    if(router.asPath===props.route&&props.activeClassName){
        className=`${className} ${props.activeClassName}`
    }
    delete props.activeClassName
    return <Link {...props}>{React.cloneElement(child, {className})}</Link>;
}
export default withRouter( ActiveLink);
// import React, { Children } from 'react';
// import { Link } from '../routes';
// import { withRouter } from 'next/router';


// const ActiveLink = ({children, ...props}) => {
//   const child = Children.only(children);
//   let className = child.props.className ;

  



//   return <Link {...props}>{React.cloneElement(child, {className})}</Link>;
// }
// export default ActiveLink;