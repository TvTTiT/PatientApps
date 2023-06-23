import React, { useState,useContext,useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../../styles/homeStyles/NewAppointmentStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const DateSelectionButton = ({ selectedDate, onPress }) => {
  return (
    <TouchableOpacity style={styles.inputView} onPress={onPress}>
      {selectedDate ? (
        <Text style={styles.inputText}>{selectedDate}</Text>
      ) : (
        <Text style={styles.placeholderText}>Select Date</Text>
      )}
    </TouchableOpacity>
  );
};


const NewAppointmentScreen = ({ navigation }) => {
  const { patientId } = useContext(UserContext);
  const [medicalProfessionalId, setMedicalProfessionalId] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentId, setAppointmentId] = useState(0);

  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    getAppointmentId();
  }, [patientId,appointmentId]);
  

  const getAppointmentId = async () => {
    try {
      const { data, error } = await supabase
        .from('appointmentschedule')
        .select('*')
        .order('appointment_id', { ascending: false })
        .limit(1);

      if (error) {
        setError(error.message);
      } else {
        if (data.length > 0) {
          const appointment = data[0];
          let new_appointment_id = appointment.appointment_id + 1;
          setAppointmentId(new_appointment_id);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const saveAppointment = async () => {
    try {
      const { data, error } = await supabase
      .from('appointmentschedule')
      .insert([
        { appointment_id: appointmentId, 
          patient_id: patientId, 
          medical_professional_id: medicalProfessionalId,
          date: selectedDate,
          time: time,
          location: location,
          purpose: purpose

        },
      ])

      if (error) {
        console.error('Error creating new appointment:', error);
        alert('Error creating new appointment. Please try again.');
        return;
      }
      goBack();
    } catch (error) {
      alert('Error creating new appointment. Please try again.');
    }
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Time"
          placeholderTextColor="#003f5c"
          value={time}
          onChangeText={(text) => setTime(text)}
        />
      </View>
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
