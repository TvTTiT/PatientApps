import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/homeStyles/MedicationStyles';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase/supabaseConfig';
import { UserContext } from '../../App';

const MedicationScreen = ({ navigation }) => {
  const { patientId } = useContext(UserContext);
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const fetchMedications = useCallback(async () => {
    try {
      const { data: medications, error } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        console.error('Error fetching medications:', error);
        return;
      }

      setMedications(medications);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  }, [patientId]);

  useEffect(() => {
    const newMedication = supabase
      .channel('new-medication-data-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'medications',
        },
        handleNewMedication
      )
      .subscribe();

    const updateMedication = supabase
      .channel('update-medication-data-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'medications',
        },
        handleUpdateMedication
      )
      .subscribe();

    const deleteMedication = supabase
      .channel('delete-medication-data-channel')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'medications',
        },
        handleDeleteMedication
      )
      .subscribe();

    // Unsubscribe from the channels when the component unmounts
    return () => {
      newMedication.unsubscribe();
      updateMedication.unsubscribe();
      deleteMedication.unsubscribe();
    };
  }, [patientId]);

  const handleNewMedication = (payload) => {
    console.log('New medication:', payload);
    fetchMedications();
  };

  const handleUpdateMedication = (payload) => {
    console.log('Updated medication:', payload);
    fetchMedications();
  };

  const handleDeleteMedication = (payload) => {
    console.log('Deleted medication:', payload);
    fetchMedications();
  };

  useEffect(() => {
    fetchMedications();
    return () => {
      setMedications([]);
    };
  }, [patientId]);

  const handleMedicationClick = (medication) => {
    setSelectedMedication(medication);
  };

  const handleMedicationDetailsBackClick = () => {
    setSelectedMedication(null);
  };

  return (
    <View style={styles.container}>
      {selectedMedication ? (
        <View style={styles.medicationDetailsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleMedicationDetailsBackClick}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.medicationDetailsTitle}>Medication Details</Text>
          <View style={styles.medicationDetailsCard}>
            <View style={styles.medicationInfoContainer}>
              <Text style={styles.medicationInfoLabel}>Medication Name:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.medication_name}</Text>
              <Text style={styles.medicationInfoLabel}>Dosage:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.dosage}</Text>
              <Text style={styles.medicationInfoLabel}>Frequency:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.frequency}</Text>
              <Text style={styles.medicationInfoLabel}>Start Date:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.start_date}</Text>
              <Text style={styles.medicationInfoLabel}>End Date:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.end_date}</Text>
              <Text style={styles.medicationInfoLabel}>Instructions:</Text>
              <Text style={styles.medicationInfoText}>{selectedMedication.instructions}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.itemsContainer}>
          <Text style={styles.title}>Medicines</Text>
          {medications.map((medication) => (
            <TouchableOpacity
              key={medication.medication_id}
              style={styles.itemContainer}
              onPress={() => handleMedicationClick(medication)}
            >
              <Text style={styles.itemText}>{medication.medication_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MedicationScreen;
