function DownloadImageToFolder(
  imgProperty,
  imgParams,
  timeArray,
  timeStampArray
) {
  this.imgProperty = imgProperty;
  this.imgParams = imgParams;
  this.timeArray = timeArray;
  this.timeStampArray = timeStampArray;
  this.getImg = function (url, id) {
    try {
      Logger.log(`正在下載 ${url}`);
      const response = UrlFetchApp.fetch(url).getBlob();
      const dir = DriveApp.getFolderById(id);
      dir.createFile(response);
    } catch (error) {
      console.error(`找不到 ${url}`);
    }
  };
}
DownloadImageToFolder.prototype.setExcelData = function (excel) {
  this.excel = excel;
};
DownloadImageToFolder.prototype.getFolderID = function (folderDay, category) {
  const getExcelData = () => {
    // 初始化試算表
    const SpreadSheet = SpreadsheetApp.openById(this.excel);
    const Sheet = SpreadSheet.getSheets()[0]; // 指定第一張試算表
    const rowLength = Sheet.getLastRow() - 1; //取行長度
    const columnLength = Sheet.getLastColumn(); //取列長度
    const data = Sheet.getRange(2, 1, rowLength, columnLength).getValues(); // 取得的資料
    let dataExportId = {};

    for (i in data) {
      if (data[i][0] != '') {
        dataExportId[data[i][0]] = {};
        this.imgParams.forEach((params, index) => {
          dataExportId[data[i][0]][params] = data[i][index + 1];
        });
      }
    }
    return dataExportId;
  };
  const jsonForFolderId = getExcelData();
  return jsonForFolderId[folderDay][category];
};
DownloadImageToFolder.prototype.setNeedToDownloadProperty = function (
  property,
  specialSelectArray
) {
  this.property = property;
  this.specialSelectArray = specialSelectArray
    ? specialSelectArray
    : Object.keys(this.imgProperty[this.property].category);
};
DownloadImageToFolder.prototype.downloadEachImgToFolder = function () {
  this.specialSelectArray.forEach((eachCategoryObj) => {
    this.timeArray.forEach((eachTime, index) => {
      const folderDay = Utilities.formatDate(
        new Date(this.timeStampArray[index]),
        'GMT+8',
        'yyyyMMdd'
      );
      const folderID = this.getFolderID(folderDay, eachCategoryObj);
      const startUrl =
        this.imgProperty[this.property].category[eachCategoryObj].startUrl;

      const totalUrl = this.imgProperty[this.property].combineRule(
        eachTime,
        startUrl
      );

      // totalUrl 支援 Array/String
      if (Array.isArray(totalUrl)) {
        totalUrl.forEach((eachUrl) => {
          this.getImg(eachUrl, folderID);
        });
      } else {
        this.getImg(totalUrl, folderID);
      }
    });
  });
};
