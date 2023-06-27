import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';

import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignupScreen from './screens/authenticationScreens/SignupScreen';
import ForgotScreen from './screens/authenticationScreens/ForgotScreen';
import InformationFormScreen from './screens/authenticationScreens/InformationFormScreen';
import PatientMedicalProfessionalScreen from './screens/authenticationScreens/PatientMedicalProfessionalScreen';
export const UserContext = createContext(); // Create the UserContext

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId, ] = useState(0);
  const [userID, setUserID, ] = useState(0);
  const [userPassword, setUserPassword, ] = useState('');
  const [userEmail, setUserEmail, ] = useState('');
  
  const handleLogin = (patientId,userId,password) => {
    setIsLoggedIn(true);
    setUserID(userId);
    setPatientId(patientId);
    setUserPassword(password);
  };

  const handleLogout = () => {
    console.log("logout");
    setIsLoggedIn(false);
    setUserID(0);
    setPatientId(0);
    setUserPassword('');
    setUserEmail('');
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
    value={{
      userID,
      setUserID,
      patientId, 
      setPatientId,
      setUserPassword,
      userPassword,
      userEmail,
      setUserEmail,
    }}
  >
      <NavigationContainer>
        <Stack.Navigator>
          {/* Check if the user is logged in */}
          {!isLoggedIn ? (
            // If not logged in, show authentication screens
            <>
              <Stack.Screen name="Login Screen">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="Signup Screen" component={SignupScreen} />
              <Stack.Screen name="Forgot Screen" component={ForgotScreen} />
              <Stack.Screen name="Information Form" component={InformationFormScreen} />
              <Stack.Screen
                name="Medical Professional"
                options={{
                  headerShown: false,
                  headerBackVisible: false,
                }}
              >
                {(props) => (
                  <PatientMedicalProfessionalScreen {...props} onLogin={handleLogin} />
                )}
              </Stack.Screen>
            </>
          ) : (
            // If logged in, show the home screen
            <>
              <Stack.Screen
                name="Home Screen"
                options={{ headerShown: false }} // Hide the header on the home screen
              >
                {/* Pass the logout handler to the TabNavigator */}
                {(props) => <TabNavigator {...props} onLogout={handleLogout} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
