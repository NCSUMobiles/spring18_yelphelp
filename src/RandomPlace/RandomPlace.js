import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, SectionList, Platform, Alert} from 'react-native';
// import {Business} from 'business.js';

//working
// class Business {
//   constructor(){
//     this.id = 1;
//   }
// }

class RandomPlace extends React.Component<ScreenProps<>> {
  constructor(props){
    super(props);
    // this.business = new Business("molinari-delicatessen-san-francisco", "Molinari Delicatessen", "https://s3-media1.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg", false, "https://www.yelp.com/biz/molinari-delicatessen-san-francisco?adjust_creative=7QYPDljoTDYcnSWzBkTvEQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7QYPDljoTDYcnSWzBkTvEQ", 967, {"alias": "delis","title": "Delis"},
    //               4.5, {"latitude": 37.79838,"longitude": -122.40782 }, ["pickup","delivery"], "$$", "address", "+14154212337", "(415) 421-2337", 1455.895063529066);
    // this.business = new Business();
    
    // var asdf = new Business();
    // console.log(asdf.id);
  }

  GetSectionListItem=(item)=>{
      Alert.alert(item);
    }

  render() {

    var A = ['Apple', 'Apricot', 'Avocado','A', 'A', 'A', 'A', 'A', 'A'] ;
    var B = ['Banana', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry'] ;
    var C = ['Cherry', 'Coconut'] ;


    return (
      <View style={{ marginTop : 24}}>
      <SectionList

          sections={[
            { title: 'Fruits Name From A', data: A },
            { title: 'Fruits Name From B', data: B },
            { title: 'Fruits Name From C', data: C },
          ]}

          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }
          renderItem={ ({item}) => <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}> { item } </Text> }
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
    fontSize : 15,
    padding: 5,
    color: '#000',
    backgroundColor : '#F5F5F5'
  }
});

export default RandomPlace;
