import { View, StyleSheet, Modal, Text } from 'react-native'
import React, { useState } from 'react'
import { Icon, } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BottomSheet } from '@rneui/themed'
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';


const ColorPickerALT = () => {
  const onSelectColor = ({ hex }) => {
    console.log(hex);
  }

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <View>
      <View style={pickerStyles.iconView}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
            <Icon source="format-paint" size={25} color={'#282828'} />
          </TouchableOpacity>
        </View>
      </View>

      {modalOpen ? (
        <View>
          <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
            {/* <Preview /> */}
            {/* <Panel1 /> */}
            {/* <HueSlider /> */}
            {/* <OpacitySlider /> */}
            <Swatches />
          </ColorPicker>
          <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
            <Icon source="format-paint" size={25} color={'#282828'} />
          </TouchableOpacity>
        </View>) : null}
    </View>
  )
}

const pickerStyles = StyleSheet.create({
  iconView: {
    backgroundColor: '#65C393',
    width: 50,
    borderRadius: 10,
    padding: 5,
  },
  BackDropContainer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    marginTop: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})

export default ColorPickerALT