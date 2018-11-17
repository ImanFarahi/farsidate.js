# farsidate.js | تاریخ فارسی
Javascript Farsi Date Extension
<br />
WebSite: http://farsidate.ir
<br />
version: 1.0.0


Farsi Date
==============
size: 6 KB 

## Browser

```html
<script src="./dist/farsidate-1.0.0.min.js" type="text/javascript"></script>

<p id="demo"></p>

<script type="text/javascript">
   var date = new Date().faFormat('yyyy'); // 1397 
  document.getElementById("demo").innerHTML = date;
</script>

```

## example
### faFormat function
```javascript
var myDate = new Date();
myDate.faFormat('yy'); //   97
myDate.faFormat('yyyy'); //  1397
myDate.faFormat('d'); //   5
myDate.faFormat('dd'); //   05
myDate.faFormat('ddd'); //   د
myDate.faFormat('dddd'); //   دوشنبه
myDate.faFormat('M'); //  1
myDate.faFormat('MM'); //  01
myDate.faFormat('MMM'); //  فرو
myDate.faFormat('MMMM'); //  فروردین
```
### toFarsiDate function
```javascript
   var fD = new Date('2018-11-13').toFarsiDate(); // fD.faYear=1397, fD.faMonth= 8, fD.faDate= 22
   console.log('year: '+ fD.faYear);
   console.log('month: '+ fD.faMonth);
   console.log('date: '+ fD.faDate);
```
### farsiDateTo function
```javascript
  var date = new Date().farsiDateTo(1397,7,15); // date=  Wed Nov 07 2018 17:39:44 GMT+0330 (Iran Standard Time)
```
### faIsLeap function
```javascript
  new Date().faIsLeap(); // false
```
### isLeap function
```javascript
  new Date().isLeap(); // false
```
### faGetDay function
```javascript
  new Date().faGetDay(); // int: 2
```

### getDaysInMonth function
```javascript
  new Date().getDaysInMonth(); // int: 30
```

### faGetDaysInMonth function
```javascript
  new Date().faGetDaysInMonth(); // int: 30
```

### addDays function
```javascript
  new Date().addDays(2); // Tue Oct 09 2018 17:43:54 GMT+0330 (Iran Standard Time)
```

### addWeeks function
```javascript
  new Date().addWeeks(1); // Sun Oct 14 2018 17:44:45 GMT+0330 (Iran Standard Time)
  new Date().addWeeks(0); // Sun Oct 07 2018 17:45:15 GMT+0330 (Iran Standard Time)
  new Date().addWeeks(-1); // Sun Sep 30 2018 17:44:28 GMT+0330 (Iran Standard Time)
```
### addMonths function
```javascript
   var date= new Date('2018-11-12');
   date.addMonths(2); // 2018-01-12
```

### addYears function
```javascript
   var date= new Date('2018-11-12');
   new Date().addYears(2); // 2020-01-12
```
### faAddMonths function
```javascript
   var date= new Date('2018-11-12');
   console.log('before: '+ date.faFormat('yyyy-MM-dd')); // before: 1397-08-21
   console.log('after: '+ date.faAddMonths(2).faFormat('yyyy-MM-dd')); // after: 1397-10-21
   console.log('back: '+ date.faAddMonths(-2).faFormat('yyyy-MM-dd')); // back: 1397-08-21
```

### faAddYears function
```javascript
   var date= new Date('2018-11-12');
   console.log('before: '+ date.faFormat('yyyy-MM-dd')); // before: 1397-08-21
   console.log('after: '+ date.faAddYears(2).faFormat('yyyy-MM-dd')); // after: 1399-08-21
```

### startOfWeek function
```javascript
  new Date().startOfWeek(); // Sun Oct 07 2018 17:46:19 GMT+0330 (Iran Standard Time)
```
### faStartOfWeek function
```javascript
  new Date().faStartOfWeek(); // Sat Oct 06 2018 17:47:28 GMT+0330 (Iran Standard Time)
```

### faStartOfMonth function
```javascript
new Date('2018-11-04').faStartOfMonth(); // Date 2018-10-23T00:00:00.000Z
```

### clone function
```javascript
  new Date().clone(); 
  var today= new Date()
  var sat = today.clone().faStartOfWeek().addWeek(1);
   // Sat: Sat Oct 13 2018 17:49:33 GMT+0330 (Iran Standard Time)
   // today:Sun Oct 07 2018 17:49:33 GMT+0330 (Iran Standard Time)
```
### faGetDaysOfWeek function
```javascript
  var Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri;
  [Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri] = new Date().faGetDaysOfWeek(); 
```
### faGetDaysOfMonth function
```javascript
var w1 ,w2 ,w3 ,w4 ,w5 ,w6;
[w1 ,w2 ,w3 ,w4 ,w5 ,w6] = new Date().faGetDaysOfMonth();
```

### toFarsiDigits function
```javascript
new Date().faFormat('ddd. d MMMM yyyy').toFarsiDigits() // س. ۱۷ مهر ۱۳۹۷ 
'1234'.toFarsiDigits() // ۱۲۳۴
```
### isDate function
```javascript
Date.isDate("2018-10-11") // false 
Date.isDate(new Date()) // true 
Date.isDate(new Date("2018-10-11")) // true
```
### toISODate function
```javascript
   var date= new Date('11/13/2018');
   console.log('ISO Date: '+ date.toISODate()); // ISO Date: 2018-11-13
```
### faToISODate function
```javascript
   var date= new Date('11/13/2018');
   console.log('ISO Date: '+ date.faToISODate()); // ISO Date: 1397-08-22
```






