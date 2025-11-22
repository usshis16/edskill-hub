// EdSkill Hub Design System - Dark Theme with Vibrant Accents

export const Colors = {
  // Background
  background: '#0f0f1e',
  surface: '#1a1a2e',
  surfaceVariant: '#16213e',
  
  // Primary/Accent
  primary: '#ff6b35',
  primaryLight: '#ff8c5f',
  primaryDark: '#e65a2e',
  
  // Secondary
  secondary: '#4ecdc4',
  tertiary: '#95e1d3',
  
  // Text
  text: '#ffffff',
  textSecondary: '#b4b4c5',
  textMuted: '#6e6e7e',
  
  // Status
  success: '#4ecdc4',
  warning: '#f38181',
  error: '#ff6b6b',
  info: '#aa96da',
  
  // UI Elements
  border: '#2d2d44',
  divider: '#25253d',
  overlay: 'rgba(0, 0, 0, 0.7)',
  
  // Category Colors
  career: '#ff6b35',
  entrepreneurship: '#4ecdc4',
  ai: '#95e1d3',
  mentorship: '#f38181',
  language: '#aa96da',
  custom: '#fcbad3',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
