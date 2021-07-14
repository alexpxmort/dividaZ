  /**
 * Componente Customizado de Modal de Confirmação de Delete
 * 
 */
   import React from 'react';
   import { Dialog,DialogTitle,List,ListItemText,ListItem } from '@material-ui/core';
   import { globalStyles } from '../../styles/globalStyles';
    
   const ModalConfirmDelete = ({open,handleFuncYes,onClose,msg,idDel})=>{
       return(
           <Dialog
               open={open}
               onClose={onClose}
               >
                   <DialogTitle>
                       {msg}
                   </DialogTitle>
                   <List style={{flexDirection:'row',alignItems:'center'}}>
                       <ListItem  button onClick={()=>{handleFuncYes(idDel);onClose()}} style={globalStyles.blueBtn} divider={true}>
                           <ListItemText style={{textAlign:'center'}}>
                               Sim
                           </ListItemText>
                       </ListItem>
                       <ListItem button onClick={()=>onClose()} style={globalStyles.redBtn}>
                           <ListItemText style={{textAlign:'center'}}>
                           Cancelar
                           </ListItemText>
                       </ListItem>
                   </List>
               </Dialog>
       )
   }

   export default ModalConfirmDelete;