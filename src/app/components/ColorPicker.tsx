import { View, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, IconButton } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BottomSheet, Slider } from '@rneui/themed'


const ColorPicker = ({onColorChange}) => {
  const [value, setValue] = useState(0)

  const interpolate = (start: number, end: number) => {
    let k = (value - 0) / 10;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  };

  const color = () => {
    let r = interpolate(0, 255);
    let g = interpolate(0, 255);
    let b = interpolate(0, 255);
    return rgbToHex(r, g, b);
  };

  useEffect(() => {
    onColorChange(color())
  }, [value]);
  
  const [modalOpen , setModalOpen] = useState(true)

  return (
    <View>
      <View style={pickerStyles.iconView}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
            <Icon source="format-paint" size={25} color={modalOpen ? '#282828' : color()} />
          </TouchableOpacity>
        </View>
      </View>

      {!modalOpen ? (
        <BottomSheet isVisible={!modalOpen} modalProps={{}} containerStyle={pickerStyles.BackDropContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 40}}>
              <IconButton icon="close"  onPress={() => setModalOpen(!modalOpen)} size={25} iconColor="#000000" />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '300', }}> Seletor de Cor: {color()} </Text>
            <View>
              <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={10}
                minimumTrackTintColor={color()}
                minimumValue={0}
                step={0.1}
                allowTouchTrack
                trackStyle={{ height: 5 }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: color() }}
              />
            </View>
          </View>
        </BottomSheet>) : null}
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

export default ColorPicker