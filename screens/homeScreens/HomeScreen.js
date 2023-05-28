import React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/HomeStyles';

const HomeScreen = ({ navigation }) => {
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
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleHeartRate}
          >
            <View style={[styles.dataShape, { backgroundColor: '#FF6262' }]}>
              <Ionicons name="heart" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>85</Text>
              <Text style={styles.dataUnit}>bpm</Text>
            </View>
            <Text style={styles.dataTitle}>Heart Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleBloodPressure}
          >
            <View style={[styles.dataShape, { backgroundColor: '#4EC5F1' }]}>
              <Ionicons name="pulse" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>120/80</Text>
              <Text style={styles.dataUnit}>mmHg</Text>
            </View>
            <Text style={styles.dataTitle}>Blood Pressure</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleBloodOxygen}
          >
            <View style={[styles.dataShape, { backgroundColor: '#FFBC42' }]}>
              <Ionicons name="ios-pulse" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>98%</Text>
              <Text style={styles.dataUnit}>SpO2</Text>
            </View>
            <Text style={styles.dataTitle}>Blood Oxygen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dataBlock}
            onPress={handleBodyTemperature}
          >
            <View style={[styles.dataShape, { backgroundColor: '#6DD3CE' }]}>
              <Ionicons name="thermometer" size={32} color="#FFFFFF" />
              <Text style={styles.dataValue}>37°C</Text>
              <Text style={styles.dataUnit}>°C</Text>
            </View>
            <Text style={styles.dataTitle}>Body Temperature</Text>
          </TouchableOpacity>
=======
import { View, Text } from 'react-native';
import { styles } from '../../styles/homeStyles/HomeStyles'; 
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Manage your health information with ease</Text>
          </View>
>>>>>>> origin/master
        </View>
      </View>
    </View>
  );
};

<<<<<<< HEAD
=======


>>>>>>> origin/master
export default HomeScreen;
