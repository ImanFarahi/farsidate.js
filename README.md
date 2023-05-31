# farsidate.js | تاریخ فارسی
Javascript Farsi Date Extension
<br />
WebSite: http://farsidate.ir
<br />
version: 1.0.2


Farsi Date
==============
size:  10 KB 

## Browser

```html
<script src="./dist/farsidate-1.0.2.min.js" type="text/javascript"></script>

<p id="demo"></p>

<script type="text/javascript">
   var date = new Date().fa().toString('yyyy'); // 1397 
  	document.getElementById("demo").innerHTML = date;
</script>

```


## Chaining
```javascript
console.log(new Date().fa(1397,1,15).norm().toISODate());  // 2018-5-5
console.log(new Date().fa(1397,1,15).addDays(3).addMonths(1).addYears(-1).norm().toISODate());  // 2017-6-8
```


## Example Usage

### fa() main method
```javascript
var fD1 = new Date('2018-11-13').fa(); 
console.log('year: '+ fD1.getFullYear()); // year: 1397
console.log('month: '+ fD1.getMonth()); // month: 7 (0-11)
console.log('date: '+ fD1.getDate()); // date: 22

fD2 = new Date().fa(1396, 8, 21);
console.log('year: '+ fD2.getFullYear()); // year: 1396
console.log('month: '+ fD2.getMonth()); // month: 8
console.log('date: '+ fD2.getDate()); // date: 21

var fD3 = new Date().fa(fD2);
console.log('year: '+ fD3.getFullYear()); // year: 1396
console.log('month: '+ fD3.getMonth()); // month: 8
console.log('date: '+ fD3.getDate()); // date: 21
```

### norm() method
```javascript
var fD = new Date('2018-11-13').fa(); 
console.log('year: '+ fD.getFullYear()); // year: 1397
console.log('month: '+ fD.getMonth()); // month: 7
console.log('date: '+ fD.getDate()); // date: 22
console.log('year: '+ fD.norm().getFullYear());  // year: 2018
```

### getCacheDate() method
```javascript
var fD = new Date('2018-11-13').fa(); 
console.log('year: '+ fD.getFullYear()); // year: 1397
console.log('month: '+ fD.getMonth()); // month: 7 (0-11)
console.log('date: '+ fD.getDate()); // date: 22
console.log('year: '+ fD.getCacheDate().getFullYear());  // year: 2018
```

### toString() method
```javascript
var date = new Date();
console.log('s: '+ date.fa().toString('s')); // s: 0
console.log('ss: '+date.fa().toString('ss')); // ss: 00
console.log('m: '+date.fa().toString('m')); // m: 4
console.log('mm: '+date.fa().toString('mm')); // mm: 04
console.log('h: '+date.fa().toString('h')); // h: 2
console.log('hh: '+date.fa().toString('hh')); // h: 02
console.log('H: '+date.fa().toString('H')); // H: 2
console.log('HH: '+date.fa().toString('HH')); // HH: 02
console.log('d: '+date.fa().toString('d')); // d: 19
console.log('dd: '+date.fa().toString('dd')); // dd: 19
console.log('ddd: '+date.fa().toString('ddd')); // ddd: چ
console.log('dddd: '+date.fa().toString('dddd')); // dddd: چهار شنبه
console.log('M: '+date.fa().toString('M')); // M: 10 (1-12)
console.log('MM: '+date.fa().toString('MM')); // MM: 10 (1-12)
console.log('MMM: '+date.fa().toString('MMM')); // MMM: دی
console.log('MMMM: '+date.fa().toString('MMMM')); // MMMM: دی
console.log('yy: '+date.fa().toString('yy')); // yy: 97
console.log('yyyy: '+date.fa().toString('yyyy')); // yyyy: 1397
console.log('t: '+date.fa().toString('t')); // t: A
console.log('tt: '+date.fa().toString('tt')); // tt: AM
console.log(date.fa().toString()); // چ دی 19 1397 04:30:57 GMT+0330 (Iran Standard Time)
```

#### Converting to String

**Note** The `format` parameter is optional with the `.toString()` function.

**Standard Date and Time Format Specifiers**

