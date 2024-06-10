import { Box, FlatList, HStack, Spacer, VStack,Avatar,Text, Input, SearchIcon, Center } from "native-base"
import React,{ useEffect, useState } from "react"
import { Product } from "app/services/api/products/types"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { PaginateResponse, ResultClass } from "app/services/api"
import { useToastErrorApi } from "./AlertToast"
import { getProductSearch } from "app/services/api/products/service"
import { TouchableHighlight } from "react-native"

export const SearchBox = (props:any)=>{

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [products,setProducts] = useState<Array<Product>>([])
    const { showToastApiError } = useToastErrorApi()

    useEffect(() => {
    
        const unsubscribe = props.navigation.addListener('blur', () => {
           setProducts([])
           setQuery("")
        })
        
        return unsubscribe;
      }, [props.navigation]);

    

    async function onQuery(text:string) {
        setQuery(text)
        setLoading(true)
        const response = await getProductSearch(text)
        if (isGeneralProblem(response)) {
          showToastApiError(response as GeneralApiProblem)
          setLoading(false)
        } else{
          const items = ((response as ResultClass<any>).result.result as PaginateResponse<Product>).items
          setProducts(items)
          setLoading(false)
        }
      }
    return (
        <Center>
            <Box alignItems="center" w="200">
                <Input _focus={{ borderColor: 'white' }} borderBottomColor={"white"} tintColor={"white"} color={"white"} borderColor={"1px solid white"} InputLeftElement={<SearchIcon></SearchIcon>} variant="underlined" value={query} w="90%" onChangeText={onQuery} mx="3" placeholder="Buscar"/>
            </Box>
            {(!loading && products.length > 0 ) && (
               <Box position={"absolute"}  zIndex={500} right={-20} top={20} h={300} bgColor={"#191015"} borderRadius={"10px"} w="150%">
                 <FlatList data={products} renderItem={({
                    item
                }) => <TouchableHighlight onPress={()=>{
                    props.navigation.navigate("ProductDetail", {
                        product:item,
                        categoryName: item?.categ_name ?? ""
                      })
                }}>
                    <Box borderBottomWidth="1" _dark={{
                    borderColor: "muted.50"
                }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                        <HStack alignItems={"center"} m={3} p={3} space={[2, 3]} justifyContent="space-between">
                            <Avatar size="48px" source={{
                                uri: item.logo_url
                            }} />
                            <VStack>
                                <Text fontSize={16} _dark={{
                                    color: "white"
                                }} color="white" bold>
                                    {item.name}
                                </Text>
                            </VStack>
                            <Spacer />
                        </HStack>
                    </Box>
                </TouchableHighlight>} keyExtractor={item => item.id} />
               </Box>
            )}
        </Center>
    )
}