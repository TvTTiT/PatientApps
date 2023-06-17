import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/HomeStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const HomeScreen = ({ navigation }) => {
  const { patientId } = useContext(UserContext);
  const [bloodOxygen, setBloodOxygen] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSensorData();
  }, [patientId,bloodOxygen,bloodPressure,bodyTemperature,heartRate]);

  useEffect(() => {
    const newSensorData = supabase
      .channel('new-sensor-data-chanel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'sensordata',
      }, handleNewData)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      newSensorData.unsubscribe();
    };
  }, [patientId]);

  const fetchSensorData = async () => {
    try {
      const { data, error } = await supabase
        .from('sensordata')
        .select('*')
        .eq('patient_id', patientId)
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        setError(error.message);
      } else {
        if (data.length > 0) {
          const sensorData = data[0];
          setBloodOxygen(sensorData.blood_oxygen);
          setBloodPressure(sensorData.blood_pressure);
          setBodyTemperature(sensorData.body_temperature);
          setHeartRate(sensorData.heart_rate);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewData = (payload) => {
    setBloodOxygen(payload.blood_oxygen);
    setBloodPressure(payload.blood_pressure);
    setBodyTemperature(payload.body_temperature);
    setHeartRate(payload.heart_rate);
  };
  

  const handleHeartRate = () => {
    navigation.navigate('Heart Rate');
  };

  const handleBloodPressure = () => {
    navigation.navigate('Blood Pressure');
  };

  const handleBloodOxygen = () => {
    navigation.navigate('Blood Oxygen');
  };

  const handleBodyTemperature = () => {
    navigation.navigate('Body Temperature');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.dashboardContainer}>
          <TouchableOpacity style={styles.dataBlock} onPress={handleHeartRate}>
            <View
              style={[styles.dataShape, { backgroundColor: '#FF6262' }]}
            >
              <Ionicons name="heart" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>{heartRate}</Text>
              <Text style={styles.dataUnit}>bpm</Text>
            </View>
            <Text style={styles.dataTitle}>Heart Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleBloodPressure}
          >
            <View
              style={[styles.dataShape, { backgroundColor: '#4EC5F1' }]}
            >
              <Ionicons name="pulse" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>{bloodPressure}</Text>
              <Text style={styles.dataUnit}>mmHg</Text>
            </View>
            <Text style={styles.dataTitle}>Blood Pressure</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleBloodOxygen}
          >
            <View
              style={[styles.dataShape, { backgroundColor: '#FFBC42' }]}
            >
              <Ionicons name="ios-pulse" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>{bloodOxygen}%</Text>
              <Text style={styles.dataUnit}>SpO2</Text>
            </View>
            <Text style={styles.dataTitle}>Blood Oxygen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleBodyTemperature}
          >
            <View
              style={[styles.dataShape, { backgroundColor: '#6DD3CE' }]}
            >
              <Ionicons name="thermometer" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>{bodyTemperature}°C</Text>
              <Text style={styles.dataUnit}>°C</Text>
            </View>
            <Text style={styles.dataTitle}>Body Temperature</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
