import React, { useState,useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangeDateOfBirthStyles';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import {supabase} from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const ChangeDateOfBirthScreen = ({ navigation }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const { userID,userPassword } = useContext(UserContext);

  const confirm = () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateDOB();
    }
  };

  const updateDOB = async () =>{
    try {
      const { data, error } = await supabase
        .from('patients')
        .update({ 
          date_of_birth: selectedDate
        })
        .eq('user_id', userID);
  
      if (error) {
        console.error('Error updating DOB:', error);
        return;
      }
      alert('DOB updated successfully');
      setSelectedDate('');
      setConfirmPassword('');
      navigation.navigate('DOB');
    } catch (error) {
      console.error('Error updating DOB:', error);
    }
    }

  const changeMind = () => {
    navigation.navigate('DOB');
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
    setShowCalendar(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={changeMind}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Date Of Birth</Text>
      <TouchableOpacity
        style={styles.inputView}
        onPress={() => setShowCalendar(true)}
      >
        <TextInput
          style={styles.inputText}
          placeholder="Date Of Birth..."
          placeholderTextColor="#003f5c"
          value={selectedDate}
          editable={false}
        />
      </TouchableOpacity>
      {showCalendar && (
        <Calendar
          onDayPress={handleDateSelection}
          minDate={'1900-01-01'}
          maxDate={new Date().toISOString().split('T')[0]}
          markedDates={{ [selectedDate]: { selected: true } }}
          theme={{
            selectedDayBackgroundColor: '#fb5b5a',
            selectedDayTextColor: '#ffffff',
          }}
        />
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.signupBtn} onPress={confirm}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeMind}>
        <Text style={styles.back}>Changing your mind? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeDateOfBirthScreen;
