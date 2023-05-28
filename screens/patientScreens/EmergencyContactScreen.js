import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/EmergencyContactStyles';

const EmergencyContactScreen = ({ navigation }) => {
  const emergencyContact = {
    first_name: 'John',
    last_name: 'Doe',
    relationship: 'Spouse',
    contact_number: '123-456-7890',
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleChangeEmergencyContact = () => {
    navigation.navigate('Change Emergency Contact');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.emergencyContainer}>
        <Text style={styles.title}>Emergency Contact</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>First Name:</Text>
        <Text style={styles.infoText}>{emergencyContact.first_name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Last Name:</Text>
        <Text style={styles.infoText}>{emergencyContact.last_name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Relationship:</Text>
        <Text style={styles.infoText}>{emergencyContact.relationship}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Contact Number:</Text>
        <Text style={styles.infoText}>{emergencyContact.contact_number}</Text>
      </View>
      <TouchableOpacity style={styles.changeButton} onPress={handleChangeEmergencyContact}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyContactScreen;