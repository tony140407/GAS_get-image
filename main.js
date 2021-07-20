eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.1/js/exportProperties.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.0/js/createFolder.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.0/js/timeArray.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.0/js/downloadImageToFolder.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.0/js/getImg.js'
  ).getContentText()
);

// ---------------------------
const folderID = ''; // 最外面資料夾ID 如: 2021年天氣學
const excelID = '';

const beforeTime = 6;
const during = 6;
const imgProperties = exportProperties();
const imgParams = exportImgParams();
const dayArray = [20210719, 20210720]; // 你要創的日期 2021年天氣學 > 20210324 ...

function runThisCodeToCreateFolders() {
  Logger.log('建立資料夾中~');
  const createFolders = new CreateFolders(
    excelID,
    folderID,
    dayArray,
    imgParams
  );
  createFolders.init();
}

const getImg = new GetImg();
getImg.setParameter(
  folderID,
  excelID,
  beforeTime,
  during,
  imgProperties,
  imgParams
);

function part1() {
  getImg.getImgToFolder('雷達');
}
function part2() {
  getImg.getImgToFolder('衛星雲圖');
}
function part3() {
  getImg.getImgToFolder('氣溫');
  getImg.getImgToFolder('雨量');
  getImg.getImgToFolder('NCDR風場');
}
function part4() {
  getImg.getImgToFolder('日累積雨量');
  getImg.getImgToFolder('探空');
  getImg.getImgToFolder('JMA天氣圖');
}

// function part2_1() {
//   getImg.getImgToFolder('衛星雲圖', [
//     '衛星雲圖-可見光_台灣',
//     '衛星雲圖-可見光_亞洲',
//   ]);
// }
// function part2_2() {
//   getImg.getImgToFolder('衛星雲圖', [
//     '衛星雲圖-色調強化_台灣',
//     '衛星雲圖-色調強化_亞洲',
//   ]);
// }
// function part2_3() {
//   getImgToFolder('衛星雲圖', ['衛星雲圖-真實色_台灣', '衛星雲圖-真實色_亞洲']);
// }
