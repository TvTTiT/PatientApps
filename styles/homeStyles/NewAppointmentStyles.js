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
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    height: 50,
    color: 'black',
    paddingHorizontal: 20,
    textAlign: 'center'
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
    color: 'white',
  },
  backButton: {
    color: '#003f5c',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 16,
  },
  goBackIcon: {
    marginRight: 8,
  },
});
