import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { IDataProps, TransactionCard } from '../../components/TransactionCard';
import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles';

export interface IDataListIdProps extends IDataProps{
    id: string;
}

export function Dashboard(){
    const data:IDataListIdProps[] = [
    {
        id: '1',
        type: 'negative',
        title:'Apartamento',
        amount:'R$ 1.700,00',
        category:{
            name:'Casa',
            icon:'shopping-bag'
        },
        date:'08/06/2021'
    },
    {
        id: '2',
        type: 'positive',
        title:'Desenvolvimento de site',
        amount:'R$ 12.000,00',
        category:{
            name:'Vendas',
            icon:'dollar-sign'
        },
        date:'13/04/2020'
    },
    {
        id: '3',
        type: 'negative',
        title:'Hamburgueria Pizzy',
        amount:'R$ 59,00',
        category:{
            name:'Alimentação',
            icon:'coffee'
        },
        date:'10/04/2020'
    },
];

    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri:'https://avatars.githubusercontent.com/u/53799608?v=4' }} 
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Artur</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard typeCards='up' title='Entradas' amount='R$ 17.400,00' lastTransaction='Última entrada dia 13 de abril'/>
                <HighlightCard typeCards='down' title='Saídas' amount='R$ 1.259,00' lastTransaction='Última saída dia 03 de abril'/>
                <HighlightCard typeCards='total' title='Total' amount='R$ 16.141,00' lastTransaction='01 à 16 de abril'/>
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <TransactionCard  data={item}/>}
                />
            
            </Transactions>
        
        </Container>
    );
}