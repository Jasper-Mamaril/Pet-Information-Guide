
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {DateTimePicker, DateTimePickerAndroid} from '@react-native-community/datetimepicker';

export const TimePicker = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      display: "spinner",
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
    </View>
  );
};

function AddReminderScreen({navigation}) {
  
  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
        <View style={styles.card}>     
         

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.reminderListContainer}>
                  <Text>testing</Text>
                    <TimePicker/>
              </View>
            </ScrollView>

        </View>     
      </View>

  );
}

export default function ReminderAdd() {
  const RemindersStack = createNativeStackNavigator();
  return (
    <RemindersStack.Navigator>
      <RemindersStack.Screen options={{ headerShown: false }} name="Add Reminders" component={AddReminderScreen} />
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
