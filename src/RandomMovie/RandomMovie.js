import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';

class RandomMovie extends React.Component<ScreenProps<>> {

  goToMyMovies() {
      this.props.navigation.navigate("MyMovies");
  }


  render() {
    return (
      <View style = {styles.container}>
        <Text>Landing Page</Text>
        <Button
            onPress={this.goToMyMovies}
            title="my Movies"
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
