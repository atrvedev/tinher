// @flow
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, Text, Button, Dimensions, Vibration} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function Card({profile, touch}) {
  const [indexAvatar, setIndexAvatar] = useState(0);
  useEffect(() => {
    if (touch) {
      if (touch > Dimensions.get('window').width / 2) {
        if (indexAvatar >= profile.avatar.length - 1) {
          return;
        }
        setIndexAvatar(indexAvatar + 1);
      } else {
        if (indexAvatar == 0) {
          return;
        }
        setIndexAvatar(indexAvatar - 1);
      }
      Vibration.vibrate(500)
    }
  }, [touch]);

  return (
    <View style={StyleSheet.absoluteFill}>

      <FastImage style={styles.image} source={{uri: profile.avatar[indexAvatar]}} />
      <View style={styles.overlay}>
        <View style={{flex: 1}}>
          <View style={{height:4, flexDirection:'row'}}>
            {profile.avatar.length && profile.avatar.map((item, index)=> (
              <View key={index} style={{flex:1, backgroundColor:index == indexAvatar ?'white' : 'transparent', marginLeft: index == 0 ? 0 : 10, borderRadius: 8, borderWidth: 0.5, borderColor:'white'}} >
            
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.name}>{profile.name} <Text style={styles.age}>{profile.age}</Text></Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop: 5}}>
          <Icon name="location-dot" size={15} color="white"  />
          <Text style={{color: 'white', marginLeft: 10}}>Cách xa 9 Km</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 8,
    backgroundColor:'#F2D0D3',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  footer: {
    marginBottom:30
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight:'500'
  },
  age: {
    color: 'white',
    fontSize: 30,
    fontWeight:'300'
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#6ee3b4',
  },
  likeLabel: {
    fontSize: 32,
    color: '#6ee3b4',
    fontWeight: 'bold',
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#ec5288',
  },
  nopeLabel: {
    fontSize: 32,
    color: '#ec5288',
    fontWeight: 'bold',
  },
});
