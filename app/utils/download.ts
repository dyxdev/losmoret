import * as FileSystem from 'expo-file-system';
import { create } from "apisauce"

export const createDownload = (filename:string,url:string,callback?:FileSystem.FileSystemNetworkTaskProgressCallback<FileSystem.DownloadProgressData> | undefined) => {
    const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + `${filename}`,
        {},
        callback
      )
    return downloadResumable  
}

export async function downloadAndWrite(url:string,headers:any,filename:string){
  const apisauce = create({
    baseURL: process.env.EXPO_PUBLIC_DOWNLOAD_API_URL,
    timeout: 50000,
  })

  apisauce.get(url,{},{
    headers
  }).then(async (response)=>{
    console.log(response)
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
      FileSystem.cacheDirectory
    );
    if (permissions.granted) {
      try {
        console.log(permissions.directoryUri)
        FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, 'application/pdf')
            .then(async(uri) => {
                console.log(uri)
                await FileSystem.writeAsStringAsync(uri, response.data, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch((e) => {
                console.log(e);
            });
    } catch (e) {
        console.log(e)
    }
    }
    
  })
}

export const generateLinkDownload = (id:string) =>{
  return `${process.env.EXPO_PUBLIC_DOWNLOAD_API_URL}/orders/${id}?report_type=pdf&download=true`
}

/*  const download = async ()=>{
    
  const cookies = await loadString('set-cookies')
  console.log(cookies)
  console.log(`${process.env.EXPO_PUBLIC_DOWNLOAD_API_URL}/orders/145?report_type=pdf&download=true`)
  const url = `/orders/145?report_type=pdf&download=true` 
  await downloadAndWrite(url,{
    "set-cookie":cookies??"",
    "Cookie": cookies ?? "",
    "cookie": cookies ?? "",
    "Set-Cookie": cookies ?? "",
   
  },'myorder.pdf')
  console.log(cookies)
  /*const downloadResumable = createDownloadResumable(
    url,
    FileSystem.documentDirectory + 'myorder.pdf',
    {
      headers:{
        "set-cookie":cookies??"",
        "Cookie": cookies ?? "",
        "cookie": cookies ?? "",
        "Set-Cookie": cookies ?? "",
       
      }
    }

  )
  try {
    const result = await downloadResumable.downloadAsync();
    showToastInfoMessage(`Finished downloading to ${result?.uri} with status ${result?.status}`)

    const downloadResumable2 = FileSystem.createDownloadResumable(
      'https://www.youtube.com/watch?v=gx0gJFCCfyE',
      FileSystem.documentDirectory + 'small.mp4',
      {}
    )

    const result2 = await downloadResumable2.downloadAsync();
    showToastInfoMessage(`Finished downloading to ${result2?.uri} with status ${result2?.status}`)
    
  } catch (e) {
    console.error(e);
    showToastInfoMessage(`error downloading`)
  } 
} */
