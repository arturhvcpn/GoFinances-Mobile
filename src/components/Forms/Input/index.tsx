import React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styles';

type TInputProps = TextInputProps;

export function Input({...rest}:TInputProps){
    return(
        <Container
        {...rest}
        />
    );
};