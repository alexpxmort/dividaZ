/**
 * Componente Customizado de Input
 * 
 */

 import {TextField,FormGroup} from '@material-ui/core';
 import {useField} from '@unform/core'
 import {useRef,useEffect} from 'react'
 import { globalStyles } from '../../styles/globalStyles';
 
 export const InputCustom = ({name,label,variant, ...otherProps})=>{
     const inputRef = useRef(null);
     const {fieldName,registerField,error,defaultValue} = useField(name);
 
     useEffect(()=>{
         registerField({
             name:fieldName,
             ref:inputRef.current,
             path:'value'
         })
     },[fieldName,registerField]);
 
     return (
         <FormGroup style={globalStyles.inputCustom}>
             <TextField  label={label} variant={variant} defaultValue={defaultValue} { ...otherProps} inputRef={inputRef} />
         </FormGroup>
     )
 }