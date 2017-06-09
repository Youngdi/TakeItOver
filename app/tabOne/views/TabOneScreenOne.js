'use strict'
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Platform,
  TextInput,
  Button,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

const { width, height } = Dimensions.get("window");

export default class TabOneScreenOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      board: '歡迎進入奇妙的世界！'
    };
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    },500);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      visible: false,
      title:'首頁',
      headerTitleStyle:{
        alignSelf: 'center',
        marginLeft: -20,
      },
      headerLeft: (
        <Ionicons.Button
          name="ios-menu"
          color="#185ffe"
          style={{marginLeft:13}}
          backgroundColor="#eeeef2"
          onPress={
            () => navigation.navigate('DrawerOpen')
          }>
        </Ionicons.Button>
      ),
      drawerLabel: '首頁',
      drawerIcon: ({ tintColor }) => (
        <Ionicons
          name={'md-home'}
          size={Platform == 'ios' ? 26 : 20}
          style={{ color: tintColor }}
        />
      ),
    }
  };
  componentDidMount() {
    FCM.on(FCMEvent.Notification, async (notif) => {
      console.log(notif);
      //Platform.OS()
      alert('I recevied a message:');
      // this.setState({
      //   board: notif.notification.body,
      // });
      FCM.presentLocalNotification({
          id: "UNIQ_ID_STRING",                               // (optional for instant notification)
          title: "My Notification Title",                     // as FCM payload
          body: "My Notification Message",                    // as FCM payload (required)
          sound: "default",                                   // as FCM payload
          priority: "high",                                   // as FCM payload
          click_action: "ACTION",                             // as FCM payload
          badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
          number: 10,                                         // Android only
          ticker: "My Notification Ticker",                   // Android only
          auto_cancel: true,                                  // Android only (default true)
          large_icon: "ic_launcher",                           // Android only
          icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
          big_text: "Show when notification is expanded",     // Android only
          sub_text: "This is a subText",                      // Android only
          color: "red",                                       // Android only
          vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
          tag: 'some_tag',                                    // Android only
          group: "group",                                     // Android only
          my_custom_data:'my_custom_field_value',             // extra data you want to throw
          lights: true,                                       // Android only, LED blinking (default false)
          show_in_foreground                                  // notification when app is in foreground (local & remote)
       });
    });
  }
  render() {
    return(
      <View
        style={{
          flex:1,
          backgroundColor:'darkturquoise',
        }}>
        <ScrollView
          style={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              //tintColor="#ff0000"
              title="Loading..."
              //titleColor="#00ff00"
              //colors={['#ff0000', '#00ff00', '#0000ff']}
              //progressBackgroundColor="#ffff00"
            />
          }
        >
        <View
            style={{
              width:width,
              height:height * 1,
              backgroundColor:'darkturquoise',
              justifyContent: 'flex-start',
              alignItems: 'center',
              }}
            >
            <Text style={styles.text}>{this.state.board}</Text>
            <TouchableOpacity
              onPress={ async () => {
                //this.props.navigation.navigate('TabOneDrawerTwo')
                try {
                  const value = await AsyncStorage.getItem('@User');
                  if (value !== null){
                    // We have data!!
                    console.log(value);
                  }
                } catch (error) {
                  console.log(error);
                }
                //console.log(this.props.navigation.state.params.data);
              }}>
            <Text>{'Go to next screen this tab'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => {
              FCM.getFCMToken().then(token => {
                console.log(token);
                alert(token);
              });
            }}>
            <Text>{'dispatch Action Go to next screen this tab'}</Text>
          </TouchableOpacity>
          <View style={styles.diamondContainer}>
            <Text style={styles.diamondText}>
              寶石：10000
              </Text>
          </View>
          <View style={styles.resourceContainer}>
            <View style={styles.resourceRow1}>
              <Text style={styles.resourceText}>
              金：9999
              </Text>
              <Text style={styles.resourceText}>
              木：9999
              </Text>
              <Text style={styles.resourceText}>
              水：9999
              </Text>
            </View>
            <View style={styles.resourceRow2}>
              <Text style={styles.emptyText}></Text>
              <Text style={styles.resourceText}>
              火：9999
              </Text>
              <Text style={styles.resourceText}>
              土：9999
              </Text>
              <Text style={styles.emptyText}></Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    )
  }
}
console.log(height);
const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 32
  },
  contentContainer: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 25 : 0,
    height: height,
    width: width,
  },
  diamondContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  // alignContent: 'center',
  // flexWrap: 'nowrap',
  // alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0)',
  marginTop: 50,
  },
  diamondText: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: 150,
    height: 150,
    lineHeight: 150,//vertical position
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#D25141',
    padding: 0,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: '#F9CF7A',
    // padding: 10,
  },
  resourceContainer: {
    flex: 2,
    // justifyContent: 'flex-end',
    // alignContent: 'center',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: '#D25141',
  },
  resourceRow1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  resourceRow2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  emptyText: {
    flex: 0.5,
  },
  resourceText: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'aqua',
    color: '#F9CF7A',
    fontSize: 16,
    lineHeight: 32,
    padding: 0,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#F9CF7A',
  },
});
