  /**
 *Componente de rotas
 * 
 */


 import React from   'react';
 import {Route,Switch} from 'react-router-dom';
 import ListPage from '../pages/list';

 const  Router  = ()=>(
     <Switch>
         <Route exact component={ListPage} path="/"/>
         <Route  component={ListPage} path="/edit/:id"/>
     </Switch>
 )
 
 
 export default  Router;