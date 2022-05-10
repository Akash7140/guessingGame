import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

import { LinearGradient } from 'expo-linear-gradient';
import Colors from './utils/colors';
export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />
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
