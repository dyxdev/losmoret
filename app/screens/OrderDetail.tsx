/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
} from "react-native";

import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { useBackHeader } from "app/hooks/customHeader";
import { ScrollView, Text, Center, HStack, Heading, VStack, Link } from "native-base";
import { colors } from "app/theme";
import { CustomDivider } from "app/components/CustomDivider";

import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import { generateLinkDownload } from "app/utils/download";


const { width: viewportWidth } = Dimensions.get("window");
interface OrderDetailScreenProps extends AppStackScreenProps<"OrderDetail"> { }

export const OrderDetailScreen: FC<OrderDetailScreenProps> = observer(function OrderDetailScreen(_props) {

  const { route, navigation } = _props;
  const item = route.params?.order;

  const [data,setData] = useState()
  const load = ()=>{
    const newdData = item.order_line.map((line)=>{
      console.log(line)
      return {
          Productos: line.product_id[1],
          Cantidad: line.product_uom_qty,
          Tax: line.price_tax,
          Importe: line.price_total
      }
})
setData(newdData)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        load()
    });

    navigation.addListener('beforeRemove', (_) => {
        load()
    })

    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
         load()
  },[])


  useBackHeader(navigation)

  return (
    <ScrollView style={styles.container}>

      <View style={styles.infoRecipeContainer}>
       

      </View>

      <View style={styles.infoContainer}>
      
        <VStack alignItems="start">
        <HStack justifyContent={"space-between"}>
          <Text style={styles.infoRecipeName}>{"Total: "}</Text>
          <Text style={styles.infoRecipeName}>{item.amount_total}</Text>
         </HStack>
          <HStack justifyContent={"space-between"}>
          <Text style={styles.infoRecipeName}>{"Orden de venta: "}</Text>
          <Text style={styles.infoRecipeName}>{item.name}</Text>
         </HStack>
        <HStack>
          <Text style={styles.infoRecipeName}>{"Dirección y facturación de envío: "}</Text>
        </HStack>
          <HStack>
            <Text style={styles.infoRecipeName}>{item.partner_id[1]}</Text>
          </HStack>
          <HStack>
            <Text style={styles.infoRecipeName}>{item.partner_shipping_address}</Text>
          </HStack>
        </VStack>
      </View>

      <VStack p={7} mt={-60}>
      <VStack mt="3" mb="4">
            <Heading fontSize="xl" color={colors.palette.primary}>Términos y condiciones</Heading>
            <CustomDivider></CustomDivider>
            <Link isExternal  _text={{
      fontSize: "xl",
      _light: {
        color: colors.palette.primary
      },
      color: colors.palette.primary
    }} href="https://charcuterialosmoret.com/terms" isUnderlined _hover={{
      _text: {
        _light: {
          color: colors.palette.primary
        },
        color: colors.palette.primary
      }
    }}>
        {"https://charcuterialosmoret.com/terms"}
      </Link>
      </VStack>
      <VStack mb="4">
            <Heading fontSize="xl" color={colors.palette.primary}>Órdenes y facturas</Heading>
            <CustomDivider></CustomDivider>
            <Link isExternal  _text={{
      fontSize: "xl",
      _light: {
        color: colors.palette.primary
      },
      color: colors.palette.primary
    }} href={generateLinkDownload(item.id)} isUnderlined _hover={{
      _text: {
        _light: {
          color: colors.palette.primary
        },
        color: colors.palette.primary
      }
    }}>
        {"Descargar orden en pdf"}
      </Link>
      </VStack>
      </VStack>

      <View style={{marginTop: 0, height: 800}}
      >
          <DataTable
            data={data}
            colNames={['Productos', 'Cantidad', 'Tax', 'Importe','Precio']}
            colSettings={[
              { name: 'Productos', type: COL_TYPES.STRING, width: '30%' }, 
              { name: 'Cantidad', type: COL_TYPES.INT, width: '20%' }, 
              {name: 'Tax', type: COL_TYPES.INT, width: '20%'},
              {name: 'Importe', type: COL_TYPES.INT, width: '30%'},
            ]}
            backgroundColor={'white'}
            headerLabelStyle={{ color: 'white', fontSize: 16 }}
        />
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
    flex: 1,
    backgroundColor: colors.palette.secondary
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
    padding: 20
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10,
    margin: 15,
    color: "white",
    fontWeight: "200"
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoRecipeName: {
    fontSize: 20,
    margin: 5,
    fontWeight: '300',
    color: 'white',
    textAlign: 'left'
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
    color: "white",
    fontWeight: "200"
  },
});


