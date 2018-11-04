# farsdate.js
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
<script src="./farsidate-1.0.0.min.js" type="text/javascript"></script>

<p id="demo"></p>

<script type="text/javascript">
   var date = new Date().fDFormat('yyyy'); // 1397 
  document.getElementById("demo").innerHTML = date;
</script>

```

## example
### fDFormat function
```javascript
var myDate = new Date();
myDate.fDFormat('yy'); //   97
myDate.fDFormat('yyyy'); //  1397
myDate.fDFormat('d'); //   5
myDate.fDFormat('dd'); //   05
myDate.fDFormat('ddd'); //   د
myDate.fDFormat('dddd'); //   دوشنبه
myDate.fDFormat('M'); //  1
myDate.fDFormat('MM'); //  01
myDate.fDFormat('MMM'); //  فرو
myDate.fDFormat('MMMM'); //  فروردین
```
### toFarsiDate function
```javascript
  var jy, jm, jd;
  [jy, jm, jd] = new Date().toFarsiDate(); // jy=1397, jm= 7, jd= 15
```
### farsiDateTo function
```javascript
  var date = new Date().farsiDateTo(1397,7,15); // date=  Wed Nov 07 2018 17:39:44 GMT+0330 (Iran Standard Time)
```
### fDLeap function
```javascript
  new Date().fDLeap(1397); // false
```
### leap function
```javascript
  new Date().leap(); // false
```
### fDGetDay function
```javascript
  new Date().fDGetDay(); // int: 2
```
### fDDaysInMonth function
```javascript
  new Date().fDDaysInMonth(); // int: 30
```
### addDays function
```javascript
  new Date().addDays(2); // Tue Oct 09 2018 17:43:54 GMT+0330 (Iran Standard Time)
```

### addWeek function
```javascript
  new Date().addWeek(1); // Sun Oct 14 2018 17:44:45 GMT+0330 (Iran Standard Time)
  new Date().addWeek(0); // Sun Oct 07 2018 17:45:15 GMT+0330 (Iran Standard Time)
  new Date().addWeek(-1); // Sun Sep 30 2018 17:44:28 GMT+0330 (Iran Standard Time)
```

### startOfWeek function
```javascript
  new Date().startOfWeek(); // Sun Oct 07 2018 17:46:19 GMT+0330 (Iran Standard Time)
```
### fDStartOfWeek function
```javascript
  new Date().fDStartOfWeek(); // Sat Oct 06 2018 17:47:28 GMT+0330 (Iran Standard Time)
```

### fDStartOfMonth function
```javascript
new Date('2018-11-04').fDStartOfMonth(); // Date 2018-10-23T00:00:00.000Z
```

### clone function
```javascript
  new Date().clone(); 
  var today= new Date()
  var sat = today.clone().fDStartOfWeek().addWeek(1);
   // Sat: Sat Oct 13 2018 17:49:33 GMT+0330 (Iran Standard Time)
   // today:Sun Oct 07 2018 17:49:33 GMT+0330 (Iran Standard Time)
```
### fDGetDaysOfWeek function
```javascript
  var Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri;
  [Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri] = new Date().fDGetDaysOfWeek(); 
```
### fDGetDaysOfMonth function
```javascript
var w1 ,w2 ,w3 ,w4 ,w5 ,w6;
[w1 ,w2 ,w3 ,w4 ,w5 ,w6] = new Date().fDGetDaysOfMonth();
```

### toPersianDigits function
```javascript
new Date().fDFormat('ddd. d MMMM yyyy').toPersianDigits() // س. ۱۷ مهر ۱۳۹۷ 
'1234'.toPersianDigits() // ۱۲۳۴
```
### isDate function
```javascript
Date.isDate("2018-10-11") // false 
Date.isDate(new Date()) // true 
Date.isDate(new Date("2018-10-11")) // true
```






