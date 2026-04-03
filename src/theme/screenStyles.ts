import { StyleSheet } from 'react-native';

/**
 * Shared styles enforcing Constitution UX rules:
 * - Cairo font family
 * - 18px minimum base size
 * - High contrast
 * - Large touch targets
 */
export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  title: {
    fontFamily: 'Cairo-Bold',
    fontSize: 24,
    color: '#111111',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bodyText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 18,
    color: '#111111',
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 28,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Cairo-Regular',
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
