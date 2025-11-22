import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createSettingsStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 20,
      paddingBottom: 16,
    },
    
    // Profile Section
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    avatarText: {
      fontSize: 24,
      fontWeight: "800",
      color: "#ffffff",
      letterSpacing: -0.5,
    },
    profileInfo: {
      flex: 1,
      marginLeft: 16,
    },
    profileName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: -0.5,
    },
    profileEmail: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textMuted,
      marginTop: 2,
    },
    editButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + "15",
      justifyContent: "center",
      alignItems: "center",
    },
    
    scrollView: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 20,
      gap: 16,
      paddingBottom: 120,
    },
    
    // Regular Section
    section: {
      borderRadius: 20,
      padding: 0,
      backgroundColor: colors.card,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border + "30",
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.backgrounds.input + "40",
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "20",
    },
    sectionIconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    sectionEmoji: {
      fontSize: 20,
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: -0.3,
      color: colors.text,
    },
    
    // Danger Section
    dangerSection: {
      borderRadius: 20,
      padding: 0,
      backgroundColor: colors.danger + "08",
      overflow: "hidden",
      borderWidth: 1.5,
      borderColor: colors.danger + "40",
    },
    dangerHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.danger + "10",
      borderBottomWidth: 1,
      borderBottomColor: colors.danger + "20",
    },
    dangerIconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.danger + "15",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    dangerTitle: {
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: -0.3,
      color: colors.danger,
    },
    
    // Settings Item
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "20",
    },
    dangerItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.danger + "20",
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    settingIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    dangerIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 3,
    },
    settingSubtext: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.textMuted,
      lineHeight: 18,
    },
    dangerText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.danger,
      marginBottom: 3,
    },
    dangerSubtext: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.danger + "cc",
      lineHeight: 18,
    },
    
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingBottom: 40,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "40",
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: -0.5,
    },
    modalBody: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    inputLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.textMuted,
      marginBottom: 8,
      marginTop: 16,
      letterSpacing: 1,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      letterSpacing: -1,
      color: colors.text,
    },
    input: {
      backgroundColor: colors.backgrounds.input,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 18,
      paddingVertical: 16,
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    modalFooter: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 24,
      paddingTop: 28,
    },
    modalButton: {
      flex: 1,
      borderRadius: 16,
      overflow: "hidden",
    },
    cancelButton: {
      backgroundColor: colors.border,
      paddingVertical: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    saveButton: {
      paddingVertical: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff",
    },
    
    // Reminder Options
    reminderOptions: {
      flexDirection: "row",
      gap: 10,
      marginTop: 8,
    },
    reminderOption: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 8,
      borderRadius: 12,
      backgroundColor: colors.backgrounds.input,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: "center",
    },
    reminderOptionActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    reminderOptionText: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.text,
    },
    reminderOptionTextActive: {
      color: "#ffffff",
    },
  });

  return styles;
};