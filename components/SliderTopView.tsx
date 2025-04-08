import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

const data = [
    { title: "Course 1", image: require("./assets/course1.jpg") },
    { title: "Course 2", image: require("./assets/course2.jpg") },
    { title: "Course 3", image: require("./assets/course3.jpg") },
];

const CarouselCardItem = ({ item }: any) => {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 20,
                alignItems: "center",
            }}
        >
            <Image
                source={item.image}
                style={{ width: "100%", height: 150, borderRadius: 8 }}
            />
            <Text style={{ marginTop: 10, fontSize: 18 }}>{item.title}</Text>
        </View>
    );
};
const SliderTopView = () => {
    return (
        <Carousel
            data={data}
            renderItem={({ item }) => <CarouselCardItem item={item} />}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            loop={true}
            autoplay={true}
            autoplayDelay={1000}
            autoplayInterval={3000}
        />
    );
};

export default SliderTopView;
