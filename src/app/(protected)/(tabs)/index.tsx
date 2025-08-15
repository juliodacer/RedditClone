import { FlatList, View } from "react-native";
import PostListItem from "../../../components/PostListItem";
import posts from "../../../../assets/data/posts.json";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        keyExtractor={(post) => post.id}
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
}
