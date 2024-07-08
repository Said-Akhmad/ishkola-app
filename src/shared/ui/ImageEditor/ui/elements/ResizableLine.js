import React, {useState} from 'react';
import {PanResponder} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';

const DragLine = ({
  initialStartX = 141.398,
  initialStartY = 98.352,
  initialEndX = 243.398,
  initialEndY = 70.352,
  stroke = '#000000',
  strokeWidth = 2,
  hasArrowOnEnd = false,
  hasArrowOnStart = false,
  startColor = 'gray',
  endColor = 'gray',
  editable = true,
  onPress,
  onChange,
}) => {
  const [startX, setStartX] = useState(initialStartX);
  const [startY, setStartY] = useState(initialStartY);
  const [endX, setEndX] = useState(initialEndX);
  const [endY, setEndY] = useState(initialEndY);

  const startPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) => {
      const {moveX, moveY} = gestureState;
      setStartX(moveX);
      setStartY(moveY);
      if (onChange) {
        onChange(moveX, moveY, endX, endY);
      }
    },
  });

  const endPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) => {
      const {moveX, moveY} = gestureState;
      setEndX(moveX);
      setEndY(moveY);
      if (onChange) {
        onChange(startX, startY, moveX, moveY);
      }
    },
  });

  const renderArrow = (x1, y1, x2, y2) => {
    const headLength = 10; // Length of the arrow head
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);

    const arrowX1 = x2 - headLength * Math.cos(angle - Math.PI / 6);
    const arrowY1 = y2 - headLength * Math.sin(angle - Math.PI / 6);
    const arrowX2 = x2 - headLength * Math.cos(angle + Math.PI / 6);
    const arrowY2 = y2 - headLength * Math.sin(angle + Math.PI / 6);

    return (
      <>
        <Line
          x1={x2}
          y1={y2}
          x2={arrowX1}
          y2={arrowY1}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        <Line
          x1={x2}
          y1={y2}
          x2={arrowX2}
          y2={arrowY2}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </>
    );
  };

  return (
    <Svg width="100%" height="100%" position="absolute">
      <Line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={stroke}
        strokeWidth={strokeWidth}
        onPressIn={onPress}
      />
      {hasArrowOnEnd && renderArrow(startX, startY, endX, endY)}
      {hasArrowOnStart && renderArrow(endX, endY, startX, startY)}
      {editable && (
        <>
          <Circle
            cx={startX}
            cy={startY}
            r="10"
            fill={startColor}
            {...startPanResponder.panHandlers}
          />
          <Circle
            cx={endX}
            cy={endY}
            r="10"
            fill={endColor}
            {...endPanResponder.panHandlers}
          />
        </>
      )}
    </Svg>
  );
};

export default DragLine;
