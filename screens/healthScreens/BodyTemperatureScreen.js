import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { bodyTemperatureStyles } from '../../styles/healthStyles/BodyTemperatureStyles';

const BodyTemperatureScreen = ({ navigation }) => {
  const [selectedYear, setSelectedYear] = useState('2022');

  // Dummy body temperature data for demonstration
  const bodyTemperatureData = [
    36.5, 36.7, 36.8, 36.5, 36.6, 36.7, 36.8, 36.9, 36.7, 36.6, 36.5, 36.6
  ];

  const handleGoBack = () => {
    // Handle navigation to previous screen
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <View style={bodyTemperatureStyles.container}>
      <View style={bodyTemperatureStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={bodyTemperatureStyles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={bodyTemperatureStyles.titleContainer}>
        <Text style={bodyTemperatureStyles.title}>Body Temperature History</Text>
      </View>
      <View style={bodyTemperatureStyles.yearSelectorContainer}>
        <TouchableOpacity
          style={[bodyTemperatureStyles.yearSelector, selectedYear === '2021' && bodyTemperatureStyles.selectedYear]}
          onPress={() => handleYearChange('2021')}
        >
          <Text style={[bodyTemperatureStyles.yearText, selectedYear === '2021' && bodyTemperatureStyles.selectedYearText]}>2021</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[bodyTemperatureStyles.yearSelector, selectedYear === '2022' && bodyTemperatureStyles.selectedYear]}
          onPress={() => handleYearChange('2022')}
        >
          <Text style={[bodyTemperatureStyles.yearText, selectedYear === '2022' && bodyTemperatureStyles.selectedYearText]}>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[bodyTemperatureStyles.yearSelector, selectedYear === '2023' && bodyTemperatureStyles.selectedYear]}
          onPress={() => handleYearChange('2023')}
        >
          <Text style={[bodyTemperatureStyles.yearText, selectedYear === '2023' && bodyTemperatureStyles.selectedYearText]}>2023</Text>
        </TouchableOpacity>
      </View>
      <View style={bodyTemperatureStyles.chartContainer}>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                data: bodyTemperatureData,
                strokeWidth: 2,
              },
            ],
          }}
          width={350}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          }}
          bezier
          style={bodyTemperatureStyles.chart}
          fromZero
          yAxisLabel="°C"
        />
      </View>
    </View>
  );
};

export default BodyTemperatureScreen;
