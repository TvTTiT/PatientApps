import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangePasswordStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase/supabaseConfig';

const ChangePasswordScreen = ({navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({ password: password });
  
      if (error) {
        throw error;
      }
  
      alert('Password updated successfully');
      // Add any additional logic or navigation here
      changeMind();
    } catch (error) {
      if (error.message.includes('Password should be at least 6 characters')) {
        alert('Password should be at least 6 characters');
      } else {
        alert('An error occurred while updating the password. Please try again.');
      }
    }
  };
  

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      updatePassword();
    }
  };

  const changeMind = () => {
    navigation.navigate('PersonalDetails');
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
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
      <TouchableOpacity style={styles.signupBtn} onPress={handleUpdatePassword}>
        <Text style={styles.signupText}>Comfirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeMind}>
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ChangePasswordScreen;
