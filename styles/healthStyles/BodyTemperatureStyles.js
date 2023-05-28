import { StyleSheet } from 'react-native';

export const bodyTemperatureStyles = StyleSheet.create({
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
  yearSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  yearSelector: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#EEEEEE',
  },
  yearText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedYear: {
    backgroundColor: '#FF6262',
  },
  selectedYearText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    alignItems: 'flex-start',
    marginLeft: -20,
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
});
