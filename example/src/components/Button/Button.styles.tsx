import { StyleSheet } from 'react-native';

export default {
  default: StyleSheet.create({
    container: {
      backgroundColor: '#039be5',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      borderRadius: 5,
    },
    title: {
      color: '#FFFFFF',
    },
  }),

  circle: StyleSheet.create({
    container: {
      backgroundColor: '#039be5',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 50,
      margin: 5,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 20,
    },
  }),
};
