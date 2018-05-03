import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { StackNavigator, DrawerNavigator, TabNavigator } from "react-navigation";
import {setCustomText} from 'react-native-global-props';
import LandingPage from './src/LandingPage/LandingPage.js';
import MySuggestions from './src/MySuggestions/MySuggestions.js';
import RandomPlace from './src/RandomPlace/RandomPlace.js';
import image0 from './img/homeIcon3.png';
import image1 from './img/historyIcon3.png';
import image2 from './img/hamburgerIcon3.png';


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
});

const TabBarOptions = {
  tabBarPosition: 'bottom',
  lazyLoad: true,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'android' ? '#f75d59' : '#41b1f9',
		labelStyle: {
			fontSize: 12,
		},
		style: {
      backgroundColor: Platform.OS === 'android' ? 'black' : 'lightgrey',
		},
   }
};

const AppNavigator = TabNavigator({
	LandingPage: { screen: LandingPage,
                    navigationOptions: {
                      title: "Landing Page",
                      tabBarIcon: <Image source={require('./img/homeIcon3.png')}/>,
                    }},
    RandomPlace: { screen: RandomPlace,
                  navigationOptions: {
                      title: "Randomizer",
                      tabBarIcon: <Image source={require('./img/hamburgerIcon3.png')}/>,
                  }},
    MySuggestions: { screen: MySuggestions,
					       navigationOptions: {
					            title: "My Suggestions",
                      tabBarIcon: <Image source={require('./img/historyIcon3.png')}/>,
					}},
}, TabBarOptions);



const customTextProps = {
  style: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Verdana',
  }
};

setCustomText(customTextProps);

export {AppNavigator};
export {Pages};
