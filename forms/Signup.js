import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';

import axios from 'axios';

const baseURL = 'http://192.168.1.26/Ping/restAPI/';

// import SignupScreen from './forms/Signup';

export default function SignupScreen({navigation}) {
    const [username, onChangeUsername] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePass] = React.useState('');

    const onSubmitFormHandler = async (event) => {
      if (!username.trim() || !password.trim() || !email.trim()) {
        alert("Check input fields!");
        return;
      }
      try {
        const response = await axios.post(`${baseURL}register`, {
          username : username,
          email : email,
          password : password
        });
        if (response.status === 200) {
          console.log(response.data)
          // console.log(response.data.payload.id);
          // setUsername('');
          // setPassword('');
          // return navigation.navigate(ROUTES.LOGIN);
          // storeUserID(response.data.payload.id);
  
          alert("Successfuily Registered!");
          return navigation.navigate('Login Form');
  
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
          <Image style={styles.loginIcon} source={require('../assets/signupPIC.png')} />
        </View>
         <View style={styles.card}>
          <ScrollView>
          <KeyboardAvoidingView enabled
                      style={styles.keyboardView}
                      behavior="padding">


         <View name={'inputFields'} style={styles.inputFieldSection}>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputField}>
                          <TextInput
                            style={styles.input}
                            onChangeText={onChangeUsername}
                            value={username}
                            placeholder="Username"/>
                        </View>
                    </View>
                  
          </View>
          <View name={'inputFields'} style={styles.inputFieldSection}>
                 
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputField}>
                          <TextInput
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Email"/>
                        </View>
                    </View>
                  
          </View>

          <View name={'inputFields'} style={styles.inputFieldSection}>
                  
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputField}>
                          <TextInput
                            style={styles.input}
                            onChangeText={onChangePass}
                            value={password}
                            secureTextEntry={true}
                            placeholder="Password"/>
                        </View>
                    </View>
                 
          </View>
          </KeyboardAvoidingView>
            <View style={styles.loginButtonContainer}>
              <TouchableOpacity style={styles.loginButton} onPress={onSubmitFormHandler}>
                <Text style={styles.buttonTxt}>CONTINUE</Text>
              </TouchableOpacity>
              <Text style={styles.paragraph}>By clicking ‘Continue’ you agree to our Terms & Conditions and Privacy Policy.</Text>
            </View>
          


            <View style={styles.signupSection}>
              <Text style={styles.buttonDesc}>Already have an account?</Text>
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login Form')}>
                    <Text style={styles.buttonTxt}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
            </View>
            
            </ScrollView>
         </View>
        
      </View>
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
    top: 50,
  },
  loginIcon: {
    width: 200,
    height: 235,
  },
  card: {
    position: 'absolute',
    top: 300,
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
    width: '100%',
  },
  loginButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#6B6FC8',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
  },
  buttonTxt: {
    color: 'white',
    fontWeight: 'bold',
  }
});
