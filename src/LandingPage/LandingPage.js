import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, Dimensions} from 'react-native';


class LandingPage extends React.Component<ScreenProps<>> {

  render() {
    return (
      <View style = {styles.container}>
		  {/*https://github.com/react-native-training/react-native-fonts for list of available fonts*/}
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.05)}}>
			<Text style={styles.textTitle}>Welcome back you!</Text>
		</View>
		<View style={{height:Dimensions.get('window').height*(.4)}}>
			<Text style={styles.textTitle}>Stats/Recent History</Text>
			<View style={{height:40}}></View>
			<Text style={{fontSize:18, color:'white'}}>Last Restaurant:</Text>
			<View style={{height:15}}></View>
			<Text style={{fontSize:18, color:'white'}}>Total Restaurants:</Text>
			<View style={{height:15}}></View>
			<Text style={{fontSize:18, color:'white'}}>Favorite Restaurant:</Text>
		</View>
		<View style={{height:Dimensions.get('window').height*(.45)}}>
			<Text style={styles.textTitle}>Quick Links</Text>
		<View style={{height:20}}></View>
		<Button
            onPress={() => this.props.navigation.navigate('RandomPlace')}
            title="Randomizer"
            color= "#000000"
            accessibilityLabel="Learn more about this purple button"
        />
		<View style={{height:5}}></View>
        <Button
            onPress={() => this.props.navigation.navigate('MyMovies')}
            title="My Restaurants"
            color= "#000000"
            accessibilityLabel="Learn more about this purple button"
        />
		<View style={{height:5}}></View>
		<Button
            onPress={() => this.props.navigation.navigate('MyMovies')}
            title="Help"
            color= "#000000"
            accessibilityLabel="Learn more about this purple button"
        />
		<View style={{height:5}}></View>
		<Button
            onPress={() => this.props.navigation.navigate('MyMovies')}
            title="Yelp"
            color= "#000000"
            accessibilityLabel="Learn more about this purple button"
        />
		</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  textTitle: {
	fontFamily: 'Roboto',
	fontSize: 22,
	textShadowOffset: {width:2, height:2},
	textShadowColor: '#d3d3d3',
	textShadowRadius: 5,
	textAlign: 'center',
	fontWeight: 'bold'
  },
  form: {
	  flex: 1,
	  flexDirection: 'column',
  },
  textLink: {
	
  }
  
});

export default LandingPage;
