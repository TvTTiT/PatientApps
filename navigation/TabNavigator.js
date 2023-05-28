import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//home screens
import HomeScreen from '../screens/homeScreens/HomeScreen';
import SettingScreen from '../screens/homeScreens/SettingsScreen';
import PersonalScreen from '../screens/homeScreens/PersonalScreen';
import PasswordAndSecurityScreen from '../screens/homeScreens/PasswordAndSecurityScreen';
import ScheduleScreen from '../screens/homeScreens/ScheduleScreen';
import NotificationsScreen from '../screens/homeScreens/Notifications';
import NewAppointmentScreen from '../screens/homeScreens/NewAppointmentScreen';
//patient screens
import NameScreen from '../screens/patientScreens/NameScreen';
import EmailScreen from '../screens/patientScreens/EmailScreen';
import DateScreen from '../screens/patientScreens/DateScreen';
import GenderScreen from '../screens/patientScreens/GenderScreen';
import ContactScreen from '../screens/patientScreens/ContactScreen';
import AddressScreen from '../screens/patientScreens/AddressScreen';
import EmergencyContact from '../screens/patientScreens/EmergencyContactScreen';
// changing data screens 
import ChangePasswordScreen from '../screens/changingDataScreen/ChangePasswordScreen';
import ChangeNameScreen from '../screens/changingDataScreen/ChangeNameScreen';
import ChangeEmailScreen from '../screens/changingDataScreen/ChangeEmailScreen';
import ChangeDateOfBirthScreen from '../screens/changingDataScreen/ChangeDateOfBirthScreen';
import ChangeGenderScreen from '../screens/changingDataScreen/ChangeGenderScreen';
import ChangeContactScreen from '../screens/changingDataScreen/ChangeContactScreen';
import ChangeAddressScreen from '../screens/changingDataScreen/ChangeAddressScreen';
import ChangeEmergencyContactScreen from '../screens/changingDataScreen/ChangeEmergencyContactScreen';
// health data
import HeartRateScreen from '../screens/healthScreens/HeartRateScreen';
import BloodPressureScreen from '../screens/healthScreens/BloodPressureScreen';
import BloodOxygenScreen from '../screens/healthScreens/BloodOxygenScreen';
import BodyTemperatureScreen from '../screens/healthScreens/BodyTemperatureScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Set the tab bar icon based on the route name
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Appointments') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Set the active and inactive tab bar colors
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Define each screen with its respective component */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={ScheduleScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings">
        {(props) => <SettingScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
      
      {/* Hide the following screens from the tab bar */}
       <Tab.Screen
        name="PersonalDetails"
        component={PersonalScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PasswordAndSecurity"
        component={PasswordAndSecurityScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChangingPassword"
        component={ChangePasswordScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChangingName"
        component={ChangeNameScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChangingEmail"
        component={ChangeEmailScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
        <Tab.Screen
        name="New Appointment"
        component={NewAppointmentScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="UserName"
        component={NameScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Email"
        component={EmailScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DOB"
        component={DateScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Change DOB"
        component={ChangeDateOfBirthScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Gender"
        component={GenderScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Change Gender"
        component={ChangeGenderScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Change Contact"
        component={ChangeContactScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Address"
        component={AddressScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Change Address"
        component={ChangeAddressScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Emergency Contact"
        component={EmergencyContact}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Change Emergency Contact"
        component={ChangeEmergencyContactScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Heart Rate"
        component={HeartRateScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Blood Pressure"
        component={BloodPressureScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Blood Oxygen"
        component={BloodOxygenScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="Body Temperature"
        component={BodyTemperatureScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
