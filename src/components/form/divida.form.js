/**
 * Componente Customizado de Formulario
 * 
 */

 import React from 'react';
 import {Button, Container} from '@material-ui/core';
 import { InputCustom } from '../input-custom';
 import {Form} from '@unform/web'
 import SelectCustom from '../custom-select/index';
 import ModalConfirmDelete from '../modal/modal_confirm';
 import {useState} from 'react'
 import {globalStyles} from '../../styles/globalStyles.js';

 const FormCustom = ({id,initialData,handleSubmit,options,deleting,handleDelete})=>{

    const [open,setOpen] = useState(false)
    const [idDel,setIdDel]  = useState(null);
    const [nome,setNome]  = useState(null);

    const onClose = ()=>{
        setOpen(false)
    }

    const showModalDelete = (id,nome)=>{
        setOpen(true)
        setIdDel(id);
        setNome(nome);
    }

    const ModalDialodDelete = ()=>{        
        if(idDel === null){
            return(
                <div/>
            )
        }
        return(
               <ModalConfirmDelete
                msg={`Deseja mesmo deletar esta divida:  ${nome}?`}
                open={open}
                onClose={onClose}
                idDel={idDel}
                handleFuncYes={handleDelete}
                /> 
        )
    }


     return(
         <div style={globalStyles.spaceTopLeft}>
             <Form id={id}  initialData={initialData} onSubmit={handleSubmit}>
             {
                    (options.length  > 0)?(
                        <SelectCustom disabled={deleting} required isSearchable  name={'cliente'} placeholder={'Selecione um Cliente'} options={options}    />
                    ):null
                }
                <InputCustom required  label="Motivo"  name={'motivo'} variant="outlined" type={'text'} />
                 <InputCustom required  label="Valor"  name={'valor'} variant="outlined" type={'number'} />
                 
                <Container style={globalStyles.flexRowBeteen}>
                    {
                        (deleting)?(
                            <Button  type={'button'} variant="contained" color="secondary" onClick={()=>showModalDelete(id,initialData.motivo)}>
                                Excluir
                            </Button>
                        ):null
                    }

                    <Button  type={'submit'} variant="contained" color="primary">
                        Salvar
                    </Button>
                </Container>

                
               <div>
                   {
                       (open)?(
                           ModalDialodDelete()
                       ):null
                   }
               </div>
             </Form>
         </div>
     )
 }
 
 export default FormCustom;