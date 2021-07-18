function CreateFolders(sheetId, outermostfolderId, dayArray, folderNameArray) {
  this.sheetId = sheetId;
  this.outermostfolderId = outermostfolderId;
  this.dayArray = dayArray;
  this.folderNameArray = folderNameArray;
}

CreateFolders.prototype.createFolder = function (
  newFolderName,
  parentFolderId
) {
  var myFolderID = quicklyCreate(parentFolderId, newFolderName);
  return myFolderID;

  function quicklyCreate(folderId, folderName) {
    var parentFolder = DriveApp.getFolderById(folderId);
    var subFolders = parentFolder.getFolders();
    var doesntExists = true;
    var newFolder = '';

    // Check if folder already exists.
    while (subFolders.hasNext()) {
      var folder = subFolders.next();

      //If the name exists return the id of the folder
      if (folder.getName() === folderName) {
        doesntExists = false;
        newFolder = folder;
        return newFolder.getId();
      }
    }
    //If the name doesn't exists, then create a new folder
    if (doesntExists == true) {
      //If the file doesn't exists
      newFolder = parentFolder.createFolder(folderName);
      return newFolder.getId();
    }
  }
};
CreateFolders.prototype.recordID = function (date) {
  // // 初始化試算表
  let SpreadSheet = SpreadsheetApp.openById(this.sheetId);
  let Sheet = SpreadSheet.getSheets()[0]; // 指定第一張試算表
  let LastRow = Sheet.getLastRow(); // 取得最後一列有值的索引值

  // 寫入試算表
  Sheet.getRange(LastRow + 1, 1).setValue(date);

  //date 為名稱 202-03-24 之類的都可
  const dateFolderId = this.createFolder(date, this.outermostfolderId);
  this.folderNameArray.forEach((item, index) => {
    Sheet.getRange(LastRow + 1, index + 2).setValue(
      this.createFolder(item, dateFolderId)
    );
  });
  Logger.log(`${date}寫入成功`);
};

CreateFolders.prototype.inputTitleToExcel = function () {
  // // 初始化試算表
  let SpreadSheet = SpreadsheetApp.openById(this.sheetId);
  let Sheet = SpreadSheet.getSheets()[0]; // 指定第一張試算表
  let LastRow = Sheet.getLastRow(); // 取得最後一列有值的索引值

  // 寫入試算表
  Sheet.getRange(LastRow + 1, 1).setValue('日期');
  this.folderNameArray.forEach((item, index) => {
    Sheet.getRange(LastRow + 1, index + 2).setValue(item);
  });
};
CreateFolders.prototype.init = function () {
  this.inputTitleToExcel();
  this.dayArray.forEach((eachDay) => {
    this.recordID(eachDay);
  });
};
