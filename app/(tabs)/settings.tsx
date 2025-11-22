import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
 const [isAutoSync, setIsAutoSync] = useState(true);
  
  // Notifications 
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  
    const clearAllTodos = useMutation(api.todos.clearAllTodos);
  
  const handleResetApp = async () => {
    Alert.alert(
      "Reset App",
      "⚠️ This will delete ALL your todos permanently. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();
              Alert.alert(
                "App Reset",
                `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
              );
            } catch (error) {
              console.log("Error deleting all todos", error);
              Alert.alert("Error", "Failed to reset app");
            }
          },
        },
      ]
    );
  };


  


  return (
    <LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>
      <SafeAreaView style={settingsStyles.safeArea}>
        {/* HEADER */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingsStyles.iconContainer}>
              <Ionicons name="settings" size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* NOTIFICATIONS & REMINDERS */}
          <View style={settingsStyles.section}>
            <View style={settingsStyles.sectionHeader}>
              <View style={settingsStyles.sectionIconWrapper}>
                <Text style={settingsStyles.sectionEmoji}>🔔</Text>
              </View>
              <Text style={settingsStyles.sectionTitle}>Notifications </Text>
            </View>
            
            <View style={settingsStyles.settingItem}>
              <View style={settingsStyles.settingLeft}>
                <View style={[settingsStyles.settingIconContainer, { backgroundColor: '#3b82f6' }]}>
                  <Ionicons name="notifications" size={20} color="#ffffff" />
                </View>
                <View style={settingsStyles.settingTextContainer}>
                  <Text style={settingsStyles.settingText}>Push Notifications</Text>
                  <Text style={settingsStyles.settingSubtext}>Receive notifications for tasks</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            </View>
            </View>
            
            
          
           

          {/* AUTO-SYNC */}
          <View style={settingsStyles.section}>
            <View style={settingsStyles.sectionHeader}>
              <View style={settingsStyles.sectionIconWrapper}>
                <Text style={settingsStyles.sectionEmoji}>🌙</Text>
              </View>
              <Text style={settingsStyles.sectionTitle}>Theme Mode</Text>
            </View>
            
            <View style={[settingsStyles.settingItem, { borderBottomWidth: 0 }]}>
              <View style={settingsStyles.settingLeft}>
                <View style={[settingsStyles.settingIconContainer, { backgroundColor: isDarkMode ? '#902fc4ff' : '#902fc4ff' }]}>
                  <Ionicons name={"sync"} size={20} color="#ffffff" />
                </View>
                <View style={settingsStyles.settingTextContainer}>
                  <Text style={settingsStyles.settingText}>Auto sync</Text>
                  <Text style={settingsStyles.settingSubtext}>Sync your tasks automatically</Text>
                </View>
              </View>
              <Switch
                 value={isAutoSync}
                  onValueChange={() => setIsAutoSync(!isAutoSync)}
                  thumbColor={"#fff"}
                  trackColor={{ false: colors.border, true: '#902fc4ff' }}
                  ios_backgroundColor={colors.border}
              />
            </View>
          </View>
            
          

          {/* DARK MODE */}
          <View style={settingsStyles.section}>
            <View style={settingsStyles.sectionHeader}>
              <View style={settingsStyles.sectionIconWrapper}>
                <Text style={settingsStyles.sectionEmoji}>🌙</Text>
              </View>
              <Text style={settingsStyles.sectionTitle}>Theme Mode</Text>
            </View>
            
            <View style={[settingsStyles.settingItem, { borderBottomWidth: 0 }]}>
              <View style={settingsStyles.settingLeft}>
                <View style={[settingsStyles.settingIconContainer, { backgroundColor: isDarkMode ? '#f59e0b' : '#f59e0b' }]}>
                  <Ionicons name={isDarkMode ? "moon" : "sunny"} size={20} color="#ffffff" />
                </View>
                <View style={settingsStyles.settingTextContainer}>
                  <Text style={settingsStyles.settingText}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
                  <Text style={settingsStyles.settingSubtext}>Use {isDarkMode ? "dark" : "light"} theme</Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: colors.border, true: isDarkMode ? '#f59e0b' : '#f59e0b' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
         

          {/* DANGER ZONE */}
          <View style={settingsStyles.dangerSection}>
            <View style={settingsStyles.dangerHeader}>
              <View style={settingsStyles.dangerIconWrapper}>
                <Ionicons name="warning" size={24} color={colors.danger} />
              </View>
              <Text style={settingsStyles.dangerTitle}>Danger Zone</Text>
            </View>
            
            <TouchableOpacity 
              style={[settingsStyles.dangerItem, { borderBottomWidth: 0 }]}
              onPress={handleResetApp}
            >
              <View style={settingsStyles.settingLeft}>
                <View style={[settingsStyles.dangerIconContainer, { backgroundColor: colors.danger }]}>
                  <Ionicons name="trash" size={20} color="#ffffff" />
                </View>
                <View style={settingsStyles.settingTextContainer}>
                  <Text style={settingsStyles.dangerText}>Delete All Tasks</Text>
                  <Text style={settingsStyles.dangerSubtext}>Permanently delete all tasks</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.danger} />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>

  
    </LinearGradient>
  );
};

export default SettingsScreen;