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
   var msg = new Date().jFormat('yyyy'); // 1397 
  document.getElementById("demo").innerHTML = msg;
</script>

```

## example
### jFormat 
```javascript
new Date().jFormat('yy'); // int: 97
new Date().jFormat('yyyy'); // int: 1397
new Date().jFormat('d'); // int: 5
new Date().jFormat('dd'); // int: 05
new Date().jFormat('ddd'); // string: د
new Date().jFormat('dddd'); // string: دوشنبه
new Date().jFormat('M'); //int: 1
new Date().jFormat('MM'); //int: 01
new Date().jFormat('MMM'); //string: فرو
new Date().jFormat('MMMM'); //string:  فروردین
```
### toJalali 
```javascript
  var jy, jm, jd;
  [jy, jm, jd] = new Date().toJalali(); // jy=1397, jm= 7, jd= 15
```
### jalaliToDate 
```javascript
  var date = new Date().jalaliToDate(1397,7,15); // date=  Wed Nov 07 2018 17:39:44 GMT+0330 (Iran Standard Time)
```
### jLeap 
```javascript
  new Date().jLeap(1397); // false
```
### leap 
```javascript
  new Date().leap(); // false
```
### jGetDay 
```javascript
  new Date().jGetDay(); // int: 2
```
### jDaysInMonth 
```javascript
  new Date().jDaysInMonth(1397, 10); // int: 30
```
### addDays 
```javascript
  new Date().addDays(2); // Tue Oct 09 2018 17:43:54 GMT+0330 (Iran Standard Time)
```

### addWeek 
```javascript
  new Date().addWeek(1); // Sun Oct 14 2018 17:44:45 GMT+0330 (Iran Standard Time)
  new Date().addWeek(0); // Sun Oct 07 2018 17:45:15 GMT+0330 (Iran Standard Time)
  new Date().addWeek(-1); // Sun Sep 30 2018 17:44:28 GMT+0330 (Iran Standard Time)
```

### startOfWeek
```javascript
  new Date().startOfWeek(); // Sun Oct 07 2018 17:46:19 GMT+0330 (Iran Standard Time)
```
### jStartOfWeek
```javascript
  new Date().jStartOfWeek(); // Sat Oct 06 2018 17:47:28 GMT+0330 (Iran Standard Time)
```
### clone
```javascript
  new Date().clone(); 
  var today= new Date()
  var sat = today.clone().jStartOfWeek().addWeek(1);
   // Sat: Sat Oct 13 2018 17:49:33 GMT+0330 (Iran Standard Time)
   // today:Sun Oct 07 2018 17:49:33 GMT+0330 (Iran Standard Time)
```
### jGetDaysOfWeek
```javascript
  var Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri;
  [Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri] = new Date().jGetDaysOfWeek(0); 
```





