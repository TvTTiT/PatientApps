import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 18,
    color: '#000',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  icon: {
    marginLeft: 8,
  },
  emergencyContainer: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyIcon: {
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
