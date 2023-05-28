import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { bloodPressureStyles } from '../../styles/healthStyles/BloodPressureStyles';

const BloodPressureScreen = ({navigation}) => {
  const [selectedYear, setSelectedYear] = useState('2022');

  // Dummy blood pressure data for demonstration
  const systolicData = [120, 130, 125, 135, 128, 132, 130, 140, 138, 130, 128, 125];
  const diastolicData = [80, 85, 78, 90, 85, 88, 86, 88, 90, 84, 82, 80];

  const handleGoBack = () => {
    // Handle navigation to previous screen
    navigation.navigate('Home');
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <View style={bloodPressureStyles.container}>
      <View style={bloodPressureStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={bloodPressureStyles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={bloodPressureStyles.titleContainer}>
        <Text style={bloodPressureStyles.title}>Blood Pressure History</Text>
      </View>
      <View style={bloodPressureStyles.yearSelectorContainer}>
        <TouchableOpacity
          style={[bloodPressureStyles.yearSelector, selectedYear === '2021' && bloodPressureStyles.selectedYear]}
          onPress={() => handleYearChange('2021')}
        >
          <Text style={[bloodPressureStyles.yearText, selectedYear === '2021' && bloodPressureStyles.selectedYearText]}>2021</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[bloodPressureStyles.yearSelector, selectedYear === '2022' && bloodPressureStyles.selectedYear]}
          onPress={() => handleYearChange('2022')}
        >
          <Text style={[bloodPressureStyles.yearText, selectedYear === '2022' && bloodPressureStyles.selectedYearText]}>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[bloodPressureStyles.yearSelector, selectedYear === '2023' && bloodPressureStyles.selectedYear]}
          onPress={() => handleYearChange('2023')}
        >
          <Text style={[bloodPressureStyles.yearText, selectedYear === '2023' && bloodPressureStyles.selectedYearText]}>2023</Text>
        </TouchableOpacity>
      </View>
      <View style={bloodPressureStyles.chartContainer}>
        <BarChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                data: systolicData,
                color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: diastolicData,
                color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
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
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={bloodPressureStyles.chart}
          fromZero
          yAxisLabel=""
        />
      </View>
    </View>
  );
};

export default BloodPressureScreen;
