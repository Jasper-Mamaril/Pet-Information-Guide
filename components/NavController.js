import * as React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import Petlist from '../screens/Petlist';
import Reminders from '../screens/Reminders';
import Settings from '../screens/Settings';



export default function NavController() {
  const Tab = createBottomTabNavigator();
  return (

      <Tab.Navigator screenOptions={({route}) => ({
        headerShown: false, 
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'flex',
          // position: 'absolute',
          // bottom: 10,
          // left: 30,
          // right: 30,
          elevation: 5,
          // backgroundColor: '#5856D6',
          height: 60,
        }})}>
        <Tab.Screen name="Pet List Screen" component={Petlist} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="paw"
                  size={30}
                  color={focused ? '#6B6FC8' : '#F98E6A'}
                />
              </View>
            ),
          }}/>
        <Tab.Screen name="Reminders screen" component={Reminders} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="exclamation-circle"
                  size={30}
                  color={focused ? '#6B6FC8' : '#F98E6A'}
                />
              </View>
            ),
          }}/>
        <Tab.Screen name="App Settings" component={Settings} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="gear"
                  size={30}
                  color={focused ? '#6B6FC8' : '#F98E6A'}
                />
              </View>
            ),
          }}/>
      </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  card: {
    
  },
  icon: {
    height: 20,
    width: 20,
  },
  petContainer: {
    backgroundColor: '#a636f5',
    padding: 30,
    position: 'absolute',
    top: 50,
  },
  petContainerButton: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
  },
  petContainerTxt: {
    color: 'white',
  }
});