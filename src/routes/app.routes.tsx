import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Platform } from 'react-native';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    const theme = useTheme();

    return(
        <Navigator
        tabBarOptions={{
            activeTintColor: theme.colors.secondary,
            inactiveTintColor: theme.colors.border_light,
            labelPosition:'beside-icon',
            style: {
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height:88,
            }
        }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons 
                            size={size}
                            color={color}
                            name="format-list-bulleted"
                        />
                    )
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons 
                            size={size}
                            color={color}
                            name="attach-money"
                        />
                    )
                }}
            />
            <Screen
                name="Resumo"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) =>
                        <MaterialIcons 
                            size={size}
                            color={color}
                            name="pie-chart"
                        />
                    )
                }}
            />
        </Navigator>
    );
}