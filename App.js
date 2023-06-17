import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';

import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignupScreen from './screens/authenticationScreens/SignupScreen';
import ForgotScreen from './screens/authenticationScreens/ForgotScreen';
export const UserContext = createContext(); // Create the UserContext

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId, ] = useState(0);
  const [userID, setUserID, ] = useState(0);
  const handleLogin = (patientId,userId) => {
    setIsLoggedIn(true);
    setUserID(userId);
    setPatientId(patientId);
    console.log(patientId);
  };

  const handleLogout = () => {
    console.log("logout");
    setIsLoggedIn(false);
    setUserID(0);
    setPatientId(0);
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
              <Stack.Screen
                name="Information Form"
                options={{
                  headerShown: false,
                  headerBackVisible: false,
                }}
              >
                {(props) => (
                  <InformationFormScreen {...props} onLogin={handleLogin} />
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
