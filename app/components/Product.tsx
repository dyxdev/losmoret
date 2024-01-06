/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, ImageStyle, TouchableOpacity } from 'react-native';
import { Box, Stack, HStack, Center, Heading, Divider, Text, VStack } from 'native-base';

import { spacing } from 'app/theme';
import { Icon } from './Icon';
import { ProductSnapshotOut } from 'app/models/Product';

interface ProductBlockProps {
  product:ProductSnapshotOut
  onPress: (product:ProductSnapshotOut) => void;
  onPressCart: (product:ProductSnapshotOut) => void
}
const defaultImage = require("../../assets/images/ahumado.jpg")

export function ProductBlock(props:ProductBlockProps) {

  return (
    <TouchableOpacity
       onPress={()=>props.onPress(props.product)}
    >
    <Box 
      maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <Box>

        {
          props.product.product_images.length > 0 ? 
          <Image source={{uri:props.product.product_images[0]}} style={style.image} />
          : 
          <Image source={defaultImage} style={style.image} />
        }

        <Center bg="red.500" _dark={{
          bg: "red.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
          {props.product.categ_name}
        </Center>
      </Box>
      <Stack p="4" space={3} backgroundColor="rose.100">
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {props.product.name}
          </Heading>
        </Stack>
        <Text fontWeight="400" textAlign="left" textBreakStrategy='balanced'>
            {props.product.description_sale}
          </Text>
        <Divider backgroundColor="warmGray.300"></Divider>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          
          <Heading size="md" ml="-1">
          { props.product.list_price + " " + props.product.currency_id[1]} 
          </Heading>
          
          <Icon icon='cart' size={30} onPress={()=>props.onPressCart(props.product)}></Icon>
        </HStack>
      </Stack>
    </Box>
    </TouchableOpacity>
  );

}

const style = {
  button: { flex: 1, height: 250, paddingLeft: 4, paddingRight: 4 },
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
  },
  listContentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg + spacing.xl,
    paddingBottom: spacing.lg,
  },
  image: {
    height: 250,
    width: "100%",
    flex: 1,
  } as ImageStyle
}