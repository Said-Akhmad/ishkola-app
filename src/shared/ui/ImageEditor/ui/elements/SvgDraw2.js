import React, {useState, useRef} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SvgDraw = ({
  initialPaths = [],
  strokeWidth = 3,
  strokeColor = 'black',
}) => {
  const [paths, setPaths] = useState(initialPaths);
  const [currentPath, setCurrentPath] = useState('');
  const pathRef = useRef('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('onStartShouldSetPanResponder');
        return true; // Убедитесь, что возвращаете true
      },
      onPanResponderMove: (evt, gestureState) => {
        const {moveX, moveY} = gestureState;
        pathRef.current += `${
          pathRef.current === '' ? 'M' : 'L'
        }${moveX},${moveY} `;
        setCurrentPath(pathRef.current);
        console.log('onPanResponderMove', pathRef.current);
      },
      onPanResponderRelease: () => {
        // Ensure pathRef.current is added to paths before resetting it
        const finalPath = pathRef.current;
        setPaths(prevPaths => {
          const updatedPaths = [...prevPaths, finalPath];
          console.log('onPanResponderRelease', updatedPaths);
          return updatedPaths;
        });
        pathRef.current = '';
        setCurrentPath('');
      },
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
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
