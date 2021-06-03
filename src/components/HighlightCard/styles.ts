import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface ITypeCardsProps {
    typeCards: 'up' | 'down' | 'total';
}

export const Container = styled.View<ITypeCardsProps>`
    background-color: ${({theme, typeCards}) => 
    typeCards === 'total' 
    ? theme.colors.secondary 
    : theme.colors.shape
    };
    
    width: ${RFValue(300)};
    
    border-radius: 5px;
    
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    
    margin-right: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content:space-between;
`;

export const Title = styled.Text<ITypeCardsProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({theme, typeCards}) => typeCards === 'total' 
    ? theme.colors.shape
    : theme.colors.text_dark
    };
`;

export const Icon = styled(Feather)<ITypeCardsProps>`
    font-size: ${RFValue(40)}px;

    ${({typeCards}) => typeCards === 'up' && css`
        color: ${({theme})=> theme.colors.success};
    `};

    ${({typeCards}) => typeCards === 'down' && css`
        color:${({theme}) => theme.colors.attention};
    `};

    ${({typeCards}) => typeCards === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<ITypeCardsProps>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    color: ${({theme, typeCards}) => typeCards === 'total' 
    ? theme.colors.shape
    : theme.colors.text_dark
    };

    margin-top: 38px;
`;

export const LastTransaction = styled.Text<ITypeCardsProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    color: ${({theme, typeCards}) => typeCards === 'total' 
    ? theme.colors.shape
    : theme.colors.text
    };
`;
