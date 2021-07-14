/**
 * Funções de Acesso e Recuperação do localStorage
 * 
 */


import { empty } from "../utils/common.utils";


export const saveStorage = (key,val,isObject = false)=>{
    let _val =  (isObject) ? JSON.stringify(val): val;
    localStorage.setItem(key,_val);
}

export const retrieveStorage = async (key,isObject = false)=>{
  let _val = '';

  if(!empty(localStorage.getItem(key))){
    _val = (isObject) ?await JSON.parse(localStorage.getItem(key)): await localStorage.getItem(key);
  }
  

  return _val;
}