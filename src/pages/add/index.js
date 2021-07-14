 /**
 * Página de Adicionar Dívida
 * 
 */
    

import {useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import FormCustom from '../../components/form/divida.form';
import Spinner from '../../components/loading/loading.compont';
import Message from '../../components/msg_alerts/msg_alert';
import { createMethod, getUsers } from "../../requests/api/api";
import { retrieveStorage, saveStorage } from '../../storage';
import { empty, submitActionSend } from '../../utils/common.utils';

  
const AddPage = ({onSuccess})=>{
  
    const [options,setOptions] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchUsers = async ()=>{
        let _usersResp = [];
        let data = await retrieveStorage('users',true);

        _usersResp = (empty(data))?await getUsers():data;
        
        saveStorage('users',_usersResp,true);
        setOptions(initializeOptionsSelect(_usersResp));
    }

    const _initialData = {
        cliente:null,
        motivo:'',
        valor:''
    };

    const initializeOptionsSelect  =  (options)=>{
        options.forEach((val)=>{
            val.value = val.id
            val.label = val.name
        })

        return options;
    }

    useEffect( ()=>{
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[options])


    useEffect(()=>{
        fetchUsers()
    },[]);

    
    const _handleSubit = async (data)=>{
        let _data = {...data,idUsuario:data.cliente};
       
        if(empty(_data.cliente)){
            Message('Selecione ao menos um cliente pra proseguirmos!','warning');
            return false;
        }
      
        let resp = await createMethod(_data);

        submitActionSend(resp,`Dívida Criada com Sucesso!`,onSuccess,setLoading);

    }


    if(!loading){
        return(
            <FormCustom  initialData={_initialData} handleSubmit={_handleSubit} options={options}/>
        )
    }else{
        return (
            <Spinner/>
        )
    }
  }
  
export default withRouter(AddPage);