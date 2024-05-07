/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { useCartHeader } from "app/hooks/customHeader";
import { Box, Button, HStack, VStack } from "native-base";
import { colors } from "app/theme";
import NumericInput from "react-native-numeric-input";
import { Icon } from "app/components";
import { add2Cart } from "app/services/api/cart/service"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem";
import { ResultClass } from "app/services/api";
import { CartAddResponse } from "app/services/api/cart/types";
import { useToastErrorApi } from "app/components/AlertToast";

const { width: viewportWidth } = Dimensions.get("window");
interface ProductDetailScreenProps extends AppStackScreenProps<"ProductDetail"> {}

export const ProductDetailScreen: FC<ProductDetailScreenProps> = observer(function ProductDetailScreen(_props) {
        
  const { route,navigation } = _props;

  const item = route.params?.product;
  const title = route.params?.categoryName ?? "";
  const defaultImage = require("../../assets/images/ahumado.jpg")

  const [quantity,setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)

  const { showToastErrorResponse,showToastInfoMessage } = useToastErrorApi()
  
  useCartHeader(navigation)


  const renderImage = ({ item:any }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        {item.logo_url ? 
          <Image source={{uri:item.logo_url}} style={styles.image} />
          : 
          <Image source={defaultImage} style={styles.image} />}
      </View>
    </TouchableHighlight>
  );

  const onPress = () => { 
    setLoading(true)
    add2Cart({
      product_id:Number.parseInt(item.id),
      quantity
    }).then((response:GeneralApiProblem | ResultClass<CartAddResponse>)=>{
      if (isGeneralProblem(response)) {
        showToastErrorResponse(response as GeneralApiProblem)
        setQuantity(0)
        setLoading(false)
      } else{
        const result = (response as ResultClass<CartAddResponse>).result
        showToastInfoMessage(result.message)
        setQuantity(0)
        setLoading(false)
      }
    }).finally(()=>{
        setLoading(false)
    })
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
          {renderImage(item)}
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.name}</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.category}> {title} </Text>
        </View>
        <View style={styles.infoContainer}>
           {item.description_sale && <Text style={styles.category}> {item.description_sale} </Text> } 
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{"¿Qué cantidad desea?"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <VStack>
          <NumericInput 
            value={quantity} 
            onChange={value => {
              if(value > 0){
                setQuantity(value)
              }
            }} 
            minValue={0}
            maxValue={item.qty_available}
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            valueType='real'
            rounded 
            textColor='white' 
            rightButtonBackgroundColor={colors.palette.primary}
            leftButtonBackgroundColor={colors.palette.lightBussines}/>
            <Box h="5"  />
          <Button
            backgroundColor={colors.palette.primary}
            variant="solid"
            onPress={onPress}
            isLoading={loading}
            isLoadingText="Agregando al carrito..."
          >
            <HStack justifyContent={"center"} alignItems="center">
            <Icon icon="cart" size={30} color="white"></Icon>
            <Text style={styles.addCart}>Agregar al carrito</Text>
            </HStack>
            </Button>
          </VStack>
        </View>
        
      </View>
    </ScrollView>
  );

})


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  carousel: {},
  carouselContainer: {
    minHeight: 250,
    backgroundColor: colors.palette.secondary,
  },

  category: {
    fontSize: 20,
    fontWeight: '300',
    margin: 10,
    color: colors.palette.primary,
    
  },
  container: {
    backgroundColor: colors.palette.secondary,
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    marginBottom:10,
    margin: 15,
    color:"white",
    fontWeight:"200"
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  addCart: {
    textAlign: 'left',
    fontSize: 16,
    color:"white",
    fontWeight:"200"
  },
});

  
