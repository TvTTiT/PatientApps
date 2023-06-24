import React, { useState,useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/changingDataStyles/ChangeNameStyles'; 
import {supabase} from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const ChangeNameScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userID,userPassword } = useContext(UserContext);

  const confirm = () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateName();
    }
  }

  const updateName = async () =>{
  try {
    const { data, error } = await supabase
      .from('patients')
      .update({ 
        first_name: firstName,
        last_name: lastName
      })
      .eq('user_id', userID);

    if (error) {
      console.error('Error updating name:', error);
      return;
    }
    alert('Name updated successfully');
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
    navigation.navigate('UserName');
  } catch (error) {
    console.error('Error updating name:', error);
  }
  }

  const changeMind = () => {
    navigation.navigate('UserName');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing name</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="First Name..."
          placeholderTextColor="#003f5c"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Last Name..."
          placeholderTextColor="#003f5c"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
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
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeNameScreen;
