import React, {useState, useRef} from 'react';
import {PanResponder} from 'react-native';
import Svg, {Ellipse, G, Rect} from 'react-native-svg';
import {PiDeviceRotate} from '../../model/const/controls';

const ResizableCircle = ({
  initialX = 35.398,
  initialY = 66.398,
  fill = '#656565',
  layer = 100,
  initialWidth = 96,
  initialHeight = 93,
  stroke = '#000000',
  strokeWidth = 2,
  handleColor = 'gray',
  rotateHandleColor = 'green',
  editable = true,
  onPress,
  onChange,
}) => {
  const [cx, setCx] = useState(initialX);
  const [cy, setCy] = useState(initialY);
  const [rx, setRx] = useState(initialWidth / 2);
  const [ry, setRy] = useState(initialHeight / 2);
  const [rotation, setRotation] = useState(0);
  const prevPanX = useRef(0);
  const prevPanY = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderGrant: (evt, gestureState) => {
      prevPanX.current = evt.nativeEvent.locationX - cx;
      prevPanY.current = evt.nativeEvent.locationY - cy;
    },
    onPanResponderMove: (evt, gestureState) => {
      const {moveX, moveY} = gestureState;
      const newCx = moveX - prevPanX.current;
      const newCy = moveY - prevPanY.current;
      setCx(newCx);
      setCy(newCy);
      if (onChange) {
        onChange(newCx, newCy, rx * 2, ry * 2);
      }
    },
  });

  const handleResize = (resizeType, gestureState) => {
    const {dx, dy} = gestureState;
    let newRx = rx;
    let newRy = ry;
    let newCx = cx;
    let newCy = cy;

    switch (resizeType) {
      case 'top':
        newRy = ry - dy / 2;
        newCy = cy + dy / 2;
        break;
      case 'bottom':
        newRy = ry + dy / 2;
        newCy = cy + dy / 2;
        break;
      case 'left':
        newRx = rx - dx / 2;
        newCx = cx + dx / 2;
        break;
      case 'right':
        newRx = rx + dx / 2;
        newCx = cx + dx / 2;
        break;
      default:
        break;
    }
    setRx(newRx);
    setRy(newRy);
    setCx(newCx);
    setCy(newCy);
    if (onChange) {
      onChange(newCx, newCy, newRx * 2, newRy * 2);
    }
  };

  const handleRotate = gestureState => {
    const {dy} = gestureState;
    setRotation(rotation + dy / 2); // Измените знак, чтобы изменить направление вращения
  };

  const rotatePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) => handleRotate(gestureState),
  });

  const topPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('top', gestureState),
  });

  const bottomPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('bottom', gestureState),
  });

  const leftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('left', gestureState),
  });

  const rightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('right', gestureState),
  });

  return (
    <Svg width="100%" height="100%" style={{position: 'absolute'}}>
      <Ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transform={`rotate(${rotation}, ${cx}, ${cy})`}
        {...(editable && panResponder.panHandlers)}
        onPress={onPress}
      />
      {editable && (
        <>
          <Rect
            x={cx - 10}
            y={cy - ry - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...topPanResponder.panHandlers}
          />
          <Rect
            x={cx - 10}
            y={cy + ry - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...bottomPanResponder.panHandlers}
          />
          <Rect
            x={cx - rx - 10}
            y={cy - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...leftPanResponder.panHandlers}
          />
          <Rect
            x={cx + rx - 10}
            y={cy - 10}
            width={20}
            height={20}
            fill={handleColor}
            {...rightPanResponder.panHandlers}
          />
          <G
            {...rotatePanResponder.panHandlers}
            x={cx + rx + 20} // Смещение вправо для легкого вращения
            y={cy - 10}>
            <Rect width={25} height={25} fill="transparent" />
            <PiDeviceRotate width={25} height={25} />
          </G>
        </>
      )}
    </Svg>
  );
};

export default ResizableCircle;
