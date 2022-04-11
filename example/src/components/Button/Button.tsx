import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './Button.styles';

type ButtonType = 'default' | 'circle';

export interface ButtonProps {
  title: string;
  type?: ButtonType;
  onPress: () => void;
}

const Button = ({ title, type = 'default', onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles[type].container} onPress={onPress}>
      <Text style={styles[type].title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
