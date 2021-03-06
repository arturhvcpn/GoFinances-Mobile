import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IIconProps{
    type: 'up' | 'down';
}

interface IContainerProps{
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.View<IContainerProps>`
    width: 48%;

    border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
    border-color:${({theme}) => theme.colors.border_light};
    border-style: solid;
    border-radius:5px;

    ${({ isActive, type}) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light};
    `}

    ${({ isActive, type}) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.success_light};
    `}
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px;

`;

export const Icon = styled(Feather)<IIconProps>`
    font-size: ${RFValue(24)}px;
    color: ${({theme, type}) => type === 'up' 
    ? theme.colors.success 
    : theme.colors.attention
    };
    margin-right: 12px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;