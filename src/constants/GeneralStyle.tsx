import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const GeneralStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
