 /**
 * Página de Listagem de  Clientes
 * 
 */
    
  import { Button, Container } from '@material-ui/core';
  import {useState,useEffect} from 'react';
  import {withRouter} from 'react-router-dom';
  import Card from '../../components/card';
  import Spinner from '../../components/loading/loading.compont';
  import { getAllMethod, getUsers } from '../../requests/api/api';
  import AddPage from '../add/index'
  import EditPage from '../edit/index'
  import {empty, filterArrByKey, formatDate, handleErrorMessage} from '../../utils/common.utils'
  import { retrieveStorage, saveStorage } from '../../storage';
  import Search from '../../components/search';
  import { globalStyles } from '../../styles/globalStyles';

  
  const ListPage = ({history,match})=>{

    const isEditing = ()=>!empty(match.params) && match.params.id;

    const[loading,setLoading] = useState(true);
    const[isEdit,setIsEdit] = useState(isEditing());
    const[dividas,setDividas] = useState([]);
    const [isNew,setIsNew] = useState(false);
    const [isError,setError] = useState(false);

    const getDividas = async()=>{
        let users = await getUsers();
        saveStorage('users',users,true);
        let dividas = await getAllMethod();

        if(dividas.success){
            let dividasArr = await getDividasArr(dividas.result);
            saveStorage('dividas',dividasArr,true)
            setDividas(dividasArr);
            setError(false);
        }else{
            handleErrorMessage(dividas);
            setError(true);
        }

        setLoading(false);

        return dividas;
    }

    const getDividasArr = async(arr)=>{
        let users = await  retrieveStorage('users',true);

        if(!empty(users)){
           
            arr.forEach((val)=>{
                let user = filterArrByKey(users,'id',val.idUsuario);
                
                if(user.length > 0){
                    val ['user'] = {...user[0]}
                }
            })

            arr = arr.sort((a, b) => a.user.id - b.user.id);
        }

        return arr;
    }

   
    useEffect(()=>{
        getDividas();
    },[]);

    
    const goEdit = (id)=>{
        history.push(`/edit/${id}`)
        setIsEdit(true);
        setIsNew(false);
    }

    const goNew = ()=>{
        history.push('/');
        setIsEdit(false);
        setIsNew(true);
    }

    const refreshItems = ()=>{
        getDividas()
        setIsEdit(false);
        setIsNew(false)
    };

    const onSearch  = async (data)=>{
        let dividasOld = await retrieveStorage('dividas',true);
        let _dividas = dividas.filter((val)=> val.user.name.toLowerCase().trim().includes(data.nome.toLowerCase()))

        if(empty(data.nome)){
            _dividas = dividasOld;
        }

        setDividas(_dividas)
        
    }

    if(loading){
        return (
            <Spinner/>
        )
    }else{
      if(!isError){
        return(
            <Container style={globalStyles.flexRowFlexStart}>
               
                <Container style={globalStyles.flexColumnWrap}>
                    <Search onSubmit={(data)=>{onSearch(data)}}/>
                    {
                        dividas.map((val,index)=>{
                            return(
                                <Card  key={index} onClick={()=>goEdit(val._id)}>
                                    {
                                        (val.user)?(
                                            <h1>Cliente: {val.user.name}</h1>
                                        ):null
                                    }
                                    <h2>Motivo: {val.motivo}</h2>
                                    <h2>Valor: ${parseFloat(val.valor).toFixed(2)}</h2>
                                    <h2>Criado em :{formatDate(val.criado)}</h2>
                                </Card>
                            )
                        })
                    }
                </Container>
                <Container style={globalStyles.flexColumnFlexEnd}>
                   {
                       (isEdit)?(
                        <EditPage onSuccess={refreshItems}/>
                       ):null
                   }

                   {
                        (isNew)?(
                            <AddPage onSuccess={refreshItems}/>
                        ):null
                    }
                    <Button type={'button'} variant="contained" color="primary" style={globalStyles.newBtn} onClick={()=>goNew()}>
                        Novo
                    </Button>
                </Container>
            </Container>
        )
      }else{
          return <Container/>
      }
    }
}
  
export default withRouter(ListPage);