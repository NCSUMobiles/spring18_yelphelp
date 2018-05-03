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
import {Image} from 'react-native';
import image0 from './img/homeIcon.png';
import image1 from './img/historyIcon.png';
import image2 from './img/rouletteIcon.png';


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
    showIcon: false,
    labelStyle: {
      fontSize: 14,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
		},
		style: {
			backgroundColor: 'black',
		},
   }
}

const AppNavigator = TabNavigator({
	LandingPage: { screen: LandingPage,
                    navigationOptions: {
                      title: "Landing Page",
                      activeTintColor: '#f75d59',
                    }},
    RandomPlace: { screen: RandomPlace,
                  navigationOptions: {
                      title: "Randomizer",
                      activeTintColor: '#f75d59',
                  }},
    MySuggestions: { screen: MySuggestions,
					       navigationOptions: {
					            title: "My Suggestions",
                      activeTintColor: '#f75d59',
					}},
}, TabBarOptions);

const customTextProps = {
  style: {
    fontFamily: 'Verdana',
  }
};

setCustomText(customTextProps);

export {AppNavigator};
export {Pages};
