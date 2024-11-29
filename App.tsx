import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home  from './src/Home';
import Weather from './src/Weather';
import Country from './src/CountryDetails'



const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
                <Stack.Screen name='Country' component={Country}/>
                <Stack.Screen name='Weather' component={Weather}/>
            </Stack.Navigator>
        
           
        </NavigationContainer>
    );
}

export default App;