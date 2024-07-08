import React, {useState, useRef} from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Controls} from './controls/Controls';
import {v4 as uuidv4} from 'uuid';
import ResizableImage from './elements/ResizableImage';
import ResizableLine from './elements/ResizableLine';
import ResizableCircle from './elements/ResizableCircle';
import ResizableSquare from './elements/ResizableSquare';
import DraggableText from './elements/DraggableText';
import SvgDraw from './elements/SvgDraw';
import ZoomableView from './ZoomableView';
import {captureRef} from 'react-native-view-shot';
import {sleep} from '../../../lib/utils/sleep';
import uploadFile from '../../../api/uploadFile';
import saveImageEditor from '../../../api/saveImageEditor';
import GridAngle from './controls/GridAngle';

export const ImageEditor = ({
  schema = [],
  navigation,
  objectData,
  meta,
  onCompleteSave,
}) => {
  const [size, setSize] = useState(15);
  const [layers, setLayers] = useState(schema);
  const [selectedLayer, setSelectedLayer] = useState();
  const [color, setColor] = useState();
  const [text, setText] = useState();
  const editorRef = useRef();
  const [isResizeMode, setIsResizeMode] = useState(false);
  const [isGridAngleMode, setIsGridAngleMode] = useState(false);

  const handleAddLayer = element => {
    const uniqueId = uuidv4(); // Генерация уникального идентификатора
    element = {
      ...element,
      id: uniqueId,
    };
    setLayers(prevLayers => [...prevLayers, element]);
    setSelectedLayer(element);
  };

  const handleChangeSlider = value => {
    const changedLayer = {
      ...selectedLayer,
      size: value,
    };
    setSize(value);
    setSelectedLayer(changedLayer);
    setLayers(
      layers.map(layer =>
        layer.id === selectedLayer?.id ? changedLayer : layer,
      ),
    );
  };

  const handleSelectColor = color => {
    const changedLayer = {
      ...selectedLayer,
      properties: {
        ...selectedLayer.properties,
        fill: color,
        stroke: color,
      },
    };
    setSelectedLayer(changedLayer);
    setLayers(
      layers.map(layer =>
        layer.id === selectedLayer?.id ? changedLayer : layer,
      ),
    );
    setColor(color);
  };

  const handleChangeText = text => {
    const changedLayer = {
      ...selectedLayer,
      text,
    };
    setSelectedLayer(changedLayer);
    setLayers(
      layers.map(layer =>
        layer.id === selectedLayer?.id ? changedLayer : layer,
      ),
    );
    setText(text);
  };

  const handleDeleteLayer = () => {
    setSelectedLayer(null);
    setLayers(layers.filter(layer => layer.id !== selectedLayer?.id));
  };

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
        const responseUpload = await uploadFile(
          response.assets[0].uri,
          'image.png',
        );
        handleAddLayer({
          type: 'background',
          properties: {
            x: 187,
            y: 148,
            layer: 100,
            scale: 1,
            width: 100,
            height: 200,
            fileId: responseUpload.id,
          },
        });
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLaunchCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    await requestCameraPermission();

    launchCamera(options, async response => {
      console.log('response', response);
      if (!response.didCancel && !response.error) {
        const responseUpload = await uploadFile(
          response.assets[0].uri,
          'image.png',
        );
        handleAddLayer({
          type: 'background',
          properties: {
            x: 187,
            y: 148,
            layer: 100,
            scale: 1,
            width: 100,
            height: 200,
            fileId: responseUpload.id,
          },
        });
      }
    });
  };

  const handleChange = (x, y, width, height, rotation) => {
    const changedLayer = {
      ...selectedLayer,
      properties: {
        ...selectedLayer.properties,
        x,
        y,
        width,
        height,
        rotation,
      },
    };
    setSelectedLayer(changedLayer);
    setLayers(
      layers.map(layer =>
        layer.id === selectedLayer?.id ? changedLayer : layer,
      ),
    );
  };

  const handleChangeLine = (x1, y1, x2, y2) => {
    const changedLayer = {
      ...selectedLayer,
      properties: {
        ...selectedLayer.properties,
        x1,
        y1,
        x2,
        y2,
      },
    };
    setSelectedLayer(changedLayer);
    setLayers(
      layers.map(layer =>
        layer.id === selectedLayer?.id ? changedLayer : layer,
      ),
    );
  };

  const handleChangeTextProps = (x, y, fontSize, rotation) => {
    const changedLayer = {
      ...selectedLayer,
      properties: {
        ...selectedLayer.properties,
        x,
        y,
        fontSize,
        rotation,
      },
    };
    setSelectedLayer(changedLayer);
    setLayers(
      layers.map(layer =>
        layer.id === selectedLayer?.id ? changedLayer : layer,
      ),
    );
  };

  const renderLayers = () => {
    return layers?.map((layer, index) => {
      if (layer.type === 'ellipse') {
        return (
          <ResizableCircle
            key={layer.id}
            editable={selectedLayer?.id === layer.id && !isResizeMode}
            onPress={() => !isResizeMode && setSelectedLayer(layer)}
            fill={layer.properties.fill}
            initialWidth={layer.properties.width}
            initialHeight={layer.properties.height}
            initialX={layer.properties.x}
            initialY={layer.properties.y}
            onChange={handleChange}
          />
        );
      }

      if (layer.type === 'rectangle') {
        return (
          <ResizableSquare
            key={layer.id}
            editable={selectedLayer?.id === layer.id}
            onPress={() => setSelectedLayer(layer)}
            fill={layer.properties.fill}
            initialWidth={layer.properties.width}
            initialHeight={layer.properties.height}
            initialX={layer.properties.x}
            initialY={layer.properties.y}
            onChange={handleChange}
          />
        );
      }

      if (layer.type === 'background') {
        return (
          <ResizableImage
            key={layer.id}
            editable={selectedLayer?.id === layer.id}
            onPress={() => setSelectedLayer(layer)}
            initialWidth={layer.properties.width}
            initialHeight={layer.properties.height}
            initialX={layer.properties.x}
            initialY={layer.properties.y}
            fileId={layer.properties.fileId}
            onChange={handleChange}
          />
        );
      }

      if (layer.type === 'image') {
        return (
          <ResizableImage
            key={layer.id}
            editable={selectedLayer?.id === layer.id}
            onPress={() => setSelectedLayer(layer)}
            initialWidth={layer.properties.width}
            initialHeight={layer.properties.height}
            initialX={layer.properties.x}
            initialY={layer.properties.y}
            imageName={layer.properties.imageName}
            onChange={handleChange}
          />
        );
      }

      if (layer.type === 'line') {
        return (
          <ResizableLine
            key={layer.id}
            editable={selectedLayer?.id === layer.id}
            onPress={() => setSelectedLayer(layer)}
            initialStartX={layer.properties.x1}
            initialStartY={layer.properties.y1}
            initialEndX={layer.properties.x2}
            initialEndY={layer.properties.y2}
            stroke={layer.properties.stroke}
            onChange={handleChangeLine}
          />
        );
      }

      if (layer.type === 'text') {
        return (
          <DraggableText
            key={layer.id}
            editable={selectedLayer?.id === layer.id}
            onPress={() => setSelectedLayer(layer)}
            initialText={layer.properties.textContent}
            initialSize={layer.properties.fontSize}
            fontWeight={layer.properties.fontWeight}
            fontFamily={layer.properties.fontFamily}
            initialX={layer.properties.x}
            initialY={layer.properties.y}
            initialFill={layer.properties.fill}
            onChange={handleChangeTextProps}
          />
        );
      }

      if (layer.type === 'Draw') {
        return (
          <SvgDraw
            key={layer.id}
            editable={selectedLayer?.id === layer.id}
            onPress={() => setSelectedLayer(layer)}
            strokeColor={layer.color}
          />
        );
      }
    });
  };

  const handleSave = async () => {
    try {
      setSelectedLayer(null);
      await sleep(500);

      const uri = await captureRef(editorRef, {
        format: 'png',
        quality: 1,
      });

      const responseUploadImage = await uploadFile(uri, 'image.png');

      const thumbnailUri = await captureRef(editorRef, {
        format: 'png',
        quality: 1,
        width: 50, // Width of the thumbnail
        height: 50, // Height of the thumbnail
      });

      console.log('Thumbnail snapshot taken, URI:', thumbnailUri);
      const responseUploadThumbnail = await uploadFile(
        thumbnailUri,
        'thumbnail.png',
      ); // Ensure

      const patchData = {
        metaId: meta.id,
        objectId: objectData.id,
        op: 'replace',
        path: 'imageGroup',
        value: [
          {
            schema: layers,
            image: responseUploadImage.id,
            thumbnail: responseUploadThumbnail.id,
          },
        ],
      };

      const resposeEdit = await saveImageEditor(patchData);
      onCompleteSave && onCompleteSave();
      navigation.goBack();
    } catch (error) {
      console.error('Snapshot or upload failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Controls
        onImagePicker={handleImagePicker}
        onCamera={handleLaunchCamera}
        size={size}
        onChangeSlider={handleChangeSlider}
        addLayer={handleAddLayer}
        selectedLayer={selectedLayer}
        onDeleteLayer={handleDeleteLayer}
        onSelectColor={handleSelectColor}
        selectedColor={color}
        onChangeText={handleChangeText}
        onSave={handleSave}
        text={text}
        isResizeMode={isResizeMode}
        onToggleSwitchResizeMode={() => {
          setSelectedLayer(null);
          setIsResizeMode(!isResizeMode);
        }}
        isGridAngleMode={isGridAngleMode}
        onToggleSwitchGridAngle={() => {
          setIsGridAngleMode(!isGridAngleMode);
        }}
      />
      <ZoomableView disablePan={!isResizeMode}>
        <View
          style={{height: 1000, width: 1000, backgroundColor: 'white'}}
          ref={editorRef}>
          {isGridAngleMode && <GridAngle increment={size} />}
          {renderLayers()}
        </View>
      </ZoomableView>
      {/*<Button title="Take Snapshot" onPress={handleSnapshot} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
