import * as FileSystem from 'expo-file-system';


export const createDownload = (filename:string,url:string,callback?:FileSystem.FileSystemNetworkTaskProgressCallback<FileSystem.DownloadProgressData> | undefined) => {
    const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + `${filename}`,
        {},
        callback
      )
    return downloadResumable  
}
