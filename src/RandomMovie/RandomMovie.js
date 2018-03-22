import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
// import NetflixRoulette from 'netflix-roulette';

class RandomMovie extends React.Component<ScreenProps<>> {

  goToMyMovies() {
      this.props.navigation.navigate("MyMovies");
  }

  getMovie(){
    fetch('https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco/reviews', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authentication': 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx'
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    });
    console.log("method");
    // var NetflixRoulette = require('netflix-roulette');
    // console.log(NetflixRoulette.title('Tucker & Dale vs. Evil', callbackFunc(error, data), 2010));
  }


  render() {
    return (
      <View style = {styles.container}>
        <Text>Landing Page</Text>
        <Button
            onPress={this.getMovie}
            title="my Movies"
            color= "#e84393"
            accessibilityLabel="Learn more about this purple button"
        />
        <Text> RESULTS </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fab1a0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RandomMovie;
