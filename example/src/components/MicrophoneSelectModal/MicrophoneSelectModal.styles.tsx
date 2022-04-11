import { StyleSheet } from 'react-native';

const baseStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inner_container: {
    backgroundColor: 'white',
    padding: 10,
  },
  footer_container: {
    margin: 10,
  },
});

const itemStyles = {
  not_selected: StyleSheet.create({
    item_container: {
      padding: 5,
    },
    item_title: {},
    ...baseStyle,
  }),
  selected: StyleSheet.create({
    item_container: {
      padding: 5,
      backgroundColor: '#eceff1',
    },
    item_title: {
      fontWeight: 'bold',
    },
    ...baseStyle,
  }),
};

export default baseStyle;
export { itemStyles };
