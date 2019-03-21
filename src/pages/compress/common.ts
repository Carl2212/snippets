/**
 * Created by itwo on 29/10/2018.
 */
import b64ToBlob from 'b64-to-blob';

export const ImageContentType = "image/jpeg";

export function getImageInfoByPath(filePath: string): Array<string> {
  let reg = /(.*)\/((?!.*\/)[^\.]*)\.([^\?]*)/;
  let res = filePath.match(reg);
  if(res) {
    let [path , directory , fileName , suffix] = res;
    return [directory , `${fileName}.${suffix}` , suffix];
  }
  return null;
}

//116°20’43”  => 116.34528°
export function latitudeFormat(tude : string) {
  let t = tude.replace(/(\d+)\/(\d+)/g,($0,$1,$2)=>{
    return ($1 / $2).toString();
  })
  let [degree, minute, second] = t.split(',');
  return parseFloat(degree) + (parseFloat(minute) / 60) + (parseFloat(second)/3600);
}

export function base64ToBlob(dataUrl : string): Blob {
  dataUrl = dataUrl.replace(/.*;base64,/,"");
  return b64ToBlob(dataUrl,ImageContentType);
}
