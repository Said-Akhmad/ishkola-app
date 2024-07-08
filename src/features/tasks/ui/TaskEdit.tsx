import React from 'react';
import {ScrollView, View} from 'react-native';
import ElementTextInput from 'features/elements/ui/ElementTextInput.js';
import ElementTextarea from 'features/elements/ui/ElementTextarea.js';
import ElementSelect from 'features/elements/ui/ElementSelect.js';
import ElementRadioButtons from 'features/elements/ui/ElementRadioButtons.js';
import ElementCheckbox from 'features/elements/ui/ElementCheckbox.js';
import ElementTimePicker from 'features/elements/ui/ElementTimePicker.js';
import ElementTextInputNumber from 'features/elements/ui/ElementTextInputNumber.js';
import ElementTextHeader from 'features/elements/ui/ElementTextHeader.js';
import ElementTextLabel from 'features/elements/ui/ElementTextLabel.js';
import ElementSelectGroup from 'features/elements/ui/ElementSelectGroup.js';
import ElementDatePicker from 'features/elements/ui/ElementDatePicker.js';

const textInputProps = {
  id: 'e68e31fc-1446-4e7b-8581-8e9d096e4cff',
  name: 'test_text_element_name',
  type: 'text',
  align: null,
  label: 'Test Text',
  width: '',
  height: '',
  disabled: false,
  required: true,
  formEvents: [
    {type: 'onChangeText', handler: text => console.log('Text changed:', text)},
  ],
  placeholder: 'Начните вводить здесь',
  conditionVisibility: 'true',
};

const textInputNumberProps = {
  id: '3fcc43a3-e917-4e0d-9174-3982ef0a3183',
  max: 100,
  min: 0,
  name: 'test_number_name',
  type: 'number',
  align: null,
  label: 'Test Number',
  width: '',
  height: '',
  disabled: false,
  required: true,
  formEvents: [],
  conditionVisibility: 'true',
};

const textareaProps = {
  id: 'd60638f5-b600-4281-8bd2-cb8d3caf7116',
  name: 'test_textarea_name',
  type: 'textarea',
  align: null,
  label: 'Test text area name',
  width: '',
  height: '',
  disabled: false,
  required: true,
  formEvents: [],
  placeholder: 'Начните вводить здесь',
  conditionVisibility: 'true',
};

const selectProps = {
  id: '6b81674c-b5b3-45c4-a4ca-73099fb74669',
  name: 'test_select',
  type: 'select',
  align: null,
  label: 'Test Select Dropdown',
  width: '',
  height: '',
  choices: [
    {label: 'Option name 2', value: 'value2'},
    {label: 'Option name 3', value: 'value3'},
    {label: 'Option name 1', value: 'value1'},
  ],
  disabled: false,
  required: true,
  dictionary: {
    url: 'https://',
    label: '',
    value: '',
    object: '',
  },
  formEvents: [],
  scanBarCode: false,
  isDictionary: false,
  conditionVisibility: 'true',
};

const selectGroupProps = {
  id: '34b82f4c-83e8-4b91-ad13-0c6c98e41268',
  name: 'test_select_group_name',
  type: 'selectGroup',
  align: null,
  label: 'Test Select Group',
  width: '',
  height: '',
  choices: [
    {
      label: 'option 1 value',
      value: 'option1value',
    },
    {
      label: 'option 2 value',
      value: 'option2value',
    },
  ],
  disabled: false,
  required: true,
  dictionary: {
    url: 'https://',
    label: '',
    value: '',
    object: '',
  },
  formEvents: [],
  scanBarCode: false,
  isDictionary: false,
  conditionVisibility: 'true',
};

const radioProps = {
  id: 'd553aabb-b88b-48f0-95fb-d6bb2cbfd13f',
  name: 'test_radio_button_name',
  type: 'radio',
  align: null,
  label: 'Test Radio Button',
  width: '',
  height: '',
  choices: [
    {label: 'Option value 1', value: 'value1'},
    {label: 'Option value 2', value: 'value2'},
    {label: 'Option value 3', value: 'value3'},
  ],
  disabled: false,
  required: true,
  formEvents: [],
  conditionVisibility: 'true',
};

const checkboxProps = {
  id: 'c5507a84-d6d5-40f4-b38b-076c2c9ff8cd',
  name: 'test_checkbox_name',
  type: 'checkbox',
  align: null,
  label: 'Test Checkbox',
  width: '',
  height: '',
  disabled: false,
  required: true,
  formEvents: [],
  conditionVisibility: 'true',
};

const timePickerProps = {
  id: 'd5f01640-d0d2-498f-bd23-e0fc9438fb1d',
  name: 'test_time_name',
  type: 'time',
  align: null,
  label: 'Test Time',
  width: '',
  height: '',
  disabled: false,
  required: true,
  formEvents: [],
  conditionVisibility: 'true',
};

const datePickerProps = {
  id: 'd5f01640-d0d2-498f-bd23-e0fc9438fb1d',
  name: 'test_time_name',
  type: 'time',
  align: null,
  label: 'Test Time',
  width: '',
  height: '',
  disabled: false,
  required: true,
  formEvents: [],
  conditionVisibility: 'true',
};

const textHeaderProps = {
  id: '2a6255a5-84cb-4b8b-9d44-1dc410c69741',
  text: 'Test Header',
  type: 'header',
  align: null,
  width: '',
  height: '',
  formEvents: [],
  conditionVisibility: 'true',
};

const textLabelProps = {
  id: '2a6255a5-84cb-4b8b-9d44-1dc410c69741',
  text: 'Test Header',
  type: 'header',
  align: null,
  width: '',
  height: '',
  formEvents: [],
  conditionVisibility: 'true',
};

const TaskEdit: React.FC = () => {
  return (
    <ScrollView>
      <ElementTextInput {...textInputProps} />
      <ElementTextInputNumber {...textInputNumberProps} />
      <ElementTextarea {...textareaProps} />
      <ElementSelect {...selectProps} />
      <ElementRadioButtons {...radioProps} />
      <ElementCheckbox {...checkboxProps} />
      <ElementTimePicker {...timePickerProps} />
      <ElementDatePicker {...datePickerProps} />
      <ElementTextHeader {...textHeaderProps} />
      <ElementTextLabel {...textLabelProps} />
      <ElementSelectGroup {...selectGroupProps} />
    </ScrollView>
  );
};

// const styles = StyleSheet.create({});

export default TaskEdit;
