import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from "@react-navigation/native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import axios from 'axios';
const baseURL = 'http://192.168.1.26/Ping/restAPI/';

import dayjs from 'dayjs';

// import dismissAllNotificationsAsync from 'expo-notifications';

import EditReminder from '../screens/ReminderEdit';
import ReminderAdd from '../screens/ReminderAdd';

function ReminderListScreen({navigation}) {
  
  const [date, setDate] = useState(dayjs());

  useEffect(() =>{
    const interval = setInterval(()=> {
      setDate(dayjs());
    }, 1000 * 1);

    return () => clearInterval(interval);
  }, []) 

  // pull data
  const [alarms, setReminder] = useState([]);

  // useEffect(() => {
    
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchReminder();
      // console.log("naload");
      return () => {
        fetchReminder();
        // console.log("umalis");
      };
    }, [])
  );

  const fetchReminder = async () => {
    try {
      const response = await axios.post(`${baseURL}getReminderList`, {
        
      });
      if (response.status === 200 || refreshing === true) {
        // console.log(response.data.payload[0]);
        setReminder(response.data.payload);
        console.log(alarms)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  const deleteReminder = async (pet_id) => {
    try {
      const response = await axios.post(`${baseURL}deleteReminder/${pet_id}`, {

      });
      if (response.status === 200 || refreshing === true) {
        // alert(response.data.payload[0].cooking_time);
        // console.log(response.data.payload[0]);
        setReminder(response.data.payload);
        // console.log(alarms)
        alert("Successfully Deleted!")
        fetchReminder();
       

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error)
    }
  };

  // const cancel = async () => {
  //   await Notifications.cancelScheduledNotificationAsync(identifier);
  // }

  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add Reminder')}>
            <Image style={styles.addIcon} source={require('../assets/addIcon.png')} />
          </TouchableOpacity>
        </View>
          <View style={styles.timeContainer}>
            <Text style={styles.date}>{date.format("dddd, DD MMM")}</Text>
            <Text style={styles.time}>{date.format("hh:mm:ss A")}</Text>
          </View>
        <View style={styles.card}>     


        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.reminderListContainer}>
            
                {/* iteration*/}
                <View style={styles.wholeList}>
                <FlatList navigation={navigation} scrollEnabled={false} data={alarms} keyExtractor={item=> item.id} renderItem={({item}) => {
                return (
                  // <Text style={styles.paragraph}>{user.id} - {user.name}</Text>

                  <View style={styles.inputButtonBg}>
                  <View style={styles.itemFlex}>
                          {/* <View style={styles.iconPosition}>
                            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Edit Reminder', item)}>
                              <Image style={styles.editIcon} source={require('../assets/editIcon.png')} />
                            </TouchableOpacity>
                          </View> */}
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputButton}>
                                          <View style={styles.itemFlex}>
                                            <View style={styles.itemFlex}>
                                              <Text style={styles.inputTxt}>{item.timeset}</Text>
                                            </View>
                                            <Text style={styles.descTxt}>{item.petname}</Text>
                                            {/* <TouchableOpacity onPress={() => {deleteReminder(item.id)} }> */}
                                              <TouchableOpacity onPress={() => {deleteReminder(item.id)} } onPressOut={Notifications.cancelAllScheduledNotificationsAsync}>
                                                  <Image style={styles.deleteIcon} source={require('../assets/deleteIcon.png')} />
                                              </TouchableOpacity>
                                            {/* </TouchableOpacity> */}
                                              
                                          </View>
                                        <Text style={styles.descTxt}>Repeat:{item.repDay}, {item.label}</Text>
                                      
                                    </View>
                                </View>
                  </View>
                </View>     
              )}}/>

                  <View style={styles.container2}>
                        <Text >End of Reminders</Text>
                      </View>
          </View>
        </View>
                

         </ScrollView>

        </View>     
      </View>

  );
}


  // useEffect(() => {
  //   let users = [
  //     { id: 1, petname: 'Hiro', hour: 1, minute: 47, label: "Meal"},
  //     { id: 2, petname: 'Mayumi', hour: 1, minute: 48, label: "Medicine"},
  //     { id: 2, petname: 'Hiraya', hour: 1, minute: 49, label: "Exercise"},
  //   ];
  //   setUsers(users);
  // }, []);

export default function Reminders() {
  const RemindersStack = createNativeStackNavigator();
  return (
    <RemindersStack.Navigator>
      <RemindersStack.Screen options={{ headerShown: false }} name="Reminders" component={ReminderListScreen} />
      <RemindersStack.Screen options={{ headerShown: true, headerTransparent: true, }} name="Edit Reminder" component={EditReminder} />
      <RemindersStack.Screen options={{ headerShown: true, headerTransparent: true, }} name="Add Reminder" component={ReminderAdd} />
    </RemindersStack.Navigator>
  );
}

const styles = StyleSheet.create({
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
    top: 125,
  },
  time: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: -20,
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
  editIcon: {
    width: 25,
    height: 25,
    margin: 10,
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
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    width: 40,
    height: 40,
  },
  iconPosition: {
    justifyContent: 'center',
    position: 'relative',
    right: 0,
  },
  inputButtonBg: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#F98E6A',
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  inputContainer: {
    width: '87%',
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
    marginTop: 15,
    width: '90%',
  },
  reminderListContainer: {
    alignItems: 'center',
  },
  wholeList: {
    marginBottom: 40,
  }
});
