import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import imageFlags from '../constants/imageFlags';
export default class modaliconimage extends Component {
    
    render() {
        return (
            <Image 
              source={imageFlags[this.props.url]}
              style={styles.backgroundImage}
            >
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
});