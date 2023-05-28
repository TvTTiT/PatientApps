import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/DateStyles';

const DateScreen = ({ navigation }) => {
  const [date, setDate] = useState('01/01/1990');
  
  const handleChangeDate = () => {
    console.log('Change date of birth button pressed');
    navigation.navigate('Change DOB')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.changeDateButton} onPress={handleChangeDate}>
        <Text style={styles.changeDateText}>Change Date</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateScreen;
