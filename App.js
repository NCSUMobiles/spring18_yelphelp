import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {StackNavigator, DrawerNavigator, TabNavigator} from "react-navigation";

import LandingPage from './src/LandingPage/LandingPage.js';
import MyMovies from './src/MyMovies/MyMovies.js';
import RandomPlace from './src/RandomPlace/RandomPlace.js';


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

const Pages = StackNavigator({
	LandingPage:{screen:LandingPage},
	MyMovies:{screen:MyMovies},
	RandomMovie:{screen:RandomMovie}
})

const TabBarOptions = {
  tabBarPosition: 'bottom',
  lazyLoad: true,
}

const AppNavigator = TabNavigator({
    RandomPlace: { screen: RandomPlace,
                  navigationOptions: {
                    title: "Randomizer"
                  }},
    LandingPage: { screen: LandingPage,
                    navigationOptions: {
                      title: "Landing Page"
                    }},
    MyMovies: { screen: MyMovies },


}, TabBarOptions);

export {AppNavigator};
export {Pages};