import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    minHeight: 20, // Updated style
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  placeholderText: {
    color: '#aaa',
  },
  saveButton: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
