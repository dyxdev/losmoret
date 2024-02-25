/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle,SafeAreaView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { colors } from "app/theme"
import { WebView } from 'react-native-webview';
import { useLeaveWebView } from "app/hooks/customHeader"
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

const webViewScript = `
  setTimeout(function() { 
    window.postMessage(document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

const onMessage = (payload) => {
  console.log('payload', payload);
};

const handleWebViewNavigationStateChange = (newNavState) => {
  // newNavState looks something like this:
  // {
  //   url?: string;
  //   title?: string;
  //   loading?: boolean;
  //   canGoBack?: boolean;
  //   canGoForward?: boolean;
  // }
  const { url } = newNavState;
  console.log(url)
}

export const PayWebScreen: FC<PayWebScreenProps> = observer(function PayWebScreen(_props) {
  const { navigation } = _props
  useLeaveWebView(navigation)
  const [cookies,setCookies] = useState<string|null>(null)
  

  useEffect( ()=> {

    (async () => {
      try {
        const getCookies =  await AsyncStorage.getItem('cookies') ?? ""
        setCookies(getCookies)
      } catch (err) {
        console.error(err);
      }
    })();

  },[])

  return (
    <SafeAreaView
      
    style={$screenContentContainer}
    >
      <WebView
        source={{ 
          uri: 'https://charcuterialosmoret.com/shop/cart',
        }}
        scrollEnabled={false}
        style={{height: "100%",width:"100%"}}  
        automaticallyAdjustContentInsets={false}
        sharedCookiesEnabled={true}
        pullToRefreshEnabled={true}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
      
    </SafeAreaView>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
  padding: 0,
  backgroundColor: colors.palette.secondary,
  height: "auto",
  bottom: 30

}



