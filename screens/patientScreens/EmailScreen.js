import React,  { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/EmailStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';

const EmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { userID } = useContext(UserContext);

  useEffect(() => {
    fetchData();
    const updateEmailSubscription = supabase
      .channel('update-email-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleNewAddress)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateEmailSubscription.unsubscribe();
    };
  }, [userID]);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('email')
        .eq('user_id', userID)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        setEmail(data[0].email);
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  
  const handleNewAddress = () => {
    setEmail('');
    fetchData();
  };

  const handleChangeEmail = () => {
    console.log('Change Email button pressed');
    navigation.navigate('ChangingEmail')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.changeEmailButton} onPress={handleChangeEmail}>
        <Text style={styles.changeEmailText}>Change Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailScreen;
