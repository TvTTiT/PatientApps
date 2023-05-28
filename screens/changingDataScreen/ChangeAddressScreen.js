import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangeAddressStyles'; 
import { Ionicons } from '@expo/vector-icons';

const ChangeAddressScreen = ({navigation }) => {
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const confirm = () => {
    // Perform sign-up logic here
  }

  const changeMind = () => {
    navigation.navigate('Address');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing address</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Address..."
          placeholderTextColor="#003f5c"
          value={address}
          onChangeText={(text) => setAddress(text)}
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



export default ChangeAddressScreen;
