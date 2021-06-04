import React from 'react';
import {
    Container,
    Title,
    Amount, 
    Footer,
    Category,
    Icon,
    CategoryName,
    DateOfTransaction,
} from './styles';

export function TransactionCard(){
    return (
        <Container>
            <Title>Desenvolvimento de site</Title>
            <Amount>R$ 12.000,00</Amount>

            <Footer>
                <Category>
                    <Icon name='dollar-sign' />
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <DateOfTransaction>13/04/2020</DateOfTransaction>
            </Footer>
        </Container>
    )
}