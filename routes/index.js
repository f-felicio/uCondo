import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../src/screens/Home';
import Edit from '../src/screens/Edit';
import New from '../src/screens/New';

const {Navigator, Screen} = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Home" component={Home} />
        <Screen name="Edit" component={Edit} />
        <Screen name="New" component={New} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
