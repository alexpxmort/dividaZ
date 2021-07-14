 /**
 * Página de Editar Dívida
 * 
 */
    

  import {useState,useEffect} from 'react';
  import {withRouter} from 'react-router-dom';
  import FormCustom from '../../components/form/divida.form';
  import Spinner from '../../components/loading/loading.compont';
  import Message from '../../components/msg_alerts/msg_alert';
  import { deleteMethod, getByIdMethod, getUsers, updateMethod } from "../../requests/api/api";
  import { retrieveStorage, saveStorage } from '../../storage';
  import { handleErrorMessage,empty, filterArrByKey, submitActionSend } from '../../utils/common.utils';
  
    
  const EditPage = ({match,onSuccess})=>{

    const _id = match.params.id || '';
    let _initialData = {
        cliente:null,
        motivo:'',
        valor:''
    };
    
      const [options,setOptions] = useState([])
      const [initialData,setData] = useState(_initialData)
      const [loading,setLoading] = useState(true);
      const [cliente,setCliente] = useState(null);

    
    const fetchUsers = async ()=>{
        let _usersResp = [];
        let data = await retrieveStorage('users',true);

        _usersResp = (empty(data))?await getUsers():data;
        
        saveStorage('users',_usersResp,true);
        
        await getDivida();
        setOptions(initializeOptionsSelect(_usersResp));
    }
      
  
    const setFieldsInitial = async (cliente)=>{
        if(!empty(cliente)){

            let {motivo,valor,idUsuario} = cliente;

            let _obj = {
                motivo:motivo,
                cliente:null,
                valor:valor
            }

            let _users  = await retrieveStorage('users',true);
            let _user = filterArrByKey(_users,'id',idUsuario);

            if(!empty(_user)){
                _obj['cliente'] = {label:_user[0].name,id:idUsuario,value:idUsuario}
            }

            setData(_obj);

            setTimeout(()=>{
              setLoading(false)
          },1000)

        }
      
    }

    const initializeOptionsSelect  =  (options)=>{
          options.forEach((val)=>{
              val.value = val.id
              val.label = val.name
          })
  
          return options;
      }
  
      useEffect(()=>{
        setLoading(true)

        fetchUsers();

        setTimeout(()=>{
            setLoading(false)
        },2000)
        
      },[match.params]);

    useEffect( ()=>{
        if(!empty(cliente)){
            setFieldsInitial(cliente)
        }
    },[cliente]);


    const  getDivida = async () => {
          
      try{
        let _divida  = await getByIdMethod(_id);

        if(_divida.success){
            setCliente(_divida.result);
        }else{
            handleErrorMessage(_divida.result);
            return false;
        }
      }catch(err){
          handleErrorMessage(err);
          return false;
      }

    }

   const deleteDivida = async (id)=>{
    let resp =   await deleteMethod(id);
    submitActionSend(resp,`Dívida Removida com Sucesso!`,onSuccess,setLoading);
   }

  
    const _handleSubit = async (data)=>{
      let _data = {...data,idUsuario:data.cliente};
      
      if(empty(_data.cliente)){
          Message('Selecione ao menos um cliente pra proseguirmos!','warning');
          return false;
      }

      let resp = await updateMethod(data,_id);

      submitActionSend(resp,`Dívida Atualizada com Sucesso!`,onSuccess,setLoading);
    }
  
    if(!loading){
      return(
          <FormCustom id={_id} handleDelete={deleteDivida} deleting={true} initialData={initialData} handleSubmit={_handleSubit} options={options}/>
      )
    }else{
        return (
            <Spinner/>
        )
    }
  }
    
  export default withRouter(EditPage);