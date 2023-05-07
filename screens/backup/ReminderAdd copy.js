import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const ReminderAdd = () => {
  const [date, setDate] = useState(new Date(0));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleTimeString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default ReminderAdd;

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
