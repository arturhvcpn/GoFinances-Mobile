import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Header, 
    Title,
    Form,
    Fields,
    TransactionTypeContainer
} from './styles';


interface FormData{
    name:string;
    amount:string;
}

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category',
    });
    const {
        control,
        handleSubmit
    } = useForm();

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }
    
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleRegister(form : FormData){
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        };

        console.log(data);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm
                        control={control} 
                        name={'name'}
                        placeholder={'Nome'}
                    />
                    <InputForm
                        control={control} 
                        name={'amount'}
                        placeholder={'Preço'}
                    />
                    <TransactionTypeContainer>
                        <TransactionTypeButton 
                            type={'up'}
                            title={'Income'}
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />

                        <TransactionTypeButton 
                            type={'down'}
                            title={'Outcome'}
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypeContainer>
                
                    <CategorySelectButton 
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                
                </Fields>                
                <Button title='Enviar' onPress={handleSubmit(handleRegister)}/>
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelect={handleCloseSelectCategoryModal}                
                />
            </Modal>
        </Container>
    );
}