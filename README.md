# GAS_get-image
## 簡介
利用 Google App Script ( 後面簡稱 gs )抓取圖檔到本地雲端。
Github程式碼分為 main.js 及 js資料夾
* main.js 主要程式碼用在雲端內的 .gs 檔案
* js資料夾 裡面有放可供利用的程式碼，利用CDN的方式載入main.js

---
教學影片區
[建置環境](https://drive.google.com/file/d/1VEStiK2TX12rkLJxk1hrMrDpxIfjk3U1/view?usp=sharing)
[程式如何執行](https://drive.google.com/file/d/16Hrtls7sTFCpOYD49RdBOINKWSmVE9CK/view?usp=sharing)
## 程式跑了什麼?
1. 創建資料夾，並利用 Excel 作簡易資料庫，儲存資料夾 ID
 > function runThisCodeToCreateFolders
2. 抓取特定圖檔至指定資料夾 (預設抓取氣象局的資料，但有供客製化的功能讓使用者自己設定想抓的圖)
 > function part1 到 part4
## gs環境設定
設定 gs 使外部程式碼(使用CDN引入的)可以擁有變更 Excel & Drive 的權限

![](https://i.imgur.com/98rU8Kc.png)

專案設定 > 
在編輯器中顯示「appsscript.json」資訊清單檔案 > appsscript.json
在 json 中新增 oauthScopes (參考下方程式碼)
###### tags:  "runtimeVersion": "V8" 後，務必加上逗號，以區隔 json 屬性
```json=
{
  "timeZone": "Asia/Taipei",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
      "https://www.googleapis.com/auth/script.external_request",
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive"
  ]
}
```
參考文章: 

[Google Apps Script 官方說明](https://developers.google.com/apps-script/concepts/scopes)

[Google Apps Script Wants Unrestricted Scope --stackoverflow
](https://stackoverflow.com/questions/54643279/google-apps-script-wants-unrestricted-scope)


## 使用
1. 填入資料
![](https://i.imgur.com/1r8sirH.png)
    * imgProperties 決定要抓取的圖 (可以客製化，請參閱下面客製化章節)
    * imgParms 為資料夾名稱，應與 imgProperties 屬性相關
    
2. 執行 runThisCodeToCreateFolders
![](https://i.imgur.com/eDj7qsf.png)
    * 請盡量執行一次就好，若 dayArray 的日期重複應該會報錯( 就把Excel清空，在執行一次即可 )

3. 設定定時器 ( function part1~part4 )

### 填寫參數小細節
beforeTime建議是2(單位: 小時)以上，
during 建議不要整數(單位: 小時)
因為程式執行的方式是
```
假設 beforeTime = 2; during=0.9; 
時間為上午9:27時，執行程式 (雷達 每10分鐘1張圖) 。

因為 beforeTime ，時間變上午7:27
抓取範圍變成 7:00 - 7:54 (during: 0.9小時)
故存入5張圖( 7:00-7:50 )至資料夾

若有設定每小時的定時器就能一張不漏地抓取
```
## 客製化
### 前言 & 基礎
**若是正在上天氣學的同學應該是不用看到這裡 ก็ʕ•͡ᴥ•ʔ ก้**

原先天氣學的各個路徑設定放在 js/exportProperties.js 裡面
在 main.js 用以下程式碼引入
```javascript=
const imgProperties = exportProperties();
const imgParams = exportImgParams();
```
若是想客製化請先清空你的Excel & 上面的imgProperties及imgParams

### imgProperties 設定
先附程式碼，搭配底下註解觀看
```javascript=
const imgProperties = {
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
    combineRule(time, startUrl) {
      return `${startUrl}${time}${this.endUrl}`;
    }
  },
}
```
> 第2行的"雷達"為最後執行程式時，所呼叫的大項 (不知道該用什麼名詞XD)

> 3到10行為各個細項，此細項名稱與資料夾息息相關! 
> 另外，startUrl為想抓的圖網址前面固定不動的部分

> 11行 timeFormat [時間格式可以參考這裡](https://docs.microsoft.com/zh-tw/dotnet/standard/base-types/custom-date-and-time-format-strings)文章中段有詳細介紹yyyy MM dd...

> 12行 modifyMinToTensDigit: true, 當你希望timeFormat的分鐘個位數為0時，設定為true
> 因為 timeFormat 整點可以設為 yyyyMMddHH00，但沒有分鐘的個位數為0的寫法(如: 10 20 ..)

> 13行 timeGap: 10, 希望圖隔多久抓一次( 單位為分鐘 )

> 14行 endUrl: '.png', 就檔名

> 15行起 combineRule 可以利用 JavaScript 自行撰寫需要的Url，接受回傳字串或是矩陣

### imgParams 設定
必須和imgProperties的細項名稱相同，不然圖片無法到正確資料夾 (請參閱上面 category 屬性)
```javascript=
const imgParams = ['雷達-台灣周邊','雷達-全範圍'];
```



## 結尾
可以隨意分享給同學及學弟妹們，但傳的太廣我怕少一份混分工作 ఠ_ఠ
若是想幫我新增imgProperties或是功能，可以在文章這邊留言或是<a href="mailto:a32715368@gmail.com">寫信給我</a>

希望以後會新增以下功能
1. 同一資料夾的檔案自動產生 .gif
2. 抓取環保署空品資料
    >  這目前應該不太行，因為空品圖是用 JavaScript 渲染的，而 gs 目前沒有支援 headless browser

