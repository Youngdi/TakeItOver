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
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import Modaliconimage from '../../components/Modaliconimage';
import BackgroundImage from '../../components/BackgroundImage';
import HomeImage from '../../components/HomeImage.js';

const { width, height } = Dimensions.get("window");

export default class TabFourScreenOne extends React.Component {
  static contextTypes = {
    socket: React.PropTypes.object,
  }
  static navigationOptions = {
    title: '領土爭奪戰',
    headerTitleStyle:{
      alignSelf: 'center',
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      title: '領土爭奪戰'
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
  async buy() {
    this.setState({
      visible: true,
    });
    const flag = await api_buyResource(this.state.shopMoney, this.state.shopIcon, this.state.K);
    if (flag.data) {
      this.init();
      Alert.alert(
        '購買成功',
        '歡迎下次再度光臨',
        [
          {text: '確定', onPress: () => {
            this.setState({
              isOpen: false,
              visible: false,
            });
          }},
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        '購買失敗',
        'K寶不足或請輸入可以被3整除的數',
        [
          {text: 'OK', onPress: () => {
            this.setState({
              visible: false,
            })
          }},
        ],
        { cancelable: false }
      )
    }
  }
  componentWillMount() {
    this.context.socket.on('message', (message) => {
      this.setState({
        title: message.A,
      });
    });
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 500);
  }
  onPressSourceButton() {
    alert('A');
  }
  b
  render() {
    console.log(height * 0.15);
    const { socket } = this.context;
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
              title="Loading..."
            />
          }
        >
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableHighlight underlayColor={'rgba(252,252,252,0.5)'} onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{this.state.water}</Text>
                      </View>
                    </TouchableHighlight>
                  </Image>
                </View>
              </View>
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
                  <Text onPress={() => this.setState({isOpen:false})} style={styles.backdropSourceViewClose}>X</Text>
                  <Text style={styles.backdropSourceViewHeadline}>請問你是否要用3顆K寶石換1個{this.state.shopText}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20,marginTop:18}}>3</Text>
                    <Text style={{fontSize:20,marginTop:18, marginLeft:10}}>X</Text>
                    <Image
                      style={{width:50, height:50}}
                      source={require('../../images/modal/K_Jewelry.png')}
                    ></Image>
                    <Text style={{fontSize:20,marginTop:18, marginRight:10}}>=</Text>
                    <Modaliconimage url={this.state.shopIcon}>
                    </Modaliconimage>
                  </View>
                  <View style={{width:250, marginTop:20}}>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={require('../../images/modal/K_Jewelry.png')} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="請輸入數量"
                          keyboardType="numeric"
                          placeholderTextColor="#FFF" 
                          style={styles.input}
                          onChangeText={(val) => this.onChangeText(val)}
                          />
                    </View>
                  </View>
                  <View style={{top:20}}>
                    <Button 
                      title={"確定購買"}
                      onPress={this.buy.bind(this)}
                    >
                    </Button>
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
    marginTop:70,
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
  backdropSourceViewClose:{
    left:135,
    bottom:60,
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
