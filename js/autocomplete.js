function Autocomplete() {
  this.setParameter = function (
    folderID,
    excelID,
    beforeTime,
    during,
    imgProperties,
    imgParams
  ) {
    this.folderID = folderID;
    this.excelID = excelID;
    this.beforeTime = beforeTime;
    this.during = during;
    this.imgProperties = imgProperties;
    this.imgParams = imgParams;
  };
}

Autocomplete.prototype.getImgToFolder = function (wantToCatch, specialSelectArray) {
  Logger.log(
    `執行中! 類別:${wantToCatch}，你可以暫時去做其他事了，不要把瀏覽器關掉就好~`
  );
  const time = new TimeArrayFactory();
  const gapTime = time.returnTimeGap(this.imgProperties, wantToCatch);
  const timeFormat = this.imgProperties[wantToCatch].timeFormat;
  const needChangeMin = this.imgProperties[wantToCatch].modifyMinToTensDigit;

  time.getTimeArray(this.beforeTime, this.during, gapTime); //time.timeArray
  time.setTimeFormat(timeFormat, needChangeMin);
  const ImageToFolder = new DownloadImageToFolder(
    this.imgProperties,
    this.imgParams,
    time.timeArray,
    time.timeStampArray
  );
  ImageToFolder.setExcelData(this.excelID);
  ImageToFolder.setNeedToDownloadProperty(wantToCatch, specialSelectArray); // 可家陣列取得特定值
  ImageToFolder.downloadEachImgToFolder();
  Logger.log('執行完畢~');
};
