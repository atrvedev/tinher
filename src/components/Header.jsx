// @flow
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, Text, Button} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';


const h = 56;
export default function Header({
  renderLeft,
  renderCenter,
  renderRight,
}) {
  return (
    <View>
      <SafeAreaView edges={['top']} />
      <View
        style={{
          height: h,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={styles.center}>{renderLeft? renderLeft() : null}</View>
        <View style={styles.center}>{renderCenter? renderCenter() : null}</View>
        <View style={styles.center}>{renderRight? renderRight() : null}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent:'center',
  }
});
