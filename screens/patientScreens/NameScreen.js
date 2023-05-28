import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/NameStyles';

const NameScreen = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  
  const handleChangeName = () => {
    console.log('Change Name button pressed');
    navigation.navigate('ChangingName')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.changeNameButton} onPress={handleChangeName}>
        <Text style={styles.changeNameText}>Change Name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;
