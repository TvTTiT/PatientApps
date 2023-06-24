import React, { useEffect ,useContext,useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/patientStyles/NameStyles';
import { UserContext } from '../../App';
import {supabase} from '../../supabase/supabaseConfig';
const NameScreen = ({ navigation }) => {
  const { userID } = useContext(UserContext);
  const [fullName, setFullName] = useState('');

  
  useEffect(() => {
    fetchData();
    const updateNameSubscription = supabase
      .channel('update-name-chanel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'patients',
      }, handleNewName)
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      updateNameSubscription.unsubscribe();
    };
  }, [userID]);

  useEffect(() => {
    fetchData();
  }, [userID]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('first_name, last_name')
        .eq('user_id', userID)
        .limit(1);
      if (error) {
        console.error('Error fetching patient data', error);
      } 
      if (data.length > 0) {
        let firstName = data[0].first_name;
        let lastName = data[0].last_name;
        setFullName(firstName+" "+lastName);
      }  
    } catch (error) {
      console.error('Error fetching patient data', error);
    }
  }
  
  const handleNewName = () => {
    setFullName('');
    fetchData();
  };

  
  
  const handleChangeName = () => {
    navigation.navigate('ChangingName')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
          <Ionicons name="arrow-back" size={24} color="#000" style={styles.goBackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{fullName}</Text>
      </View>
      <TouchableOpacity style={styles.changeNameButton} onPress={handleChangeName}>
        <Text style={styles.changeNameText}>Change Name</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;
