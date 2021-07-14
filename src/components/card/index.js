/**
 * Componente Customizado de Card
 * 
 */

import React from 'react';
import { Container } from "@material-ui/core"
import { globalStyles } from '../../styles/globalStyles';

const Card = ({children,onClick})=>{
    
    return(
        <Container style={globalStyles.cardContainer} onClick={onClick}>
           {
               children
           }
        </Container>
    )
};

export default Card;