// @ts-ignore
import Swipeable from 'react-native-swipeable';
import {Text} from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native';

const leftContent = <TouchableHighlight><Text>Desliza completamente para eliminar</Text></TouchableHighlight>;

const rightButtons = [
  
  <TouchableHighlight key={2}><Text>Button 2</Text></TouchableHighlight>
];

export function Swipable(props:any) {
  return (
    <Swipeable rightButtons={rightButtons} rightButtonWidth={200}>
      {props.children}
    </Swipeable>
  );
}