import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import EditPet from '../screens/EditPet';
const PetProfileScreen = ({navigation, route}) => {
// function PetProfileScreen({navigation, route}) {

const petDetail = route.params;
console.log(petDetail);
// console.log(route);


  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require('../assets/bgImage.jpg')} />
        <View style={styles.card}>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            <View style={styles.petname}>
              <Text style={styles.petnameTxt}>
                {petDetail.petname}
              </Text>
            </View>
            <View style={styles.flexBox}>
              {/* <View style={styles.infoSection}>
              <TouchableOpacity style={styles.ageBox}>
                <Text style={styles.outputText}> Age </Text>
                <View style={styles.ageOutput}>
                <Text style={styles.ageOutputTxt}>6</Text>
                </View>
              </TouchableOpacity>
              </View> */}

              <View style={styles.infoSection}>
              <TouchableOpacity style={styles.ageBox}>
                <Text style={styles.outputText}> Sex </Text>
                <View style={styles.ageOutput}>
                  <Text style={styles.ageOutputTxt}> {petDetail.gender}</Text>
                </View>
              </TouchableOpacity>
              </View>

              <View style={styles.infoSection}>
              <TouchableOpacity style={styles.ageBox}>
                <Text style={styles.outputText}> Wt. </Text>
                <View >
                <Text style={styles.weightOutputTxt}> {petDetail.weight}</Text>
                </View>
              </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputButtonBg}>
                  <View style={styles.itemFlex}>
                    <View style={styles.iconPosition}>
                      <Image style={styles.addIcon} source={require('../assets/petIcon.png')} />
                    </View>
                    <View style={styles.inputContainer}>
                          <SafeAreaView style={styles.inputButton}>
                            <Text style={styles.inputTxt}>
                              {petDetail.species}
                            </Text>
                          </SafeAreaView>
                      </View>
                  </View>
                </View>
                {/* <View style={styles.inputButtonBg}>
                  <View style={styles.itemFlex}>
                    <View style={styles.iconPosition}>
                      <Image style={styles.addIcon} source={require('../assets/petIcon.png')} />
                    </View>
                      <View style={styles.inputContainer}>
                          <SafeAreaView style={styles.inputButton}>
                            <Text style={styles.inputTxt}>
                            {petDetail.birthday}
                            </Text>
                          </SafeAreaView>
                      </View>
                  </View>
                </View> */}
                <View style={styles.inputButtonBg}>
                  <View style={styles.itemFlex}>
                    <View style={styles.iconPosition}>
                      <Image style={styles.addIcon} source={require('../assets/petIcon.png')} />
                    </View>
                      <View style={styles.inputContainer}>
                          <SafeAreaView style={styles.inputButton}>
                            <Text style={styles.inputTxt}>
                            {petDetail.notes}
                            </Text>
                          </SafeAreaView>
                      </View>
                  </View>
                </View>
                {/* <View style={styles.editSection}>
                  <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit Pet Info')}>
                    <Text style={styles.editButtonTxt}>
                      Edit Info
                    </Text>
                  </TouchableOpacity>
                </View> */}
            </View>
          </ScrollView>
        </View>     
    </View>
  );
}

export default PetProfileScreen;

// export default function PetProfile() {
//   const PetListStack = createNativeStackNavigator();
//   return (
//     <PetListStack.Navigator>
//       <PetListStack.Screen options={{ headerShown: false }} name="My Pet Profile" component={PetProfileScreen} />
//       <PetListStack.Screen options={{ headerShown: false }} name="Edit Pet Info" component={EditPet} />
//     </PetListStack.Navigator>
//   );
// }

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },// Pet Profile Styles
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoSection: {
    margin: 20,
    position: 'relative',
    top: 5,
    elevation: 10,
  },
  petname: {
    marginTop: 40,
  },
  petnameTxt: {
    fontSize: 32,
  },
  ageBox: {
    backgroundColor: '#6B6FC8',
    height: 100,
    width: 90,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  outputText: {
    color: 'white',
    fontSize: 24,
  },
  ageOutputTxt: {
    fontSize: 46,
    color: 'white',
    marginLeft: -10,
    marginTop: -5,
  },

  weightOutputTxt: {
    fontSize: 30,
    color: 'white',
    marginLeft: -10,
  },
  iconPosition: {
    justifyContent: 'center',
    position: 'relative',
    right: 10,
  },
  addImageButtonContainer: {
    position: 'absolute',
    top: -160,
  },
  addImageButton: {
    backgroundColor: '#6B6FC8',
    padding: 80,
    borderRadius: 100,
  },
  inputButtonBg: {
    marginTop: 10,
    width: '90%',
    backgroundColor: '#F98E6A',
    alignItems: 'flex-end',
    borderRadius: 10,
    elevation: 10,
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
  },
  noteViewSection: {
    marginTop: 10,
  },
  noteViewButton: {
    backgroundColor: '#F98E6A',
    padding: 10,
    borderRadius: 30,
    width: 200,
    alignItems: 'center',
  },
  viewButtonTxt: {
    color: 'white',
    fontSize: 24,
  },
  editSection: {
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#F98E6A',
    padding: 10,
    borderRadius: 30,
    width: 200,
    alignItems: 'center',
    
  },
  editButtonTxt: {
    color: 'white',
    fontSize: 24,
  },
  scrollView: {
    width: '100%',
  },
  infoContainer: {
    alignItems: 'center',
  }
});
