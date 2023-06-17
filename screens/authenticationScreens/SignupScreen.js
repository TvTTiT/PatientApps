import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/authenticationStyles/SigupStyles';
import { supabase } from '../../lib/supabaseConfig';
import { UserContext } from '../../App';

const SignupScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUserID, userID, setUserEmail, userEmail } = useContext(UserContext);

  useEffect(() => {
    console.log(userID);
  }, [userID, userEmail]);

  const checkEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    } else {
      setUserEmail(email);
      handlePassword();
    }
  };

  const handleNewUser = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error creating new user:', error);
        alert('Error creating new user. Please try again.');
      } else {
        // User creation successful
        setUserID(user.id);
        // Additional logic or redirection can be performed here
        alert('User created successfully!');
      }
    } catch (error) {
      console.error('Error creating new user:', error);
      alert('Error creating new user. Please try again.');
    }
  };

  const handlePassword = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else if (password === '' || confirmPassword === '') {
      alert('Passwords are empty');
    } else {
      handleNewUser();
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User Name..."
          placeholderTextColor="#003f5c"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
      </View>
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.signupBtn} onPress={checkEmail}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.login}>Already have an account? Log in here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
