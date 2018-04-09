import React from 'react';
import {StyleSheet, View, Text, ScrollView, Picker, Button, Image, TextInput, TouchableHighlight, Dimensions, Animated} from 'react-native';
//import OAuthSimple from 'oauthsimple'
import image from '../img/yelphelp(final).png'

class RandomPlace extends React.Component<ScreenProps<>> {
		constructor() {
		super()
		this.state = {
			spinValue: new Animated.Value(0)
		}
	}
/*   constructor(props){
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
  } */

  //const auth1 = 'Bearer';
  //const auth2 = 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx';

  goToMyMovies() {
      this.props.navigation.navigate("MyMovies");
  }

/*   state = {

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

  } */

 
 	spin() {
		this.state.spinValue.setValue(0);
		Animated.timing(
		this.state.spinValue,
		{
			toValue: 1,
			duration: 5000
		}
		).start();	
	}

  
  render() {
	  		let animationStyle = {
			transform: [{rotate: this.state.spinValue.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '1080deg']
								 })
						}]
		}
    return (
      <View style= {styles.container}>
	  <View style={styles.form} >
		<View style={styles.title}>
			<Image source={require('./yelphelp(final).png')} style={{width:60, height:50}} />
		</View>

		
		<View style={styles.categories}>
			<Text style={{color: 'white',fontSize:16}} > Select a Category of Food </Text>
			<View style={{width:10}} />
			<Picker style={{width: 150, height:30, color:'black'}}>
				<Picker.Item label = "Mexican" value = "mex" />
				<Picker.Item label = "Chinese" value = "chin" />
			</Picker>
		</View>
		
		<View style={styles.categories}>
			<Text style={{color: 'white',fontSize:16, borderColor:'white'}} > Max Radius </Text>
			<View style={{width:10}} />
			<Picker style={{width: 100, height:25, color:'black'}}>
				<Picker.Item label = "5" value = "five" />
				<Picker.Item label = "10" value = "ten" />
				<Picker.Item label = "25" value = "twenty-five" />
				<Picker.Item label = "50" value = "fifty" />
			</Picker>
		</View>
		
		<View style={styles.categories}>
			<Text style={{color: 'white',fontSize:16}} > Price Range </Text>
			<View style={{width:10}} />
			<TextInput textAlign = 'center' style={{height: 25, width:25, borderColor: 'white', borderWidth: 1}} />
			<View style={{width:5}} />
			<Text style={{color: 'black',fontSize:16}} > to </Text>
			<View style={{width:5}} />
			<TextInput textAlign = 'center' style={{height: 25, width:25, borderColor: 'white', borderWidth: 1}} />
		</View>
		
		<View style={{alignItems:'center'}}>
		<TouchableHighlight style={{position:'absolute'}} onPress={this.spin.bind(this)} >
				<Animated.Image style={animationStyle} source={require('./wheel.png')}>
				</Animated.Image>
		</TouchableHighlight>
		</View>
		
		</View>
      </View>
    );
  }
  
}

class Spinner extends React.Component {

	
	render() {
		return (
		<Animated.Image style={animationStyle} source={require('./wheel.png')}>
			
		</Animated.Image>
		
		)
	}
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#ff0000',  
  },
  categories: {
	flexDirection: 'row',
	top: 10,
	height: 60,
  },
  title: {
	alignItems: 'center',
	height: 80,
	top: 30
  },
  form: {
	  flex: 1,
	  flexDirection: 'column',
  },
  spinner: {
	  position:'absolute'
  }
});

export default RandomPlace;
