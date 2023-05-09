import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

const baseURL = 'http://192.168.1.26/Ping/restAPI/';

import NavController from '../components/NavController';
import SignupScreen from '../forms/Signup';

function LoginScreen({navigation}) {



    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePass] = React.useState('');

    const onSubmitFormHandler = async (event) => {
      if (!username.trim() || !password.trim()) {
        alert("Username or Password is invalid");
        return;
      }
      try {
        const response = await axios.post(`${baseURL}login`, {
          username : username,
          password : password 
        });
        if (response.status === 200) {
          console.log(response.data)
          // console.log(response.data.payload.id);
          // setUsername('');
          // setPassword('');
          // return navigation.navigate(ROUTES.LOGIN);
          // storeUserID(response.data.payload.id);
  
          alert("Successfully Logged in!");
          return navigation.navigate('Logged in')
  
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert(error);
      }
    };

    return (
      <View style={styles.container}>
          <Image style={styles.circleDesign1} source={require('../assets/circleDesign1.png')} />
          <Image style={styles.circleDesign2} source={require('../assets/circleDesign2.png')} />
        <View style={styles.iconContainer}>
          <Image style={styles.loginIcon} source={require('../assets/loginPic.png')} />
        </View>
          <View style={styles.card}>
            <ScrollView style={styles.scrollview}>
          <View name={'inputFields'} style={styles.inputFieldSection}>
                  <KeyboardAvoidingView enabled
                      style={styles.keyboardView}
                      behavior="padding">
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputField}>
                          <TextInput
                            style={styles.input}
                            onChangeText={onChangeUsername}
                            value={username}
                            placeholder="Username"/>
                        </View>
                    </View>
                  </KeyboardAvoidingView>
          </View>

          <View name={'inputFields'} style={styles.inputFieldSection}>
                  <KeyboardAvoidingView enabled
                      style={styles.keyboardView}
                      behavior="padding">
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputField}>
                          <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={onChangePass}
                            value={password}
                            placeholder="Password"/>
                        </View>
                    </View>
                  </KeyboardAvoidingView>
          </View>
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity style={styles.loginButton} onPress={onSubmitFormHandler}>
                <Text style={styles.buttonTxt}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          


            <View style={styles.signupSection}>
              <Text style={styles.buttonDesc}>Don't have an account yet?</Text>
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Signup Form')}>
                    <Text style={styles.buttonTxt}>SIGNUP</Text>
                  </TouchableOpacity>
                </View>
            </View>
          

            </ScrollView>
          </View>
        
      </View>
    );
}

function LoggedIn() {
return (
    <NavController/>
  );
}

export default function Screens() {
  const FormsStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <FormsStack.Navigator>
        <FormsStack.Screen options={{ headerShown: false }} name="Login Form" component={LoginScreen} />
        <FormsStack.Screen options={{ headerShown: false }} name="Signup Form" component={SignupScreen} />
        <FormsStack.Screen options={{ headerShown: false }} name="Logged in" component={LoggedIn} />
      </FormsStack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDesc: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleDesign1: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circleDesign2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 140,
  },
  loginIcon: {
    width: 200,
    height: 235,
  },
  card: {
    position: 'absolute',
    top: 390,
    width: '80%',
  },
  inputFieldSection: {
    
  },
  inputFieldContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputField: {
    marginTop: 0,
    padding: 10,
    width: '100%',
    // backgroundColor: '#00000000',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: .5,
    borderColor: '#A4A4A4',
    elevation: 5,
  },
  keyboardView: {
    width: '100%',
  },
  scrollView: {
    width: '90%',
  },
  loginButtonContainer: {
    marginTop: 10,
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#F98E6A',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
  },
  buttonTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollview: {
   
  }
});