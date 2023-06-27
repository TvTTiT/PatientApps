import React, { useState, useEffect, useCallback,useContext } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles/PatientMedicalProfessionalStyles';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const PatientMedicalProfessionalScreen = ({ onLogin }) => {
  const { userID,patientId,password } = useContext(UserContext);
  const [searchText, setSearchText] = useState('');
  const [medicalProfessional, setMedicalProfessional] = useState([]);

  const fetchMedicalprofessionals = useCallback(async () => {
    try {
      const { data: medicalProfessional, error } = await supabase
        .from('medicalprofessionals')
        .select('medical_professional_id, first_name, last_name');

      if (error) {
        console.error('Error fetching medicalprofessionals:', error);
        return;
      }
      setMedicalProfessional(medicalProfessional);
    } catch (error) {
      console.error('Error fetching medicalprofessionals:', error);
    }
  }, []);

  useEffect(() => {
    fetchMedicalprofessionals();
  }, [userID,patientId,password]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  
  const assignMedicalProfessional = async (medicalProfessionalId) => {

    try {
      const { data: patient_medical_professional, error } = await supabase
        .from('patient_medical_professional')
        .select('patient_medical_professional_id')
        .order('patient_medical_professional_id', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching patient_medical_professional:', error);
        return;
      }
     
      const maxId = patient_medical_professional[0]?.patient_medical_professional_id || 0;
      const newId = maxId + 1;
      const { error: createPatientMedicalProfessionalError } = await supabase
      .from('patient_medical_professional')
      .insert([
        {
            patient_medical_professional_id: newId,
            patient_id: patientId,
            medical_professional_id: medicalProfessionalId,
        },
      ]);

    if (createPatientMedicalProfessionalError) {
      console.error('Error creating new patient medical Professional:', createPatientMedicalProfessionalError);
      return;
    }

    console.log('New user successfully');

    onLogin(patientId, userID,password);

    } catch (error) {
      console.error('Error fetching patient_medical_professional:', error);
    }
  };

  const renderMedicalProfessional = ({ item }) => {
    const fullName = `${item.first_name} ${item.last_name}`;

    if (
      searchText &&
      fullName.toLowerCase().indexOf(searchText.toLowerCase()) === -1
    ) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.patientItem}
        onPress={() => assignMedicalProfessional(item.medical_professional_id)}
      >
        <View style={styles.patientShape}>
          <Text style={styles.patientName}>{fullName}</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchText}
          placeholder="personal medical professional"
          placeholderTextColor="#aaa"
        />
      </View>
      <FlatList
        data={medicalProfessional}
        renderItem={renderMedicalProfessional}
        keyExtractor={(item) => item.medical_professional_id.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default PatientMedicalProfessionalScreen;
