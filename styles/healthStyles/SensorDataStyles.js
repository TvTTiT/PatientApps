import { StyleSheet } from 'react-native';

export const SensorDataStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  timeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timeSelector: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#EEEEEE',
  },
  timeText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedTime: {
    backgroundColor: '#FF6262',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: -30, 
  },
  chart: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  goBackIcon: {
    marginBottom: 16,
    marginLeft: 10,
  },
  analysisContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  analysisText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
});
