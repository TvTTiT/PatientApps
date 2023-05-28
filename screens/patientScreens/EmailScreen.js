import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/EmailStyles';

const EmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('JohnDoe@gmail.com');
  
  const handleChangeEmail = () => {
    console.log('Change Email button pressed');
    navigation.navigate('ChangingEmail')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.changeEmailButton} onPress={handleChangeEmail}>
        <Text style={styles.changeEmailText}>Change Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailScreen;
