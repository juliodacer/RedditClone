import { ActivityIndicator, FlatList, Text, View } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { supabase } from "../../../lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async () => {
  const { data, error } = await supabase.from("posts").select(`
      *,
      group:groups(*),
      user:users!posts_user_id_fkey(*)
      `);
  if (error) {
    throw error;
  }
  return data;
};

export default function HomeScreen() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPost(),
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error fetching post</Text>;

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
