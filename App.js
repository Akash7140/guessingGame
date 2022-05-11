import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from './utils/colors';
export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }



  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.screen}>
      <ImageBackground source={require('./assets/images/background.png')} resizeMode="cover"
        style={styles.screen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.screen}>
          {screen}
        </SafeAreaView>
      </ImageBackground >
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.3
  }
});
