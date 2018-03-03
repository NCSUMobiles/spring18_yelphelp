import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './src/LandingPage/LandingPage.js';
import MyMovies from './src/MyMovies/MyMovies.js';

export default class App extends React.Component {
  render() {
    return (
      <LandingPage/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
