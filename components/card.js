import { StyleSheet, View } from "react-native";
import Colors from "../utils/colors";
function Card({ children }) {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({

    inputContainer: {
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 8
    },
})