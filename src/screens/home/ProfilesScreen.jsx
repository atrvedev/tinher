import React, {
  useCallback,
  useRef,
} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Tinder from '../../assets/svgs/tinder.svg';
import Category from '../../assets/svgs/category.svg';
import Liked from '../../assets/svgs/liked.svg';
import Chat from '../../assets/svgs/chat.svg';
import User from '../../assets/svgs/user.svg';
import Card from '../../components/Card';
import Interactable, { SwipeType } from '../../components/Interactable';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { addLike, addSpecial } from '../../reducer/reactionSlice';
import * as profiles from '../../mocks/profiles.json';

const {width, height} = Dimensions.get('window');
const w = width;
const deltaX = w / 2;

export default function ProfilesScreen({navigation}) {
  const interactableRef = useRef();
  const translate = useSharedValue({});
  const scaleR = useSharedValue(1);
  const scaleL = useSharedValue(1);
  const scaleC = useSharedValue(1);
  const dispatch = useDispatch()

  const rightStyles = useAnimatedStyle(() => ({
    transform: [{scale: scaleR.value}],
  }));
  const leftStyles = useAnimatedStyle(() => ({
    transform: [{scale: scaleL.value}],
  }));
  const centerStyles = useAnimatedStyle(() => ({
    transform: [{scale: scaleC.value}],
  }));

  useAnimatedReaction(
    () => translate.value,
    () => {
      if (translate.value._translateX < -30 && translate.value._translateY > -200) {
        scaleR.value = withSpring(0, {
          damping: 100,
          stiffness: 500,
        });
        scaleL.value = withSpring(1, {
          damping: 100,
          stiffness: 500,
        });
        scaleC.value = withSpring(0, {
          damping: 100,
          stiffness: 500,
        });
      } else if (translate.value._translateX > 30  && translate.value._translateY > -200) {
        scaleR.value = withSpring(1, {
          damping: 100,
          stiffness: 500,
        });
        scaleL.value = withSpring(0, {
          damping: 100,
          stiffness: 500,
        });
        scaleC.value = withSpring(0, {
          damping: 100,
          stiffness: 500,
        });
      } else if(translate.value._translateY < -200) {
        scaleR.value = withSpring(0, {
          damping: 100,
          stiffness: 500,
        });
        scaleL.value = withSpring(0, {
          damping: 100,
          stiffness: 500,
        });
        scaleC.value = withSpring(1, {
          damping: 100,
          stiffness: 500,
        });
      } else {
        scaleR.value = withSpring(1, {
          damping: 100,
          stiffness: 500,
        });
        scaleL.value = withSpring(1, {
          damping: 100,
          stiffness: 500,
        });
        scaleC.value = withSpring(1, {
          damping: 100,
          stiffness: 500,
        });
      }
    },
  );


  const FakeBottom = () => {
    return (
      <View
        style={{position: 'absolute', bottom: 0, width: '100%', zIndex: -1}}>
        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal:40}}>
          <TouchableOpacity style={styles.center}>
            <Tinder width={30} height={30} fill="#FF4458" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              navigation.navigate('Category');
            }}>
            <Category width={30} height={30} fill="#7C8591" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              navigation.navigate('Liked');
            }}>
            <Liked width={30} height={30} fill="#7C8591" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              navigation.navigate('Chat');
            }}>
            <Chat width={30} height={30} fill="#7C8591" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              navigation.navigate('User');
            }}>
            <User width={26} height={26} fill="#7C8591" />
          </TouchableOpacity>
        </View>
        <SafeAreaView edges={['bottom']} />
      </View>
    );
  };

  const setTranslate = useCallback((_translateX, _translateY) => {
    translate.value = {_translateX, _translateY};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor:'white'}}>
      <Header
        renderLeft={() => (
          <Image
            source={require('../../assets/images/tinher.png')}
            style={{height: 35, width: 80}}
            resizeMode="contain"
          />
        )}
        renderRight={() => (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.iconHeader} onPress={() => {}}>
              <Icon name="bell" size={24} color="#7D848F" solid />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconHeader} onPress={() => {}}>
              <Icon name="sliders" size={24} color="#7D848F" solid />
            </TouchableOpacity> */}
          </View>
        )}
      />
      <View style={{position: 'relative'}}>
        <Interactable
          ref={interactableRef}
          data={profiles.list}
          keyExtractor={item => item.id}
          renderItem={({item, index, touched}) => (
            <Card profile={item} touch={touched} />
          )}
          rightComponent={() => (
            <Image
              source={require('../../assets/images/nope.png')}
              style={styles.image}
            />
          )}
          onResponse={({type, item}) => {
            if(type == SwipeType.RIGHT) {
              dispatch(addLike(item))
            } else if (type == SwipeType.TOP) {
              dispatch(addSpecial(item))
            }
          }}
          onChange={setTranslate}
          leftComponent={() => (
            <Image
              source={require('../../assets/images/like.png')}
              style={styles.image}
            />
          )}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -35,
            zIndex:1000,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Animated.View style={leftStyles}>
            <TouchableOpacity
              style={styles.iconMethod}
              onPress={() => {
                interactableRef.current.swipeLeft();
              }}>
              <Icon name="xmark" size={35} color="#F3485B" solid />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={centerStyles}>
            <TouchableOpacity
              style={[
                styles.iconMethod,
                {marginHorizontal: 10, width: 50, height: 50},
              ]}
              onPress={() => {
                interactableRef.current.swipeTop();
              }}>
              <Icon name="star" size={22} color="#1B86F9" solid />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={rightStyles}>
            <TouchableOpacity
              style={styles.iconMethod}
              onPress={() => {
                interactableRef.current.swipeRight();
              }}>
              <Icon name="heart" size={30} color="#199A6A" solid />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <FakeBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconHeader: {
    padding: 10,
    marginLeft: 10,
  },
  iconMethod: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: 'white',
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
});
