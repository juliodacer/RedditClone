import { FlatList, View } from "react-native";
import PostListItem from "../../../components/PostListItem";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Post } from "../../../types";

// type Post = Tables<"posts"> & {
//   user:
// }

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase.from("posts").select(`
        *,
        group:groups(*),
        user:users!posts_user_id_fkey(*)
        `);
    if (error) {
      console.log(error);
    } else {
      console.log("QUERY", JSON.stringify(data, null, 2));
      setPosts(data);
    }
  };

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
