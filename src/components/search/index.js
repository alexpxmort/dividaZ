/**
 * Componente Customizado de Search
 * 
 */

 import React from 'react';
 import {Button, Container} from '@material-ui/core';
 import { InputCustom } from '../input-custom';
 import {Form} from '@unform/web'
 import SearchIcon from '@material-ui/icons/Search';
 import { globalStyles } from '../../styles/globalStyles';

 const Search = ({onSubmit})=>{

    const _initialData={nome:''};

     return(
         <div style={globalStyles.spaceTopLeft}>
             <Form id={'search_custom'}  initialData={_initialData} onSubmit={onSubmit}>
 
                <Container style={globalStyles.flexRowSpaceAround}>
                    <InputCustom   label="Nome"  name={'nome'} variant="outlined" type={'text'} />

                    <Button  type={'submit'} variant="contained" color="primary" style={globalStyles.spaceLeft}>
                        <SearchIcon/>
                    </Button>
                </Container>
             </Form>
         </div>
     )
 }
 
 export default Search;