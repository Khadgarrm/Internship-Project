import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginTop: 8,
    marginBottom: 12,
    borderColor: '#d8bfd8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
  },
  textContainer: {
    display: 'flex',
    padding: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  description: {
    marginBottom: 5,
    marginTop: 5,
    fontStyle: 'italic',
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statusContainer: {
    display: 'flex',
    padding: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusText: {
    fontSize: 20,
    marginRight: 5,
  },
});
