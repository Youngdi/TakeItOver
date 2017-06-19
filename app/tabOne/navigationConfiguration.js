'use strict'

import React from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
// Screens
import TabOneScreenOne from './views/TabOneScreenOne';
import TabOneScreenTwo from './views/TabOneScreenTwo';
import TabOneScreenThree from './views/TabOneScreenThree';
import TabOneScreenFour from './views/TabOneScreenFour';
import TabOneScreenFive from './views/TabOneScreenFive';
import TabOneScreenSix from './views/TabOneScreenSix';
import TabOneScreenSeven from './views/TabOneScreenSeven';
import * as Config from '../constants/config';

const SideDrawer = (props) => {
  return (
    <ScrollView>
    <View style={styles.DrawerContainer}>
      <View style={styles.drawerIconContainer}>
        <Image  
          source={require('../images/Wealth.png')}
          style={styles.drawerIcon}
        />
      </View>
     
      <DrawerItems {...props} 
        onItemPress={(route) => {
          if (route.route.routeName === 'TabOneDrawerSeven') {
            AsyncStorage.setItem('@isLogined', 'N');
            fetch(`http://${Config.SERVER_IP}:${Config.PORT}/logout`);
            props.navigation.navigate('DrawerClose');
            props.navigation.navigate('Login');
          } else {
            props.navigation.navigate('DrawerClose');
            props.navigation.navigate(route.route.routeName);
          }
        }}/>
    </View>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
    DrawerContainer: {
      flex:1,
      marginTop: Platform == "ios" ? 25 : 0,
      backgroundColor: 'white'
    },
    drawerHeader: {
      flex:1
    },
    drawerIconContainer:{
      height: 200,
      width: '100%',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: 'rgb(165,186,194)'
    },
    drawerIcon: {
        width: 150,
        height: 150,
        // borderRadius:10,
    },
});
const stackNavigatorConfiguration = {
  headerMode: 'none',
}
const tabOneDrawerOne = StackNavigator({
  TabOneScreenOne: { screen: TabOneScreenOne },
  },
  stackNavigatorConfiguration
);

const tabOneDrawerTwo = StackNavigator({
  TabOneScreenTwo: { screen: TabOneScreenTwo },
  },
  stackNavigatorConfiguration
);

const tabOneDrawerThree = StackNavigator({
  TabOneScreenThree: { screen: TabOneScreenThree },
  },
  stackNavigatorConfiguration
);

const tabOneDrawerFour = StackNavigator({
  TabOneScreenFour: { screen: TabOneScreenFour },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerFive = StackNavigator({
  TabOneScreenFour: { screen: TabOneScreenFive },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerSix = StackNavigator({
  TabOneDrawerSix: { screen: TabOneScreenSix },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerSeven = StackNavigator({
  TabOneDrawerSeven: { screen: TabOneScreenSeven },
  },
  stackNavigatorConfiguration
);

const routeConfiguration = {
  TabOneDrawerOne: { screen: tabOneDrawerOne },
  TabOneDrawerTwo: { screen: tabOneDrawerTwo },
  TabOneDrawerThree: { screen: tabOneDrawerThree },
  TabOneDrawerFour: { screen: tabOneDrawerFour },
  TabOneDrawerFive: { screen: tabOneDrawerFive },
  TabOneDrawerSix: { screen: tabOneDrawerSix },
  TabOneDrawerSeven: { screen: tabOneDrawerSeven },
}
// const routeConfiguration = {
//   TabOneDrawerOne: { screen: tabOneDrawerOne },
//   TabOneDrawerTwo: { screen: tabOneDrawerTwo },
//   TabOneDrawerThree: { screen: tabOneDrawerThree },
//   TabOneDrawerFour: { screen: tabOneDrawerFour },
//   TabOneDrawerFive: { screen: tabOneDrawerFive },
//   TabOneDrawerSix: { screen: tabOneDrawerSix },
// }
// going to disable the header for now
const DrawerNavigatorConfiguration = {
  initialRouteName: 'TabOneDrawerOne',
  contentComponent: SideDrawer,
}
export const NavigatorTabOne = DrawerNavigator(routeConfiguration, DrawerNavigatorConfiguration);