import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RTMPPublisher, { RTMPPublisherProps } from '../RTMPPublisher';

const onDisconnectMock = jest.fn();
const onConnectionFailedMock = jest.fn();
const onConnectionStartedMock = jest.fn();
const onConnectionSuccessMock = jest.fn();
const onNewBitrateReceivedMock = jest.fn();
const onStreamStateChangedMock = jest.fn();
const onBluetoothDeviceStatusChangedMock = jest.fn();

const mockProps: RTMPPublisherProps = {
  testID: 'publisher',
  streamName: 'test-stream',
  streamURL: 'rtmp-test-stream',
  onDisconnect: onDisconnectMock,
  onConnectionFailed: onConnectionFailedMock,
  onConnectionStarted: onConnectionStartedMock,
  onConnectionSuccess: onConnectionSuccessMock,
  onNewBitrateReceived: onNewBitrateReceivedMock,
  onStreamStateChanged: onStreamStateChangedMock,
  onBluetoothDeviceStatusChanged: onBluetoothDeviceStatusChangedMock,
};

describe('RTMPPublisher tests', () => {
  let wrapper: ReturnType<typeof render>;

  beforeEach(() => {
    wrapper = render(<RTMPPublisher {...mockProps} />);
  });

  test('should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should trigger onDisconnect', () => {
    const data = 'test-disconnect';
    fireEvent(wrapper.getByTestId('publisher'), 'onDisconnect', {
      nativeEvent: { data },
    });

    expect(onDisconnectMock).toHaveBeenCalledWith(data);
  });

  test('should trigger onConnectionFailed', () => {
    const data = 'test-connection-failed';
    fireEvent(wrapper.getByTestId('publisher'), 'onConnectionFailed', {
      nativeEvent: { data },
    });

    expect(onConnectionFailedMock).toHaveBeenCalledWith(data);
  });

  test('should trigger onConnectionStarted', () => {
    const data = 'test-connection-started';
    fireEvent(wrapper.getByTestId('publisher'), 'onConnectionStarted', {
      nativeEvent: { data },
    });

    expect(onConnectionStartedMock).toHaveBeenCalledWith(data);
  });

  test('should trigger onConnectionSuccess', () => {
    const data = 'test-connection-success';
    fireEvent(wrapper.getByTestId('publisher'), 'onConnectionSuccess', {
      nativeEvent: { data },
    });

    expect(onConnectionSuccessMock).toHaveBeenCalledWith(data);
  });

  test('should trigger onNewBitrateReceived', () => {
    const data = 'test-new-bitrate-received';
    fireEvent(wrapper.getByTestId('publisher'), 'onNewBitrateReceived', {
      nativeEvent: { data },
    });

    expect(onNewBitrateReceivedMock).toHaveBeenCalledWith(data);
  });

  test('should trigger onStreamStateChanged', () => {
    const data = 'test-stream-state-changed';
    fireEvent(wrapper.getByTestId('publisher'), 'onStreamStateChanged', {
      nativeEvent: { data },
    });

    expect(onStreamStateChangedMock).toHaveBeenCalledWith(data);
  });

  test('should trigger onBluetoothDeviceStatusChanged', () => {
    const data = 'test-bluetooth-device-status-changed';
    fireEvent(
      wrapper.getByTestId('publisher'),
      'onBluetoothDeviceStatusChanged',
      { nativeEvent: { data } }
    );

    expect(onBluetoothDeviceStatusChangedMock).toHaveBeenCalledWith(data);
  });
});
