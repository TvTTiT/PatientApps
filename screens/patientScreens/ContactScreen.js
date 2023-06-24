import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/ContactStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';
const ContactScreen = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const { userID } = useContext(UserContext);

  useEffect(() => {
    fetchData();
    const updateContactSubscription = supabase
      .channel('update-contact-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleNewContact)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateContactSubscription.unsubscribe();
    };
  }, [userID]);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('contact_number')
        .eq('user_id', userID)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        setContact(data[0].contact_number);
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  
  const handleNewContact = () => {
    setContact('');
    fetchData();
  };


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
