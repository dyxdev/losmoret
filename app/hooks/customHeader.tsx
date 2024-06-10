import { useToastErrorApi } from "app/components/AlertToast"
import { CoinSelect } from "app/components/CoinSelect"
import { UserMenu } from "app/components/Menu"
import { SearchBox } from "app/components/SearchBox"
import { goBack } from "app/navigators"
import { useStores } from "app/store"
import { colors } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { HStack } from "native-base"
import React from "react"
import {Dimensions} from "react-native"
// eslint-disable-next-line @typescript-eslint/ban-types
export const useCartHeader = (navigation: any) => {
    const window = Dimensions.get('window');
    const width = window.width * window.scale;
    const {
        authenticationStore
    } = useStores()
    useHeader(
        {
            onLeftPress: async () => authenticationStore.logout(),
            onRightPress: () => navigation.navigate("Cart"),
            backgroundColor: colors.palette.bgImage,
            LeftActionComponent: <HStack flex={1} w={width} space={3} justifyItems="center" justifyContent={'space-between'}>
                <CoinSelect />
                <SearchBox navigation={navigation} />
                <UserMenu navigation={navigation} />
            </HStack>
        }
    )
}

export const useBackHeader = (navigation: any) => {
    useHeader(
        {

            leftIcon: 'back',
            leftIconColor: 'white',
            onLeftPress: () => goBack(),
            RightActionComponent: <UserMenu navigation={navigation} />,
            onRightPress: () => navigation.navigate("Cart"),
            backgroundColor: colors.palette.bgImage
        }
    )
}

export const useLeaveWebView = (navigation: any) => {
    const { showToastInfoMessage } = useToastErrorApi()
    useHeader(
        {
            backgroundColor: colors.palette.bgImage,
            leftIcon: 'back',
            leftIconColor: 'white',
            onLeftPress: () => {
                showToastInfoMessage("Sera redirigido a la página principal")
                navigation.navigate("HomeCategorie")
            },

        }
    )
}