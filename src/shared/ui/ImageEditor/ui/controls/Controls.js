import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  AiOutlineMinus,
  BsImage,
  FaTrash,
  PiCircleDuotone,
  MdOutlineRectangle,
  MdOutlineTextFields,
  FaPencil,
  IoMdMove,
  BsFillCameraFill,
  IoSave,
  MdViewWeek,
} from '../../model/const/controls';
import {ControlElements} from '../../model/const/images';
import {ColorPicker} from './ColorPicker';
import {MultiLineTextInput} from './MultiLineTextInput';

export const Controls = ({
  onImagePicker,
  onCamera,
  onChangeSlider,
  onDeleteLayer,
  onToggleSwitchResizeMode,
  isResizeMode,
  addLayer,
  selectedLayer,
  onSelectColor,
  selectedColor,
  onChangeText,
  onSave,
  text,
  onToggleSwitchGridAngle,
  isGridAngleMode,
}) => {
  const renderControlButton = (icon, onPress) => (
    <TouchableOpacity style={styles.controlButton} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );

  const renderImageLayerButton = (element, index) => (
    <TouchableOpacity
      key={index}
      style={styles.controlButton}
      onPress={() =>
        addLayer({
          type: 'image',
          properties: {
            x: 187,
            y: 148,
            layer: 100,
            scale: 1,
            width: 100,
            height: 200,
            imageName: element.name,
          },
        })
      }>
      <Image source={element.src} resizeMode="contain" style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.controls}>
        {renderControlButton(
          <MdViewWeek
            width="24"
            height="24"
            color={isGridAngleMode ? 'gray' : 'black'}
          />,
          onToggleSwitchGridAngle,
        )}

        {renderControlButton(
          <BsFillCameraFill width="24" height="24" color="black" />,
          onCamera,
        )}
        {renderControlButton(
          <BsImage width="24" height="24" color="black" />,
          onImagePicker,
        )}
        {renderControlButton(
          <AiOutlineMinus width="24" height="24" color="black" />,
          () =>
            addLayer({
              type: 'line',
              properties: {
                initialStartX: 141.398,
                initialStartY: 98.352,
                initialEndX: 243.398,
                initialEndY: 70.352,
                stroke: '#000000',
                strokeWidth: 2,
              },
            }),
        )}
        {renderControlButton(
          <PiCircleDuotone width="24" height="24" color="black" />,
          () =>
            addLayer({
              type: 'ellipse',
              properties: {
                x: 35.398,
                y: 66.398,
                fill: '#656565',
                layer: 100,
                width: 96,
                height: 93,
                stroke: '#000000',
                strokeWidth: 2,
                startDrawingX: 35.398,
                startDrawingY: 66.398,
              },
            }),
        )}
        {renderControlButton(
          <MdOutlineRectangle width="24" height="24" color="black" />,
          () =>
            addLayer({
              type: 'rectangle',
              properties: {
                x: 255.398,
                y: 40.398,
                fill: '#656565',
                layer: 100,
                width: 94,
                height: 71,
                radius: 0,
                stroke: '#000000',
                strokeWidth: 2,
                startDrawingX: 255.398,
                startDrawingY: 40.398,
              },
            }),
        )}
        {renderControlButton(
          <MdOutlineTextFields width="24" height="24" color="black" />,
          () =>
            addLayer({
              type: 'text',
              properties: {
                x: 50,
                y: 50,
                fill: '#000',
                layer: 100,
                fontSize: 20,
                fontFamily: 'Roboto',
                fontWeight: 500,
                textContent: 'Здесь ваш текст',
              },
            }),
        )}
        {renderControlButton(
          <FaPencil width="24" height="24" color="black" />,
          () => addLayer({type: 'Draw'}),
        )}

        {renderControlButton(
          <IoMdMove
            width="24"
            height="24"
            color={isResizeMode ? 'gray' : 'black'}
          />,
          () => onToggleSwitchResizeMode(),
        )}

        {renderControlButton(
          <IoSave width="24" height="24" color="black" />,
          onSave,
        )}

        {ControlElements.map((element, index) =>
          renderImageLayerButton(element, index),
        )}
      </ScrollView>

      {selectedLayer && (
        <View style={styles.selectedLayerContainer}>
          {/*<Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={500}
            step={1}
            value={30}
            onValueChange={onChangeSlider}
            thumbTouchSize={{width: 40, height: 40}}
          />*/}
        </View>
      )}

      {isGridAngleMode && (
        <Slider
          style={styles.slider}
          minimumValue={15}
          maximumValue={180}
          step={1}
          value={30}
          onValueChange={onChangeSlider}
          thumbTouchSize={{width: 40, height: 40}}
        />
      )}

      {selectedLayer && selectedLayer.type === 'Text' && (
        <MultiLineTextInput
          label="Enter your description:"
          placeholder="Type your description here..."
          numberOfLines={2}
          value={text}
          onChangeText={onChangeText}
        />
      )}

      <View style={styles.bottomControls}>
        {selectedLayer &&
          renderControlButton(
            <FaTrash width="24" height="24" color="black" />,
            onDeleteLayer,
          )}
        {selectedLayer &&
          selectedLayer.type !== 'image' &&
          selectedLayer.type !== 'background' && (
            <ColorPicker
              onSelectColor={onSelectColor}
              selectedColor={selectedColor}
            />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
    borderColor: 'gray',
  },
  selectedLayerContainer: {
    alignItems: 'center',
    zIndex: 100,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    width: '90%',
  },
  image: {
    width: 30,
    height: 30,
  },
});
