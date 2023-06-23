import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { styles } from '../../styles/authenticationStyles/LoginStyles';
import { supabase } from '../../supabase/supabaseConfig';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchRole = async (id) => {
    try {
      const {  data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id',id)
        .limit(1);

      if (error) {
        console.log(error);
        alert('An error occurred while fetching patient data. Please try again.');
      return;
      }

      if (data && data.length > 0) {
        // login
        onLogin(data[0].patient_id,id,password);
      }else{
        alert('Invalid account');
      }
    } catch (error) {
      alert('Invalid account');
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
  
      const { user, error } = response.data;
  
      if (error) {
        console.log(error);
        if (error.message === 'Invalid login credentials') {
          alert('Invalid email or password. Please try again.');
        } else {
          alert('An error occurred during login. Please try again.');
        }
        return;
      }
  
      if (user) {
        // User logged in successfully
        fetchRole(user.id);
      }else{
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during login. Please try again.');
      console.error(error);
    }
  };


  const handleCreateAccount = () => {
    // Handle creating a new account here
    navigation.navigate('Signup Screen');
  };

  const handleForgotPassword = () => {
    // Handle resetting the password here
    navigation.navigate('Forgot Screen');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RoboMedic Solutions</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createBtn} onPress={handleCreateAccount}>
        <Text style={styles.createText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
