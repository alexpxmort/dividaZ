/**
 * Componente Customizado de Loading
 * 
 */
 import React from 'react';
 import {SpinnerContainer,SpinnerOverlay} from '../../components/with_spinner/with-spinner.styles'
 
 const Spinner  = () =>{
     return(
         <SpinnerOverlay>
             <SpinnerContainer/>
         </SpinnerOverlay>
     )
 }

 export default Spinner;