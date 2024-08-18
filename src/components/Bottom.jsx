// @flow
import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Tinder from '../assets/svgs/tinder.svg';
import Category from '../assets/svgs/category.svg';
import Liked from '../assets/svgs/liked.svg';
import Chat from '../assets/svgs/chat.svg';
import User from '../assets/svgs/user.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function Bottom({state, descriptors, navigation}) {
  const renderIcon = ({name, isFocused}) => {
    switch (name) {
      case 'Profiles':
        return (
          <Tinder
            width={30}
            height={30}
            fill={isFocused ? '#FF4458' : '#7C8591'}
          />
        );
      case 'Category':
        return (
          <Category
            width={30}
            height={30}
            fill={isFocused ? '#FF4458' : '#7C8591'}
          />
        );
      case 'Liked':
        return (
          <Liked
            width={30}
            height={30}
            fill={isFocused ? '#FF4458' : '#7C8591'}
          />
        );
      case 'Chat':
        return (
          <Chat
            width={30}
            height={30}
            fill={isFocused ? '#FF4458' : '#7C8591'}
          />
        );
      case 'User':
        return (
          <User
            width={26}
            height={26}
            fill={isFocused ? '#FF4458' : '#7C8591'}
          />
        );
    }
  };

  return state.index != 0 ? (
    <View style={{backgroundColor:'white'}}>
      <View style={{flexDirection: 'row', zIndex: -999, paddingHorizontal:40, paddingTop: 15}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
              {renderIcon({...route, isFocused})}
            </TouchableOpacity>
          );
        })}
      </View>
      <SafeAreaView edges={['bottom']} />
    </View>
  ) : null;
}
