import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetAtom } from "jotai";
import { selectedGroupAtom } from "../../atom";
import groups from "../../../assets/data/groups.json";
import { Group } from "../../types";

export default function GroupSelector() {
  const [searchValue, setSearchValue] = useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 10, flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="close"
            size={30}
            color="black"
            onPress={() => router.back()}
          />
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              fontSize: 16,
              textAlign: "center",
              marginRight: 30,
            }}
          >
            Post to
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "lightgrey",
            borderRadius: 5,
            gap: 5,
            marginVertical: 10,
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <AntDesign name="search1" size={16} color="gray" />
          <TextInput
            placeholder="Search for a community"
            placeholderTextColor="gray"
            style={{ paddingVertical: 10, flex: 1 }}
            value={searchValue}
            onChangeText={setSearchValue}
          />
          {searchValue && (
            <AntDesign
              name="closecircle"
              size={15}
              color="#E4E4E4"
              onPress={() => setSearchValue("")}
            />
          )}
        </View>

        <FlatList
          data={filteredGroups}
          renderItem={({ item }) => (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
              }}
              onPress={() => onGroupSelected(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 40, aspectRatio: 1 }}
              />
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
