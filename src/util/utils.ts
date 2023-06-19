/**
 * 生成GUID
 * @returns
 */
export const generateUUID = (): string => {
  var guid = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
  }
  return guid;
};

/**
 * 解析[2,3]->2,3
 */
export const parseArray = (array: Array<number>): string => {
  let strArr: Array<string> = [];
  array.forEach((x) => {
    strArr.push(x + "px");
  });

  let str = JSON.stringify(strArr);
  str = str.replace("[", "");
  str = str.replace("]", "");
  str = str.replaceAll(",", " ");
  str = str.replaceAll('"', "");

  return str;
};

export const convertImageToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    // 检查文件类型是否为图像类型
    if (!file || !/^image\//.test(file.type)) {
      reject(new Error("文件类型不正确"));
      return;
    }

    // 创建 FileReader 对象
    const reader = new FileReader();

    // 在文件加载完成后，将其转换为 Data URL 并返回
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error("文件读取失败"));
    };

    // 开始读取文件内容
    reader.readAsDataURL(file);
  });
};
