import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, SearchCard } from "@/components";
import { GStyles, Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/Types";
import { Lesson } from "@/services";
import Generator from "@/utils/Generator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const SearchScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [lessons, setLessons] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<any>("");
    // Fetch danh sách bài học
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Lesson.GetAll();
                setLessons(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Search Card
    const renderItem = ({ item }: { item: any }) => (
        <SearchCard
            item={item}
            onPress={() =>
                navigation.navigate("LessonTab", { lessonId: item._id })
            }
        />
    );

    // Xử lí lọc lessons khi user search
    useEffect(() => {
        // Nếu không có từ khóa thì hiển thị toàn bộ
        if (searchText.trim() === "") {
            setData(lessons);
        } else {
            const keywords = Generator.getKeywords(searchText);
            const filtered = lessons
                .map((lesson: any) => ({
                    ...lesson,
                    score: Generator.getMatchScore(keywords, lesson.tag),
                }))
                .filter((lesson: any) => lesson.score > 0)
                .sort((a: any, b: any) => b.score - a.score);

            setData(filtered);
        }
    }, [searchText, lessons]);
    return (
        <View style={GStyles.container}>
            <Header title={"Tìm kiếm"} />

            <View style={styles.searchWrapper}>
                <View style={styles.search}>
                    <Ionicons
                        name='search'
                        size={26}
                        color={Colors.Gray500}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Tìm kiếm ...'
                        placeholderTextColor={Colors.Gray500}
                        onChangeText={(text) => setSearchText(text)}
                    />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // Search
    searchWrapper: {
        paddingHorizontal: 15,
        backgroundColor: Colors.Gray200,
        marginTop: 10,
        marginBottom: 20,
        zIndex: 10,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.White,
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 2,
    },
    icon: {
        marginRight: 7,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.Gray500,
        paddingVertical: 13,
    },
});

export default SearchScreen;
