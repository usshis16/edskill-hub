import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SKILLS = [
  {
    category: 'Digital Marketing',
    icon: 'megaphone' as const,
    color: Colors.career,
    skills: ['Social Media Management', 'Content Marketing', 'Email Marketing', 'SEO Basics'],
  },
  {
    category: 'Design & Creativity',
    icon: 'color-palette' as const,
    color: Colors.entrepreneurship,
    skills: ['Graphic Design', 'Canva Mastery', 'Video Editing', 'Photography'],
  },
  {
    category: 'Content Creation',
    icon: 'create' as const,
    color: Colors.ai,
    skills: ['Copywriting', 'Blogging', 'Content Writing', 'Storytelling'],
  },
  {
    category: 'Technical Skills',
    icon: 'code-slash' as const,
    color: Colors.mentorship,
    skills: ['Basic Coding', 'Website Building', 'Data Entry', 'Spreadsheet Skills'],
  },
  {
    category: 'Business Skills',
    icon: 'briefcase' as const,
    color: Colors.language,
    skills: ['E-commerce Setup', 'Product Listing', 'Customer Service', 'Basic Accounting'],
  },
];

export default function SkillsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Skills</Text>
        <Text style={styles.headerSubtitle}>Explore skills to boost your remote work potential</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Banner */}
        <View style={styles.banner}>
          <Ionicons name="school" size={40} color={Colors.primary} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Start Learning Today</Text>
            <Text style={styles.bannerText}>
              Master in-demand digital skills and unlock opportunities to earn from home
            </Text>
          </View>
        </View>

        {/* Skills Categories */}
        {SKILLS.map((skillCategory, index) => (
          <View key={index} style={styles.skillSection}>
            <View style={styles.skillHeader}>
              <View style={[styles.skillIcon, { backgroundColor: skillCategory.color + '20' }]}>
                <Ionicons name={skillCategory.icon} size={24} color={skillCategory.color} />
              </View>
              <Text style={styles.skillCategory}>{skillCategory.category}</Text>
            </View>

            <View style={styles.skillsList}>
              {skillCategory.skills.map((skill, skillIndex) => (
                <TouchableOpacity key={skillIndex} style={styles.skillItem}>
                  <View style={styles.skillDot} />
                  <Text style={styles.skillName}>{skill}</Text>
                  <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* CTA Section */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Need guidance on which skills to learn?</Text>
          <Text style={styles.ctaText}>
            Our AI advisor can help you create a personalized learning path based on your goals and experience
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Ask AI for Advice</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.text} />
          </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  bannerTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bannerText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  skillSection: {
    marginBottom: Spacing.xl,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  skillIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  skillCategory: {
    ...Typography.h3,
    color: Colors.text,
  },
  skillsList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  skillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
  },
  skillName: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  ctaCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
    marginTop: Spacing.lg,
  },
  ctaTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  ctaText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  ctaButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
});
