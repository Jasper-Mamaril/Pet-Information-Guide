import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


import axios from 'axios';
const baseURL = 'http://192.168.1.26/Ping/restAPI/';

import dayjs from 'dayjs';

import Edit from '../screens/ReminderEdit';
import ReminderAdd from '../screens/ReminderAdd';

function ReminderListScreen({navigation}) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  const [date, setDate] = useState(dayjs());

  useEffect(() =>{
    const interval = setInterval(()=> {
      setDate(dayjs());
    }, 1000 * 1);

    return () => clearInterval(interval);
  }, []) 

  // pull data
  const [alarms, setReminder] = useState([]);

  useEffect(() => {
    fetchReminder();
  }, []);

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

        <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text style={{ display: 'none' }}>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center',display: 'none', }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="push notification example"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      
    </View>


        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.reminderListContainer}>
            
                {/* iteration*/}
                <View style={styles.wholeList}>
                <FlatList navigation={navigation} scrollEnabled={false} data={alarms} keyExtractor={item=> item.id.toString()} renderItem={({item}) => {
                return (
                  // <Text style={styles.paragraph}>{user.id} - {user.name}</Text>

                  <View style={styles.inputButtonBg}>
                  <View style={styles.itemFlex}>
                          <View style={styles.iconPosition}>
                            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Edit Reminder')}>
                              <Image style={styles.editIcon} source={require('../assets/editIcon.png')} />
                            </TouchableOpacity>
                          </View>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputButton}>
                                          <View style={styles.itemFlex}>
                                            <View style={styles.itemFlex}>
                                              <Text style={styles.inputTxt}>{item.time}</Text>
                                            </View>
                                            <Text style={styles.descTxt}>{item.petname}</Text>
                                              <TouchableOpacity>
                                                <Image style={styles.deleteIcon} source={require('../assets/deleteIcon.png')} />
                                              </TouchableOpacity>
                                          </View>
                                        <Text style={styles.descTxt}>{item.repDay}, {item.label}</Text>
                                      
                                    </View>
                                </View>
                  </View>
                </View>     
              )}}/>
          
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

async function schedulePushNotification() {
  const hour = 23; // must be between 0-23
  const minute = 32;
  const petname = "Mayumi";
  const label = "Meal";
    await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ping!",
      body: 'Time for '+petname+'\'s '+label+'',
      // data: { data: 'goes here' },
    },
    trigger: { 
      hour: hour, minute: minute, repeats: false
  }
  });
    
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function Reminders() {
  const RemindersStack = createNativeStackNavigator();
  return (
    <RemindersStack.Navigator>
      <RemindersStack.Screen options={{ headerShown: false }} name="Reminders" component={ReminderListScreen} />
      <RemindersStack.Screen options={{ headerShown: true, headerTransparent: true, }} name="Edit Reminder" component={Edit} />
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
    top: 140,
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
