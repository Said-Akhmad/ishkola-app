import React, {useState, useRef, useEffect} from 'react';
import {PanResponder} from 'react-native';
import Svg, {Text as SvgText, TSpan, Rect, G} from 'react-native-svg';
import {PiDeviceRotate} from '../../model/const/controls';

const DraggableText = ({
  initialX = 100,
  initialY = 100,
  initialText = '',
  initialColor = 'black',
  initialSize = 16,
  onPress,
  editable = true,
}) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [text, setText] = useState(initialText);
  const [textColor, setTextColor] = useState(initialColor);
  const [textSize, setTextSize] = useState(initialSize);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(
    initialText
      .split('\n')
      .reduce((max, line) => Math.max(max, line.length), 0) *
      initialSize *
      0.6 +
      10,
  );
  const [height, setHeight] = useState(
    initialText.split('\n').length * initialSize * 1.2 + 10,
  );
  const prevPanX = useRef(0);
  const prevPanY = useRef(0);

  useEffect(() => {
    setX(initialX);
    setY(initialY);
    setText(initialText);
    setTextColor(initialColor);
    setTextSize(initialSize);
    setWidth(
      initialText
        .split('\n')
        .reduce((max, line) => Math.max(max, line.length), 0) *
        initialSize *
        0.6 +
        10,
    );
    setHeight(initialText.split('\n').length * initialSize * 1.2 + 10);
  }, [initialX, initialY, initialText, initialColor, initialSize]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      onPress && onPress();
      return true;
    },
    onPanResponderGrant: evt => {
      prevPanX.current = evt.nativeEvent.pageX - x;
      prevPanY.current = evt.nativeEvent.pageY - y;
    },
    onPanResponderMove: (evt, gestureState) => {
      const {moveX, moveY} = gestureState;
      setX(moveX - prevPanX.current);
      setY(moveY - prevPanY.current);
    },
  });

  const handleResize = (resizeType, gestureState) => {
    const {dx, dy} = gestureState;
    switch (resizeType) {
      case 'bottomRight':
        const newWidth = width + dx;
        const newHeight = height + dy;
        const newSize = Math.min(
          newWidth /
            text
              .split('\n')
              .reduce((max, line) => Math.max(max, line.length), 0) /
            0.6,
          newHeight / text.split('\n').length / 1.2,
        );
        setWidth(newWidth);
        setHeight(newHeight);
        setTextSize(newSize);
        break;
      default:
        break;
    }
  };

  const handleRotate = gestureState => {
    const {dy} = gestureState;
    setRotation(rotation + dy / 2);
  };

  const resizePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      handleResize('bottomRight', gestureState),
  });

  const rotatePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) => handleRotate(gestureState),
  });

  return (
    <Svg width="100%" height="100%" style={{position: 'absolute'}}>
      <G
        transform={`translate(${x + width / 2}, ${
          y + height / 2
        }) rotate(${rotation}) translate(${-width / 2}, ${-height / 2})`}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          stroke="gray"
          strokeWidth={editable ? 1 : 0}
          {...panResponder.panHandlers}
        />
        <SvgText x={5} y={textSize} fontSize={textSize} fill={textColor}>
          {text.split('\n').map((line, index) => (
            <TSpan key={index} x={5} dy={index === 0 ? 0 : textSize * 1.2}>
              {line}
            </TSpan>
          ))}
        </SvgText>
        {editable && (
          <>
            <Rect
              x={width - 10}
              y={height - 10}
              width={20}
              height={20}
              fill="gray"
              {...resizePanResponder.panHandlers}
            />
            <Rect
              x={width}
              y={height / 2 - 10}
              width={25}
              height={25}
              fill="transparent"
              {...rotatePanResponder.panHandlers}
            />
            <Svg width="100%" height="100%" style={{position: 'absolute'}}>
              <G x={width} y={height / 2 - 10}>
                <PiDeviceRotate width={25} height={25} />
              </G>
            </Svg>
          </>
        )}
      </G>
    </Svg>
  );
};

export default DraggableText;
