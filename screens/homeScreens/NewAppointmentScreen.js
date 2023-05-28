import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../../styles/homeStyles/NewAppointmentStyles';
import { Ionicons } from '@expo/vector-icons';

const NewAppointmentScreen = ({ navigation }) => {
  const [medicalProfessionalId, setMedicalProfessionalId] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const saveAppointment = () => {
    // Save the appointment logic here
    console.log('save');
  };

  const goBack = () => {
    navigation.navigate('Appointments');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>New Appointment</Text>
      <TouchableOpacity style={styles.inputView} onPress={toggleCalendar}>
        {selectedDate ? (
          <Text style={styles.inputText}>{selectedDate}</Text>
        ) : (
          <Text style={styles.placeholderText}>Select Date</Text>
        )}
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
          placeholder="Medical Professional ID..."
          placeholderTextColor="#003f5c"
          value={medicalProfessionalId}
          onChangeText={(text) => setMedicalProfessionalId(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Location..."
          placeholderTextColor="#003f5c"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Purpose..."
          placeholderTextColor="#003f5c"
          value={purpose}
          onChangeText={(text) => setPurpose(text)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveAppointment}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewAppointmentScreen;
