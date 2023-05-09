import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import About from '../screens/About';
import Login from '../forms/Login';

function SettingsScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Image style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
      <View style={styles.aboutIconContainer}>
        <Image style={styles.aboutIcon} source={require('../assets/settingsIcon.png')} />
      </View>
      <View style={styles.card}>     

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.reminderListContainer}>
                <View style={styles.settingsTxtContainer}>
                  <Text style={styles.settingsTxt}>Settings</Text>
                </View>

              <View style={styles.aboutButtonContainer}>
                <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
                  <Text style={styles.aboutButtonTxt}>About us</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.aboutButtonContainer}>
                <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Login Form')}>
                  <Text style={styles.aboutButtonTxt}>Logout</Text>
                </TouchableOpacity>
              </View>

          </View>
          </ScrollView>

      </View>     
    </View>
  );
}

export default function Settings() {
  const SettingsStack = createNativeStackNavigator();
  return (
    <SettingsStack.Navigator >
      <SettingsStack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen options={{ headerShown: false }} name="About" component={About} />
      
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  aboutIconContainer: {
    position: 'absolute',
    top: 50,
  },
  aboutIcon: {
    height: 200,
    width: 200,
  },
  aboutButtonContainer: {
    marginTop: 10,
    marginBottom: 40,
    // alignItems: 'center',
    postion: 'absolute',
    top: 40,
    left: 0,
  },
  aboutButton: {
    backgroundColor: '#F98E6A',
    padding: 10,
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
  },
  aboutButtonTxt: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsTxtContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  settingsTxt: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: 400,
    height: 267,
    position: 'absolute',
    top: 0,
    marginTop: 0,
  },
  timeContainer: {
    position: 'absolute',
    top: 120,
  },
  time: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    position: 'absolute',
    top: 50,
  },
  addButton: {
    backgroundColor: '#6B6FC8',
    alignItems: 'center',
    padding: 15,
    width: 100,
    borderRadius: 30,
  },
  addIcon: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: '#E6E6E6',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: '70%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  buttonBg: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#F98E6A',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  petListingContainer: {
    width: '90%',
  },
  petListingButton: {
    backgroundColor: '#6B6FC8',
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonTxt: {
    color: 'white',
    fontSize: 32,
    // fontFamily: ''
  },
  deleteIcon: {
    justifyContent: 'center',

    position: 'relative',
    width: 40,
    height: 40,
  },
  iconPosition: {
    justifyContent: 'center',
    position: 'relative',
    right: 10,
  },
  inputButtonBg: {
    marginTop: 10,
    width: '90%',
    backgroundColor: '#F98E6A',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  inputContainer: {
    width: '85%',
  },
  inputButton: {
    backgroundColor: '#6B6FC8',
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputTxt: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeOfDay: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 3,
    marginTop: 10,
  },
  scrollView: {
    width: '90%',
  },
  reminderListContainer: {
    alignItems: 'center',
  }
});
