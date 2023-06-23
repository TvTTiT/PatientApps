import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import {SensorDataStyles} from '../../styles/healthStyles/SensorDataStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const BloodPressureScreen = ({navigation}) => {
  const [selectedTime, setSelectedTime] = useState('ALL DATA');
  const [hearRateData, setHeartRateData] = useState([]);
  const [labels, setLabels] = useState([]);

  const { patientId } = useContext(UserContext);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (time === '24H') {
      fetchLast24HoursData();
    } else if (time === 'ALL DATA') {
      fetchAllData();
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [patientId]);

  useEffect(() => {
    const newSensorData = supabase
      .channel('new-sensor-data-channel')
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

  const fetchLast24HoursData = async () => {
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
      const fromDate = twentyFourHoursAgo.toISOString();

      const { data, error } = await supabase
        .from('sensordata')
        .select('heart_rate , timestamp')
        .eq('patient_id', patientId)
        .gte('timestamp', fromDate)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching sensor data', error);
      } else {
        if (data.length > 0) {
          const sensorData = data.map((item) => item.heart_rate );
          setHeartRateData(sensorData);

          const sensorLabels = data
            .filter((_, index) => index % 6 === 0) // Display timestamps at regular intervals (every 6th timestamp)
            .map((item) => {
              const timestamp = formatTimestamp(item.timestamp);
              return timestamp;
            });
          setLabels(sensorLabels);
        } else {
          setHeartRateData([]);
          setLabels([]);
        }
      }
    } catch (error) {
      console.error('Error fetching sensor data', error);
    }
  };

  const fetchAllData = async () => {
    try {
      const { data, error } = await supabase
        .from('sensordata')
        .select('heart_rate , timestamp')
        .eq('patient_id', patientId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching sensor data', error);
      } else {
        if (data.length > 0) {
          const sensorData = data.map((item) => item.heart_rate );
          setHeartRateData(sensorData);

          const sensorLabels = data
            .filter((_, index) => index % 6 === 0) // Display timestamps at regular intervals (every 6th timestamp)
            .map((item) => {
              const timestamp = formatTimestamp(item.timestamp);
              return timestamp;
            });
          setLabels(sensorLabels);
        } else {
          setHeartRateData([]);
          setLabels([]);
        }
      }
    } catch (error) {
      console.error('Error fetching sensor data', error);
    }
  };

  const handleNewData = (payload) => {
    if (selectedTime === '24H') {
      fetchLast24HoursData();
    } else if (selectedTime === 'ALL DATA') {
      fetchAllData();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return `${hours}h`;
  };

  return (
    <View style={SensorDataStyles.container}>
      <View style={SensorDataStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={SensorDataStyles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={SensorDataStyles.titleContainer}>
        <Text style={SensorDataStyles.title}>Blood Oxygen History</Text>
      </View>
      <View style={SensorDataStyles.timeSelectorContainer}>
        <TouchableOpacity
          style={[SensorDataStyles.timeSelector, selectedTime === '24H' && SensorDataStyles.selectedTime]}
          onPress={() => handleTimeChange('24H')}
        >
          <Text style={[SensorDataStyles.timeText, selectedTime === '24H' && SensorDataStyles.selectedTimeText]}>Newest Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[SensorDataStyles.timeSelector, selectedTime === 'ALL DATA' && SensorDataStyles.selectedTime]}
          onPress={() => handleTimeChange('ALL DATA')}
        >
          <Text style={[SensorDataStyles.timeText, selectedTime === 'ALL DATA' && SensorDataStyles.selectedTimeText]}>ALL DATA</Text>
        </TouchableOpacity>
      </View>
      <View style={SensorDataStyles.chartContainer}>
        {hearRateData.length > 0 ? (
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: hearRateData,
                  strokeWidth: 2,
                },
              ],
            }}
            width={350}
            height={250}
            chartConfig={{
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
            }}
            bezier
            style={SensorDataStyles.chart}
            fromZero
            yAxisLabel=""
            xLabelsOffset={-10} // Offset to align x labels properly
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </View>
  );
};

export default BloodPressureScreen;
