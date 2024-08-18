import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Image, StyleSheet, View, Text, Dimensions, Button} from 'react-native';
import {Gesture, GestureDetector, State} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const SwipeType = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  TOP: 'TOP',
};

const {width, height} = Dimensions.get('window');
const w = width;
const h = height * 0.73;
const deltaX = w / 2;
const deltaY = h / 2;
function Interactable(
  {data, leftComponent, rightComponent, renderItem, keyExtractor, onResponse, onChange},
  ref,
) {
  const thisRef = useRef([]);
  const activeIndex = useSharedValue(0);
  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      if(!thisRef.current[Math.floor(activeIndex.value)]) {
        return
      }
      thisRef.current[Math.floor(activeIndex.value)].swipeLeft();
    },
    swipeRight: () => {
      if(!thisRef.current[Math.floor(activeIndex.value)]) {
        return
      }
      thisRef.current[Math.floor(activeIndex.value)].swipeRight();
    },
    swipeTop: () => {
      if(!thisRef.current[Math.floor(activeIndex.value)]) {
        return
      }
      thisRef.current[Math.floor(activeIndex.value)].swipeTop();
    },
  }));

  return (
    <View style={styles.cards}>
      {data.map((item, index) => (
        <AnimatedItem
          key={keyExtractor(item)}
          ref={el => (thisRef.current[index] = el)}
          {...{
            item,
            index,
            renderItem,
            activeIndex,
            leftComponent,
            rightComponent,
            renderItem,
            onResponse,
            onChange
          }}
        />
      ))}
    </View>
  );
}

const AnimatedItem = forwardRef((props, ref) => {
  const {
    activeIndex,
    item,
    index,
    leftComponent,
    rightComponent,
    renderItem,
    onResponse,
    onChange
  } = props;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const preY = useSharedValue(0);
  const [touched, setTouched] = useState();

  useImperativeHandle(ref, () => ({
    swipeLeft() {
      translateX.value = withSpring(-w * 2, {
        velocity: 10,
      });
      activeIndex.value = withSpring(activeIndex.value + 1);
      onResponse({type: SwipeType.LEFT, item});
    },
    swipeRight() {
      translateX.value = withSpring(w * 2, {
        velocity: 10,
      });
      activeIndex.value = withSpring(activeIndex.value + 1);
      onResponse({type: SwipeType.RIGHT, item});
    },
    swipeTop() {
      translateY.value = withSpring(-h * 2, {
        velocity: 10,
      });
      activeIndex.value = withSpring(activeIndex.value + 1);
      onResponse({type: SwipeType.TOP, item});
    },
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {translateY: translateY.value},
      {
        rotateZ:
          interpolate(
            translateX.value,
            [-1 * deltaX, 0, deltaX],
            [preY.value * -9, 0, preY.value * 9],
            Extrapolation.CLAMP,
          ) + 'deg',
      },
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1],
        ),
      },
    ],
  }));

  const rightStyles = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [(-1 * deltaX) / 4, 0], [1, 0]),
  }));
  const leftStyles = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, deltaX / 4], [0, 1]),
  }));

  const pan = Gesture.Pan()
    .onStart(event => {
      preY.value = event.y > deltaY ? -1 : 1;
    })
    .onTouchesUp(event => {
      if (event.state === State.BEGAN) {
        runOnJS(setTouched)(event.changedTouches[0].x);
      }
    })
    .onChange(event => {
      runOnJS(onChange)(event.translationX, event.translationY);
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      activeIndex.value = interpolate(
        Math.abs(translateX.value),
        [0, 500],
        [index, activeIndex.value + 0.8],
      );
    })
    .onUpdate(event => {
      // console.log('onUpdate');
    })
    .onFinalize(event => {
      runOnJS(onChange)(0, 0);
    })
    .onEnd(event => {
      if (Math.abs(event.velocityX) > 400) {
        // Swipe left or right
        translateX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        runOnJS(onResponse)({
          type: event.velocityX > 0 ? SwipeType.RIGHT : SwipeType.LEFT,
          item,
        });
        activeIndex.value = withSpring(activeIndex.value + 1);
      } else if (event.velocityY < -400) {
        // Swipe up
        translateY.value = withSpring(Math.sign(event.velocityY) * 1000, {
          velocity: event.velocityY,
        });
        runOnJS(onResponse)({
          type: SwipeType.TOP,
          item,
        });
        activeIndex.value = withSpring(activeIndex.value + 1);
      } else {
        translateX.value = withSpring(0, {damping: 80});
        translateY.value = withSpring(0);
      }
    });

  return (
    <>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            {...StyleSheet.absoluteFillObject, zIndex: 999 - index},
            animatedStyles,
          ]}>
          <>
            <View style={styles.overlay}>
              <View style={styles.header}>
                <Animated.View style={[styles.wrap, leftStyles]}>
                  {leftComponent()}
                </Animated.View>
                <Animated.View style={[styles.wrap, rightStyles]}>
                  {rightComponent()}
                </Animated.View>
              </View>
            </View>
            {renderItem({item, index, touched})}
          </>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
  },
  cards: {
    width: w,
    height: h,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  wrap: {
    flex: 1,
    opacity: 0,
  },
});

export default Interactable = forwardRef(Interactable);
