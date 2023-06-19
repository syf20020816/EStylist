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
