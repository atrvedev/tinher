import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
const Tab = createMaterialTopTabNavigator();
export default function LikedScreen() {
  const like = useSelector(state => state.reaction.like);
  const special = useSelector(state => state.reaction.special);
  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <Header
        renderCenter={() => (
          <Image
            source={require('../../assets/images/tinher.png')}
            style={{height: 29, width: undefined}}
            resizeMode="contain"
          />
        )}
      />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: 'transparent',
          },
        }}>
        <Tab.Screen
          name={'Like'}
          component={LikeScreen}
          options={{
            title: like.length + ' lượt thích',
          }}
        />
        <Tab.Screen
          name="Special"
          component={SpecialScreen}
          options={{
            title: special.length + ' tuyển chọn',
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

function LikeScreen() {
  const like = useSelector(state => state.reaction.like);

  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <FlatList
        contentContainerStyle={{paddingTop: 10, paddingHorizontal: 5}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={like}
        numColumns={2}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListEmptyComponent={() => <Text style={{textAlign: 'center', marginTop: 10, color:'#7C8591'}}>Chưa có đối tượng</Text>}
      />
    </View>
  );
}

function SpecialScreen() {
  const special = useSelector(state => state.reaction.special);

  return (
    <View style={{flex: 1, backgroundColor:'white'}}>
      <FlatList
        contentContainerStyle={{paddingTop: 10, paddingHorizontal: 5}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={special}
        numColumns={2}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListEmptyComponent={() => <Text style={{textAlign: 'center', marginTop: 10, color:'#7C8591'}}>Chưa có đối tượng</Text>}
      />
    </View>
  );
}

const Item = ({name, age, avatar}) => (
  <View style={styles.item}>
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Image style={styles.image} source={{uri: avatar[0]}} />
      <View style={styles.overlay}>
        <View style={{flex: 1}} />
        <View style={styles.footer}>
          <Text style={styles.name}>
            {name}, {age}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
  },
  item: {
    width: '49%',
    height: 260,
    // padding: 5,
  },
  title: {
    fontSize: 32,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 8,
  },
});
