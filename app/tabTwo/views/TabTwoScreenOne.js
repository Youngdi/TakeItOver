'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, Button, Platform, AsyncStorage, Dimensions, TextInput, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goSecond } from '../../actions/tabTwoAction';
import Puzzle from '../../components/Puzzle';
import Modal from 'react-native-modalbox';
import * as puzzle from '../../constants/puzzle';
import * as Config from '../../constants/config';
import { getMyUser, api_buyHint, api_giveScore } from '../../api/api';
import ScorePuzzle from '../../components/ScorePuzzle';
const { width, height } = Dimensions.get("window");

export default class TabTwoScreenOne extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '九宮格解謎',
      headerTitleStyle:{
        alignSelf: 'center',
      }
    };
  };

  constructor(props) {// like initial function
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
      P10: "",
      character: "",
      hint: "",
      isOpen: false,
      isDisabled: false,
      cost: "0",
      puzzle:"",
    };
  }
  async init() {
    const user = await getMyUser();
    this.setState({
      P1: user.P1,
      P2: user.P2,
      P3: user.P3,
      P4: user.P4,
      P5: user.P5,
      P6: user.P6,
      P7: user.P7,
      P8: user.P8,
      P9: user.P9,
      P10: user.P10,
      isRefreshing: false,
      cost: user.country == 'M' ? "25" : "30",
    });
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    this.init();
  }

  puzzle_click(P_result, P) {
    this.setState({
      puzzle: P,
    })
    if (P_result == 'W') {
      this.setState({
        character: puzzle[P].character,
        hint: puzzle[P].hint
      })
      this.refs.W_modal.open();
    }
    if (P_result == "L") {
      this.refs.L_modal.open();
    }
    if (P_result == "N") {
      this.refs.N_modal.open();
    }
  }

  getHint() {
    alert('提示');
    this.setState({isOpen: false});
  }
  async giveScore(value) {
    const flag = await api_giveScore(value.K, value.password, value.puzzle_result, this.state.puzzle);
    if (flag.data) {
      alert('輸入成功');
      this.init();
    } else {
      alert('密碼錯誤別亂試～');
    }
    this.setState({isOpen: false});
  }
  async buyHint() {
    const flag = await api_buyHint(this.state.cost, this.state.puzzle, 'W');
    if (flag.data) {
      alert('購買成功');
      this.init();
    } else {
      alert('K寶不足');
    }
    this.setState({isOpen: false});
  }
  render() {
    return(
      <View style={{backgroundColor:'rgb(164,183,192)'}}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              title="Loading..."
            />
          }
        >
          <View style={{flex:1, width:width, height:height, justifyContent:'center', alignItems:'center', backgroundColor:'rgb(164,183,192)'}}>

            <View style={{flex:1, width:width*0.8, height:height, justifyContent:'center', alignItems:'center'}}>
              <View style={{width:'100%',height:height * 0.25}}>
                <Image
                  style={{width:'100%',height:height * 0.25}}
                  source={require('../../images/puzzle/top.png')}
                ></Image>
              </View>
              <View style={styles.row1}>
                <Puzzle P_result={this.state.P1} P={'P1'} onClick={this.puzzle_click.bind(this, this.state.P1, 'P1')} />
                <Puzzle P_result={this.state.P2} P={'P2'} onClick={this.puzzle_click.bind(this, this.state.P2, 'P2')} />
                <Puzzle P_result={this.state.P3} P={'P3'} onClick={this.puzzle_click.bind(this, this.state.P3, 'P3')} />
              </View>
              <View style={styles.row1}>
                <Puzzle P_result={this.state.P4} P={'P4'} onClick={this.puzzle_click.bind(this, this.state.P4, 'P4')} />
                <Puzzle P_result={this.state.P5} P={'P5'} onClick={this.puzzle_click.bind(this, this.state.P5, 'P5')} />
                <Puzzle P_result={this.state.P6} P={'P6'} onClick={this.puzzle_click.bind(this, this.state.P6, 'P6')} />
              </View>
              <View style={styles.row1}>
                <Puzzle P_result={this.state.P7} P={'P7'} onClick={this.puzzle_click.bind(this, this.state.P7, 'P7')} />
                <Puzzle P_result={this.state.P8} P={'P8'} onClick={this.puzzle_click.bind(this, this.state.P8, 'P8')} />
                <Puzzle P_result={this.state.P9} P={'P9'} onClick={this.puzzle_click.bind(this, this.state.P9, 'P9')} />
              </View>
              <Puzzle P_result={this.state.P10} P={'P10'} onClick={this.puzzle_click.bind(this, this.state.P10, 'P10')} />
              <View style={{width:'100%',height:height*0.1}}>
                <Image
                  style={{width:'100%',height:height*0.1}}
                  source={require('../../images/puzzle/buttom.png')}
                ></Image>
              </View>
            </View>

          </View>
        </ScrollView>
        <Modal
        style={[styles.modal]}
        position={"center"}
        ref={"W_modal"}
        isOpen={this.state.isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            source={require('../../images/BG_top.png')}>
              <View style={styles.backdropSourceView}>
                <Text onPress={() => this.setState({isOpen:false})} style={styles.backdropSourceViewClose1}>X</Text>
                <Text style={styles.backdropSourceViewHeadline1}>{this.state.character}</Text>
                <Text style={styles.text1}>{this.state.hint}</Text>
              </View>
            </Image>
          </View>
        </Modal>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"L_modal"}
          isOpen={this.state.isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            source={require('../../images/BG_top.png')}>
              <View style={styles.backdropSourceView}>
                <Text onPress={() => this.setState({isOpen:false})} style={styles.backdropSourceViewClose1}>X</Text>
                <Text style={styles.backdropSourceViewHeadline1}>Lose</Text>
                <Text style={styles.text2}>是否花 {this.state.cost} 個K寶石購買提示?</Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => this.setState({isOpen: false})}>
                    <Text style={styles.btn}>取消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.buyHint.bind(this)}>
                    <Text style={styles.btn}>確認</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Image>
          </View>
        </Modal>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"N_modal"}
          isOpen={this.state.isOpen}
        >
          <View style={{flex:1, width:'100%', justifyContent:'center'}}>
            <ScorePuzzle Submit={this.giveScore.bind(this)}/>
            <Button
              title={`Cancel`}
              onPress={() => this.setState({isOpen: false})}
              style={styles.btn}>
           </Button>
         </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contentContainer: {
    paddingVertical: 1,
    backgroundColor:'rgb(164,183,192)'
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row1: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'nowrap',
  },
  baseText: {
   fontFamily: 'Cochin',
   width: 100,
   height: 100,
  },
  titleText: {
     fontSize: 20,
     fontWeight: 'bold',
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
  backdropSourceView:{
    flex:1,
    width:330,
    height:330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backdropSourceViewClose1:{
    width:'100%',
    textAlign:'right',
    marginRight:35,
    height: 40,
    fontSize: 20,
    fontWeight: '800',
    color: 'rgb(255,255,255)'
  },
  backdropSourceViewHeadline1:{
    marginTop: 20,
    height: 50,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: 'rgb(60,60,60)'
  },
  text1: {
    color: "black",
    height: 200,
    fontSize: 18,
    paddingLeft: 40,
    paddingRight: 40,
  },
  text2: {
    color: "#ff4a4a",
    marginTop: 30,
    height: 90,
    fontSize: 18,
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'center'
  },
  btnContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btn: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    height: 30,
    width: 100,
    color: 'white',
    letterSpacing: 2,
    lineHeight: Platform.OS === 'ios' ? 30 : 32
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
});
