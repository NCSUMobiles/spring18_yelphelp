import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, Dimensions, Image, TouchableHighlight} from 'react-native';


class LandingPage extends React.Component<ScreenProps<>> {
  constructor(props){
    super(props);
    this.state = {
      numberOfBusinessesWithinTwoMiles : "...",
    }
  }

  componentDidMount(){
    this.getLocationAndFetchData();
  }
  getLocationAndFetchData(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({position});
          console.log("fetching data");
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
    apiCall += "&is_closed=false";
    apiCall += "&radius=3218";
    apiCall += "&limit=50";

    console.log(apiCall);
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
        var responseJsonBusinesses = responseJson.businesses;
        var arrayLength = responseJsonBusinesses.length;
        if (arrayLength >= 50){
          this.setState({numberOfBusinessesWithinTwoMiles: "> " + arrayLength});
        }
        else{
          this.setState({numberOfBusinessesWithinTwoMiles: arrayLength});
        }
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    return (
		<View style={{height:Dimensions.get('window').height}}>
        <View style = {styles.container}>
		  {/*https://github.com/react-native-training/react-native-fonts for list of available fonts*/}
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.05), alignItems:'center'}}>
    		<Image source={require('./yelphelp(final).png')} style={{width:90, height:75}} />
		</View>
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.03)}}>
				<Text style={styles.textTitle}>Welcome back you!</Text>
		</View>


      <TouchableHighlight onPress={() => this.props.navigation.navigate('RandomPlace')} style={styles.bigButton}>
        <View style={styles.listViewContainer}>
          <View style={styles.CardHeader}>
            <Text style={styles.headerText}> PLACES CLOSE TO ME </Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.bigNumberText}> {this.state.numberOfBusinessesWithinTwoMiles} </Text>
          </View>
        </View>
      </TouchableHighlight>

      <View style={{height:30}}></View>


      <TouchableHighlight onPress={() => this.props.navigation.navigate('MySuggestions')} style={styles.bigButton}>
        <View style={styles.listViewContainer}>
          <View style={styles.CardHeader}>
            <Text style={styles.headerText}> SAVED PLACES </Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.bigNumberText}> 100 </Text>
          </View>
        </View>
  		</TouchableHighlight>
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
    //fontFamily: 'Verdana',
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

  },
  cardView: {
    alignItems:'center'
  },

  listViewContainer: {
    backgroundColor: 'white',
    borderRadius: 5,


  },
  CardHeader:{
    backgroundColor: '#2d3436',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerText:{
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,

  },
  // SectionListItemStyle:{
  //   padding: 0,
  //   marginLeft: 0,
  //   marginRight: 0,
  //   flex: 1,
  //   flexDirection: 'row',
  //   backgroundColor : '#FFF',
  //   height: 150,
  // },

  bigNumberText: {
    marginTop: 20,
    marginBottom: 0,
    fontSize: 50,
    textAlign: 'center',
    height: 100,

  },
  cardContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    backgroundColor: '#00000000',

    // height: 100,
  },
  bigButton: {

    marginLeft: 75,
    marginRight: 75,
  }


});

export default LandingPage;
