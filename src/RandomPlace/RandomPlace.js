import React from 'react';
<<<<<<< HEAD
import {StyleSheet, View, Text, ScrollView, Button, SectionList, Platform, Alert, Image, Linking, TouchableOpacity} from 'react-native';

//working
class Business {
  constructor(){
    this.id = 1;
    this.name = "Dustin Business";
    this.image_url = "https://facebook.github.io/react-native/docs/assets/favicon.png";
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
=======
import {StyleSheet, View, Text, ScrollView, Picker, Button, Image, TextInput, TouchableHighlight, Dimensions, Animated,  Platform, Alert, Linking, TouchableOpacity} from 'react-native';
//import OAuthSimple from 'oauthsimple'
import image from '../img/yelphelp(final).png'
import { OpenMapDirections } from 'react-native-navigation-directions';
import call from 'react-native-phone-call'



class Business {
  constructor(jsonBusiness){
    this.id = jsonBusiness.id;
    this.name = jsonBusiness.name;
    this.image_url = jsonBusiness.image_url;
    this.is_closed = jsonBusiness.is_closed;
    this.url = jsonBusiness.url;
    this.review_count = jsonBusiness.review_count;
    this.categories = jsonBusiness.categories;
    this.rating = jsonBusiness.rating;
    this.coordinates = jsonBusiness.coordinates;
    this.transactions = jsonBusiness.transactions;
    this.price = jsonBusiness.price;
    this.location = jsonBusiness.location;
    this.phone = jsonBusiness.phone;
    this.display_phone = jsonBusiness.display_phone;
    this.distance = jsonBusiness.distance;
>>>>>>> dev
  }
}


class RandomPlace extends React.Component<ScreenProps<>> {
<<<<<<< HEAD
  constructor(props){
    super(props);
  }

  // This method will open up the default navigation app with directions.
  _callShowDirections(){
    const startPoint = {
      longitude: -8.945406,
      latitude: 38.575078
    }

    const endPoint = {
      longitude: 35.784915,
      latitude: -78.690439
    }

		const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
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

    console.log('test');
    var yelpKey = 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx';


    fetch('https://api.yelp.com/v3/businesses/search?term=food&latitude=35.7796&longitude=-78.6382&limit=50', {
=======
		constructor() {
		super()
		this.state = {
			spinValue: new Animated.Value(0),
			responseJson: [],
			price: -1,
			radius: -1,
			term: "",
			show: false,
			timePassed: false,
		}


	}

  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log("first location fetch done");
    //       this.setState({position});
    //     },
    //     (error) => alert(error),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    //   );
  }

  GetSectionListItem=(item)=>{
      Alert.alert(item);
    }


  getLocationAndFetchData(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({position});
          this.fetchData();
        },
        (error) => alert(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
  }

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

	if (this.state.term != "") {
		apiCall += "&term=" + this.state.term;
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
    var yelpKey = 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx';


    fetch(apiCall, {
>>>>>>> dev
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + yelpKey,
      },
      body: undefined,
    })
      .then((response) => response.json())
      .then((responseJson) => {
<<<<<<< HEAD

        console.log(responseJson.businesses);
=======
        var responseJsonBusinesses = responseJson.businesses;
        var arrayLength = responseJsonBusinesses.length;
        var selectedBusiness = Math.floor((Math.random() * arrayLength) + 1);
        console.log(responseJsonBusinesses[selectedBusiness]);
        this.state.selectedBusiness = new Business(responseJsonBusinesses[selectedBusiness]);
        console.log(this.state.selectedBusiness.name);

>>>>>>> dev

      })
      .catch((error) =>{
        console.error(error);
      });
  }

<<<<<<< HEAD
  GetSectionListItem=(item)=>{
      Alert.alert(item);
    }

  render() {

    var A = ['Apple', 'Apricot', 'Avocado','A', 'A', 'A', 'A', 'A', 'A'] ;
    var B = ['Banana', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry'] ;
    var C = ['Cherry', 'Coconut'] ;

    var testBusiness = new Business();


    return (
      <View style={{ marginTop : 24, backgroundColor: '#dfe6e9'}}>
      <SectionList

          sections={[
            {title: "RESULTS", data: [testBusiness, testBusiness, testBusiness, testBusiness, testBusiness]}
            // { title: 'Fruits Name From A', data: A },
            // { title: 'Fruits Name From B', data: B },
            // { title: 'Fruits Name From C', data: C },
          ]}

          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }
          renderItem={ ({item}) =>
            <View style={styles.SectionListItemStyle}>
              <View>
                <Image
                  style={{width: 100, height: 100}}
                  source={{uri: item.image_url}}
                />
              </View>
              <View>
                <Text  onPress={this.GetSectionListItem.bind(this, item)}> { item.name } </Text>
                <Text> Rating: { item.rating } </Text>
                <Text> Price: {item.price } </Text>
                <Text onPress={() => Linking.openURL(item.url)}> Link </Text>
                <Text> {item.display_phone} </Text>
              </View>
              <View>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('./img/directions.png')}
                />
              </View>


            </View>
             }
          keyExtractor={ (item, index) => index }

        />
      </View>
=======


 	async spin() {
    this.getLocationAndFetchData();
		const soundObject = new Expo.Audio.Sound();
		try {
			await soundObject.loadAsync(require('./roulette.mp3'));
			await soundObject.playAsync();
			// Your sound is playing!
		} catch (error) {
			// An error occurred!
		}

		this.state.spinValue.setValue(0);
		Animated.timing(
		this.state.spinValue,
		{
			toValue: 1,
			duration: 7000
		}
		).start();
		this.setView();

		setTimeout(() => {this.setState({show: !this.state.show});}, 6900);
	}
  renderStars(){
    const res = [];
  	for(let i = 1; i <= 5; i++) {
      if(i <= this.state.selectedBusiness.rating ) {
        res.push(
          <Image
          style={{width:25, height:25}}
          source={require('../img/1x/star-gold.png')}
          key={'star_'+i} />
        );
      }
      else {
        res.push(<Image
          style={{width:25, height:25}}
          source={require('../img/1x/star-gray.png')}
          key={'star_'+i} />
        );
      }
    }
    return res;
  }
	setView = () => {
		if( this.state.show ) {
		return(
		(<View style={styles.listViewContainer}>
            <View style={styles.CardHeader}>
              <Text style={styles.headerText}> { this.state.selectedBusiness.categories[0].title.toUpperCase() } </Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {this.renderStars()}
              </View>
            </View>
            <View style={styles.SectionListItemStyle}>
              <View>
                <Image
                  style={{width: Dimensions.get('window').width -25, height: Dimensions.get('window').height / 3}}
                  source={{uri: this.state.selectedBusiness.image_url}}
                />
              </View>
              <View>
                <Text style={{fontSize: 18, paddingBottom: 5}}> { this.state.selectedBusiness.name }  <Text style={{color: 'green'}}>{ this.state.selectedBusiness.price }</Text>
                </Text>

                <Text style={styles.addressText}> { this.state.selectedBusiness.location.display_address[0]}, { this.state.selectedBusiness.location.city}, { this.state.selectedBusiness.location.state} { this.state.selectedBusiness.location.zip_code}
                </Text>

                <Text style={styles.cardLink}
                      onPress={() => Linking.openURL(this.state.selectedBusiness.url)}>
                    Show Reviews
                </Text>

                <Text style={styles.cardText}> {this.state.selectedBusiness.display_phone} </Text>
              </View>
            </View>

            <View style={styles.SectionListButtonStyle}>
              <TouchableOpacity activeOpacity = {.5} onPress = {() => this._callShowDirections(this.state.selectedBusiness.coordinates)} >
                <Image
                style={{width: 20, height: 20}}
                source={require('../img/directions.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = {.5} onPress = {() => this._makeCall(this.state.selectedBusiness.phone)}>
                <Image
                style={{width: 20, height: 20}}
                source={require('../img/phone.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = {.5} >
                <Image
                style={{width: 20, height: 20}}
                source={require('../img/disk.png')}
                />
              </TouchableOpacity>
            </View>
          </View>)) } else {
			return ( null )
		}
	}

	 _callShowDirections = (businessLocations) => {

    if (this.state.position.coords.longitude == null){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({position});
          const startPoint = {
            longitude: this.state.position.coords.longitude,
            latitude: this.state.position.coords.latitude
          }

          const endPoint = {
            longitude: parseFloat(businessLocations.longitude) ,
            latitude: parseFloat(businessLocations.latitude)
          }

      		const transportPlan = 'd';

          OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
            console.log(res)
          });
        },
        (error) => alert(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }
    else{
      const startPoint = {
        longitude: this.state.position.coords.longitude,
        latitude: this.state.position.coords.latitude
      }

      const endPoint = {
        longitude: parseFloat(businessLocations.longitude) ,
        latitude: parseFloat(businessLocations.latitude)
      }

      const transportPlan = 'd';

      OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
        console.log(res)
      });
    }
  }

    _makeCall(businessPhone){

    const args = {
      number: businessPhone, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    call(args).catch(console.error)
  }

  render() {
	  let animationStyle = {
			transform: [{rotate: this.state.spinValue.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '1440deg']
								 })
						}],
      width: 300,
      height: 300
		}
    return (
    <View style= {styles.container}>
  	  <View style={styles.form} >

    		<View style={styles.title}>
				   <View style={{width:Dimensions.get('window').width*(.4), }}></View>
					<TouchableHighlight style={{position:'absolute', marginLeft:5}} onPress={() => {this.setState({show: false});}} >
						<Image source={require('./reload.png')} style={{width:60, height:50}} />
					</TouchableHighlight>
    			<Image source={require('./yelphelp(final).png')} style={{width:100, height:80}} />
    		</View>

    		<View style={{alignItems:'center', top:Dimensions.get('window').height*(.1)}}>
    		<TouchableHighlight style={{position:'absolute'}} onPress={this.spin.bind(this)} >
    				<Animated.Image style={animationStyle} source={require('./roulette.png')}>
    				</Animated.Image>
    		</TouchableHighlight>
			<View>
			{this.setView()}
			</View>
    		</View>
      </View>
    </View>

>>>>>>> dev
    );
  }
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    flex: 1,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionHeaderStyle:{

  backgroundColor : '#CDDC39',
    fontSize : 20,
    padding: 5,
    color: '#fff',
  },

  SectionListItemStyle:{
    padding: 5,
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor : '#FFF',
  }
=======
  	flex: 1,
  	backgroundColor: '#176543',
  },
  categories: {
  	flexDirection: 'row',
  	top: 10,
  	height: 60,
  },
  title: {
  	alignItems: 'center',
  	height: 80,
  	top: 30,
	flexDirection: 'row',
  },
  form: {
	  flex: 1,
	  flexDirection: 'column',
  },
  spinner: {
	  position:'absolute'
  },
  SectionListItemStyle:{
    padding: 5,
    flexDirection: 'column',
    backgroundColor : '#fff',
  },

  CardHeader:{
    margin: 5,
    marginLeft: 10,
    marginRight:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText:{
    color: '#696969',
    fontSize: 24,
    margin: 5,
  },

  cardText: {
    fontSize: 16,
  },

  addressText: {
    fontSize: 16,
    fontStyle: 'italic',
  },

  cardLink: {
    color: 'blue',
    fontSize : 16,
    marginLeft : 5,
  },

  SectionListButtonStyle: {
    padding: 10,
    marginBottom: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor : '#FFF',

  },

  cardButtonStyle: {
    margin: 0,
  },
  listViewContainer: {
    // backgroundColor : '#636e72',
    backgroundColor: '#dfe6e9',
    borderWidth: 2,
    borderColor: '#dfe6e9',
    borderRadius: 15,
  },


>>>>>>> dev
});

export default RandomPlace;
