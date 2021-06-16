import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';


import { Input } from '../Input';

import { Container } from './styles'

interface IInputFormProps extends TextInputProps{
    control: Control;
    name: string;
}


export function InputForm({
    control,
    name,
    ...rest
}:IInputFormProps){

    return (
        <Container>
            <Controller
                name={name}
                control={control}
                render={({ field:{ onChange, value }}) =>(
                    <Input 
                        onChangeText={onChange}
                        value={value}
                        {...rest} 
                    />
                )}
            />
        </Container>

    );
}