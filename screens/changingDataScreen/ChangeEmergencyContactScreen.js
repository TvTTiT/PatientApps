import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangeEmergencyContactStyles'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const ChangeEmergencyContactScreen = ({ navigation, route }) => {
  const contactID = route.params?.contactID;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {userPassword } = useContext(UserContext);

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
        .from('emergencycontacts')
        .update({ 
          first_name: firstName,
          last_name: lastName,
          relationship: relationship,
          contact_number: contactNumber,
        })
        .eq('emergency_contact_id', contactID);
  
      if (error) {
        console.error('Error updating Contact:', error);
        return;
      }
      alert('Contact updated successfully');
      setFirstName('');
      setLastName('');
      setRelationship('');
      setContactNumber('');
      setConfirmPassword('');
      navigation.navigate('Emergency Contact');
    } catch (error) {
      console.error('Error updating Contact:', error);
    }
  }

  const changeMind = () => {
    navigation.navigate('Emergency Contact');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Emergency Contact</Text>
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
          placeholder="Relationship..."
          placeholderTextColor="#003f5c"
          value={relationship}
          onChangeText={(text) => setRelationship(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contact..."
          placeholderTextColor="#003f5c"
          keyboardType="numeric"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
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



export default ChangeEmergencyContactScreen;
