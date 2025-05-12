import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Pressable,
    Modal,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Colors, GStyles } from "@/constants";
import axios from "axios";
import { Constant } from "@/constants/Constant";

interface Activity {
    _id: string;
    type: "comment" | "like" | "exam";
    message: string;
    date: string;
}

const ActivityScreen = () => {
    const API = Constant.API;
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    );
    const [editedMessage, setEditedMessage] = useState("");
    const [editedType, setEditedType] = useState<
        "comment" | "like" | "exam" | ""
    >("");

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const res = await axios.get<{ data: Activity[]; message: string }>(
                `${API}/activity`
            );
            console.log(res.data);
            if (res.data && res.data.data) {
                setActivities(
                    res.data.data.sort(
                        (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                    )
                );
            } else {
                console.warn("No activities data found in response:", res.data);
                setActivities([]);
            }
        } catch (error) {
            console.error("Failed to fetch activities:", error);
            Alert.alert(
                "Error",
                "Could not fetch activities. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (activityId: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this activity? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.delete(
                                `${API}/activity?id=${activityId}`
                            );
                            setActivities((prevActivities) =>
                                prevActivities.filter(
                                    (act) => act._id !== activityId
                                )
                            );
                            Alert.alert(
                                "Success",
                                "Activity deleted successfully."
                            );
                        } catch (error) {
                            console.error("Failed to delete activity:", error);
                            Alert.alert(
                                "Error",
                                "Failed to delete activity. Please try again."
                            );
                        }
                    },
                },
            ]
        );
    };

    const openEditModal = (activity: Activity) => {
        setSelectedActivity(activity);
        setEditedMessage(activity.message);
        setEditedType(activity.type);
        setIsEditModalVisible(true);
    };

    const handleUpdate = async () => {
        if (!selectedActivity) return;
        if (!editedType || !["comment", "like", "exam"].includes(editedType)) {
            Alert.alert(
                "Invalid Type",
                "Activity type must be one of: 'comment', 'like', or 'exam'."
            );
            return;
        }
        if (!editedMessage.trim()) {
            Alert.alert("Invalid Message", "Message cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(`${API}/activity`, {
                _id: selectedActivity._id,
                type: editedType,
                message: editedMessage,
            });
            if (response.data && response.data.data) {
                setActivities((prevActivities) =>
                    prevActivities
                        .map((act) =>
                            act._id === selectedActivity._id
                                ? response.data.data
                                : act
                        )
                        .sort(
                            (a, b) =>
                                new Date(b.date).getTime() -
                                new Date(a.date).getTime()
                        )
                );
                setIsEditModalVisible(false);
                setSelectedActivity(null);
                Alert.alert("Success", "Activity updated successfully.");
            } else {
                Alert.alert(
                    "Error",
                    "Failed to update activity. Invalid response from server."
                );
            }
        } catch (error) {
            console.error("Failed to update activity:", error);
            Alert.alert(
                "Error",
                "Failed to update activity. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleAddActivity = () => {
        setSelectedActivity(null);
        setEditedMessage("");
        setEditedType("");
        setIsEditModalVisible(true);
        Alert.alert(
            "Add Activity",
            "Opening modal to add new activity. Ensure 'Save Changes' handles new entries or use a dedicated create function."
        );
    };

    const renderItem = ({ item }: { item: Activity }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemType}>Type: {item.type}</Text>
                <Text style={styles.itemDate}>
                    {new Date(item.date).toLocaleDateString()} -{" "}
                    {new Date(item.date).toLocaleTimeString()}
                </Text>
            </View>
            <Text
                style={styles.itemMessage}
                numberOfLines={3}
                ellipsizeMode='tail'
            >
                {item.message}
            </Text>
            <View style={styles.actionsContainer}>
                <Pressable
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => openEditModal(item)}
                >
                    <Text style={styles.actionButtonText}>Edit</Text>
                </Pressable>
                <Pressable
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item._id)}
                >
                    <Text style={styles.actionButtonText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );

    if (loading && activities.length === 0) {
        return (
            <View style={[GStyles.container, styles.centered]}>
                <ActivityIndicator size='large' color={Colors.Sky} />
            </View>
        );
    }

    return (
        <View style={GStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Admin Activity Log</Text>
            </View>

            {activities.length === 0 && !loading ? (
                <View style={styles.centered}>
                    <Text style={styles.noActivitiesText}>
                        No activities found.
                    </Text>
                    <Pressable
                        style={styles.refreshButton}
                        onPress={fetchActivities}
                    >
                        <Text style={styles.refreshButtonText}>
                            Tap to Refresh
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={activities}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContentContainer}
                    refreshing={loading}
                    onRefresh={fetchActivities}
                />
            )}

            <Modal
                animationType='slide'
                transparent={true}
                visible={isEditModalVisible}
                onRequestClose={() => {
                    setIsEditModalVisible(false);
                    setSelectedActivity(null);
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.centeredViewModal}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {selectedActivity
                                ? "Edit Activity"
                                : "Add New Activity"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Type: comment, like, or exam'
                            value={editedType}
                            onChangeText={setEditedType as any}
                            placeholderTextColor={Colors.Gray500}
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={[styles.input, styles.messageInput]}
                            placeholder='Activity Message'
                            value={editedMessage}
                            onChangeText={setEditedMessage}
                            multiline
                            numberOfLines={4}
                            placeholderTextColor={Colors.Gray500}
                        />
                        <View style={styles.modalActionsContainer}>
                            <Pressable
                                style={[
                                    styles.modalButton,
                                    styles.cancelButton,
                                ]}
                                onPress={() => {
                                    setIsEditModalVisible(false);
                                    setSelectedActivity(null);
                                }}
                            >
                                <Text style={styles.modalButtonText}>
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={
                                    selectedActivity
                                        ? handleUpdate
                                        : () =>
                                              Alert.alert(
                                                  "Info",
                                                  "Add functionality for new activity needs a separate handler or adjustment to handleUpdate."
                                              )
                                }
                            >
                                <Text style={styles.modalButtonText}>
                                    {selectedActivity
                                        ? "Save Changes"
                                        : "Add Activity"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: Colors.White,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray200,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.Black,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.Gray100,
    },
    noActivitiesText: {
        fontSize: 16,
        color: Colors.Gray600,
        marginBottom: 10,
    },
    refreshButton: {
        backgroundColor: Colors.Sky,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    refreshButtonText: {
        color: Colors.White,
        fontSize: 14,
        fontWeight: "500",
    },
    itemContainer: {
        backgroundColor: Colors.White,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.Gray200,
        elevation: 3,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    itemType: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.Sky,
    },
    itemMessage: {
        fontSize: 14,
        color: Colors.Gray700,
        marginBottom: 12,
    },
    itemDate: {
        fontSize: 12,
        color: Colors.Gray500,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.Gray100,
        paddingTop: 10,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    editButton: {
        backgroundColor: Colors.Sky,
    },
    deleteButton: {
        backgroundColor: Colors.Gray600,
    },
    actionButtonText: {
        color: Colors.White,
        fontWeight: "500",
        fontSize: 14,
    },
    listContentContainer: {
        paddingBottom: 70,
    },
    centeredViewModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "White",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderColor: Colors.Gray300,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: "100%",
        fontSize: 16,
        backgroundColor: Colors.Gray100,
    },
    messageInput: {
        height: 100,
        textAlignVertical: "top",
    },
    modalActionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 15,
    },
    modalButton: {
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: Colors.Gray500,
    },
    saveButton: {
        backgroundColor: Colors.Sky,
    },
    modalButtonText: {
        color: "White",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
});

export default ActivityScreen;
