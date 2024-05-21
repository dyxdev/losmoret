import { Linking,Platform } from "react-native";


export function dialCall(call:string){
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${call}`; }
    else {phoneNumber = `telprompt:${call}`; }
    Linking.openURL(phoneNumber);
};

export async function sendWhatsAppMessage(){
    const phoneNumber = '+58666060'; // Replace with the recipient's phone number
    const text = encodeURIComponent("Hola, necesito su ayuda :)");

    const url = `whatsapp://send?phone=${phoneNumber}&text=${text}`;

    try {
      await Linking.openURL(url);
      console.log('WhatsApp opened successfully on Android');
    } catch (error) {
      console.error('Error opening WhatsApp on Android:', error);
    }
  };