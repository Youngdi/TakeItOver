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
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import Modaliconimage from '../../components/Modaliconimage';
import BackgroundImage from '../../components/BackgroundImage';
import HomeImage from '../../components/HomeImage.js';
import { getMyUser, getMyCountry, getLand, api_buyResource, api_buyLand} from '../../api/api';

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
      headerRight: (
        <Icon.Button 
          name="qrcode" 
          color="#000"
          style={{alignItems:'center', justifyContent:'center' }}
          backgroundColor="#eeeef2" 
          onPress={() => 
            navigation.navigate('TabThreeScreenFour') //QR code Page
          }
        />
      ),
      headerLeft: null,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      board: '歡迎進入奇妙的世界！'
    };
  }
  componentWillMount() {
    if (this.props.navigation.state.params) {
      alert(this.props.navigation.state.params.data);
    }
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    },500);
  }
  onPressSourceButton() {
    alert('123');
  }
  buy() {
    alert('123');
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
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
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
                  <Text style={styles.backdropSourceViewHeadline}>購買此地需要花費</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.fire}</Text>
                    <Modaliconimage url={'fire'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.water}</Text>
                    <Modaliconimage url={'water'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.stone}</Text>
                    <Modaliconimage url={'stone'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.seed}</Text>
                    <Modaliconimage url={'seed'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.wood}</Text>
                    <Modaliconimage url={'wood'} page4={true}>
                    </Modaliconimage>
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
    bottom:110,
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
