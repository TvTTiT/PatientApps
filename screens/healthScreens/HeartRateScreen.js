import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { SensorDataStyles } from '../../styles/healthStyles/SensorDataStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const HeartRateScreen = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState('ALL DATA');
  const [heartRateData, setHeartRateData] = useState([]);
  const [originalHeartRateData, setOriginalHeartRateData] = useState([]); 
  const [labels, setLabels] = useState([]);
  const [analysisResult, setAnalysisResult] = useState('');
  const { patientId } = useContext(UserContext);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (time === 'ANALYSIS') {
      Analysis();
    } else if (time === 'ALL DATA') {
      fetchAllData();
    } else if (time === 'COUNT') {
      Count();
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

  const Analysis = () => {
    if (originalHeartRateData.length > 0) { // Use originalHeartRateData for analysis
      const averageHeartRate = calculateAverageHeartRate(originalHeartRateData);
      const maxHeartRate = Math.max(...originalHeartRateData);
      const minHeartRate = Math.min(...originalHeartRateData);

      // Update the chart data to show analysis results
      const analysisData = [averageHeartRate, maxHeartRate, minHeartRate];
      const analysisLabels = ['Average', 'Max', 'Min'];
      setHeartRateData(analysisData);
      setLabels(analysisLabels);
    } else {
      // If no heart rate data available, clear the chart
      setHeartRateData([]);
      setLabels([]);
    }
  };

  const calculateAverageHeartRate = (data) => { // Accept heart rate data as an argument
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  };

  const Count = () => {
    if (originalHeartRateData.length > 0) { // Use originalHeartRateData for count
      const highestData = Math.max(...originalHeartRateData);
      const lowestData = Math.min(...originalHeartRateData);
      const aboveNormalCount = originalHeartRateData.filter((data) => data > 95).length;
      const belowNormalCount = originalHeartRateData.filter((data) => data < 90).length;

      const analysisText = `Highest Data: ${highestData}\nLowest Data: ${lowestData}\nAbove Normal Count: ${aboveNormalCount}\nBelow Normal Count: ${belowNormalCount}`;
      setAnalysisResult(analysisText);
    } else {
      setAnalysisResult('');
    }
  };

  const fetchAllData = async () => {
    try {
      const { data, error } = await supabase
        .from('sensordata')
        .select('heart_rate, timestamp')
        .eq('patient_id', patientId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching sensor data', error);
      } else {
        if (data.length > 0) {
          const sensorData = data.map((item) => item.heart_rate);
          setHeartRateData(sensorData);
          setOriginalHeartRateData(sensorData); // Update originalHeartRateData with all data

          const sensorLabels = data
            .filter((_, index) => index % 6 === 0) // Display timestamps at regular intervals (every 6th timestamp)
            .map((item) => {
              const timestamp = formatTimestamp(item.timestamp);
              return timestamp;
            });
          setLabels(sensorLabels);
        } else {
          setHeartRateData([]);
          setOriginalHeartRateData([]); // Clear originalHeartRateData
          setLabels([]);
        }
      }
    } catch (error) {
      console.error('Error fetching sensor data', error);
    }
  };

  const handleNewData = (payload) => {
    if (selectedTime === 'ANALYSIS') {
      Analysis();
    } else if (selectedTime === 'ALL DATA') {
      fetchAllData();
    } else if (selectedTime === 'COUNT') {
      Count();
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
        <Text style={SensorDataStyles.title}>Heart Rate History</Text>
      </View>
      <View style={SensorDataStyles.timeSelectorContainer}>
      <TouchableOpacity
          style={[SensorDataStyles.timeSelector, selectedTime === 'COUNT' && SensorDataStyles.selectedTime]}
          onPress={() => handleTimeChange('COUNT')}
        >
          <Text style={[SensorDataStyles.timeText, selectedTime === 'COUNT' && SensorDataStyles.selectedTimeText]}>COUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[SensorDataStyles.timeSelector, selectedTime === 'ANALYSIS' && SensorDataStyles.selectedTime]}
          onPress={() => handleTimeChange('ANALYSIS')}
        >
          <Text style={[SensorDataStyles.timeText, selectedTime === 'ANALYSIS' && SensorDataStyles.selectedTimeText]}>
            ANALYSIS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[SensorDataStyles.timeSelector, selectedTime === 'ALL DATA' && SensorDataStyles.selectedTime]}
          onPress={() => handleTimeChange('ALL DATA')}
        >
          <Text style={[SensorDataStyles.timeText, selectedTime === 'ALL DATA' && SensorDataStyles.selectedTimeText]}>
            ALL DATA
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTime === 'COUNT' ? (
        <View style={SensorDataStyles.analysisContainer}>
          {analysisResult ? (
            <Text style={SensorDataStyles.analysisResult}>{analysisResult}</Text>
          ) : (
            <Text>No data available for analysis</Text>
          )}
        </View>
      ) : (
        <View style={SensorDataStyles.chartContainer}>
          {heartRateData.length > 0 ? (
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: heartRateData,
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
              style={[SensorDataStyles.chart, selectedTime === 'ANALYSIS' && SensorDataStyles.hiddenChart]}
              fromZero
              yAxisLabel=""
              xLabelsOffset={-10} // Offset to align x labels properly
            />
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default HeartRateScreen;
