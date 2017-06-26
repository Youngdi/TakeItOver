import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class landBG extends Component {
    render() {
        return (
            <Image 
              source={require('../images/land/bg.png')}
              style={styles.backgroundImage}
              resizeMode={'contain'}
            >
            {this.props.children}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '95%',
        height: null,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    },
});