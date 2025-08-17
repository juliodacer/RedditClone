import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { Entypo, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import { Comment } from "../types";
import { useState } from "react";

type CommentListItemProps = {
  comment: Comment;
  depth: number;
  handleReplyButtonPressed: (commentId: string) => void;
};

const CommentListItem = ({
  comment,
  depth,
  handleReplyButtonPressed,
}: CommentListItemProps) => {
  const [isShowReplies, setIsShowReplies] = useState<boolean>(false);
  return (
    <View
      style={{ ...styles.commentContainer, borderLeftWidth: depth > 0 ? 1 : 0 }}
    >
      {/* User Info */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Image
          source={{
            uri:
              comment.user.image ||
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
          }}
          style={{ width: 28, height: 28, borderRadius: 15, marginRight: 4 }}
        />
        <Text style={{ fontWeight: "600", color: "#737373", fontSize: 13 }}>
          {comment.user.name}
        </Text>
        <Text style={{ color: "#737373", fontSize: 13 }}>&#x2022;</Text>
        <Text style={{ color: "#737373", fontSize: 13 }}>
          {formatDistanceToNowStrict(new Date(comment.created_at))}
        </Text>
      </View>

      {/* Comment Content */}
      <Text>{comment.comment}</Text>

      {/* Comment Actions */}
      <View style={styles.iconsContainer}>
        <Entypo name="dots-three-horizontal" size={15} color="#737373" />
        <Octicons
          name="reply"
          size={16}
          color="#737373"
          onPress={() => handleReplyButtonPressed(comment.id)}
        />
        <MaterialCommunityIcons
          name="trophy-outline"
          size={16}
          color="#737373"
        />
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <MaterialCommunityIcons
            name="arrow-up-bold-outline"
            size={18}
            color="#737373"
          />
          <Text style={{ fontWeight: "500", color: "#737373" }}>
            {comment.upvotes}
          </Text>
          <MaterialCommunityIcons
            name="arrow-down-bold-outline"
            size={18}
            color="#737373"
          />
        </View>
      </View>

      {/* Show Replies Buttob */}
      {!!comment.replies.length && !isShowReplies && depth < 5 && (
        <Pressable
          style={styles.buttonContainer}
          onPress={() => setIsShowReplies(true)}
        >
          <Text style={styles.buttonText}>Show Replies</Text>
        </Pressable>
      )}

      {/* List of replies */}
      {isShowReplies && (
        <FlatList
          data={comment.replies}
          renderItem={({ item }) => (
            <CommentListItem
              comment={item}
              depth={depth + 1}
              handleReplyButtonPressed={handleReplyButtonPressed}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "white",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    borderLeftColor: "#E5E7EB",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
  },
  buttonContainer: {
    backgroundColor: "#EDEDED",
    borderRadius: 2,
    paddingVertical: 3,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: "500",
    color: "#545454",
  },
});

export default CommentListItem;
