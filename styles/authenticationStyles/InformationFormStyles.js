import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 50,
    color: 'black',
  },
  patientItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  patientShape: {
    flexDirection: 'row',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '80%',
  },
  patientName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
});

