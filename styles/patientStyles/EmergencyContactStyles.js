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
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  goBackIcon: {
    marginRight: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fb5b5a',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    alignSelf: 'stretch',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
  },
  changeButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  changeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  emergencyContainer: {
    backgroundColor: '#fb5b5a',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    alignSelf: 'stretch',
  },
});