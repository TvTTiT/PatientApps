import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/DateStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';
const DateScreen = ({ navigation }) => {
  const [date, setDate] = useState('');
  const { userID } = useContext(UserContext);
    
  useEffect(() => {
    fetchData();
    const updateDOBSubscription = supabase
      .channel('update-dob-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleNewDOB)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateDOBSubscription.unsubscribe();
    };
  }, [userID]);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('date_of_birth')
        .eq('user_id', userID)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        setDate(data[0].date_of_birth);
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  
  const handleNewDOB = () => {
    setDate('');
    fetchData();
  };


  const handleChangeDate = () => {
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
