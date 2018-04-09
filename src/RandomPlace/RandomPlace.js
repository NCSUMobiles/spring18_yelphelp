import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, SectionList, Platform, Alert, Image, Linking, TouchableOpacity} from 'react-native';
import { OpenMapDirections } from 'react-native-navigation-directions';

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
  }
}


class RandomPlace extends React.Component<ScreenProps<>> {
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
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + yelpKey,
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
});

export default RandomPlace;
