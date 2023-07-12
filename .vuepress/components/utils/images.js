import COS from 'cos-js-sdk-v5';
import { decrypt  } from './encryption'

const cos = new COS({
  SecretId: decrypt('uzL4TyKLmra2qOFVKhtm4Wa6dB0kKQ40RzgaYWt+icXtm1pkfVaB2iJE4S8jILhc'),
  SecretKey: decrypt('abXZc8glazcy8/vegYYl+deAZtLwLU0vNQEaQPXjDzY='),
});

const Bucket = 'toby607-1317049696'
const Region = 'ap-guangzhou'

// 获取图片
export function getImage (Prefix) {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket,
      Region,
      Prefix, // 图片存储路径，根据实际情况修改
      Delimiter: '/',
    }).then((data) => {
      const extensions = ['.jpg', '.png', '.gif', 'jpeg', 'webp'];
      // 从 data.Contents 中获取图片列表
      const imageList = data.Contents.filter(item => extensions.some(ext => item.Key.toLowerCase().endsWith(ext)))
      .map(item=> {
        item.image = `https://${Bucket}.cos.${Region}.myqcloud.com/${item.Key}`
        return item;
      }).sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
      resolve({
        CommonPrefixes:data.CommonPrefixes,
        imageList,
        Prefix:data.Prefix
      })
    }).catch((err) => {
      reject(err);
    });
  })
}
// 上传文件
export function uploadImageToCos (file,Prefix) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket,
      Region,
      Key: Prefix + file.name, // 上传到的路径，根据实际情况修改
      Body: file,
    }).then((data) => { 
      resolve({
        ...data,
        Key:Prefix + file.name
      })
    }).catch((err) => {
      reject(err);
    });
  })
}
// 删除图片
export function deleteImageFromCos (Key) {
  return new Promise((resolve, reject) => {
    cos.deleteObject({
      Bucket,
      Region,
      Key, // 图片的Key，即路径和文件名
    }).then((data) => { 
      resolve({
        ...data,
        Key
      })
    }).catch((err) => {
      reject(err);
    });
  })
}
// 删除文件夹
export function deleteFolderFromCos (Prefix) {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket,
      Region,
      Prefix,
    }).then((data) => {
      return data.Contents.map((content) => ({ Key: content.Key }));
    }).then((objects) => { 
      return cos.deleteMultipleObject({
        Bucket,
        Region,
        Objects:objects, // 要删除的文件列表
      })
    }).then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err);
    });
  })
}
// 新建文件夹
export function createFolderInCos (Prefix,name) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket,
      Region,
      Key: Prefix + name + '/', // 文件夹路径，以斜杠结尾
      Body: '',
    }).then((data) => { 
      resolve({
        ...data,
        Prefix: Prefix + name + '/'
      })
    }).catch((err) => {
      reject(err);
    });
  })
}
