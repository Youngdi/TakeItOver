'use strict'
import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
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
import Modal from 'react-native-modalbox';
import * as Config from '../../constants/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { getMyUser, api_buyResource } from '../../api/api';
const { width, height } = Dimensions.get("window");

async function getFlagFromSetting() {
    let response = await fetch(`http://${Config.SERVER_IP}:${Config.PORT}/get_setting`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response[0];
}
async function getMyCountry() {
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/get_my_country`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'country': userCountry,
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response[0];
}
export default class TabOneScreenOne extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      board: '',
      country: '',
      K: 0,
      water: 0,
      fire: 0,
      wood: 0,
      stone: 0,
      seed: 0,
      shopIcon:'',
      shopText:'',
    };
  }
  async init() {
    const table_flag = await getFlagFromSetting();
    if (table_flag.changeToDay3 == 'T') {
      const country = await getMyCountry();
      this.setState({
        K: country.K,
        water: country.water,
        fire: country.fire,
        wood: country.wood,
        stone: country.stone,
        seed: country.seed,
        isRefreshing: false
      });
    } else {
      const user = await getMyUser();
      this.setState({
        K: user.K,
        water: user.water,
        fire: user.fire,
        wood: user.wood,
        stone: user.stone,
        seed: user.seed,
        isRefreshing: false
      });
    }
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    this.init();
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
      // console.log(notif);
      //Platform.OS()
      // alert('I recevied a message:');
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
  onPressSourceButton(resource) {
    this.setState({

    });
    this.refs.buy_modal.open();
    //api_buyResource
  }
  onChangeText(val){
    console.log(val)
  }
  render() {
    return(
      <View
        style={{
          flex:1,
          backgroundColor:'rgb(165,186,194)',
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
            <View style={{width:'100%', height:height*0.5, marginBottom:15}} >
              <Image 
                style={{width:'100%', height:'100%'}} 
                source={require('../../images/home/W1.png')}>
              </Image>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/fire.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'fire')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.fire}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/k.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'k')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.K}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
              </View>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/stone.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'stone')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.stone}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/seed.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'seed')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.seed}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/wood.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'wood')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.wood}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
              </View>
              <View style={{width:'100%', height:5}}></View>
            </View>
        </ScrollView>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"buy_modal"}
          isOpen={this.state.isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image 
              style={styles.backdrop} 
              source={require('../../images/BG_top.png')}>
                <View style={styles.backdropSourceView}>
                  <Text style={styles.backdropSourceViewHeadline}>請問你是否要用3顆K寶石換1個木頭</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20,marginTop:18}}>3</Text>
                    <Text style={{fontSize:20,marginTop:18, marginLeft:10}}>X</Text>
                    <Image
                      style={{width:50, height:50}}
                      source={require('../../images/modal/K_Jewelry.png')}
                    ></Image>
                    <Text style={{fontSize:20,marginTop:18, marginRight:10}}>=</Text>
                    <Image
                      style={{width:50, height:50}}
                      source={require('../../images/modal/Wood.png')}
                    ></Image>
                  </View>
                  <View style={{width:250}}>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={require('../../images/modal/K_Jewelry.png')} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="請輸入數量" 
                          placeholderTextColor="#FFF" 
                          style={styles.input}
                          onChangeText={(val) => this.onChangeText(val)}
                          />
                    </View>
                  </View>
                </View>
            </Image>
          </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: 'red',
    fontSize: 32
  },
  contentContainer: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 25 : 0,
    height: height,
    width: width,
  },
  source: {
    flex: 1,
    width: null,
    height: null,
    alignItems:'center',
    justifyContent:'center',
  },
  backdropView: {
    flex:1,
    width: width*0.3,
    height: width*0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    marginTop:70,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgb(255,255,255)'
  },
  sourceSize: {
    width:'100%',
    height: width*0.3,
    flexShrink:1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:300,
  },
  backdrop: {
    left:-16,
    top:-15,
    width: 330,
    height: 330,
  },
  backdropSourceView:{
    flex:1,
    width:330,
    height:330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backdropSourceViewHeadline:{
    marginTop:-50,
    marginBottom:20,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: 'rgb(60,60,60)'
  },
  ImageShadow: {
    width:'100%',
    height:'100%',
    borderWidth: 3,
    borderColor:'rgba(252,252,252,0.5)',
    borderRadius: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
});


        //   <View style={{flex:1, width:'100%', justifyContent:'center'}}>
        //     <Image
        //       style={{width:300, height:300}}
        //       source={require('../../images/BG_top.png')}
        //     >
        //       <View style={{width:300, height:300}}>
        //         <Text
        //         title={`Cancel`}
        //         onPress={() => this.setState({isOpen: false})}>
        //         </Text>
        //      </View>
        //     </Image>
        //  </View>