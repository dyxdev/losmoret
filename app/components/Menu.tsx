import { Box, Menu, Pressable } from "native-base";
import React, { useState } from "react"
import { Icon } from "./Icon";
import { useStores } from "app/store";


export const UserMenu = (props:any)=> {
    const {
        authenticationStore
    } = useStores()

    return (
        <Box mr={2} alignItems="center" flexDir={"row"}>
        <Icon icon="cart" size={30} color="white" onPress={()=>props.navigation.navigate("Cart")}/>
        <Menu mt={-7} w="190" trigger={triggerProps => {
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