import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  input: {
    textAlign: 'center',
    borderColor: '#97e1f7',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ebf9ff',
    borderRadius: 50,
    shadowColor: '#97e1f7',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    marginBottom: '5px',
    padding: '12px',
    fontSize: 20,
  },
});

export default styles;