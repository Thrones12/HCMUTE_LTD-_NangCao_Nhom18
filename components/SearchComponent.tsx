import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface SearchComponentProps {
  onBackPress: () => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onBackPress,
  placeholder = "Tìm kiếm...",
}) => {
  return (
    <View style={styles.topHeader}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default SearchComponent;
