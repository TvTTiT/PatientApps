import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/ScheduleStyles';

const ScheduleScreen = ({ navigation }) => {
  const items = {
    '2023-05-27': [
      {
        name: 'Appointment 1',
        medical_professional_id: 'Doctor 1',
        time: '10:00 AM',
        location: 'Clinic A',
        purpose: 'Checkup',
      },
      {
        name: 'Appointment 2',
        medical_professional_id: 'Doctor 2',
        time: '02:30 PM',
        location: 'Clinic B',
        purpose: 'Follow-up',
      },
    ],
    '2023-05-28': [
      {
        name: 'Appointment 3',
        medical_professional_id: 'Doctor 3',
        time: '09:00 AM',
        location: 'Clinic C',
        purpose: 'Consultation',
      },
    ],
  };

  const selectedDate = new Date().toISOString().split('T')[0];

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.appointmentItem}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
            <Text>Medical Professional ID: {item.medical_professional_id}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Purpose: {item.purpose}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text>No appointments available</Text>
      </View>
    );
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const loadItems = (day) => {
    // Handle day press
  };

  const handleAddAppointment = () => {
    navigation.navigate('New Appointment');
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={{ [selectedDate]: items[selectedDate] || [] }}
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
