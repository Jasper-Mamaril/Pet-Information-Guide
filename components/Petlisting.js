import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Petlisting = (props, {navigation}) => {
    
    return(
            <View style={styles.listingContainer}>
                <View style={styles.buttonBg}>
                    <View style={styles.petListingContainer}>
                        <TouchableOpacity style={styles.petListingButton} onPress={() => navigation.navigate('Pet Profile')}>
                        <View style={styles.itemFlex}>
                                <Text style={styles.buttonTxt}>{props.petname}</Text>
                            <TouchableOpacity>
                                <Image style={styles.deleteIcon} source={require('../assets/deleteIcon.png')} />
                            </TouchableOpacity>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>   
            </View>              
    )
}

export default Petlisting;

const styles = StyleSheet.create({
// Pet Listing Styles
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
addButtonContainer: {
position: 'absolute',
top: 100,
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
width: '80%',
backgroundColor: '#F98E6A',
alignItems: 'flex-end',
borderRadius: 10,
elevation: 10,
},
petListingContainer: {
width: '90%',    
},
petListingButton: {
backgroundColor: '#6B6FC8',
padding: 15,
borderTopRightRadius: 10,
borderBottomRightRadius: 10,
},
buttonTxt: {
color: 'white',
fontSize: 32,
// fontFamily: ''
},
deleteIcon: {
width: 40,
height: 40,
},
scrollView: {
width: '100%',

},
listingContainer: {
alignItems: 'center',
}
});
