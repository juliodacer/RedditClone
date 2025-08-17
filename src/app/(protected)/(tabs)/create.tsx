import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");

  const goBack = () => {
    setTitle("");
    setBodyText("");
    router.back();
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
    >
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="close" size={30} color={"black"} onPress={goBack} />
        <Pressable onPress={() => {}} style={{ marginLeft: "auto" }}>
          <Text style={styles.postText}>Post</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 10 }}
        >
          {/* COMUNITY SELECTOR */}
          <Link href={"groupSelector"} asChild>
            <Pressable style={styles.communityContainer}>
              <Text style={styles.rStyles}>r/</Text>
              <Text style={{ fontWeight: "600" }}>Select a community</Text>
            </Pressable>
          </Link>

          {/* INPUTS */}
          <TextInput
            placeholder="Title"
            style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 20 }}
            value={title}
            onChangeText={setTitle}
            multiline
            scrollEnabled={false}
          />
          <TextInput
            placeholder="body text (optional)"
            value={bodyText}
            onChangeText={setBodyText}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postText: {
    color: "white",
    backgroundColor: "#115BCA",
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  communityContainer: {
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    gap: 5,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  rStyles: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
