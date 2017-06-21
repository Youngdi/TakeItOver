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
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import Modaliconimage from '../../components/Modaliconimage';
import BackgroundImage from '../../components/BackgroundImage';
import HomeImage from '../../components/HomeImage';
import GiveScoreDay3 from '../../components/GiveScoreDay3';
import { getMyUser, getMyCountry, getLand, api_buyResource, api_buyLand, api_qrcode, api_giveScoreDay3} from '../../api/api';
import QRCode from '../../constants/qrcode';
const { width, height } = Dimensions.get("window");

export default class TabThreeScreenOne extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const titleName = '尋寶獵人';
    return {
      title: titleName,
      headerTitleStyle:{
        alignSelf: 'center',
        marginRight: -20,
      },
      headerLeft: null,
    };
  };
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      country: '',
      K: 0,
      water: 0,
      fire: 0,
      wood: 0,
      stone: 0,
      seed: 0,
      isOpen: false,
      visible: false,
      q_water:0,
      q_fire:0,
      q_wood:0,
      q_stone:0,
      q_seed:0,
      q_source:'',
      B1: 0,
      B2: 0,
      B3: 0,
      B4: 0,
      B5: 0,
      B6: 0,
      score_modal_isOpen:false,
    };
  }
  async init() {
    const country = await getMyCountry();
    this.setState({
      username: country.username,
      K: country.K,
      water: country.water,
      fire: country.fire,
      wood: country.wood,
      stone: country.stone,
      seed: country.seed,
      B1: country.B1,
      B2: country.B2,
      B3: country.B3,
      B4: country.B4,
      B5: country.B5,
      B6: country.B6,
      isRefreshing: false,
      visible: false,
      score_modal_isOpen:false,
    });
  }
  componentWillMount() {
    if (this.props.navigation.state.params) {
      function RemoveHTML(strText) {
        return strText.replace('://', "").replace('.', "").replace('.', "").replace('/', "");
      }
      const QRcode_money = QRCode[RemoveHTML(this.props.navigation.state.params.data)];
      const flag = api_qrcode(QRcode_money.fire, QRcode_money.water, QRcode_money.wood, QRcode_money.stone, QRcode_money.seed, QRcode_money.source)
      flag.then((data) => {
        if (data.data) {
          this.setState({
            visible: false,
            q_source: QRcode_money.source,
            q_water: QRcode_money.water,
            q_fire: QRcode_money.fire,
            q_stone: QRcode_money.stone,
            q_wood: QRcode_money.wood,
            q_seed: QRcode_money.seed,
          });
          Alert.alert(
          '掃描成功',
          `獲得資源能力加成\n火寶石:${this.state.q_fire}x${data.B.B2}, 水寶石:${this.state.q_water}x${data.B.B3}, 土寶石:${this.state.q_stone}x${data.B.B4}\n木寶石:${this.state.q_wood}x${data.B.B5}, 種子:${this.state.q_seed}x${data.B.B6}`,
          [
            {text: '確定', onPress: () => console.log('yes')},
          ],
            { cancelable: false }
          )
        } else {
          alert('此資源已領取過');
          this.setState({
            visible: false,
            q_source: QRcode_money.source,
            q_water: QRcode_money.water,
            q_fire: QRcode_money.fire,
            q_stone: QRcode_money.stone,
            q_wood: QRcode_money.wood,
            q_seed: QRcode_money.seed,
          });
        }
      })
    }
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    },500);
  }
  onPressSourceButton() {
    this.refs.score_modal.open();
  }
  async giveScore(value) {
    this.setState({
      visible: true,
      score_modal_isOpen:true,
    });
    const flag = await api_giveScoreDay3(value.K, value.Fire, value.Water, value.Wood, value.Stone, value.Seed, value.password);
    if (flag.data) {
      Alert.alert(
      '給分成功',
      `獲得資源能力加成\nK寶石:${value.K}x${flag.B.B1}, 火寶石:${value.Fire}x${flag.B.B2}, 水寶石:${value.Water}x${flag.B.B3}\n土寶石:${value.Stone}x${flag.B.B4}, 木寶石:${value.Wood}x${flag.B.B5}, 種子:${value.Seed}x${flag.B.B6}`,
      [
        {text: '確定', onPress: () => this.init()},
        {text: '前往首頁查看資源', onPress: () => {
          this.setState({
            visible: false,
            score_modal_isOpen:false,
          });
          this.props.navigation.navigate('Home');
        }},
      ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        '密碼錯誤別亂試～',
        '再亂試也沒有用拉～',
        [
          {text: '確定', onPress: () => this.setState({visible: false, score_modal_isOpen:true})}
        ],
          { cancelable: false }
      )
    }
    this.setState({isOpen: false});
  }
  render() {
    return (
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
              title="Loading..."
            />
          }
        >
            <View style={{flex:1, justifyContent:'center', alignItems:'center', width:width, height:height*0.7}}>
              <View style={{width:'100%'}}>
                <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                  <View style={styles.sourceSize}>
                    <Image
                      style={styles.source}
                      source={require('../../images/home/water.png')}>
                      <TouchableHighlight 
                        underlayColor={'rgba(252,252,252,0.5)'} 
                        onPress={() => this.props.navigation.navigate('TabThreeScreenTwo')}>
                        <View style={styles.backdropView}>
                          <Text style={styles.headline}>{' '}</Text>
                        </View>
                      </TouchableHighlight>
                    </Image>
                  </View>
                  <View style={styles.sourceSize}>
                    <Image
                      style={styles.source}
                      source={require('../../images/home/water.png')}>
                      <TouchableHighlight 
                        underlayColor={'rgba(252,252,252,0.5)'} 
                        onPress={() => this.props.navigation.navigate('TabThreeScreenThree')}>
                        <View style={styles.backdropView}>
                          <Text style={styles.headline}>{' '}</Text>
                        </View>
                      </TouchableHighlight>
                    </Image>
                  </View>
                  <View style={styles.sourceSize}>
                    <Image
                      style={styles.source}
                      source={require('../../images/home/water.png')}>
                      <TouchableHighlight 
                        underlayColor={'rgba(252,252,252,0.5)'} 
                        onPress={this.onPressSourceButton.bind(this)}>
                        <View style={styles.backdropView}>
                          <Text style={styles.headline}>{' '}</Text>
                        </View>
                      </TouchableHighlight>
                    </Image>
                  </View>
                  <View style={styles.sourceSize}>
                    <Image
                      style={styles.source}
                      source={require('../../images/home/water.png')}>
                      <TouchableHighlight 
                        underlayColor={'rgba(252,252,252,0.5)'} 
                        onPress={this.onPressSourceButton.bind(this)}>
                        <View style={styles.backdropView}>
                          <Text style={styles.headline}>{' '}</Text>
                        </View>
                      </TouchableHighlight>
                    </Image>
                  </View>
                  <View style={styles.sourceSize}>
                    <Image
                      style={styles.source}
                      source={require('../../images/home/water.png')}>
                      <TouchableHighlight 
                        underlayColor={'rgba(252,252,252,0.5)'} 
                        onPress={this.onPressSourceButton.bind(this)}>
                        <View style={styles.backdropView}>
                          <Text style={styles.headline}>{' '}</Text>
                        </View>
                      </TouchableHighlight>
                    </Image>
                  </View>
                </View>
              </View>
            </View>
        </ScrollView>
        <Modal
          style={[styles.modal]}
          position={"top"}
          ref={"score_modal"}
          isOpen={this.state.score_modal_isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            source={require('../../images/BG_top.png')}>
              <View style={styles.backdropSourceView}>
                <Text onPress={() => this.setState({score_modal_isOpen:false})} style={styles.backdropSourceViewClose}>X</Text>
                <View style={{flex:1, width:'80%', marginTop:0}}>
                  <GiveScoreDay3 Submit={this.giveScore.bind(this)}/>
                </View>
              </View>
            </Image>
          </View>
        </Modal>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
    width: width*0.155,
    height: width*0.155,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    marginTop:0,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgb(255,255,255)'
  },
  sourceSize: {
    width:'100%',
    height: width*0.155,
    flexShrink:1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:400,
    marginTop: Platform.OS == 'ios' ? 25 : 0,
  },
  backdrop: {
    left:-16,
    top:-15,
    width: 330,
    height: 450,
  },
  backdropSourceView:{
    flex:1,
    width:330,
    height:450,
    justifyContent: 'flex-start',
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
  backdropSourceViewClose:{
    left: Platform.OS == 'ios' ? 150 : 135,
    top:15,
    fontSize: 20,
    fontWeight: '800',
    color: 'rgb(255,255,255)'
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
