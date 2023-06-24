import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/EmergencyContactStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';

const EmergencyContactScreen = ({ navigation }) => {
  const { patientId } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactID, setContactID] = useState('');
  useEffect(() => {
    fetchData();
    const updateEmergencyContactSubscription = supabase
      .channel('update-emergency-contact-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'emergencycontacts',
      }, handleNewEmergencyContact)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateEmergencyContactSubscription.unsubscribe();
    };
  }, [patientId]);

  useEffect(() => {
    fetchData();
  }, [patientId]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('emergencycontacts')
        .select('*')
        .eq('patient_id', patientId)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        setFirstName(data[0].first_name);
        setLastName(data[0].last_name);
        setRelationship(data[0].relationship);
        setContactNumber(data[0].contact_number);
        setContactID(data[0].emergency_contact_id)
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  
  const handleNewEmergencyContact = () => {
    fetchData();
  };


  const goBack = () => {
    navigation.goBack();
  };

  const handleChangeEmergencyContact = () => {
    navigation.navigate('Change Emergency Contact',{contactID: contactID});
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
        <Text style={styles.infoText}>{firstName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Last Name:</Text>
        <Text style={styles.infoText}>{lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Relationship:</Text>
        <Text style={styles.infoText}>{relationship}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Contact Number:</Text>
        <Text style={styles.infoText}>{contactNumber}</Text>
      </View>
      <TouchableOpacity style={styles.changeButton} onPress={handleChangeEmergencyContact}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyContactScreen;