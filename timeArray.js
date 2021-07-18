function TimeArrayFcatory() {
  this.startTime = null; // new Date() 轉時間  // Utilities.formatDate(new Date(this.startTime), "GMT+8", "yyyy-MM-dd HH:mm")
  this.endTime = null;
  this.timeArray = []; // "yyyy-MM-dd HH:mm"
}
TimeArrayFcatory.prototype.returnTimeGap = function (imgProperty, category) {
  if (imgProperty) {
    this.imgProperty = imgProperty;
  }
  return this, imgProperty[category].timeGap;
};
TimeArrayFcatory.prototype.getTimeArray = function (
  beforeHour,
  duration,
  intervalMin
) {
  this.startTime = new Date(Date.now() - beforeHour * 60 * 60 * 1000).getTime(); //new Date(Date.now()-timeMachine*60*60*1000);
  this.endTime = new Date(this.startTime + duration * 60 * 60 * 1000).getTime();

  let array = [];
  for (
    let time = this.startTime;
    time <= this.endTime;
    time += intervalMin * 60 * 1000
  ) {
    array.push(time);
  }
  this.timeStampArray = array;
  this.timeArray = array;

  // 部分時間格式需要分鐘的個位數為 0
  this.modifyMinToTensDigit = function () {
    let array = [];
    this.timeArray.forEach((eachTime) => {
      let newTime = eachTime.split('');
      newTime[newTime.length - 1] = 0;
      array.push(newTime.join(''));
    });
    this.timeArray = array;
  };
};

TimeArrayFcatory.prototype.setTimeFormat = function (
  format,
  modifyMinToTensDigit,
  timeZone = 'GMT+8'
) {
  let array = [];
  this.timeArray.forEach((eachTime) => {
    let formatTime = Utilities.formatDate(new Date(eachTime), timeZone, format);
    array.push(formatTime);
  });
  this.timeArray = Array.from(new Set(array)); // 用 set 去除重複

  if (modifyMinToTensDigit === true) {
    this.modifyMinToTensDigit();
  }
};
