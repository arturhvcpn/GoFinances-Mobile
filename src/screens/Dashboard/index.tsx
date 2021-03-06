import React,{ useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
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
    LogoutButton,
    LoadingContainer
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

export interface IDataListIdProps extends IDataProps{
    id: string;
}

interface IHighlightCardsTotalProps {
    amount: string;
    lastTransaction: string;
}


interface IHighlightCardsTotalData {
    entries: IHighlightCardsTotalProps;
    expensives: IHighlightCardsTotalProps;
    total: IHighlightCardsTotalProps;
}

export function Dashboard(){
    const [isLoading,setIsLoading] = useState(true);
    const [data,setData] =useState<IDataListIdProps[]>([]);
    const [highlightCardsTotal,setHighlightCardsTotal] =useState<IHighlightCardsTotalData>({} as IHighlightCardsTotalData);

    const theme = useTheme();

    function getLastTransactionDate(collection: IDataListIdProps[], type: 'positive' | 'negative'){

        const lastTransaction = new Date( Math.max.apply(Math,collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())));
    
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{month:'long'})}`;
    }

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ?  JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensivesTotal = 0;

        const transactionFormatted:IDataListIdProps[] = transactions
        .map((item:IDataListIdProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            }else{
                expensivesTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style:'currency',
                currency:'BRL'
            });

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

        const lastTransactionEntries = getLastTransactionDate(transactions,'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 ?? ${lastTransactionExpensives}`;

        const total = entriesTotal - expensivesTotal;
        
        setHighlightCardsTotal({
            entries:{
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style:'currency',
                    currency:'BRL'
                }),
                lastTransaction: `??ltima entrada dia ${lastTransactionEntries}`,
            },
            expensives:{
                amount: expensivesTotal.toLocaleString('pt-BR', {
                    style:'currency',
                    currency:'BRL'
                }),
                lastTransaction: `??ltima sa??da dia ${lastTransactionExpensives}`,
            },
            total:{
                amount: total.toLocaleString('pt-BR', {
                    style:'currency',
                    currency:'BRL'
                }),
                lastTransaction:totalInterval,
            }
        });
        
        setIsLoading(false);
    };

    useEffect(()=>{
        loadTransactions();
    },[]);

    useFocusEffect(useCallback(() =>{
        loadTransactions();
    },[]));
    
    return(
        <Container>
            { isLoading 
            ? 
            <LoadingContainer>
                <ActivityIndicator 
                    color={theme.colors.secondary}
                    size={'large'}
                />
            </LoadingContainer>
            :
            <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{ uri:'https://avatars.githubusercontent.com/u/53799608?v=4' }} 
                            />
                            <User>
                                <UserGreeting>Ol??,</UserGreeting>
                                <UserName>Artur Polo Norte</UserName>
                            </User>
                        </UserInfo>
                        <LogoutButton onPress={() => {}}>
                            <Icon name="power"/>
                        </LogoutButton>
                    </UserWrapper>
                </Header>
                <HighlightCards>
                    <HighlightCard
                        typeCards='up' 
                        title='Entradas'
                        amount={highlightCardsTotal.entries.amount} 
                        lastTransaction={highlightCardsTotal.entries.lastTransaction}
                    />
                    <HighlightCard 
                        typeCards='down' 
                        title='Sa??das' 
                        amount={highlightCardsTotal.expensives.amount} 
                        lastTransaction={highlightCardsTotal.expensives.lastTransaction}
                    />
                    <HighlightCard 
                        typeCards='total' 
                        title='Total' 
                        amount={highlightCardsTotal.total.amount}
                        lastTransaction={highlightCardsTotal.total.lastTransaction}
                    />
                </HighlightCards>
                <Transactions>
                    <Title>Listagem</Title>
                    <TransactionList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <TransactionCard  data={item}/>}
                    />
                
                </Transactions>
            </>
            }
        </Container>
    );
}