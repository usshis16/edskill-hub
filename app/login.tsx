import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth, useAlert } from '@/template';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const { sendOTP, verifyOTPAndLogin, signInWithPassword, operationLoading } = useAuth();
  const { showAlert } = useAlert();
  const insets = useSafeAreaInsets();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      showAlert('Error', 'Please enter your email');
      return;
    }

    if (!isLogin) {
      if (!password || password.length < 6) {
        showAlert('Error', 'Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        showAlert('Error', 'Passwords do not match');
        return;
      }
    }

    const { error } = await sendOTP(email);
    if (error) {
      showAlert('Error', error);
      return;
    }
    
    setShowOtpInput(true);
    showAlert('Success', 'Verification code sent to your email');
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      showAlert('Error', 'Please enter the verification code');
      return;
    }

    const { error } = await verifyOTPAndLogin(email, otp, { password });
    if (error) {
      showAlert('Error', error);
      return;
    }
  };

  const handlePasswordLogin = async () => {
    if (!email || !password) {
      showAlert('Error', 'Please enter email and password');
      return;
    }

    const { error } = await signInWithPassword(email, password);
    if (error) {
      showAlert('Error', error);
      return;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={48} color={Colors.primary} />
            </View>
            <Text style={styles.title}>EdSkill Hub</Text>
            <Text style={styles.subtitle}>Learn. Lead. Earn. Empower.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!operationLoading}
              />
            </View>

            {!showOtpInput && (
              <>
                <View style={styles.inputGroup}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.inputWithIcon]}
                    placeholder="Password"
                    placeholderTextColor={Colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!operationLoading}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Ionicons 
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                      size={20} 
                      color={Colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </View>

                {!isLogin && (
                  <View style={styles.inputGroup}>
                    <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor={Colors.textMuted}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showPassword}
                      editable={!operationLoading}
                    />
                  </View>
                )}
              </>
            )}

            {showOtpInput && (
              <View style={styles.inputGroup}>
                <Ionicons name="key-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter verification code"
                  placeholderTextColor={Colors.textMuted}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  editable={!operationLoading}
                />
              </View>
            )}

            {/* Action Buttons */}
            {!showOtpInput ? (
              <>
                {isLogin ? (
                  <TouchableOpacity 
                    style={[styles.primaryButton, operationLoading && styles.buttonDisabled]}
                    onPress={handlePasswordLogin}
                    disabled={operationLoading}
                  >
                    <Text style={styles.primaryButtonText}>
                      {operationLoading ? 'Signing In...' : 'Sign In'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={[styles.primaryButton, operationLoading && styles.buttonDisabled]}
                    onPress={handleSendOTP}
                    disabled={operationLoading}
                  >
                    <Text style={styles.primaryButtonText}>
                      {operationLoading ? 'Sending...' : 'Send Verification Code'}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity 
                style={[styles.primaryButton, operationLoading && styles.buttonDisabled]}
                onPress={handleVerifyOTP}
                disabled={operationLoading}
              >
                <Text style={styles.primaryButtonText}>
                  {operationLoading ? 'Verifying...' : 'Verify & Create Account'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Toggle Login/Signup */}
            {!showOtpInput && (
              <TouchableOpacity 
                style={styles.toggleButton}
                onPress={() => setIsLogin(!isLogin)}
                disabled={operationLoading}
              >
                <Text style={styles.toggleButtonText}>
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Back Button */}
            {showOtpInput && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => {
                  setShowOtpInput(false);
                  setOtp('');
                }}
                disabled={operationLoading}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
  inputWithIcon: {
    paddingRight: Spacing.xl,
  },
  eyeIcon: {
    position: 'absolute',
    right: Spacing.md,
    padding: Spacing.xs,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  primaryButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  toggleButtonText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  backButton: {
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButtonText: {
    ...Typography.bodySmall,
    color: Colors.primary,
  },
});
