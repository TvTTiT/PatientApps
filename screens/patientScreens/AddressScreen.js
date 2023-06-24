import React,  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/AddressStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';

const AddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const { userID } = useContext(UserContext);

  useEffect(() => {
    fetchData();
    const updateAddressSubscription = supabase
      .channel('update-address-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleNewAddress)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateAddressSubscription.unsubscribe();
    };
  }, [userID]);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('address')
        .eq('user_id', userID)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        setAddress(data[0].address);
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  
  const handleNewAddress = () => {
    setAddress('');
    fetchData();
  };

  const handleChangeAddress = () => {
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
