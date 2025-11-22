import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProjectsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Projects</Text>
        <Text style={styles.headerSubtitle}>Track your entrepreneurial journey</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="folder-open-outline" size={80} color={Colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No Projects Yet</Text>
          <Text style={styles.emptyText}>
            Start documenting your digital products, business ideas, and entrepreneurial projects here
          </Text>

          {/* Quick Start Ideas */}
          <View style={styles.ideasSection}>
            <Text style={styles.ideasTitle}>Project Ideas to Get Started:</Text>
            
            <View style={styles.ideaCard}>
              <Ionicons name="storefront" size={24} color={Colors.entrepreneurship} />
              <View style={styles.ideaContent}>
                <Text style={styles.ideaName}>Online Store Setup</Text>
                <Text style={styles.ideaDescription}>Launch your e-commerce platform</Text>
              </View>
            </View>

            <View style={styles.ideaCard}>
              <Ionicons name="brush" size={24} color={Colors.ai} />
              <View style={styles.ideaContent}>
                <Text style={styles.ideaName}>Digital Product Design</Text>
                <Text style={styles.ideaDescription}>Create templates, graphics, or content</Text>
              </View>
            </View>

            <View style={styles.ideaCard}>
              <Ionicons name="megaphone" size={24} color={Colors.career} />
              <View style={styles.ideaContent}>
                <Text style={styles.ideaName}>Social Media Business</Text>
                <Text style={styles.ideaDescription}>Offer content creation or management</Text>
              </View>
            </View>

            <View style={styles.ideaCard}>
              <Ionicons name="school" size={24} color={Colors.mentorship} />
              <View style={styles.ideaContent}>
                <Text style={styles.ideaName}>Online Tutoring</Text>
                <Text style={styles.ideaDescription}>Share your knowledge and skills</Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity style={styles.ctaButton}>
            <Ionicons name="add-circle" size={24} color={Colors.text} />
            <Text style={styles.ctaButtonText}>Create Your First Project</Text>
          </TouchableOpacity>

          {/* Help Section */}
          <View style={styles.helpCard}>
            <Ionicons name="help-circle" size={32} color={Colors.info} />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Need help choosing a project?</Text>
              <Text style={styles.helpText}>
                Ask our AI advisor for personalized guidance on which entrepreneurial path suits you best
              </Text>
            </View>
          </View>
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
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  emptyIconContainer: {
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: Spacing.xl,
  },
  ideasSection: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  ideasTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  ideaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ideaContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  ideaName: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  ideaDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    width: '100%',
    marginBottom: Spacing.xl,
  },
  ctaButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
  helpCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    width: '100%',
  },
  helpContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  helpTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  helpText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
