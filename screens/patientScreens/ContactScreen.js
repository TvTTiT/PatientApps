import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/ContactStyles';

const ContactScreen = ({ navigation }) => {
  const [contact, setContact] = useState('+311111111');
  
  const handleChangeContact = () => {
    console.log('Change contact button pressed');
    navigation.navigate('Change Contact')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>{contact}</Text>
      </View>
      <TouchableOpacity style={styles.changeContactButton} onPress={handleChangeContact}>
        <Text style={styles.changeContactText}>Change Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactScreen;
