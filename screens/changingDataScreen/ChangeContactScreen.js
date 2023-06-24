import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangeContactStyles'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const ChangeContactScreen = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userID, userPassword } = useContext(UserContext);
  
  const confirm = () => {
    if (confirmPassword !== userPassword) {
      alert('Incorrect Password');
    } else {
      updateContact();
    }
  };

  const updateContact = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update({ 
          contact_number: contact
        })
        .eq('user_id', userID);
  
      if (error) {
        console.error('Error updating Contact:', error);
        return;
      }
      alert('Contact updated successfully');
      setContact('');
      setConfirmPassword('');
      navigation.navigate('Contact');
    } catch (error) {
      console.error('Error updating Contact:', error);
    }
  }

  const changeMind = () => {
    navigation.navigate('Contact');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Contact</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contact..."
          placeholderTextColor="#003f5c"
          keyboardType="numeric"
          value={contact}
          onChangeText={(text) => setContact(text)}
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
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeContactScreen;
