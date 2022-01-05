import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#eceff1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
    position: 'absolute',
    margin: 10,
    borderColor: '#bdbdbd',
    borderWidth: 1,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'red',
    padding: 6,
    borderRadius: 20,
    marginRight: 5,
  },
});
