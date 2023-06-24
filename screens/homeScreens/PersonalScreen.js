import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PersonalStyles';

const PersonalScreen = ({ navigation }) => {
  const handleName = () => {
    navigation.navigate('UserName');
  };

  const handleEmail = () => {
    navigation.navigate('Email');
  };

  const handleDateOfBirth = () => {
    navigation.navigate('DOB');
  };

  const handleGender = () => {
    navigation.navigate('Gender');
  };

  const handleContactNumber = () => {
    navigation.navigate('Contact');
  };

  const handleAddress = () => {
    navigation.navigate('Address');
  };

  const handleEmergencyContacts = () => {
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
