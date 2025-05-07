import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GStyles, Colors } from "@/constants";
import { ChallengeCard } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Challenge } from "@/services";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const ChallengeListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [challenges, setChallenges] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // Fetch danh sách thử thách
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Challenge.GetAll();
                setChallenges(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách môn học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // Render item của flatlist
    const renderItem = ({ item }: { item: any }) => (
        <ChallengeCard
            item={item}
            onPress={() =>
                navigation.navigate("Challenge", {
                    challengeId: item._id,
                })
            }
        />
    );
    return (
        <View style={GStyles.container}>
            <View style={GStyles.flatlistContainer}>
                {loading ? (
                    <ActivityIndicator size='large' color={Colors.Sky} />
                ) : challenges && challenges.length > 0 ? (
                    <FlatList
                        data={challenges}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                ) : (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Không có thử thách nào.
                    </Text>
                )}
            </View>
        </View>
    );
};

export default ChallengeListScreen;
