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
import { categories } from '../../utils/categories';

export interface IDataProps {
    type: 'positive' | 'negative';
    name:string;
    amount:string;
    category:string;
    date:string;
}

interface ITransactionCardProps{
    data: IDataProps;
}

export function TransactionCard({ data }:ITransactionCardProps){
    const [category] = categories.filter(
        item => item.key === data.category
    );

    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount typeTransaction={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <DateOfTransaction>{data.date}</DateOfTransaction>
            </Footer>
        </Container>
    )
}