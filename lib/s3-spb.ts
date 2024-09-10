// import AWS from "aws-sdk";
import { Readable } from "stream";
import axios from "axios";
import fs from "fs";
import { supabaseClient } from "./supabase";

// 上传文件
export async function uploadImage(
  imageFile: File,
  bucketName: string,
  s3Key: string
) {
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .upload(s3Key, imageFile);
  if (error) {
    console.error("文件上传失败：", error);
    throw error;
  } else {
    console.log("文件上传成功，文件 URL：", data.path);
    return (
      process.env.SUPABASE_URL +
      "" +
      process.env.SUPABASE_STORAGE_URL +
      data.path
    );
  }
}

// 替换文件
export async function replaceFile(
  imageFile: File,
  bucketName: string,
  s3Key: string
) {
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .update(s3Key, imageFile);
  if (error) {
    console.error("文件替换失败", error.message);
  } else {
    console.log("文件替换成功", data.path);
    // await getFiles();
  }
}

// 删除最后一个文件
export async function deleteLastFile(
  files: { value: object[] },
  bucketName: string,
  folderName: string
) {
  if (files.value.length > 0) {
    const lastFile = files.value[files.value.length - 1];
    const { error } = await supabaseClient.storage
      .from(bucketName)
      .remove([`${folderName}/${lastFile}`]);
    if (error) {
      console.error("文件删除失败", error.message);
    } else {
      console.log("文件删除成功");
      // await getFiles();
    }
  }
}

// 下载最后一个文件
export async function downloadLastFile(
  files: { value: object[] },
  bucketName: string,
  folderName: string
) {
  if (files.value.length > 0) {
    const lastFile = files.value[files.value.length - 1];
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .download(`${folderName}/${lastFile}`);
    if (error) {
      console.error("文件下载失败", error.message);
    } else {
      console.log("文件下载成功", data);
      // 使用FileSaver库将文件保存到本地
      // const blob = new Blob([data]);
      // saveAs(blob, lastFile.name);
    }
  }
}

// 预览最后一个文件
export function previewLastFile(
  files: { value: object[] },
  bucketName: string,
  folderName: string
) {
  if (files.value.length > 0) {
    const lastFile = files.value[files.value.length - 1];
    // 获取文件链接，可以在新窗口中打开或通过浏览器支持的预览方式
    const fileLink = supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(`${folderName}/${lastFile}`);
    console.log("文件链接", fileLink.data.publicUrl);
  }
}

// 获取文件列表
export async function getFiles(bucketName: string, folderName: string) {
  const { data, error } = await supabaseClient.storage
    .from(bucketName)
    .list(folderName);
  if (error) {
    console.error("获取文件列表失败", error.message);
  } else {
    return data;
  }
}
