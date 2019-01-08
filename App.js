/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;

// WelcomeScreen
class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button title="Sign Up" onPress={() => alert('button pressed')} />
      </View>
    );
  }
}

// DashboardScreen
class DashboardScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

// FeedScreen
class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to DetailScreen"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
      </View>
    );
  }
}

// ProfileScreen
class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

// DashboardScreen
class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

// DetailScreen
class Detail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Detail</Text>
      </View>
    );
  }
}

const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Feed',
          headerLeft: (
            <Icon
              style={styles.icon}
              name="md-menu"
              size={30}
              onPress={() => navigation.openDrawer()}
            />
          )
        };
      }
    },
    Detail: {
      screen: Detail
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: (
          <Icon
            style={styles.icon}
            name="md-menu"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});

const SettingsStack = createStackNavigator({
  Profile: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon
            style={styles.icon}
            name="md-menu"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    ProfileStack,
    SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={styles.icon}
            name="md-menu"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  icon: {
    paddingLeft: 10
  }
});
