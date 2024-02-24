/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
import { colors } from "app/theme"
import { Box } from "native-base"
import { WebView } from 'react-native-webview';
import { useBackHeader } from "app/hooks/customHeader"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface PayWebScreenProps extends AppStackScreenProps<"PayWeb"> { }

const INJECTED_JAVASCRIPT = (cookies:string)=>{
  return `(function() {
    window.getCookie = function(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
    }
    document.cookie = ${cookies};
    const tokenLocalStorage = window.localStorage.getItem('presence.focus');
    window.ReactNativeWebView.postMessage(tokenLocalStorage);
    window.ReactNativeWebView.postMessage(window.getCookie('session_id'));
    window.reload()
  })();`
};

const onMessage = (payload) => {
  console.log('payload', payload);
};

export const PayWebScreen: FC<PayWebScreenProps> = observer(function PayWebScreen(_props) {
  useBackHeader()
  const [cookies,setCookies] = useState<string|null>(null)
  const [injectedJs,setInjectedJs] = useState<string>("")

  useEffect( ()=> {

    (async () => {
      try {
        const getCookies =  await AsyncStorage.getItem('cookies') ?? ""
        setCookies(getCookies)
        setInjectedJs(INJECTED_JAVASCRIPT(getCookies))
        console.log(getCookies)
      } catch (err) {
        console.error(err);
      }
    })();

  },[])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
    >
      <Box w="100%" h="100%" flex={1}>
      {
        cookies && <WebView
        source={{ 
          uri: 'https://charcuterialosmoret.com/shop/cart',
        }}
        style={{ width: "100%",height:"100%" }}
        sharedCookiesEnabled={true}
        pullToRefreshEnabled={true}
        onMessage={onMessage}
        
      />
      }
      </Box>  
    </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
  padding: 0,
  backgroundColor: colors.palette.secondary

}



