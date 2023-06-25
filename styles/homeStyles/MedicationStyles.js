import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
    color: '#000000',
  },
  backButtonText: {
    fontSize: 24,

  },
  itemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fb5b5a',
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  medicationDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  medicationDetailsCard: {
    backgroundColor: '#fb5b5a',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  medicationDetailsTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  medicationInfoContainer: {
    marginBottom: 20,
  },
  medicationInfoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  medicationInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  medicationDetailsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
});
