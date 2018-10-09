# persiandate.js
Javascript Persian Date Extension
version: 0.0.1


Persian Date
==============
size: 4 KB 

## Browser

```html
<script src="./persiandate-0.0.1.min.js" type="text/javascript"></script>

<p id="demo"></p>

<script type="text/javascript">
   var date = new Date().jFormat('yyyy'); // 1397 
  document.getElementById("demo").innerHTML = date;
</script>

```

## example
### jFormat function
```javascript
var myDate = new Date();
myDate.jFormat('yy'); //   97
myDate.jFormat('yyyy'); //  1397
myDate.jFormat('d'); //   5
myDate.jFormat('dd'); //   05
myDate.jFormat('ddd'); //   د
myDate.jFormat('dddd'); //   دوشنبه
myDate.jFormat('M'); //  1
myDate.jFormat('MM'); //  01
myDate.jFormat('MMM'); //  فرو
myDate.jFormat('MMMM'); //  فروردین
```
### toJalali function
```javascript
  var jy, jm, jd;
  [jy, jm, jd] = new Date().toJalali(); // jy=1397, jm= 7, jd= 15
```
### jalaliToDate function
```javascript
  var date = new Date().jalaliToDate(1397,7,15); // date=  Wed Nov 07 2018 17:39:44 GMT+0330 (Iran Standard Time)
```
### jLeap function
```javascript
  new Date().jLeap(1397); // false
```
### leap function
```javascript
  new Date().leap(); // false
```
### jGetDay function
```javascript
  new Date().jGetDay(); // int: 2
```
### jDaysInMonth function
```javascript
  new Date().jDaysInMonth(1397, 10); // int: 30
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
### jStartOfWeek function
```javascript
  new Date().jStartOfWeek(); // Sat Oct 06 2018 17:47:28 GMT+0330 (Iran Standard Time)
```
### clone function
```javascript
  new Date().clone(); 
  var today= new Date()
  var sat = today.clone().jStartOfWeek().addWeek(1);
   // Sat: Sat Oct 13 2018 17:49:33 GMT+0330 (Iran Standard Time)
   // today:Sun Oct 07 2018 17:49:33 GMT+0330 (Iran Standard Time)
```
### jGetDaysOfWeek function
```javascript
  var Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri;
  [Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri] = new Date().jGetDaysOfWeek(0); 
```

### toPersianDigits function
```javascript
new Date().jFormat('ddd. d MMMM yyyy').toPersianDigits() // س. ۱۷ مهر ۱۳۹۷ 
```




