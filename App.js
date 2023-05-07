import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

import LoginScreen from './forms/Login';

export default function App() {
  return (
    <LoginScreen/>
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
    top: 150,
  },
  loginIcon: {
    width: 200,
    height: 235,
  },
  card: {
    position: 'absolute',
    top: 400,
    width: '80%',
  },
  inputFieldSection: {
    
  },
  inputFieldContainer: {
    marginTop: 10,
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
  }
});
