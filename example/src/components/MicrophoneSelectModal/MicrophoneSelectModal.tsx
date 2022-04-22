import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native';
import { AudioInputType } from 'react-native-rtmp-publisher';
import Button from '../Button';

import styles, { itemStyles } from './MicrophoneSelectModal.styles';

export interface ButtonProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (a: AudioInputType) => void;
}

const initialMicrophoneValues = [
  {
    key: AudioInputType.SPEAKER,
    title: 'Speaker',
  },
  {
    key: AudioInputType.BLUETOOTH_HEADSET,
    title: 'Bluetooth Headset',
  },
  {
    key: AudioInputType.WIRED_HEADSET,
    title: 'Wired Headset',
  },
];

const MicrophoneSelectModal = ({ visible, onSelect, onClose }: ButtonProps) => {
  const [selectedMicrophoneKey, setSelectedMicrophoneKey] =
    useState<AudioInputType>();

  const handleSelect = (value: AudioInputType) => {
    onSelect(value);

    setSelectedMicrophoneKey(value);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.inner_container}>
          {initialMicrophoneValues.map((value) => {
            if (
              Platform.OS === 'android' &&
              value.key === AudioInputType.WIRED_HEADSET
            ) {
              return;
            }

            const status =
              selectedMicrophoneKey === value.key ? 'selected' : 'not_selected';

            return (
              <TouchableOpacity
                key={value.key}
                style={itemStyles[status].item_container}
                onPress={() => handleSelect(value.key)}
              >
                <Text style={itemStyles[status].item_title}>{value.title}</Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.footer_container}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MicrophoneSelectModal;
