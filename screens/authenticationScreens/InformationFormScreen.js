import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../styles/authenticationStyles/InformationFormStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';
import { Calendar } from 'react-native-calendars';

const InformationFormScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDataOfBirth] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const { userID, setPatientId,patientId, userEmail,password } = useContext(UserContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const DateSelectionButton = ({ selectedDate, onPress }) => {
    return (
      <TouchableOpacity style={styles.inputView} onPress={onPress}>
        {selectedDate ? (
          <Text style={styles.inputText}>{selectedDate}</Text>
        ) : (
          <Text style={styles.placeholderText}>Date Of Birth</Text>
        )}
      </TouchableOpacity>
    );
  };

  const handleDateSelection = (day) => {
    setDataOfBirth(day.dateString);
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    console.log(userID);
    console.log(patientId);
  }, [userID, patientId, userEmail]);

  
  const handleSubmit = async () => {
    try {
      // Add user to the users table
      const { error: createUserError } = await supabase
        .from('users')
        .insert([
          {
            user_id: userID,
            user_role: 'Patient',
          },
        ]);
  
      if (createUserError) {
        console.error('Error creating new user:', createUserError);
        return;
      }
  
      const { data, error } = await supabase
        .from('patients')
        .select('patient_id')
        .order('patient_id', { ascending: false })
        .limit(1);
  
      if (error) {
        console.error('Error retrieving max patient ID:', error);
        return;
      }
  
      const maxId = data[0]?.patient_id || 0;
      const newPatientId = maxId + 1;
  
      const { error: createPatientError } = await supabase
        .from('patients')
        .insert([
          {
            patient_id: newPatientId,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            contact_number: contactNumber,
            gender: gender,
            address: address,
            email: userEmail,
            user_id: userID,
            medical_history: medicalHistory,
          },
        ]);
  
      if (createPatientError) {
        console.error('Error creating new Patient:', createPatientError);
        return;
      }
  
      console.log('New Patient added successfully');
  
      setFirstName('');
      setLastName('');
      setMedicalHistory('');
      setContactNumber('');
      setDataOfBirth('');
      setGender('');
      setAddress('');
  
      setPatientId(newPatientId); // Update the medicalPatientId in the context
      navigation.navigate('Medical Professional');
      //onLogin(newPatientId, userID,password);
    } catch (error) {
      console.error('Error adding new Patient:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Gender"
          placeholderTextColor="#003f5c"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          placeholder="Contact Number"
          keyboardType="phone-pad"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />
      </View>
      <DateSelectionButton selectedDate={selectedDate} onPress={toggleCalendar} />
      {showCalendar && (
        <Calendar
          onDayPress={handleDateSelection}
          minDate={'1900-01-01'}
          maxDate={'9999-12-31'} 
          markedDates={{ [selectedDate]: { selected: true } }}
          theme={{
            selectedDayBackgroundColor: '#fb5b5a',
            selectedDayTextColor: '#ffffff',
          }}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InformationFormScreen;
