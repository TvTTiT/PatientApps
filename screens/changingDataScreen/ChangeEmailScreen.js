import React, { useState,useContext,useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/changingDataStyles/ChangeEmailStyles'; 
import { Ionicons } from '@expo/vector-icons';
import {supabase} from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const ChangeEmailScreen = ({navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userID,userPassword } = useContext(UserContext);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);

  const confirm = () => {
    if(confirmPassword !== userPassword){
      alert("Incorrect Password");
    }else{
      updateUserEmail();
    }
  }

  useEffect(() => {
    const updateUserListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED') {
        setIsEmailUpdated(true);
      }
    });
    
    return () => {
      updateUserListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isEmailUpdated) {
      updatePatientEmail();
    }
  }, [isEmailUpdated,userID]);

  const updatePatientEmail = async () => {
    try {
      const { error } = await supabase
        .from('patients')
        .update({ email })
        .eq('user_id', userID);

      if (error) {
        console.error('Error updating medical email:', error);
        return;
      }
      alert('User email updated successfully');
      changeMind();
      
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const updateUserEmail = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });
  
      if (error) {
        if (error.message === 'A user with this email address has already been registered') {
          alert('A user with this email address has already been registered');
        } else if (error.message === 'Unable to validate email address: invalid format') {
          alert('Invalid email address format');
        } else {
          alert('Error updating user email');
        }
        return;
      }
  
      alert('Please confirm your email');
      setIsEmailUpdated(true);
    } catch (error) {
      console.error('Error updating user email:', error);
    }
  };
  

  const changeMind = () => {
    navigation.navigate('Email');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMind()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Changing Email</Text>
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
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.signupBtn} onPress={confirm}>
        <Text style={styles.signupText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeMind}>
        <Text style={styles.back}>Changing your mind? click here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ChangeEmailScreen;
