import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
//import OAuthSimple from 'oauthsimple'

class RandomMovie extends React.Component<ScreenProps<>> {

  //const auth1 = 'Bearer';
  //const auth2 = 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx';

  goToMyMovies() {
      this.props.navigation.navigate("MyMovies");
  }

  state = {

    position: 'unknown'

  };

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        this.setState({position});

      },

      (error) => alert(error),

      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}

  )};

  fetchData() {
    var lat = this.state.position.coords.latitude
    var lng = this.state.position.coords.longitude
    var latstr = "latitude=" + String(lat) + "&"
    var lngstr = "longitude=" + String(lng) + "&"

    var location = '';

    console.log('test');

    fetch('https://api.yelp.com/v3/businesses/search?term=food&latitude=35.7796&longitude=-78.6382&limit=50', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx',
      },
      body: undefined,
    })
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson.businesses);

      })
      .catch((error) =>{
        console.error(error);
      });

  }


  render() {
    return (
      <View style = {styles.container}>
        <Text>Landing Page</Text>
        <Button
            onPress={this.fetchData.bind(this)}
            title="Restaurants"
            color= "#e84393"
            accessibilityLabel="Learn more about this purple button"
        />
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
