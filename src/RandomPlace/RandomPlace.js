import React from 'react';
import {StyleSheet, View, Text, ScrollView, Picker, Button, Image, TextInput, TouchableHighlight, Dimensions, Animated,  Platform, Alert, Linking, TouchableOpacity} from 'react-native';
//import OAuthSimple from 'oauthsimple'
import image from '../img/yelphelp(final).png'
import { AsyncStorage } from 'react-native'


class Business {
  constructor(){
    this.id = 1;
    this.name = "Dustin Business";
    this.image_url = "https://s3-media1.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg";
    this.is_closed = false;
    this.url = "https://www.pizzahut.com/";
    this.review_count = 1;
    this.categories = ["Dustin"];
    this.rating = "**";
    this.coordinates = ["35.784915", "-78.690439"];
    this.transactions = 321;
    this.price = "$$";
    this.location = "Raleigh";
    this.phone = "123456789";
    this.display_phone = "(123)-456-7890";
    this.distance = 321.43;
  }
}

class RandomPlace extends React.Component<ScreenProps<>> {


  constructor() {
	  super()
		  this.state = {
			  spinValue: new Animated.Value(0),
			  responseJson: [],
			  price: -1,
			  radius: -1,
			  term: ""
		  }
	}


/*   constructor(props){
    super(props);
  }*/

  // This method will open up the default navigation app with directions.
  /*_callShowDirections(){
    const startPoint = {
      longitude: -8.945406,
      latitude: 38.575078
    }


		const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }*/


  // state = {
  //   position: 'unknown'
  // };


  GetSectionListItem=(item)=>{
      Alert.alert(item);
    }

  componentDidMount() {
    console.log("mount");
    // fetchData();
    navigator.geolocation.getCurrentPosition(

      (position) => {
        this.setState({position});
      },

      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}

  )};

  fetchData() {
	var apiCall = "https://api.yelp.com/v3/businesses/search?";
    var lat = this.state.position.coords.latitude;
    var lng = this.state.position.coords.longitude;
    apiCall += "latitude=" + String(lat);
    apiCall += "&longitude=" + String(lng);

	//Radius
	if (this.state.radius != -1) {
		apiCall += "&radius=" + String(this.state.radius);
	}

	if (this.state.type != "") {
		apiCall += "&term=" + this.state.type;
	}
	if (this.state.price != -1) {
		if (this.state.price == 1) {
			apiCall += "&price=1";
		} else if (this.state.price == 2) {
			apiCall += "&price=1, 2";
		} else if (this.state.price == 3) {
			apiCall += "&price=1, 2, 3";
		} else if (this.state.price == 4) {
			apiCall += "&price=1, 2, 3, 4";
		}
	}

	apiCall += "&limit=50";

    console.log('test');
    var yelpKey = 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx';


    fetch(apiCall, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + yelpKey,
      },
      body: undefined,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.state.responseJson = responseJson.businesses;
        console.log(responseJson.businesses);
        int rand = Math.floor(Math.random() * 50);
        $scope.business = new Business(responseJson.businesses.businesses[rand]);
        console.log(rand);
        AsyncStorage.setItem('business', $scope.business);
        console.log($scope.business);
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  /**
  * Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  function getRandomInt() {
    var min = 0;
    var max = 49;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

  toggleSave() {

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
  },


});

export default RandomPlace;
