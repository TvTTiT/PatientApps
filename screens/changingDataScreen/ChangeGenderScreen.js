import React, { useState,useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangingGenderStyles'; 
import { Ionicons } from '@expo/vector-icons';
import {supabase} from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';
const ChangeGenderScreen = ({navigation }) => {
  const [gender, setGender] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userID,userPassword } = useContext(UserContext);

  const confirm = () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateGender();
    }
  }

  
  const updateGender = async () =>{
    try {
      const { data, error } = await supabase
        .from('patients')
        .update({ 
          gender: gender
        })
        .eq('user_id', userID);
  
      if (error) {
        console.error('Error updating Gender:', error);
        return;
      }
      alert('Gender updated successfully');
      setGender('');
      setConfirmPassword('');
      navigation.navigate('Gender');
    } catch (error) {
      console.error('Error updating Gender:', error);
    }
    }
  

  const changeMind = () => {
    navigation.navigate('Gender');
  }

  const genderOptions = [
    'Male',
    'Female',
    'Transgender',
    'Gender Neutral',
    'Non-binary',
    'Agender',
    'Pangender',
    'Genderqueer',
    'Two-Spirit',
    'Third Gender',
    'All',
    'None',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Gender</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Gender..."
          placeholderTextColor="#003f5c"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>
      <View style={styles.genderOptionsContainer}>
        {genderOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.genderOption}
            onPress={() => setGender(option)}
          >
            <Text style={styles.genderOptionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.signupBtn} onPress={confirm}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeMind}>
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeGenderScreen;