| Format | Description | Example |
| :---- | :---- | :---- |
| s | The seconds of the minute between 0-59. | "0" to "59" |
| ss | The seconds of the minute with leading zero if required. | "00" to "59" | 
| m | The minute of the hour between 0-59. | "0"  or "59" | 
| mm | The minute of the hour with leading zero if required. | "00" or "59" | 
| h | The hour of the day between 1-12. | "1"  to "12" | 
| hh | The hour of the day with leading zero if required. | "01" to "12" | 
| H | The hour of the day between 0-23. | "0"  to "23" | 
| HH | The hour of the day with leading zero if required. | "00" to "23" | 
| d | The day of the month between 1 and 31. | "1"  to "31" | 
| dd | The day of the month with leading zero if required. | "01" to "31" | 
| ddd | Abbreviated day name. Date.!CultureInfo.abbreviatedDayNames. | "چ" to "پ" |  
| dddd | The full day name. Date.!CultureInfo.dayNames. | "چهارشنبه" to "پنج شنبه" | 
| M | The month of the year between 1-12. | "1" to "12" | 
| MM | The month of the year with leading zero if required. | "01" to "12" | 
| MMM | Abbreviated month name. Date.!CultureInfo.abbreviatedMonthNames. | "شهر" to "مرد" | 
| MMMM | The full month name. Date.!CultureInfo.monthNames. | "شهریور" to "مرداد" | 
| yy | Displays the year as a two-digit number. | "97" or "98" | 
| yyyy | Displays the full four digit year. | "1397" or "1398" | 
| t | Displays the first character of the A.M./P.M.  | "A" or "P" | 
| tt | Displays the A.M./P.M. designator. | "AM" or "PM" |








### clearTime() method
```javascript
var fD = new Date().fa(); 
console.log(fD.getHours()); // 2
console.log(fD.clearTime().getHours()); // 0
```
   
### setTimeToNow() method
```javascript
var fD = new Date().fa().setHours(3); 
console.log(fD.getHours()); // 3
console.log(fD.setTimeToNow().getHours()); // 2
```
   
   
### today() method
```javascript
var fD = new Date().fa().setHours(3); 
console.log(fD.getHours()); // 3
console.log(fD.today().getHours()); // 0
```

### setFullYear() method
```javascript
var fD = new Date().fa(); 
console.log(fD.setFullYear(1398).isLeap()); // false
console.log(fD.setFullYear(1399).isLeap()); // true
```

### getDaysInMonth() method
```javascript
var fD = new Date().fa(1397,1,1); 
console.log(fD.setMonth(0).getDaysInMonth()); // 31
console.log(fD.setMonth(11).getDaysInMonth()); // 29
```



### startOfMonth() method
```javascript
var fD = new Date().fa(1397,1,15); // month (0-11)
console.log(fD.startOfMonth().toISODate());  // 1397-02-01 - month (1-12)
```

### addDays() method
```javascript
   var fD = new Date().fa(1397,1,15).addDays(3).addDays(-1);
	console.log(fD.toString('dd'));  // 17
```
   
### addWeeks() method
```javascript  
var fD = new Date().fa(1397,1,15).addDays(3).addWeeks(1);
console.log(fD.toString('dd'));  // 25  
```
 
 
### addMonths() method
```javascript  
var fD = new Date().fa(1397,1,15)
console.log(fD.toString('MM'));  // 02
console.log(fD.addDays(3).addMonths(1).toString('MM'));  // 03
```
   
### addYears() method
```javascript  
var fD = new Date().fa(1397,1,15)
console.log(fD.toString('yyyy MM'));  // 1397 02
console.log(fD.addDays(3).addMonths(1).addYears(1).toString('yyyy MM'));  // 1398 03  
```
   
   
### startOfWeek() method
```javascript 
var fD = new Date().fa(1397,9,19)
console.log(fD.toString('yyyy MM dd'));  // 1397 10 19
console.log(fD.startOfWeek().toString('yyyy MM dd'));  // 1397 10 15  
```  
   
### clone() method
```javascript   
var fD = new Date().fa(1397,9,19)
console.log(fD.toString('yyyy MM dd'));  // 1397 10 19
console.log(fD.clone().startOfWeek().toString('yyyy MM dd'));  // 1397 10 15
console.log(fD.toString('yyyy MM dd'));  // 1397 10 19
```  
   
   
### getDaysOfMonth() method
```javascript
var w1 ,w2 ,w3 ,w4 ,w5 ,w6;
[w1 ,w2 ,w3 ,w4 ,w5 ,w6] = new Date().fa().getDaysOfMonth();
```
   
### getDaysOfWeek() method
```javascript
  var Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri;
  [Sat ,Sun ,Mon ,Tue ,Wed ,Thu ,Fri] = new Date().fa().getDaysOfWeek(); 
```
   
   
   
### toFarsiDigits() method
```javascript
var fD = new Date().fa(1397,9,19)
console.log(fD.toString('ddd. d MMMM yyyy').toFarsiDigits()); //چ. ۱۹ دی ۱۳۹۷ 
console.log('1234'.toFarsiDigits()); // ۱۲۳۴
```


### isDate() method
```javascript
console.log(Date.isDate("2018-10-11")); // false 
console.log(Date.isDate(new Date())); // true 
console.log(Date.isDate(new Date("2018-10-11"))); // true

console.log(Date.fa.isDate(new Date().fa())); // true
console.log(Date.fa.isDate(new Date())); // false
```


### toISODate() method
```javascript
var date= new Date('11/13/2018');
console.log('ISO Date: '+ date.toISODate()); // ISO Date: 2018-11-13
console.log('fa ISO Date: '+ date.fa().toISODate()); // fa ISO Date: 1397-08-22
```


## Other methods
All Date methods





