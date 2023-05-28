import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/AddressStyles';

const AddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState('Van Galenstraat 20, 7511 JL Enschede');
  
  const handleChangeAddress = () => {
    console.log('Change address button pressed');
    navigation.navigate('Change Address')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <TouchableOpacity style={styles.changeAddressButton} onPress={handleChangeAddress}>
        <Text style={styles.changeAddressText}>Change Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;
