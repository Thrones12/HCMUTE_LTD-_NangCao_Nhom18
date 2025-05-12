import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants"; // Assuming Colors are defined for icon colors

// Admin Screens
import AccountScreen from "@/screens/admin/AccountScreen";
import CourseScreen from "@/screens/admin/CourseScreen";
import NotificationScreen from "@/screens/admin/NotificationScreen";
import ActivityScreen from "@/screens/admin/ActivityScreen";
// Import other admin screens that might be navigated to from these tabs
// For example: import CourseDetailScreen from "@/screens/admin/CourseDetailScreen";

const Tab = createBottomTabNavigator();

// If you need stack navigation within a tab (e.g., from CourseList to CourseDetail)
// you would create a separate stack navigator for that tab.
// For simplicity, this example directly uses the screens in tabs.
// Example:
// const CourseStackNavigator = createNativeStackNavigator();
// const CourseStack = () => (
//   <CourseStackNavigator.Navigator screenOptions={{ headerShown: false }}>
//     <CourseStackNavigator.Screen name="CourseList" component={CourseScreen} />
//     <CourseStackNavigator.Screen name="CourseDetail" component={CourseDetailScreen} />
//   </CourseStackNavigator.Navigator>
// );


const AdminNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hides header for all tabs, can be overridden
                tabBarActiveTintColor: Colors.Sky, // Changed from Colors.Primary to Colors.Sky
                tabBarInactiveTintColor: Colors.Gray600, // Example color
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Courses') {
                        iconName = focused ? 'library' : 'library-outline';
                    } else if (route.name === 'Accounts') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'Activity') {
                        iconName = focused ? 'list' : 'list-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
            })}
            // initialRouteName='Courses' // Optional: set initial tab
        >
            <Tab.Screen name='Courses' component={CourseScreen} />
            <Tab.Screen name='Accounts' component={AccountScreen} />
            <Tab.Screen name='Notifications' component={NotificationScreen} />
            <Tab.Screen name='Activity' component={ActivityScreen} />
            {/* 
              If you created CourseStack above for nested navigation:
              <Tab.Screen name="Courses" component={CourseStack} /> 
            */}
        </Tab.Navigator>
    );
};

export default AdminNavigator;