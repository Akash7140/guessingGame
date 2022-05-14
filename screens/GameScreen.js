import { View, KeyboardAvoidingView, StyleSheet, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import InstructionText from "../components/InstructionText";
import Card from "../components/card";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/guessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;


function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);


    function nextGuessHandler(direction) {

        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't Lie!!", "You know that this is wrong...",
                [
                    { text: 'Sorry!', style: 'cancel' }
                ])
            return;
        }


        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(previousGuess => [newRndNumber, ...previousGuess]);
    }

    const guessRoundListLength = guessRounds.length;

    return (
        <KeyboardAvoidingView >
            <View style={styles.screen}>
                <Title>Opponent's Guess</Title>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View>
                    <Card>
                        <InstructionText>Higher or Lower?</InstructionText>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttons}>
                                <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                                    <Ionicons name="md-add" size={24} />
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttons}>
                                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                                    <Ionicons name="md-remove" size={24} />
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={styles.listContainer}>
                    <FlatList data={guessRounds}
                        renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundListLength - itemData.index} guess={itemData.item} />}
                        keyExtractor={(item) => item}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingTop: 12,
    },
    buttons: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})