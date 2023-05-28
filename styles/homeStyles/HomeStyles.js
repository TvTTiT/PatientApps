import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  dashboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dataBlock: {
    width: '48%',
    marginBottom: 16,
  },
  dataShape: {
    backgroundColor: '#fb5b5a', 
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dataUnit: {
    fontSize: 16,
    color: '#ffffff',
  },
  dataTitle: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});
