import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Alert,
    SafeAreaView,
} from "react-native";
import { Colors, GStyles } from "@/constants";
import { ButtonComponent } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { Constant } from "@/constants/Constant";

interface User {
    _id: string;
    fullname?: string;
    email: string;
    status: "active" | "locked";
    avatar?: string;
    phone?: string;
    // Add other fields if you plan to display them
}

const AccountScreen = () => {
    const { logout } = useContext(AuthContext);
    const API = Constant.API;

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<{
        [key: string]: boolean;
    }>({}); // For individual row loading

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get<User[]>(`${API}/user`); // Controller returns array directly
            setUsers(
                response.data.sort((a, b) =>
                    (a.fullname || "").localeCompare(b.fullname || "")
                )
            );
        } catch (error) {
            console.error("Failed to fetch users:", error);
            Alert.alert("Error", "Could not fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleLock = async (userToUpdate: User) => {
        const newStatus =
            userToUpdate.status === "active" ? "locked" : "active";
        const endpoint =
            userToUpdate.status === "active"
                ? `${API}/user/lock`
                : `${API}/user/unlock`;
        const actionText = userToUpdate.status === "active" ? "Lock" : "Unlock";

        Alert.alert(
            `Confirm ${actionText}`,
            `Are you sure you want to ${actionText.toLowerCase()} the account for ${
                userToUpdate.email
            }?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: actionText,
                    style:
                        userToUpdate.status === "active"
                            ? "destructive"
                            : "default",
                    onPress: async () => {
                        setActionLoading((prev) => ({
                            ...prev,
                            [userToUpdate._id]: true,
                        }));
                        try {
                            // The controller expects email in the body for lock/unlock
                            await axios.post(endpoint, {
                                email: userToUpdate.email,
                            });
                            setUsers((prevUsers) =>
                                prevUsers.map((user) =>
                                    user._id === userToUpdate._id
                                        ? { ...user, status: newStatus }
                                        : user
                                )
                            );
                            Alert.alert(
                                "Success",
                                `User account ${newStatus} successfully.`
                            );
                        } catch (error: any) {
                            console.error(
                                `Failed to ${actionText.toLowerCase()} user:`,
                                error
                            );
                            Alert.alert(
                                "Error",
                                error.response?.data?.message ||
                                    `Failed to ${actionText.toLowerCase()} user.`
                            );
                        } finally {
                            setActionLoading((prev) => ({
                                ...prev,
                                [userToUpdate._id]: false,
                            }));
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.itemContainer}>
            <View style={styles.userInfoContainer}>
                <Text style={styles.itemFullname}>
                    {item.fullname || "N/A"}
                </Text>
                <Text style={styles.itemEmail}>{item.email}</Text>
                <Text
                    style={[
                        styles.itemStatus,
                        item.status === "active"
                            ? styles.activeStatus
                            : styles.lockedStatus,
                    ]}
                >
                    Status: {item.status}
                </Text>
            </View>
            <Pressable
                style={[
                    styles.actionButton,
                    item.status === "active"
                        ? styles.lockButton
                        : styles.unlockButton,
                    actionLoading[item._id] && styles.buttonDisabled,
                ]}
                onPress={() => handleToggleLock(item)}
                disabled={actionLoading[item._id]}
            >
                {actionLoading[item._id] ? (
                    <ActivityIndicator size='small' color={Colors.White} />
                ) : (
                    <Text style={styles.actionButtonText}>
                        {item.status === "active" ? "Lock" : "Unlock"}
                    </Text>
                )}
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={GStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>User Accounts</Text>
            </View>

            {loading && users.length === 0 ? (
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size='large' color={Colors.Sky} />
                </View>
            ) : users.length === 0 && !loading ? (
                <View style={styles.centeredContainer}>
                    <Text style={styles.noDataText}>No users found.</Text>
                    <Pressable
                        style={styles.refreshButton}
                        onPress={fetchUsers}
                    >
                        <Text style={styles.refreshButtonText}>
                            Tap to Refresh
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContentContainer}
                    refreshing={loading}
                    onRefresh={fetchUsers}
                />
            )}
            <View style={styles.logoutButtonContainer}>
                <ButtonComponent
                    text='Logout'
                    onPress={logout}
                    type='primary'
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray200,
        backgroundColor: Colors.White,
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.Black,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    noDataText: {
        fontSize: 16,
        color: Colors.Gray600,
        marginBottom: 15,
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
    listContentContainer: {
        paddingVertical: 10,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.White,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.Gray200,
        elevation: 2,
    },
    userInfoContainer: {
        flex: 1,
    },
    itemFullname: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.Black,
        marginBottom: 3,
    },
    itemEmail: {
        fontSize: 14,
        color: Colors.Gray700,
        marginBottom: 3,
    },
    itemStatus: {
        fontSize: 13,
        fontStyle: "italic",
    },
    activeStatus: {
        color: Colors.Sky, // Or a green color
    },
    lockedStatus: {
        color: Colors.Gray600, // Or a red color
    },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    lockButton: {
        backgroundColor: Colors.Gray600, // Example: Orange/Red for lock
    },
    unlockButton: {
        backgroundColor: Colors.Sky, // Example: Green/Blue for unlock
    },
    actionButtonText: {
        color: Colors.White,
        fontWeight: "bold",
        fontSize: 14,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    logoutButtonContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.Gray200,
        backgroundColor: Colors.White,
    },
});

export default AccountScreen;
