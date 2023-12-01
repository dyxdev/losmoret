/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image } from 'react-native';
import { View, Box, Button, VStack } from 'native-base';


import {Text} from './Text';

export function ProductBlock(props) {
  
    return(
        <Box borderRadius="md">
        <VStack>
            <Box>
              <Button style={style.button}>
                <Image source={props.image} style={style.image}/>
                <View style={style.border} />
              </Button>
            </Box>
            <View style={{paddingTop: 0}}>
            <Button style={{flex: 1, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0}}>
                <Box>
                    <Text
                      style={{fontSize: 16}}
                      numberOfLines={1}
                    >{props.title}</Text>
                    <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
                      <View style={style.line} />
                      <Text style={style.price}>{props.price}</Text>
                      <View style={style.line} />
                    </View>
                </Box>
              </Button>
            </View>
          </VStack>
      </Box>
    );
  
}

const style = {
  button: {flex: 1, height: 250, paddingLeft: 4, paddingRight: 4},
  image: {height: 250, width: null, flex: 1},
  leftMargin: {
    marginLeft: 7,
    marginRight: 0,
    marginBottom: 7
  },
  rightMargin: {
    marginLeft: 0,
    marginRight: 7,
    marginBottom: 7
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(253, 253, 253, 0.2)'
  },
  price: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: 1000,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#7f8c8d',
    position: 'absolute',
    top: '52%'
  }
}