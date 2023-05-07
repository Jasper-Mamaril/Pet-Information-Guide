import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {DateTimePicker, DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

import axios from 'axios';
const baseURL = 'http://192.168.1.26/Ping/restAPI/';

import dayjs from 'dayjs';
// import Reminders from '../screens/Reminders';

const label = [
  {key:'1',value:'Meal'},
  {key:'2',value:'Meds'},
  {key:'3',value:'Bath'},
  {key:'4',value:'Play'},
  {key:'5',value:'Exercise'},
];
const day = [
  {key:'1', value:'Yes'},
  {key:'2', value:'No'},
];
const pet = [
  {key:'1', value:'Kim'},
  {key:'2', value:'Ant'},
  {key:'3', value:'Jmie'},
];



// export const TimePicker = () => {
//   const [date, setTime] = useState(new Date());
//   date.setSeconds(0);
  
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setTime(currentDate);
//   };
  
//   const showMode = (currentMode) => {
//     DateTimePickerAndroid.open({
//       value: date,
//       display: "spinner",
//       onChange,
//       mode: currentMode,
//       is24Hour: false,

//     });
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <View style={styles.timepickerContainer}>
//           <Text>Reminder Time</Text>
//         <View style={styles.timepicker}>
//                   <TouchableOpacity style={styles.timepickerButton} onPress={showTimepicker}>
//                     <Text style={styles.timePickerbuttonTxt}>{date.toLocaleTimeString()}</Text>
//                   </TouchableOpacity> 
//         </View>
//     </View>
    
//   );
// };

function AddReminderScreen({navigation}) {
  // const [today, setDate] = useState(dayjs());

  const [selectedPet, setPetname] = useState();
  const [selectedDay, setDay] = useState();
  const [selectedlabel, setLabel] = useState();
  const [date, setTime] = useState(new Date());
  date.setSeconds(0);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTime(currentDate);
  };
  
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      display: "spinner",
      onChange,
      mode: currentMode,
      is24Hour: true,

    });
  };

  const showTimepicker = () => {
    showMode('time');
  };
 
  
  useEffect(() =>{
    // const interval = setInterval(()=> {
    //   setDate(dayjs());
    // }, 1000 * 1);

    // return () => clearInterval(interval);
    fetchPetname();
  }, []) 

  const [petnameList, setPetnameList] = useState([]);
  listOfNames = []


  const fetchPetname = async () => {
    try {
      const response = await axios.post(`${baseURL}getPetnameList`, {

      });
      if (response.status === 200 || refreshing === true) {
        // console.log(response.data.payload[0]);
        // setPetnameList(response.data.payload);
        // result = Object.values(petnameList);
        // console.log(result)
        const objectArray = Object.entries(response.data.payload);

        objectArray.forEach(([key, value]) => {
          // console.log(key); // 'one'
          // console.log(value.petname); // 1
          // setPetnameList(petnameList, value.petname);
          listOfNames.push(value.petname);
        });
        console.log(listOfNames);

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  const onSubmitFormHandler = async (event) => {
    console.log(selectedDay)
    // if (!date.trim() || !selectedlabel.trim() || !selectedDay.trim() || !selectedPet.trim()) {
    //   alert("Check input fields!");
    //   return;
    // }
  
    try {
      const response = await axios.post(`${baseURL}insertNewReminder`, {
        time : date,
        petname : selectedPet,
        label : selectedlabel,
        repDay: selectedDay,
      });
      if (response.status === 200) {

        console.log(response.data)
        // console.log(response.data.payload.id);
        // setUsername('');
        // setPassword('');
        // return navigation.navigate(ROUTES.LOGIN);
        // storeUserID(response.data.payload.id);

        alert("Reminder Added!");
        // return navigation.navigate(Reminders);

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
      {/* <View style={styles.timeContainer}>
            <Text style={styles.date}>{today.format("dddd, DD MMM")}</Text>
            <Text style={styles.time}>{today.format("hh:mm:ss A")}</Text>
          </View> */}
        <View style={styles.card}>     
         

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.reminderListContainer}>
                 <View>
                 <View style={styles.timepickerContainer}>
                        <Text>Reminder Time</Text>
                      <View style={styles.timepicker}>
                          <TouchableOpacity style={styles.timepickerButton} onPress={showTimepicker}>
                            <Text style={styles.timePickerbuttonTxt}>{date.toLocaleTimeString()}</Text>
                          </TouchableOpacity> 
                      </View>
                  </View>
                 </View>

                    <View style={styles.daypicker}>
                    <Text>Repeat</Text>
                        <SelectList 
                          setSelected={(val) => setDay(val)}
                          data={day}
                          label="Remind on:"
                          onSelect={() => console.log(selectedDay)}
                          save="value"
                          search={false} 
                        />
                    </View>

                    <View style={styles.label}>
                      <Text>Petname</Text>
                          <SelectList 
                            onSelect={() => console.log(selectedPet)}
                            setSelected={(val) => setPetname(val)}
                            data={listOfNames}  
                            save="value"
                            search={false}
                          />
                    </View>     

                    <View style={styles.label}>
                      <Text>Label</Text>
                      <SelectList 
                        onSelect={() => console.log(selectedlabel)}
                        setSelected={(val) => setLabel(val)}
                        data={label}  
                        save="value"
                        search={false}
                      />

                    </View>

                    <View style={styles.addButtonContainer}>
                      <TouchableOpacity style={styles.addButton} onPress={onSubmitFormHandler}><Text style={styles.addbuttonTxt}>ADD</Text></TouchableOpacity>
                    </View>

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
  timeContainer: {
    position: 'absolute',
    top: 120,
    elevation: 2,
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
  timepickerButton: {
    marginTop: 10,
    backgroundColor: '#F98E6A',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
  },
  timePickerbuttonTxt: {
    color: 'white',
    fontWeight: 'bold',
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
  // timeContainer: {
  //   position: 'absolute',
  //   top: 120,
  // },
  time: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
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
  timepickerContainer: {
    width: '90%',
  },
  scrollView: {
    marginTop: 20,
    width: '90%',
  },
  reminderListContainer: {
    alignItems: 'center',
  },
  daypicker: {
    marginTop: 15,
    width: '90%',
  },
  timepicker: {
    width: 320,
  },
  label: {
    marginTop: 15,
    width: '90%',
  },
  inputContainer2: {
    marginTop: 10,
    marginBottom: 10,
  },
  addButtonContainer: {
    width: '60%',
    marginTop: 20,
    marginBottom: 40,
  },
  addButton: {
    backgroundColor: '#F98E6A',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
  },
  addbuttonTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownBtn: {
    backgroundColor: '#E6E6E6',
  },

  timePickerWrapper: {
    backgroundColor: "grey",
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  dayItem: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTitle: {
    fontSize: 14,
    padding: 10,
  },
  btnWrapper: {
    marginTop: 55,
  },
});
