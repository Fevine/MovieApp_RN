import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { Colors } from "@/constants/colors";

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={style.tabBarIconActiveBg}
      >
        <Image source={icon} tintColor={"#151312"} style={style.tabBarIcon} />
        <Text style={style.tabBarIconText}>{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={style.tabBarIconDefaultBg}>
      <Image tintColor={"#a8b5db"} source={icon} style={style.tabBarIcon} />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderColor: "0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon icon={icons.home} title={"Home"} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon icon={icons.search} title={"Search"} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon icon={icons.save} title={"Saved"} focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                icon={icons.person}
                title={"Profile"}
                focused={focused}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;

const style = StyleSheet.create({
  tabBarIconActiveBg: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    minWidth: 112,
    minHeight: 52,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  tabBarIcon: {
    width: 20,
  },
  tabBarIconText: {
    color: Colors.secondary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
    marginLeft: 8,
  },
  tabBarIconDefaultBg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 9999,
  },
});
