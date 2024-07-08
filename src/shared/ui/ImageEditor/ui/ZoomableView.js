import React, {useState} from 'react';
import {View} from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';

const ZoomableView = ({children, disablePan}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [lastScale, setLastScale] = useState(1);
  const [lastTranslateX, setLastTranslateX] = useState(0);
  const [lastTranslateY, setLastTranslateY] = useState(0);

  const updateLastScale = value => {
    setLastScale(value);
  };

  const updateLastTranslate = (x, y) => {
    setLastTranslateX(x);
    setLastTranslateY(y);
  };

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = lastScale * event.scale;
    },
    onEnd: () => {
      runOnJS(updateLastScale)(scale.value);
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = lastTranslateX + event.translationX;
      translateY.value = lastTranslateY + event.translationY;
    },
    onEnd: () => {
      runOnJS(updateLastTranslate)(translateX.value, translateY.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{flex: 1}}>
        {disablePan ? (
          <Animated.View style={[{flex: 1}, animatedStyle]}>
            {children}
          </Animated.View>
        ) : (
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={[{flex: 1}, animatedStyle]}>
              {children}
            </Animated.View>
          </PanGestureHandler>
        )}
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default ZoomableView;
