import React,  { useEffect ,useContext,useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/GenderStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';

const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState();
  const { userID } = useContext(UserContext);
  const handleChangeGender = () => {
    console.log('Change gender button pressed');
    navigation.navigate('Change Gender');
  };
  useEffect(() => {
    fetchData();
    const updateGenderSubscription = supabase
      .channel('update-gender-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleNewGender)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateGenderSubscription.unsubscribe();
    };
  }, [userID]);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('gender')
        .eq('user_id', userID)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        setGender(data[0].gender);
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  const handleNewGender = () => {
    setGender('');
    fetchData();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.genderContainer}>
        <Text style={styles.genderText}>{gender}</Text>
      </View>
      <TouchableOpacity style={styles.changeGenderButton} onPress={handleChangeGender}>
        <Text style={styles.changeGenderText}>Change Gender</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;
