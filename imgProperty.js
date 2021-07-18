const cwbStationID = ['46692', '46699', '46734', '46750', '46810', '46780']; // 可新增/移除測站
const imgProperty = {
  雷達: {
    category: {
      '雷達-台灣周邊': {
        startUrl: 'https://www.cwb.gov.tw/Data/radar/CV1_TW_3600_',
      },
      '雷達-全範圍': {
        startUrl: 'https://www.cwb.gov.tw/Data/radar/CV1_3600_',
      },
    },
    timeFormat: 'yyyyMMddHHmm',
    modifyMinToTensDigit: true,
    timeGap: 10,
    endUrl: '.png',
    combineRule: function (fn, time, startUrl) {
      const totalUrl = `${startUrl}${time}${this.endUrl}`;
      fn(totalUrl);
    },
  },

  衛星雲圖: {
    category: {
      '衛星雲圖-色調強化_台灣': {
        startUrl:
          'https://www.cwb.gov.tw/Data/satellite/TWI_IR1_MB_800/TWI_IR1_MB_800-',
      },

      '衛星雲圖-色調強化_亞洲': {
        startUrl:
          'https://www.cwb.gov.tw/Data/satellite/LCC_IR1_MB_2750/LCC_IR1_MB_2750-',
      },
      '衛星雲圖-可見光_台灣': {
        startUrl:
          'https://www.cwb.gov.tw/Data/satellite/TWI_VIS_Gray_1350/TWI_VIS_Gray_1350-',
      },

      '衛星雲圖-可見光_亞洲': {
        startUrl:
          'https://www.cwb.gov.tw/Data/satellite/LCC_VIS_Gray_2750/LCC_VIS_Gray_2750-',
      },
      '衛星雲圖-真實色_台灣': {
        startUrl:
          'https://www.cwb.gov.tw/Data/satellite/TWI_VIS_TRGB_1375/TWI_VIS_TRGB_1375-',
      },

      '衛星雲圖-真實色_亞洲': {
        startUrl:
          'https://www.cwb.gov.tw/Data/satellite/LCC_VIS_TRGB_2750/LCC_VIS_TRGB_2750-',
      },
    },
    timeFormat: 'yyyy-MM-dd-HH-mm',
    modifyMinToTensDigit: true,
    timeGap: 10,
    endUrl: '.jpg',
    combineRule: function (fn, time, startUrl) {
      const totalUrl = `${startUrl}${time}${this.endUrl}`;
      fn(totalUrl);
    },
  },
  氣溫: {
    category: {
      氣溫: {
        startUrl: 'https://www.cwb.gov.tw/Data/temperature/',
      },
    },
    timeFormat: 'yyyy-MM-dd_HH00',
    timeGap: 60,
    endUrl: '.GTP8.jpg',
    combineRule: function (fn, time, startUrl) {
      const totalUrl = `${startUrl}${time}${this.endUrl}`;
      fn(totalUrl);
    },
  },
  雨量: {
    category: {
      小時累積雨量: {
        startUrl: 'https://www.cwb.gov.tw/Data/rainfall/',
      },
    },
    timeFormat: 'yyyy-MM-dd_HH00',
    timeGap: 60,
    endUrl: '.QZT8.jpg',
    combineRule: function (fn, time, startUrl) {
      const totalUrl = `${startUrl}${time}${this.endUrl}`;
      fn(totalUrl);
    },
  },
  日累積雨量: {
    category: {
      日累積雨量: {
        startUrl: 'https://www.cwb.gov.tw/Data/rainfall/',
      },
    },
    timeFormat: 'yyyy-MM-dd_0000',
    timeGap: 60 * 24,
    endUrl: '.QZJ8.jpg',
    combineRule: function (fn, time, startUrl) {
      const totalUrl = `${startUrl}${time}${this.endUrl}`;
      fn(totalUrl);
    },
  },
  NCDR風場: {
    category: {
      NCDR風場: {
        startUrl: 'https://watch.ncdr.nat.gov.tw/00_Wxmap/5A7_CWB_WINDMAP/', //https://watch.ncdr.nat.gov.tw/00_Wxmap/5A7_CWB_WINDMAP/202107/windmap_202107151600.png
      },
    },
    timeFormat: 'yyyyMMddHHmm',
    timeGap: 60,
    endUrl: '.png',
    combineRule: function (fn, time, startUrl) {
      const month = time.slice(0, 6);
      const totalUrl = `${startUrl}${month}/windmap_${time}${this.endUrl}`;
      fn(totalUrl);
    },
  },
  探空: {
    ids: cwbStationID,
    times: ['00', '12'],
    category: {
      探空: {
        startUrl:
          'https://npd.cwb.gov.tw/NPD/irisme_data/Weather/SkewT/SKW___000_', //https://npd.cwb.gov.tw/NPD/irisme_data/Weather/SkewT/SKW___000_21071500_46692.gif
      },
    },
    timeFormat: 'yyyyMMdd',
    timeGap: 60 * 24,
    endUrl: '.gif',
    combineRule: function (fn, time, startUrl) {
      this.ids.forEach((eachID) => {
        this.times.forEach((eachTime) => {
          const totalTime = `${time}${eachTime}`;
          const url = `${startUrl}${totalTime}_${eachID}${this.endUrl}`;
          return fn(url);
        });
      });
    },
  },
  JMA天氣圖: {
    ids: ['aupq78_', 'aupq35_'],
    times: ['0900', '2100'],
    category: {
      JMA天氣圖: {
        startUrl: 'https://n-kishou.com/ee/image4/lfax/', // https://n-kishou.com/ee/image4/lfax/aupq35_202107140900.png
      },
    },
    timeFormat: 'yyyyMMdd',
    timeGap: 60 * 24,
    endUrl: '.png',

    combineRule: function (fn, time, startUrl) {
      this.ids.forEach((eachID) => {
        this.times.forEach((eachTime) => {
          const totalTime = `${time}${eachTime}`;
          const url = `${startUrl}${eachID}${totalTime}${this.endUrl}`;
          fn(url);
        });
      });
    },
  },
};
