
class BusinessCard extends React.Component {
  render() {
    return
    <View>
      <View style={styles.CardHeader}>
        <Text style={styles.headerText}> { props.name } </Text>
      </View>
      <View style={styles.SectionListItemStyle}>
        <View>
          <Image
            style={{width: 130, height: 130}}
            source={{uri: props.image_url}}
          />
        </View>
        <View>
          <Text> Rating: { props.rating } </Text>
          <Text> Price: {props.price } </Text>
          <Text onPress={() => Linking.openURL(props.url)}> Link </Text>
          <Text> {props.display_phone} </Text>
        </View>
      </View>

      <View style={styles.SectionListButtonStyle}>
        <View style={styles.cardButtonStyle}>
          <TouchableOpacity activeOpacity = {.5} onPress = {this._callShowDirections} >
            <Image
            style={{width: 60, height: 60}}
            source={require('./img/directions.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardButtonStyle}>
          <TouchableOpacity activeOpacity = {.5} onPress = {this._makeCall}>
            <Image
            style={{width: 60, height: 60}}
            source={require('./img/phone.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardButtonStyle}>
          <TouchableOpacity activeOpacity = {.5} >
            <Image
            style={{width: 60, height: 60}}
            source={require('./img/disk.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>;
  }
}
