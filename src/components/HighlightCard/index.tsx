import React from 'react';
import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

interface IHighlightCardProps {
    typeCards: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

const icons = {
    up:'arrow-up-circle',
    down:'arrow-down-circle',
    total:'dollar-sign',
}

export function HighlightCard({typeCards, title,amount,lastTransaction}:IHighlightCardProps) {
    return(
        <Container typeCards={typeCards}>
            <Header>
                <Title typeCards={typeCards}>{title !== '' ? title : 'Entradas'}</Title>
                <Icon name={icons[typeCards]} typeCards={typeCards}/>
            </Header>
            <Footer>
                <Amount typeCards={typeCards}>{amount !== '' ? amount : 'R$ 17.400,00'}</Amount>
                <LastTransaction typeCards={typeCards}>{lastTransaction !== '' ? lastTransaction : 'Última entrada dia 13 de abril'}</LastTransaction>
            </Footer>
        </Container>
    );
}