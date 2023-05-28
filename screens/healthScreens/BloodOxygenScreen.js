import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { BloodOxygenStyles, heartRateStyles } from '../../styles/healthStyles/BloodOxygenStyles';

const BloodOxygenScreen = ({navigation}) => {
  const [selectedYear, setSelectedYear] = useState('2022');

  // Dummy bloodOxygenData for demonstration
  const bloodOxygenData = [
    70, 72, 75, 72, 68, 70, 68, 72, 75, 80, 78, 76, 74, 72, 70, 68, 70, 72, 75, 72
  ];

  const handleGoBack = () => {
    // Handle navigation to previous screen
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <View style={BloodOxygenStyles.container}>
       <View style={BloodOxygenStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={BloodOxygenStyles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={BloodOxygenStyles.titleContainer}>
        <Text style={BloodOxygenStyles.title}>Blood Oxygen History</Text>
      </View>
      <View style={BloodOxygenStyles.yearSelectorContainer}>
        <TouchableOpacity
          style={[BloodOxygenStyles.yearSelector, selectedYear === '2021' && BloodOxygenStyles.selectedYear]}
          onPress={() => handleYearChange('2021')}
        >
          <Text style={[BloodOxygenStyles.yearText, selectedYear === '2021' && BloodOxygenStyles.selectedYearText]}>2021</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[BloodOxygenStyles.yearSelector, selectedYear === '2022' && BloodOxygenStyles.selectedYear]}
          onPress={() => handleYearChange('2022')}
        >
          <Text style={[BloodOxygenStyles.yearText, selectedYear === '2022' && BloodOxygenStyles.selectedYearText]}>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[BloodOxygenStyles.yearSelector, selectedYear === '2023' && BloodOxygenStyles.selectedYear]}
          onPress={() => handleYearChange('2023')}
        >
          <Text style={[BloodOxygenStyles.yearText, selectedYear === '2023' && BloodOxygenStyles.selectedYearText]}>2023</Text>
        </TouchableOpacity>
      </View>
      <View style={BloodOxygenStyles.chartContainer}>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                data: bloodOxygenData,
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
          style={BloodOxygenStyles.chart}
          fromZero
          yAxisLabel=""
        />
      </View>
    </View>
  );
};

export default BloodOxygenScreen;
