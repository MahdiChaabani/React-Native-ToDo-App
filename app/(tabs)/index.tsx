
import useTheme from "@/hooks/usseTheme";
import { StyleSheet,TouchableOpacity, Text, View } from "react-native";

export default function Index() {
  const {toggleDarkMode} = useTheme();
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Home Screen TODO app.</Text>
      <Text>Hello, world!</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
       <Text>Toggle the mode</Text>
        
      </TouchableOpacity>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  content: {
    fontSize: 22,
  },
});