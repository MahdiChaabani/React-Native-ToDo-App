import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "@/hooks/useTheme";
import { createEmptyStateStyles } from "@/assets/styles/emptyState.styles";

type FilterType = "all" | "active" | "completed";

interface EmptyStateProps {
  filter?: FilterType;
}

const EmptyState = ({ filter = "all" }: EmptyStateProps) => {
  const { colors } = useTheme();
  const styles = createEmptyStateStyles(colors);

  const getEmptyMessage = () => {
    switch (filter) {
      case "active":
        return {
          title: "No active todos!",
          subtitle: "All tasks are completed. Great job! 🎉",
          icon: "checkmark-circle" as const,
        };
      case "completed":
        return {
          title: "No completed todos yet!",
          subtitle: "Start checking off tasks to see them here",
          icon: "time" as const,
          
        };
      default:
        return {
          title: "No todos yet!",
          subtitle: "Add your first todo above to get started",
          icon: "clipboard" as const,
        };
    }
  };

  const { title, subtitle, icon } = getEmptyMessage();

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.gradients.muted} style={styles.iconContainer}>
        <Ionicons name={icon} size={60} color={colors.textMuted} />
      </LinearGradient>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default EmptyState;