import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useMemo } from "react";
import { 
  Alert, 
  FlatList, 
  StatusBar, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  RefreshControl,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;
type FilterType = "all" | "active" | "completed";

export default function Index() {
  const { colors } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  // Filter todos based on selected filter
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    
    switch (filter) {
      case "active":
        return todos.filter(todo => !todo.isCompleted);
      case "completed":
        return todos.filter(todo => todo.isCompleted);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!todos) return { total: 0, completed: 0, active: 0 };
    
    return {
      total: todos.length,
      completed: todos.filter(t => t.isCompleted).length,
      active: todos.filter(t => !t.isCompleted).length
    };
  }, [todos]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: async () => {
          try {
            await deleteTodo({ id });
          } catch (error) {
            console.log("Error deleting todo", error);
            Alert.alert("Error", "Failed to delete todo");
          }
        }
      },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  };

  const handleSaveEdit = async () => {
    if (editingId && editText.trim().length > 0) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() });
        setEditingId(null);
        setEditText("");
        Keyboard.dismiss();
      } catch (error) {
        console.log("Error updating todo", error);
        Alert.alert("Error", "Failed to update todo");
      }
    } else {
      Alert.alert("Invalid Input", "Todo text cannot be empty");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
    Keyboard.dismiss();
  };

  if (isLoading) return <LoadingSpinner />;

  const renderFilterButton = (filterType: FilterType, label: string, count: number) => (
    <TouchableOpacity
      key={filterType}
      onPress={() => setFilter(filterType)}
      activeOpacity={0.7}
      style={homeStyles.filterButton}
      accessibilityLabel={`Filter: ${label}`}
      accessibilityRole="button"
      accessibilityState={{ selected: filter === filterType }}
    >
      <LinearGradient
        colors={filter === filterType ? colors.gradients.primary : colors.gradients.muted}
        style={homeStyles.filterButtonInner}
      >
        <Text style={homeStyles.filterButtonText}>
          {label} {count > 0 && `(${count})`}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
            accessibilityLabel={item.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: item.isCompleted }}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                homeStyles.checkboxInner,
                { borderColor: item.isCompleted ? "transparent" : colors.border },
              ]}
            >
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
                accessibilityLabel="Edit todo text"
                returnKeyType="done"
                blurOnSubmit={true}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity 
                  onPress={handleSaveEdit} 
                  activeOpacity={0.8}
                  accessibilityLabel="Save changes"
                  accessibilityRole="button"
                >
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={handleCancelEdit} 
                  activeOpacity={0.8}
                  accessibilityLabel="Cancel editing"
                  accessibilityRole="button"
                >
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
                accessibilityLabel={`Todo: ${item.text}`}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                <TouchableOpacity 
                  onPress={() => handleEditTodo(item)} 
                  activeOpacity={0.8}
                  accessibilityLabel="Edit todo"
                  accessibilityRole="button"
                >
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDeleteTodo(item._id)} 
                  activeOpacity={0.8}
                  accessibilityLabel="Delete todo"
                  accessibilityRole="button"
                >
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
        <StatusBar barStyle={colors.statusBarStyle} />
        <SafeAreaView style={homeStyles.safeArea}>
          <Header />

          <TodoInput />

          {/* Filter Buttons */}
          <View style={homeStyles.filterContainer}>
            {renderFilterButton("all", "All", stats.total)}
            {renderFilterButton("active", "Active", stats.active)}
            {renderFilterButton("completed", "Completed", stats.completed)}
          </View>

          <FlatList
            data={filteredTodos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id}
            style={homeStyles.todoList}
            contentContainerStyle={homeStyles.todoListContent}
            ListEmptyComponent={<EmptyState filter={filter} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}