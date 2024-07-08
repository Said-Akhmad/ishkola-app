import React, {useState, useRef, useEffect, useCallback} from 'react';
import {PanResponder, View, Alert} from 'react-native';
import Svg, {G, Image, Rect} from 'react-native-svg';
import {PiDeviceRotate} from '../../model/const/controls';
import downloadImageBase64 from '../../../../api/downloadImageBase64';
import {ControlElements} from '../../model/const/images';

const ResizableImage = ({
  editable = true,
  initialX = 50,
  initialY = 50,
  initialWidth = 200,
  initialHeight = 200,
  fileId = 'file_swnV5DFiQagHMvUtJL4afNu1tv',
  imageName,
  handleColor = 'gray',
  onPress,
  onChange,
}) => {
  const [imageData, setImageData] = useState(null);
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [rotation, setRotation] = useState(0);
  const prevPanX = useRef(0);
  const prevPanY = useRef(0);
  const [imageSource, setImageSource] = React.useState(null);

  const fetchImage = useCallback(async () => {
    try {
      if (imageName) {
        const image = ControlElements.find(i => i.name === imageName);
        if (image) {
          setImageSource(image.src);
        } else {
          console.warn(
            `Image with name "${imageName}" not found in ControlElements`,
          );
        }
      } else if (fileId) {
        const base64Image = await downloadImageBase64(fileId);
        setImageSource({uri: base64Image});
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }, [imageName, fileId, ControlElements, downloadImageBase64]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      onPress && onPress();
      return editable;
    },
    onPanResponderGrant: (evt, gestureState) => {
      prevPanX.current = evt.nativeEvent.locationX;
      prevPanY.current = evt.nativeEvent.locationY;
    },
    onPanResponderMove: (evt, gestureState) => {
      const {moveX, moveY} = gestureState;
      const dx = moveX - prevPanX.current;
      const dy = moveY - prevPanY.current;
      setX(x + dx);
      setY(y + dy);
      prevPanX.current = moveX;
      prevPanY.current = moveY;
      if (onChange) {
        onChange(x + dx, y + dy, width, height, rotation);
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
    setRotation(rotation + dy / 2);
    if (onChange) {
      onChange(x, y, width, height, rotation + dy / 2);
    }
  };

  const rotatePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      editable ? handleRotate(gestureState) : null,
  });

  const topLeftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      editable ? handleResize('topLeft', gestureState) : null,
  });

  const topRightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      editable ? handleResize('topRight', gestureState) : null,
  });

  const bottomLeftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      editable ? handleResize('bottomLeft', gestureState) : null,
  });

  const bottomRightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => editable,
    onPanResponderMove: (evt, gestureState) =>
      editable ? handleResize('bottomRight', gestureState) : null,
  });

  return (
    <Svg width="100%" height="100%" position="absolute">
      {imageSource && (
        <Image
          x={x}
          y={y}
          width={width}
          height={height}
          transform={`rotate(${rotation}, ${x + width / 2}, ${y + height / 2})`}
          href={imageSource}
          {...panResponder.panHandlers}
        />
      )}
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
            y={y + height / 2 - 12.5}>
            <Rect width={25} height={25} fill="transparent" />
            <PiDeviceRotate width={25} height={25} />
          </G>
        </>
      )}
    </Svg>
  );
};

export default ResizableImage;
