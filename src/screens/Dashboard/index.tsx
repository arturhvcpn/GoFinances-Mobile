import React,{ useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { useFocusEffect } from '@react-navigation/native';

export interface IDataListIdProps extends IDataProps{
    id: string;
}

export function Dashboard(){
    const [data,setData] =useState<IDataListIdProps[]>([]);

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ?  JSON.parse(response) : [];

        const transactionFormatted:IDataListIdProps[] = transactions
        .map((item:IDataListIdProps) => {
            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style:'currency',
                currency:'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day:'2-digit',
                month:'2-digit',
                year:'2-digit',
            }).format(new Date(item.date));


            return {
                id:item.id,
                type: item.type,
                name: item.name,
                category:item.category,
                amount,
                date,
            }
        });

        setData(transactionFormatted);
    };

    useEffect(()=>{
        loadTransactions();
    },[]);

    useFocusEffect(useCallback(() =>{
        loadTransactions();
    },[]));
    
    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri:'https://avatars.githubusercontent.com/u/53799608?v=4' }} 
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Artur Polo Norte</UserName>
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