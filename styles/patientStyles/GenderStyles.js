import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  genderContainer: {
    backgroundColor: '#fb5b5a',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    alignSelf: 'stretch',
  },
  genderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  changeGenderButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
  },
  changeGenderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  goBackIcon: {
    marginBottom: 16,
  },
});
