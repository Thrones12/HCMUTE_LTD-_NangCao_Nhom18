import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, GStyles } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Constant } from "@/constants/Constant";

const CourseScreen = ({ navigation }: any) => {
  const API = Constant.API;
  const [course, setCourse] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchCourse = async () => {
          try {
              const res = await axios.get(`${API}/course`);
              setCourse(res.data);
          } catch (error) {
              console.error("Failed to fetch course:", error);
          } finally {
              setLoading(false);
          }
      };
      fetchCourse();
  }, []);

  const countLessons = (course: any) => {
      let total = 0;
      course.subjects?.forEach((subject: any) => {
          subject.chapters?.forEach((chapter: any) => {
              total += chapter.lessons?.length || 0;
          });
      });
      return total;
  };

  const renderItem = ({ item }: any) => (
      <View style={styles.itemWrapper}>
          <Pressable
              onPress={() =>
                  navigation.navigate("CourseDetail", { course: item })
              }
              style={styles.item}
          >
              <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.subInfo}>
                      <View style={styles.infoItem}>
                          <Ionicons
                              name='book-outline'
                              size={14}
                              color={Colors.Gray600}
                          />
                          <Text style={styles.infoText}>
                              {item.subjects?.length || 0} môn học
                          </Text>
                      </View>
                      <View style={styles.infoItem}>
                          <Ionicons
                              name='document-text-outline'
                              size={14}
                              color={Colors.Gray600}
                          />
                          <Text style={styles.infoText}>
                              {countLessons(item)} bài học
                          </Text>
                      </View>
                  </View>
              </View>
          </Pressable>
      </View>
  );

  return (
      <View style={GStyles.container}>
          <Text style={styles.header}>Danh sách khóa học</Text>
          {loading ? (
              <ActivityIndicator size='large' color={Colors.Gray600} />
          ) : (
              <FlatList
              data={course}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: "600",
        marginVertical: 10,
    },
    itemWrapper: {
        padding: 8,
    },
    item: {
        backgroundColor: Colors.Gray100,
        borderRadius: 10,
        padding: 12,
        elevation: 2,
    },
    content: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
    },
    subInfo: {
        flexDirection: "row",
        gap: 12,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    infoText: {
        color: Colors.Gray600,
        fontSize: 14,
    },
});

export default CourseScreen;