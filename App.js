import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {StackNavigator, DrawerNavigator, TabNavigator} from "react-navigation";

import LandingPage from './src/LandingPage/LandingPage.js';
import MyMovies from './src/MyMovies/MyMovies.js';
import RandomMovie from './src/RandomMovie/RandomMovie.js';


export default class App extends React.Component {
  render() {
    return (
      <AppNavigator  />
    );
  }
}

const StackNavigatorOptions = {
    // headerMode: "none",
    cardStyle: {
        backgroundColor: "black"
    }
};

const TabBarOptions = {
  tabBarPosition: 'bottom',
  lazyLoad: true,
}

const AppNavigator = TabNavigator({
    LandingPage: { screen: LandingPage,
                    navigationOptions: {
                      title: "Landing Page"
                    }},
    MyMovies: { screen: MyMovies },
    RandomMovie: { screen: RandomMovie },

}, TabBarOptions);

export {AppNavigator};
