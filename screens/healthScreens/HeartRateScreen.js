import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { heartRateStyles } from '../../styles/healthStyles/HeartRateStyles';

const HeartRateScreen = ({navigation}) => {
  const [selectedYear, setSelectedYear] = useState('2022');

  // Dummy heart rate data for demonstration
  const heartRateData = [
    70, 72, 75, 72, 68, 70, 68, 72, 75, 80, 78, 76, 74, 72, 70, 68, 70, 72, 75, 72
  ];

  const handleGoBack = () => {
    // Handle navigation to previous screen
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <View style={heartRateStyles.container}>
       <View style={heartRateStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={heartRateStyles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={heartRateStyles.titleContainer}>
        <Text style={heartRateStyles.title}>Heart Rate History</Text>
      </View>
      <View style={heartRateStyles.yearSelectorContainer}>
        <TouchableOpacity
          style={[heartRateStyles.yearSelector, selectedYear === '2021' && heartRateStyles.selectedYear]}
          onPress={() => handleYearChange('2021')}
        >
          <Text style={[heartRateStyles.yearText, selectedYear === '2021' && heartRateStyles.selectedYearText]}>2021</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[heartRateStyles.yearSelector, selectedYear === '2022' && heartRateStyles.selectedYear]}
          onPress={() => handleYearChange('2022')}
        >
          <Text style={[heartRateStyles.yearText, selectedYear === '2022' && heartRateStyles.selectedYearText]}>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[heartRateStyles.yearSelector, selectedYear === '2023' && heartRateStyles.selectedYear]}
          onPress={() => handleYearChange('2023')}
        >
          <Text style={[heartRateStyles.yearText, selectedYear === '2023' && heartRateStyles.selectedYearText]}>2023</Text>
        </TouchableOpacity>
      </View>
      <View style={heartRateStyles.chartContainer}>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
          style={heartRateStyles.chart}
          fromZero
          yAxisLabel=""
        />
      </View>
    </View>
  );
};

export default HeartRateScreen;
