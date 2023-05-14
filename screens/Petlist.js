import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, RefreshControl, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import axios from 'axios';
const baseURL = 'http://192.168.1.26/Ping/restAPI/';

import PetProfile from '../screens/PetProfile';
import EditPet from '../screens/EditPet';
import NewPetScreen from '../screens/NewPet';


function PetlistScreen({navigation}) {
  // pull data
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // let petslist = [
  //   { id: 1, name: 'Yuumi' },
  //   { id: 2, name: 'Aya' },
  //   { id: 3, name: 'Cloud' },
  // ];

  useFocusEffect(
    React.useCallback(() => {
      fetchPets();
      // console.log("naload");
      return () => {
        fetchPets();
        // console.log("umalis");
      };
    }, [])
  );

  // useEffect(() => {
  //   fetchPets();
  // })

  const fetchPets = async () => {
    try {
      const response = await axios.post(`${baseURL}getPetlist`, {

      });
      if (response.status === 200 || refreshing === true) {
        // alert(response.data.payload[0].cooking_time);
        // console.log(response.data.payload[0]);
        setPets(response.data.payload);
        console.log(pets)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  const deletePet = async (pet_id) => {
    try {
      const response = await axios.post(`${baseURL}deletePet/${pet_id}`, {

      });
      if (response.status === 200 || refreshing === true) {
        // alert(response.data.payload[0].cooking_time);
        // console.log(response.data.payload[0]);
        setPets(response.data.payload);
        console.log(pets)
        fetchPets();

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };


  
  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
          <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('New Pet')}>
              <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
            </TouchableOpacity>
          </View>
        <View style={styles.card}>
          <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          > 

            {/* iteration */}
            <View style={styles.wholeList}>
              
            <FlatList navigation={navigation} scrollEnabled={false} data={pets} keyExtractor={item=> item.id.toString()} renderItem={({item}) => {
                return (

                  <View style={styles.listingContainer}>
                    <View style={styles.buttonBg}>
                    <View style={styles.itemFlex}>
                          <View style={styles.iconPosition}>
                            <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Edit Pet Info', item)}}>
                              <Image style={styles.editIcon} source={require('../assets/editIcon.png')} />
                            </TouchableOpacity>
                          </View>
                        <View style={styles.petListingContainer}>
                            <TouchableOpacity key={item.id} style={styles.petListingButton} onPress={() => {navigation.navigate('Pet Profile',item)}}>
                              <View style={styles.itemFlex}>
                                      <Text style={styles.buttonTxt}>{item.petname}</Text>
                                  <TouchableOpacity onPress={() => {deletePet(item.id)} }>
                                      <Image style={styles.deleteIcon} source={require('../assets/deleteIcon.png')} />
                                  </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                        </View>
                    </View>   
                    </View>
                    </View>  
              )}}/>
           <View style={styles.container2}>
                        <Text >End of List</Text>
                      </View>
        </View>
              
          </ScrollView>
        </View>     
    </View>
  );
}

export default function Petlist() {
  const PetListStack = createNativeStackNavigator();
  return (
    <PetListStack.Navigator>
      <PetListStack.Screen options={{ headerShown: false }} name="My Pets" component={PetlistScreen} />
      <PetListStack.Screen options={{ headerShown: true, headerTransparent: true, }} name="New Pet" component={NewPetScreen} />
      <PetListStack.Screen options={{ headerShown: true, headerTransparent: true, }} name="Pet Profile" component={PetProfile} />
      <PetListStack.Screen options={{ headerShown: true, headerTransparent: true, }} name="Edit Pet Info" component={EditPet} />
    </PetListStack.Navigator>
  );
}

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
  container2: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
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
    width: '85%',    
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
    marginTop: 15,
    paddingBottom: 40,
  },
  listingContainer: {
    alignItems: 'center',
  },
  wholeList: {
    paddingBottom: 40,
  },
  editIcon: {
    width: 25,
    height: 25,
    margin: 10,
  },
  iconPosition: {
    justifyContent: 'center',
  },
});
