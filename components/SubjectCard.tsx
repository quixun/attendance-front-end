import { subjects } from "@/data";
import axios from "axios";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface IProps {
  subject: {
    id: string,
    name: string;
    thumbnail: string;
  };
}
const SubjectCard = ({ subject }: IProps) => {
const subjectNameParam = encodeURIComponent(subject.name);
  const subjectThumbnailParam = encodeURIComponent(subject.thumbnail);
  const subjectIdParam = encodeURIComponent(subject.id);
  const handleUpload = async () => {
    const saved = await Promise.all(subjects.map(async (item, index) => {
      const res = await axios.post("http://192.168.1.9:8000/add-subject", item);
      return res
    }))
  }
  return (
    <Link href={`/introduction?subjectId=${subjectIdParam}&subjectName=${subjectNameParam}&subjectThumbnail=${subjectThumbnailParam}`} style={[styles.card, styles.circleBoxShadow]} asChild>
        <TouchableOpacity>
      <View style={styles.contentBox}>
        <Image
          style={styles.thumbnail}
          source={{ uri: subject.thumbnail }}
        />
      </View>
      <Text style={{ textAlign: 'center', fontWeight: '500' }}>{subject.name}</Text>
    </TouchableOpacity>
    </Link>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10
  },
  circleBoxShadow: {
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  contentBox: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    marginTop: 20,
  },
});
