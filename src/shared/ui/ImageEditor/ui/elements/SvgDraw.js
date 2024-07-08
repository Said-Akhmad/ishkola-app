import React, {useState, useRef} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SvgDraw = ({
  initialPaths = [],
  strokeWidth = 3,
  strokeColor = 'black',
  editable = true,
}) => {
  const [paths, setPaths] = useState(initialPaths);
  const [currentPath, setCurrentPath] = useState('');
  const pathRef = useRef('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => editable,
      onPanResponderMove: (evt, gestureState) => {
        if (!editable) {
          return;
        }
        const {moveX, moveY} = gestureState;
        pathRef.current += `${
          pathRef.current === '' ? 'M' : 'L'
        }${moveX},${moveY} `;
        setCurrentPath(pathRef.current);
      },
      onPanResponderRelease: () => {
        if (!editable) {
          return;
        }
        const finalPath = pathRef.current;
        setPaths(prevPaths => [...prevPaths, finalPath]);
        pathRef.current = '';
        setCurrentPath('');
      },
    }),
  ).current;

  return (
    <View
      {...(editable ? panResponder.panHandlers : {})}
      style={styles.container}
      pointerEvents={editable ? 'auto' : 'none'}>
      <Svg width="100%" height="100%" style={styles.svg}>
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ))}
        <Path
          d={currentPath}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '78%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
  },
  svg: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default SvgDraw;
