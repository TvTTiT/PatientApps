import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  patientContainer: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  nurseContainer: {
    justifyContent: 'flex-start',
    marginRight: 'auto',
  },
  messageBubble: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxWidth: '80%',
    marginBottom: 8,
  },
  patientBubble: {
    backgroundColor: '#dddddd',
  },
  nurseBubble: {
    backgroundColor: '#dddddd',
  },
  patientMessageText: {
    color: '#000000',
  },
  nurseMessageText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 20,
    padding: 10,
  },
});
