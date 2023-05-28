import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PersonalStyles';

const PersonalScreen = ({ navigation }) => {
  const handleName = () => {
    console.log(' Name button pressed');
    // Logic for editing the name
    navigation.navigate('UserName');
  };

  const handleEmail = () => {
    console.log(' Email button pressed');
    // Logic for editing the email
    navigation.navigate('Email');
  };

  const handleDateOfBirth = () => {
    console.log(' Date of Birth button pressed');
    // Logic for editing the date of birth
    navigation.navigate('DOB');
  };

  const handleGender = () => {
    console.log(' Gender button pressed');
    // Logic for editing the gender
    navigation.navigate('Gender');
  };

  const handleContactNumber = () => {
    console.log(' Contact Number button pressed');
    // Logic for editing the contact number
    navigation.navigate('Contact');
  };

  const handleAddress = () => {
    console.log(' Address button pressed');
    // Logic for editing the address
    navigation.navigate('Address');
  };

  const handleEmergencyContacts = () => {
    console.log('Emergency Contacts button pressed');
    // Logic for handling emergency contacts
    // You can navigate to the Emergency Contacts screen here
    navigation.navigate('Emergency Contact');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Details</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>name</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleName}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>email</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleEmail}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>date of birth</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleDateOfBirth}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>gender</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleGender}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>contact number</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleContactNumber}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>address</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={handleAddress}>
            <Ionicons name="chevron-forward" size={18} color="#555" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.emergencyContainer} onPress={handleEmergencyContacts}>
          <Ionicons name="warning" size={24} color="#fff" style={styles.emergencyIcon} />
          <Text style={styles.emergencyText}>Emergency Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalScreen;
