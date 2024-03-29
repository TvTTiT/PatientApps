import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/SettingStyles';
import { supabase } from '../../supabase/supabaseConfig';
const SettingScreen = ({ navigation, onLogout }) => {

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        console.error('Error logging out:', error.message);
        return;
      }
      
      console.log('Logged out successfully');
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handlePersonalDetails = () => {
    console.log('Personal Details button pressed');
    navigation.navigate('PersonalDetails');
  };

  const handlePasswordAndSecurity = () => {
    console.log('Personal Details button pressed');
    navigation.navigate('PasswordAndSecurity');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={handlePersonalDetails}>
          <Ionicons name="person" size={24} color="#fb5b5a" />
          <Text style={styles.tabButtonText}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handlePasswordAndSecurity}>
          <Ionicons name="lock-closed" size={24} color="#fb5b5a" />
          <Text style={styles.tabButtonText}>Password and Security</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
