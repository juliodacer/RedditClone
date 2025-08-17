import { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "../../../components/PostListItem";
import comments from "../../../../assets/data/comments.json";
import CommentListItem from "../../../components/CommentListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailedPost() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState<string>();
  const insets = useSafeAreaInsets();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const detailedPost = posts.find((post) => post.id === id);

  const postComments = comments.filter(
    (comment) => comment.post_id === "post-1"
  );

  const handleReplyButtonPressed = (commentId: string) => {
    inputRef.current?.focus()
  };

  if (!detailedPost) {
    return <Text>Post Not Found</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={insets.top + 20}
    >
      <FlatList
        data={postComments}
        renderItem={({ item }) => (
          <CommentListItem
            comment={item}
            depth={0}
            handleReplyButtonPressed={handleReplyButtonPressed}
          />
        )}
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
        showsVerticalScrollIndicator={false}
      />
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
        <TextInput
          ref={inputRef}
          placeholder="Join the conversation"
          style={styles.textInput}
          value={comment}
          onChangeText={setComment}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {isInputFocused && (
          <Pressable style={styles.replyButton}>
            <Text style={styles.textButton}>Reply</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  textInput: {
    backgroundColor: "#E4E4E4",
    padding: 10,
    borderRadius: 8,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
  },
  replyButton: {
    backgroundColor: "#0d469b",
    borderRadius: 15,
    marginLeft: "auto",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  textButton: {
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontWeight: "bold",
    fontSize: 14,
  },
});
