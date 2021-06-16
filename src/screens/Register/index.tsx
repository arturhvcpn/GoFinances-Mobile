import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
    
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O Preço não pode ser negativo')
    .required('Preço é obrigatório'),
});


export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category',
    });
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

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
        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação');
        }

        if(category.key === 'category'){
            return Alert.alert('Selecione a categoria');
        }


        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        };

        console.log(data);
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            control={control} 
                            name={'amount'}
                            placeholder={'Preço'}
                            keyboardType={'numeric'}
                            error={errors.amount && errors.amount.message}
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
        </TouchableWithoutFeedback>
    );
}