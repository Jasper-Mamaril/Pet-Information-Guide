import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

import axios from 'axios';
const baseURL = 'http://192.168.1.26/Ping/restAPI/';

// function EditPetInformation({navigation, route}) {
const EditPetInformation = ({navigation, route}) => {
const editpet = route.params;
// console.log(editpet.id);

    const [name, onChangeName] = React.useState('');
    const [weight, onChangeWeight] = React.useState('');
    const [gender, onChangeGender] = React.useState('');
    const [specie, onChangeSpecie] = React.useState('');
    // const [bday, onChangeBday] = React.useState('');
    const [note, onChangeNote] = React.useState('');

    // const onChangeNameHandler = (name) => {
    //   onChangeName(name);
    // };

    const onSubmitFormHandler = async (event) => {
      // if (!name.trim() || !weight.trim() || !gender.trim() || !specie.trim() || !bday.trim() || !note.trim() ) {
      //   alert("Check input fields!");
      //   return;
      // }
      try {
        const response = await axios.post(`${baseURL}editPet`, {
          id: editpet.id,
          petname : name,
          weight : weight,
          gender : gender,
          species : specie,
          birthday : bday,
          notes : note,
        });
        if (response.status === 200) {
          console.log(response.data)
          // console.log(response.data.payload.id);
          // setUsername('');
          // setPassword('');
          // return navigation.navigate(ROUTES.LOGIN);
          // storeUserID(response.data.payload.id);
  
          alert("Successfully Edited!");
          return navigation.navigate('My Pets');
  
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert(error);
      }
    };

    return (
      <View style={styles.container}>
        <Image id='bgimage' style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
            
          <View style={styles.card}>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.inputFieldSection}>
                <KeyboardAvoidingView enabled
                    style={styles.keyboardView}
                    behavior="padding">
                                            {/* <Text>{editpet.id}</Text> */}
                  <View style={styles.inputFieldContainer}>
                    <Text>Edit Name</Text>
                      <View style={styles.inputField}>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeName}
                          value={editpet.petname}
                          // placeholder={editpet.petname}
                         />
                      </View>
                  </View>
                  
                  {/* <View style={styles.inputFieldContainer}>
                    <Text>Edit Birthday</Text>
                      <View style={styles.inputField}>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeBday}
                          value={bday}
                          placeholder={editpet.birthday}/>
                      </View>
                  </View> */}

                  <View style={styles.inputFieldContainer}>
                    <Text>Edit Species</Text>
                      <View style={styles.inputField}>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeSpecie}
                          value={specie}
                          placeholder={editpet.species}/>
                      </View>
                  </View>

                  <View style={styles.inputFieldContainer}>
                    <Text>Edit Weight</Text>
                      <View style={styles.inputField}>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeWeight}
                          value={weight}
                          placeholder={editpet.weight + " kg"}/>
                      </View>
                  </View>

                  <View style={styles.inputFieldContainer}>
                    <Text>Edit Gender</Text>
                      <View style={styles.inputField}>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeGender}
                          value={gender}
                          placeholder={editpet.gender}
                          />
                      </View>
                  </View>
                                {/* <View style={styles.flexRow}>
                                  <View style={styles.genderFieldContainer}>
                                      <Text>Edit Gender</Text>
                                        <View style={styles.genderInputField}>
                                          <TextInput
                                            style={styles.input}
                                            onChangeText={onChangeGender}
                                            value={gender}
                                            placeholder={editpet.gender}
                                            />
                                        </View>
                                    </View>

                                  <View style={styles.wtFieldContainer}>
                                    <Text>Edit Weight</Text>
                                      <View style={styles.wtInputField}>
                                        <TextInput
                                          style={styles.input}
                                          onChangeText={onChangeWeight}
                                          value={weight}
                                          placeholder={editpet.weight + " kg"}/>
                                      </View>
                                  </View>
                    </View> */}

                  
                  <View style={styles.inputFieldContainer}>
                    <Text>Edit Notes</Text>
                      <View style={styles.inputField}>
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeNote}
                          value={note}
                          placeholder={editpet.notes}/>
                      </View>
                  </View>
                </KeyboardAvoidingView>

              </View>

              <View style={styles.addPetContainer}>
                <TouchableOpacity style={styles.addPetButton} onPress={onSubmitFormHandler}>
                  <Text style={styles.addpetTxt}>SAVE</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>     
      </View>
    );
  }

export default EditPetInformation;
//     const PetListStack = createNativeStackNavigator();
//     return (
//       <PetListStack.Navigator>
//         <PetListStack.Screen options={{ headerShown: false}} name="Edit Pet" component={EditPetInformation} />
//       </PetListStack.Navigator>
//   );
// }

const styles = StyleSheet.create({
addImageButtonContainer: {
  alignItems: 'center',
  position: 'absolute',
  top: -160,
},
addImageButton: {
  backgroundColor: '#6B6FC8',
  padding: 80,
  borderRadius: 100,
},
keyboardView: {
  width: '100%',
},
scrollView: {
  width: '90%',
},
itemFlex: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
bgImage: {
  width: 400,
  height: 267,
  position: 'absolute',
  top: 0,
  marginTop: 0,
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
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
inputFieldSection: {
  marginTop: 10,
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
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#A4A4A4',
},
flexRow: {
  marginTop: 10,
  display: 'flex',
  flexDirection: 'row',
},
genderFieldContainer: {

},
genderInputField: {
  padding: 10,
  width: '200%',
  // backgroundColor: '#00000000',
  backgroundColor: 'white',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#A4A4A4',
},
wtFieldContainer: {
  marginLeft: 120,
},
wtInputField: {
  padding: 10,
  width: '220%',
  // backgroundColor: '#00000000',
  backgroundColor: 'white',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#A4A4A4',
},
input: {

},
addPetContainer: {
  marginTop: 10,
  marginBottom: 40,
  alignItems: 'center',
},
addPetButton: {
  backgroundColor: '#F98E6A',
  padding: 10,
  width: '40%',
  alignItems: 'center',
  borderRadius: 20,
},
addpetTxt: {
  color: 'white',
}
});
