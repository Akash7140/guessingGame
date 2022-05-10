import { useState } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../utils/colors';
function StartGameScreen(props) {
    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(inputText) {
        setEnteredNumber(inputText);

    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //show alert...
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: "destructive", onPress: resetInputHandler }]
            );

            return;
        }
        props.onPickNumber(chosenNumber);
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize='none'
                autoCorrect={false}
                value={enteredNumber}
                onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "center",
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 8
    },
    numberInput: {
        height: 50,
        fontSize: 32,
        width: 50,
        textAlign: 'center',
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
});
