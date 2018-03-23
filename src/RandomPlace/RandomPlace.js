import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';

class RandomPlace extends React.Component<ScreenProps<>> {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };

    this.places = {"dustin", "cami", "jett", "dax"};
  }

  goToMyMovies() {
      this.props.navigation.navigate("MyMovies");
  }


  render() {
    return (
      <View style = {styles.container}>
        <Text>Landing Page</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RandomPlace;
