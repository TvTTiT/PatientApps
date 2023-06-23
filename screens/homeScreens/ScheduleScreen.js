import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { styles } from '../../styles/homeStyles/ScheduleStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';
const ScheduleScreen = ({ navigation }) => {
  const { patientId } = useContext(UserContext);
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchAppointments = async (date) => {
    try {
      const { data, error } = await supabase
        .from('appointmentschedule')
        .select('*')
        .eq('patient_id', patientId)
        .eq('date', date)
        .order('time', { ascending: true }); // Sort appointments by time

      if (error) {
        console.error('Error fetching appointments', error);
      } else {
        // Organize fetched data by date
        const updatedItems = { [date]: data };
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedDate);
    const updateAppointmentSubscription = supabase
      .channel('update-appointment-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'appointmentschedule',
      }, handleAppointment)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateAppointmentSubscription.unsubscribe();
    };
  }, [patientId]);

  useEffect(() => {
    fetchAppointments(selectedDate);
    const newAppointmentSubscription = supabase
      .channel('new-appointment-chanel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'appointmentschedule',
      }, handleAppointment)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      newAppointmentSubscription.unsubscribe();
    };
  }, [patientId]);
  
  useEffect(() => {
    fetchAppointments(selectedDate);
    const deleteAppointmentSubscription = supabase
      .channel('delete-appointment-chanel')
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'appointmentschedule',
      }, handleAppointment)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      deleteAppointmentSubscription.unsubscribe();
    };
  }, [patientId]);

  const handleAppointment = (payload) => {
    clearDisplay();
    fetchAppointments(selectedDate);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.appointmentItem}>
        <Card>
          <Card.Content style={styles.appointmentContent}>
            <Text style={styles.appointmentName}>{item.name}</Text>
            <Text style={styles.appointmentText}>medical Professional Id: {item.medical_professional_id}</Text>
            <Text style={styles.appointmentText}>Time: {item.time}</Text>
            <Text style={styles.appointmentText}>Location: {item.location}</Text>
            <Text style={styles.appointmentText}>Purpose: {item.purpose}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text style={styles.emptyDateText}>No appointments for this date.</Text>
      </View>
    );
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const loadItems = (day) => {
    const selectedDay = day.dateString;
    setSelectedDate(selectedDay);
    clearDisplay();
    fetchAppointments(selectedDay);
  };

  const clearDisplay = () => {
    setItems({});
  };

  const handleAddAppointment = () => {
    navigation.navigate('New Appointment');
  };

  return (
    <View style={styles.container}>
     <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        current={currentDate}
        onDayPress={loadItems}
        selected={selectedDate}
        theme={{
          selectedDayBackgroundColor: '#fb5b5a',
          todayTextColor: '#fb5b5a',
          dotColor: '#fb5b5a',
          selectedDotColor: '#fb5b5a',
          agendaDayTextColor: '#fb5b5a',
          agendaDayNumColor: '#fb5b5a',
        }}
        style={{ borderWidth: 1 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAppointment}>
        <Ionicons name="add-circle" size={48} color="#fb5b5a" />
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleScreen;