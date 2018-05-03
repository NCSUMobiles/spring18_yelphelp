import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { StackNavigator, DrawerNavigator, TabNavigator } from "react-navigation";

import {
  setCustomText
} from 'react-native-global-props';

import LandingPage from './src/LandingPage/LandingPage.js';
import MySuggestions from './src/MySuggestions/MySuggestions.js';
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
	MySuggestions:{screen:MySuggestions},
	RandomPlace:{screen:RandomPlace}
})

const TabBarOptions = {
  tabBarPosition: 'bottom',
  lazyLoad: true,
  tabBarOptions: {
		activeTintColor: '#f75d59',
		labelStyle: {
      //fontFamily: 'Verdana',
			fontSize: 12,
		},
		style: {
			backgroundColor: 'black',
		},
   }
}

const AppNavigator = TabNavigator({
	LandingPage: { screen: LandingPage,
                    navigationOptions: {
                      title: "Landing Page"
                    }},
    RandomPlace: { screen: RandomPlace,
                  navigationOptions: {
                    title: "Randomizer"
                  }},
    MySuggestions: { screen: MySuggestions,
					navigationOptions: {
					  title: "My Suggestions",
					}},


}, TabBarOptions);

const customTextProps = {
  style: {
    //fontFamily: 'Verdana',
  }
};

setCustomText(customTextProps);

export {AppNavigator};
export {Pages};
