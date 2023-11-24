
import React from 'react';
import { Image, Dimensions, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { View  } from 'native-base';
import {Text} from './Text';
import {colors} from './../theme/colors'

interface CategoryProps {
    id: string|number,
    title: string,
    image:string
}  

export function CategoryBlock(props:CategoryProps) {
  
    return(
      <View style={styles.root}>
        <TouchableOpacity
          activeOpacity={0.9}
        >
          <View>
            <Image style={styles.image} source={{uri: props.image}} />
            <View style={styles.overlay} />
            <View style={styles.border} />
            <View style={styles.text}>
              <Text preset='heading' style={styles.subtitle}>{props.title}</Text>
              <Text preset='subheading' style={styles.subtitle}>Shop Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
}


const styles = {
  root:{
     flex:1
  } as ViewStyle,  
  text: {
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  title: {
    textAlign: 'center',
    color: '#fdfdfd',
  } as TextStyle,
  subtitle: {
    textAlign: 'center',
    color: '#fdfdfd',
  } as TextStyle,
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 42, 54, 0.4)'
  } as ViewStyle,
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 3,
    borderColor: colors.palette.redBussinesLigth
  } as ViewStyle,
  image: {
    height: 200,
    width: null,
    flex: 1
  }
};