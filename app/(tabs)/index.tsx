import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/template';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const FEATURED_CATEGORIES = [
  {
    id: 'career',
    name: 'Career & Skills',
    description: 'Digital skills for remote work',
    icon: 'briefcase' as const,
    color: Colors.career,
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    description: 'Launch your digital products',
    icon: 'rocket' as const,
    color: Colors.entrepreneurship,
  },
  {
    id: 'ai',
    name: 'AI Projects',
    description: 'Leverage AI tools',
    icon: 'hardware-chip' as const,
    color: Colors.ai,
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>{user?.username || user?.email?.split('@')[0] || 'Explorer'}</Text>
          </View>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={32} color={Colors.primary} />
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Learn. Lead. Earn. Empower.</Text>
            <Text style={styles.heroDescription}>
              Transform your life with AI-powered digital skills, mentorship, and entrepreneurship opportunities
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => router.push('/(tabs)/ask-ai')}
          >
            <Text style={styles.heroButtonText}>Start Your Journey</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Featured Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <View style={styles.categoriesGrid}>
            {FEATURED_CATEGORIES.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={styles.categoryCard}
                onPress={() => router.push('/(tabs)/ask-ai')}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Ionicons name={category.icon} size={28} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="chatbubbles" size={24} color={Colors.secondary} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Conversations</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Skills Explored</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="folder" size={24} color={Colors.tertiary} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
          </View>
        </View>

        {/* Mission Statement */}
        <View style={[styles.section, styles.missionCard]}>
          <Text style={styles.missionTitle}>Our Mission</Text>
          <Text style={styles.missionText}>
            Empowering youth and single mothers through AI-powered digital skill training, mentorship, and entrepreneurship opportunities. Enabling you to earn income from home and achieve personal growth.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  username: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  heroContent: {
    marginBottom: Spacing.md,
  },
  heroTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  heroDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  heroButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  categoriesGrid: {
    gap: Spacing.md,
  },
  categoryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryName: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  missionCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  missionTitle: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  missionText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
