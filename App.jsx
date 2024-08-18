import * as React from 'react';
import './gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilesScreen from './src/screens/home/ProfilesScreen';
import CategoryScreen from './src/screens/home/CategoryScreen';
import LikedScreen from './src/screens/home/LikedScreen';
import ChatScreen from './src/screens/home/ChatScreen';
import UserScreen from './src/screens/home/UserScreen';
import Bottom from './src/components/Bottom';
import store from './src/app/store';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function AuthStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={Login} />
//     </Stack.Navigator>
//   );
// }

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Bottom {...props} />}>
      <Tab.Screen name="Profiles" component={ProfilesScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Liked" component={LikedScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Login" component={AuthStack} /> */}
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
