import '@testing-library/react-native/extend-expect';

// Mock I18nManager
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.I18nManager.isRTL = true;
  RN.I18nManager.forceRTL = jest.fn();
  return RN;
});
