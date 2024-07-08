import React, {useState, useRef} from 'react';
import {PanResponder} from 'react-native';
import Svg, {G, Rect} from 'react-native-svg';
import {PiDeviceRotate} from '../../model/const/controls';

const ResizableSquare = ({
  initialX = 255.398,
  initialY = 40.398,
  initialWidth = 94.00000000000003,
  initialHeight = 71,
  fill = '#656565',
  handleColor = 'gray',
  rotateHandleColor = 'green',
  stroke = '#000000',
  strokeWidth = 2,
  startDrawingX = 255.398,
  startDrawingY = 40.398,
  editable = true,
  onPress,
  onChange,
}) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [rotation, setRotation] = useState(0);
  const prevPanX = useRef(0);
  const prevPanY = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      onPress && onPress();
      return editable;
    },
    onPanResponderGrant: (evt, gestureState) => {
      prevPanX.current = evt.nativeEvent.locationX - x;
      prevPanY.current = evt.nativeEvent.locationY - y;
    },
    onPanResponderMove: (evt, gestureState) => {
      const {moveX, moveY} = gestureState;
      setX(moveX - prevPanX.current);
      setY(moveY - prevPanY.current);
      if (onChange) {
        onChange(
          moveX - prevPanX.current,
          moveY - prevPanY.current,
          width,
          height,
          rotation,
        );
      }
    },
  });

  const handleResize = (resizeType, gestureState) => {
    const {dx, dy} = gestureState;
    switch (resizeType) {
      case 'topLeft':
        setWidth(width - dx);
        setHeight(height - dy);
        setX(x + dx);
        setY(y + dy);
        break;
      case 'topRight':
        setWidth(width + dx);
        setHeight(height - dy);
        setY(y + dy);
        break;
      case 'bottomLeft':
        setWidth(width - dx);
        setHeight(height + dy);
        setX(x + dx);
        break;
      case 'bottomRight':
        setWidth(width + dx);
        setHeight(height + dy);
        break;
      default:
        break;
    }
    if (onChange) {
      onChange(x, y, width, height, rotation);
    }
  };

  const handleRotate = gestureState => {
    const {dy} = gestureState;
    setRotation(rotation + dy / 2); // Change the sign to reverse the rotation direction
    if (onChange) {
      onChange(x, y, width, height, rotation + dy / 2);
    }
  };

  const rotatePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) => handleRotate(gestureState),
  });

  const topLeftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('topLeft', gestureState),
  });

  const topRightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('topRight', gestureState),
  });

  const bottomLeftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('bottomLeft', gestureState),
  });

  const bottomRightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('bottomRight', gestureState),
  });

  return (
    <Svg width="100%" height="100%" style={{position: 'absolute'}}>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform={`rotate(${rotation}, ${x + width / 2}, ${y + height / 2})`}
        {...panResponder.panHandlers}
      />
      {editable && (
        <>
          <Rect
            x={x - 10}
            y={y - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...topLeftPanResponder.panHandlers}
          />
          <Rect
            x={x + width - 10}
            y={y - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...topRightPanResponder.panHandlers}
          />
          <Rect
            x={x - 10}
            y={y + height - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...bottomLeftPanResponder.panHandlers}
          />
          <Rect
            x={x + width - 10}
            y={y + height - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...bottomRightPanResponder.panHandlers}
          />
          <G
            {...rotatePanResponder.panHandlers}
            x={x + width + 10}
            y={y + height / 2 - 10}
            width={20}>
            <Rect width={25} height={25} fill="transparent" />
            <PiDeviceRotate width={25} height={25} />
          </G>
        </>
      )}
    </Svg>
  );
};

export default ResizableSquare;
