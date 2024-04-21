import { Box, Menu, Pressable } from "native-base";
import React from "react"
import { Icon } from "./Icon";
import { useStores } from "app/store";
import { CoinSelect } from "./CoinSelect";


export const UserMenu = (props:any)=> {
    const {
        authenticationStore
    } = useStores()

    const styleIcon = {
        marginRight: 15,
        marginLeft: 15
    }
    

    return (
        <Box mr={2} alignItems="center" flexDir={"row"} justifyItems={"center"}>
        <Icon style={styleIcon} icon="cart" size={30} color="white" onPress={()=>props.navigation.navigate("Cart")}/>
        <Menu mr={5} mt={-7} w="190" trigger={triggerProps => {
            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <Icon icon="user" size={30} color="white"/>
                  </Pressable>;
          }}>
              <Menu.Item onPress={async ()=>{
                await authenticationStore.logout()
                props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
                }}>Cerrar Sesión</Menu.Item>
        </Menu>
        </Box>
    )
}