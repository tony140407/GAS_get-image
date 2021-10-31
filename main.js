// CDN 載入 Github 程式碼
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.1.3/js/exportProperties.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.1.3/js/createFolder.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.1.3/js/timeArray.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.1.3/js/downloadImageToFolder.js'
  ).getContentText()
);
eval(
  UrlFetchApp.fetch(
    'https://cdn.jsdelivr.net/gh/tony140407/GAS_get-image@1.1.3/js/autocomplete.js'
  ).getContentText()
);

// ---------------------------
const folderID = ''; // 最外面資料夾ID 如: 2021年天氣學
const excelID = '';

const beforeTime = 6; // 單位: 小時
const during = 0.9; // 計時器可以設每小時執行
const imgProperties = exportProperties();
const imgParams = exportImgParams();
const dayArray = [20211029, 20211031]; // 你要創的日期 2021年天氣學 > 20210324 ...

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

const autocomplete = new Autocomplete();
autocomplete.setParameter(
  folderID,
  excelID,
  beforeTime,
  during,
  imgProperties,
  imgParams
);

function part1() {
  autocomplete.getImgToFolder('雷達');
}
function part2() {
  autocomplete.getImgToFolder('衛星雲圖');
}
function part3() {
  autocomplete.getImgToFolder('氣溫');
  autocomplete.getImgToFolder('雨量');
  autocomplete.getImgToFolder('NCDR風場');
}
function part4() {
  autocomplete.getImgToFolder('日累積雨量');
  autocomplete.getImgToFolder('探空');
  autocomplete.getImgToFolder('JMA天氣圖');
}


// 以下為範例，可執行部分細項
// ----------------------------------------
// 
// function part2_1() {
//   autocomplete.getImgToFolder('衛星雲圖', [
//     '衛星雲圖-可見光_台灣',
//     '衛星雲圖-可見光_亞洲',
//   ]);
// }
// function part2_2() {
//   autocomplete.getImgToFolder('衛星雲圖', [
//     '衛星雲圖-色調強化_台灣',
//     '衛星雲圖-色調強化_亞洲',
//   ]);
// }
// function part2_3() {
//   autocomplete.getImgToFolder('衛星雲圖', [
//     '衛星雲圖-真實色_台灣',
//     '衛星雲圖-真實色_亞洲',
//  ]);
// }