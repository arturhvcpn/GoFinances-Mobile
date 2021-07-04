import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
    flex:1;
    background-color: ${({theme})=> theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    
    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content:flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-family: ${({theme}) => theme.fonts.regular};
    
    color: ${({theme}) => theme.colors.shape};
`;