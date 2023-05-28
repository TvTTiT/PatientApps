import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/GenderStyles';

const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState('Male');
  
  const handleChangeGender = () => {
    console.log('Change gender button pressed');
    navigation.navigate('Change Gender');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.genderContainer}>
        <Text style={styles.genderText}>{gender}</Text>
      </View>
      <TouchableOpacity style={styles.changeGenderButton} onPress={handleChangeGender}>
        <Text style={styles.changeGenderText}>Change Gender</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;
