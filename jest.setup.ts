import '@testing-library/react-native/extend-expect';

// Mock I18nManager
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    I18nManager: {
      ...RN.I18nManager,
      isRTL: true,
      forceRTL: jest.fn(),
    },
  };
});
