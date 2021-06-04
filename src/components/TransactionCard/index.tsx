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

interface ICategoryProps{
    name:string;
    icon:string;
}

export interface IDataProps {
    type: 'positive' | 'negative';
    title:string;
    amount:string;
    category:ICategoryProps;
    date:string;
}

interface ITransactionCardProps{
    data: IDataProps;
}

export function TransactionCard({ data }:ITransactionCardProps){
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount typeTransaction={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <DateOfTransaction>{data.date}</DateOfTransaction>
            </Footer>
        </Container>
    )
}