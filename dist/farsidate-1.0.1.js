/**
 * @file: farsidate-1.0.1.js
 * @author: Iman Farahi
 * @version 1.0.1
 * @date: 2019-01-09
 * @copyright: (c) 2018 ImanFarahi - professionalProgrammer.ir 
 * @license: MIT License
 * @email: professionalProgrammer.ir@gmail.com 
 * @Website: http://professionalProgrammer.ir
 * @description: Javascript Farsi Date Extension
 */

"use strict";

(function (Date, String) {
    var $D = Date,
        $P = $D.prototype,
        $S = String.prototype;

    $P.fa = function () {
        return new FarsiDate(this, arguments);
    }


    /**
    * @description  Get the ISO Date 
    * @method
    * @public
    * @return {String} 
    */
    $P.toISODate = function () {
        return (this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate());
    };


    /**
        * @description Returns a new Date object that is an exact date and time copy of the original instance.
        * @method
        * @public
        * @return {Date} A new Date instance
        */
    $P.clone = function () {
        return new Date(this.getTime());
    };


    /**
    * @description  true if object instanceof Date, otherwise false.
    * @static
    * @method
    * @param obj input object 
    * @return {Boolean} true if object instanceof Date, otherwise false.
    */
    $D.isDate = function (obj) {
        return obj instanceof Date || Object.prototype.toString.call(obj) === '[object Date]';
    };


    /**
    * @description  convert english numbers to farsi numbers
    * @method
    * @public
    * @return {String} 
    */
    $S.toFarsiDigits = function () {
        var charCodeZero = '۰'.charCodeAt(0);
        return this.replace(/[0-9]/g, function (w) {
            return String.fromCharCode(parseInt(w) + charCodeZero);
        });
    };










    /**
     * @private
     * @class
     * @description Farsi Date.
     */
    var FarsiDate = (function () {
        var _D = FarsiDate,
            _P = _D.prototype;


        function FarsiDate(cacheDate, args) {
            this.cacheDate = cacheDate;

            if (typeof args != 'undefined') {
                if (args.length == 1 && (_D.isDate(args[0]))) {
                    this.cacheDate = args[0].getCacheDate();
                } else if (args.length == 3) {
                    var fD = _D.jalaliToGregorian(args[0], args[1], args[2]);
                    this.cacheDate.setFullYear(fD.year);
                    this.cacheDate.setMonth(fD.month);
                    this.cacheDate.setDate(fD.date);
                }
            }

        }


        /**
         * @description Calculates the Gregorian Date from Jalali Date.
         * @method
         * @public
         * @param {number} jy Jalali year (\d{4})
         * @param {number} jm Jalali month (0 to 11)
         * @param {number} jd Jalali day (1 to 29/31)
         * @return {Object} {`year` is Gregorian Year, `month` is Gregorian Month, `date` is Gregorian Date} 
         */
        _D.jalaliToGregorian = function (jy, jm, jd) {
            var gy, gm, gd, days, sal_a, v;
            jm += 1;
            if (jy > 979) {
                gy = 1600;
                jy -= 979;
            } else {
                gy = 621;
            }
            days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
            gy += 400 * (parseInt(days / 146097));
            days %= 146097;
            if (days > 36524) {
                gy += 100 * (parseInt(--days / 36524));
                days %= 36524;
                if (days >= 365) days++;
            }
            gy += 4 * (parseInt(days / 1461));
            days %= 1461;
            if (days > 365) {
                gy += parseInt((days - 1) / 365);
                days = (days - 1) % 365;
            }
            gd = days + 1;
            sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (gm = 0; gm < 13; gm++) {
                v = sal_a[gm];
                if (gd <= v) break;
                gd -= v;
            }
            return { 'year': gy, 'month': (gm - 1), 'date': gd };
        };


        /** 
         * @description Calculates the Jalali Date from Gregorian Date.
         * @method
         * @public
         * @param {number} gy Gregorian year (\d{4})
         * @param {number} gm Gregorian month (0 to 11)
         * @param {number} gd Gregorian day (1 to 31)
         * @return {Object} {`year` is Jalali Year, `month` is Jalali Month, `date` is Jalali Date} 
         */
        _D.gregorianToJalali = function (gy, gm, gd) {
            var gy2, g_d_m, jy, jm, jd, days;
            gm += 1;
            g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            if (gy > 1600) {
                jy = 979;
                gy -= 1600;
            } else {
                jy = 0;
                gy -= 621;
            }
            gy2 = (gm > 2) ? (gy + 1) : gy;
            days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
            jy += 33 * (parseInt(days / 12053));
            days %= 12053;
            jy += 4 * (parseInt(days / 1461));
            days %= 1461;
            if (days > 365) {
                jy += parseInt((days - 1) / 365);
                days = (days - 1) % 365;
            }
            jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
            jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));

            return { 'year': jy, 'month': (jm - 1), 'date': jd };
        };

        /**
       * @description  true if object instanceof FarsiDate, otherwise false.
       * @static
       * @method
       * @param obj input object 
       * @return {Boolean} true if object instanceof FarsiDate, otherwise false.
       */
        _D.isDate = function (obj) {
            return obj instanceof FarsiDate || Object.prototype.toString.call(obj) === '[object FarsiDate]';
        };


        /**
         * @description Resets the time of this Date object to 12:00 AM (00:00), which is the start of the day.
         * @param {Boolean}  .clone() this date instance before clearing Time
         * @return {Date}    this
         */
        _P.clearTime = function () {
            this.cacheDate.setHours(0);
            this.cacheDate.setMinutes(0);
            this.cacheDate.setSeconds(0);
            this.cacheDate.setMilliseconds(0);
            return this;
        };


        /**
         * @description Resets the time of this Date object to the current time ('now').
         * @return {Date}    this
         */
        _P.setTimeToNow = function () {
            var n = new Date();
            this.cacheDate.setHours(n.getHours());
            this.cacheDate.setMinutes(n.getMinutes());
            this.cacheDate.setSeconds(n.getSeconds());
            this.cacheDate.setMilliseconds(n.getMilliseconds());
            return this;
        };


        /** 
         * @description Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM).
         * @return {Date}    The current date.
         */
        _D.today = function () {
            return new Date().fa().clearTime();
        };


        /** 
         * @description Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM).
         * @return {Date}    The current date.
         */
        _P.today = function () {
            return _D.today();
        };


        /**
         * @description Determines if the current date instance is within a LeapYear for jalali date
         * @param {Number} faYear The jalali year.
         * @return {Boolean} true if date is within a LeapYear, otherwise false.
         */
        _D.isLeapYear = function (faYear) {
            return ((faYear - (faYear > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
        };


        /**
         * @description Determines if the current date instance is within a Jalali LeapYear.
         * @method
         * @public
         * @return {Boolean} true if date is within a LeapYear, otherwise false.
         */
        _P.isLeap = function () {
            return _D.isLeapYear(_D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate()).year);
        };


        /**
         * @description Gets the number of days in the month for jalali date, given a year and month value. Automatically corrects for LeapYear.
         * @param {Number} year  The year.
         * @param {Number}  month The month (0-11).
         * @return {Number}  The number of days in the month.
         */
        _D.getDaysInMonth = function (faYear, faMonth) {
            if (faMonth < 0 || faMonth > 11) return 0;
            if (faMonth < 6) return 31;
            if (faMonth < 11) return 30;
            if (_D.isLeapYear(faYear)) {
                return 30;
            }
            return 29;
        };


        /**
        * @description Gets the number of days in the month for jalali date, Automatically corrects for LeapYear.
        * @method
        * @public
        * @return {Number}  The number of days in the month.
        */
        _P.getDaysInMonth = function () {
            var fd = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate());
            return _D.getDaysInMonth(fd.year, fd.month);
        };


        /**
        * @description Get the start of month for jalali date
        * @method
        * @public
        * @return {Date}  current Date instance.
        */
        _P.startOfMonth = function () {
            var fD, gD;
            fD = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate());
            gD = _D.jalaliToGregorian(fD.year, fD.month, 1);
            return this.cacheDate.setFullYear(gD.year) && this.cacheDate.setMonth(gD.month) && this.cacheDate.setDate(gD.date) && this;
        };


        /**
        * @description add day
        * @method
        * @public
        * @param {number} days days
        * @return {Date}  current Date instance.
        */
        _P.addDays = function (days) {
            return this.cacheDate.setTime(864E5 * days + this.cacheDate.valueOf()) && this;
        };



        /**
        * @description add Week 
        * @method
        * @public
        * @param {number} weeks weeks
        * @return {Date} current Date instance.
        */
        _P.addWeeks = function (weeks) {
            return this.addDays(weeks * 7) && this;
        };


        /**
        * @description add Month for jalali date
        * @method
        * @public
        * @param {number} months months
        * @return {Date} current Date instance.
        */
        _P.addMonths = function (months) {
            var sumM, newFaM, newFaY, gD, fD = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate())
            sumM = months + (fD.month + 1);
            newFaY = Math.floor(sumM / 12);
            newFaM = sumM - (newFaY * 12);
            newFaY += fD.year;
            if (newFaM == 0) {
                newFaM = 12;
                newFaY--;
            }
            newFaM -= 1;
            gD = _D.jalaliToGregorian(newFaY, newFaM, Math.min(fD.date, _D.getDaysInMonth(newFaY, newFaM)));
            return this.cacheDate.setFullYear(gD.year) && this.cacheDate.setMonth(gD.month) && this.cacheDate.setDate(gD.date) && this;;
        };


        /**
        * @description add Year for jalali date
        * @method
        * @public
        * @param {number} years years
        * @return {Date} current Date instance.
        */
        _P.addYears = function (years) {
            return this.addMonths(years * 12) && this;
        };


        /**
        * @description start of week for jalali date
        * @method
        * @public
        * @param {number} p add to start of week
        * @return {Date}  The instance of Date.
        */
        _P.startOfWeek = function (p) {
            p || (p = 0);
            return this.addDays(((this.cacheDate.getDay() < 6) ? ((this.cacheDate.getDay() * -1) - 1 + p) : 0)) && this;
        };


        /**
        * @description Returns a new Date object that is an exact date and time copy of the original instance.
        * @method
        * @public
        * @return {Date} A new Date instance
        */
        _P.clone = function () {
            return new Date(this.cacheDate.getTime()).fa();
        };


        /**
        * @description Gets all days in the month for jalali date
        * @method
        * @public
        * @return {Array}  [first week, second week, third week, fourth week, fifth week, final week ]
        */
        _P.getDaysOfMonth = function () {
            var firstDay = this.clone().startOfMonth();
            return [firstDay.clone().getDaysOfWeek(),
            firstDay.clone().addWeeks(1).getDaysOfWeek(),
            firstDay.clone().addWeeks(2).getDaysOfWeek(),
            firstDay.clone().addWeeks(3).getDaysOfWeek(),
            firstDay.clone().addWeeks(4).getDaysOfWeek(),
            firstDay.clone().addWeeks(5).getDaysOfWeek(),
            ];
        };


        /**
        * @description Gets all days in the week for jalali date
        * @method
        * @public
        * @return {Array}  [Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday ]
        */
        _P.getDaysOfWeek = function () {
            var Sat = this.clone().startOfWeek();
            return [Sat, Sat.clone().addDays(1), Sat.clone().addDays(2),
                Sat.clone().addDays(3), Sat.clone().addDays(4), Sat.clone().addDays(5), Sat.clone().addDays(6)
            ];
        };


        _P.getCacheDate = function () {
            return this.cacheDate;
        };


        _P.norm = function () {
            return this.getCacheDate();
        };


        _P.getDate = function () {
            return _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate()).date;
        };


        /**
         * @description Gets the day number (0-6) for jalali date
         * @method
         * @public
         * @return {Number}  The day number
        */
        _P.getDay = function () {
            if (this.cacheDate.getDay() + 2 === 8) {
                return 0;
            } else if (this.cacheDate.getDay() + 2 === 7) {
                return 6;
            } else {
                return this.cacheDate.getDay() + 1;
            }
        };


        _P.getFullYear = function () {
            return _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate()).year;
        };


        _P.getHours = function () {
            return this.cacheDate.getHours();
        };


        _P.getMilliseconds = function () {
            return this.cacheDate.getMilliseconds();
        };


        _P.getMinutes = function () {
            return this.cacheDate.getMinutes();
        };


        _P.getMonth = function () {
            return _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate()).month;
        };


        _P.getSeconds = function () {
            return this.cacheDate.getSeconds();
        };


        _P.getTime = function () {
            return this.cacheDate.getTime();
        };


        _P.getTimezoneOffset = function () {
            return this.cacheDate.getTimezoneOffset();
        };


        _P.getUTCDate = function () {
            return this.cacheDate.getUTCDate();
        };


        _P.getUTCDay = function () {
            return this.cacheDate.getUTCDay();
        };


        _P.getUTCFullYear = function () {
            return this.cacheDate.getUTCFullYear();
        };


        _P.getUTCHours = function () {
            return this.cacheDate.getUTCHours();
        };


        _P.getUTCMilliseconds = function () {
            return this.cacheDate.getUTCMilliseconds();
        };


        _P.getUTCMinutes = function () {
            return this.cacheDate.getUTCMinutes();
        };


        _P.getUTCMonth = function () {
            return this.cacheDate.getUTCMonth();
        };


        _P.getUTCSeconds = function () {
            return this.cacheDate.getUTCSeconds();
        };


        _P.getYear = function () {
            return _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate()).year;
        };


        _P.now = function () {
            return new Date().fa();
        };


        _P.parse = function () {
            return 'undefined';
        };


        _P.setDate = function (faDate) {
            var fD, gD;
            fD = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate());
            gD = _D.jalaliToGregorian(fD.year, fD.month, faDate);
            return this.cacheDate.setFullYear(gD.year) && this.cacheDate.setMonth(gD.month) && this.cacheDate.setDate(gD.date) && this;
        };


        _P.setFullYear = function (faYear) {
            var fD, gD;
            fD = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate());
            gD = _D.jalaliToGregorian(faYear, fD.month, fD.date);
            return this.cacheDate.setFullYear(gD.year) && this.cacheDate.setMonth(gD.month) && this.cacheDate.setDate(gD.date) && this;
        };


        _P.setHours = function (hour) {
            return this.cacheDate.setHours(hour) && this;
        };


        _P.setMilliseconds = function (milliseconds) {
            return this.cacheDate.setMilliseconds(milliseconds) && this;
        };


        _P.setMinutes = function (minutes) {
            return this.cacheDate.setMinutes(minutes) && this;
        };


        _P.setMonth = function (faMonth) {
            var fD, gD;
            fD = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate());
            gD = _D.jalaliToGregorian(fD.year, faMonth, fD.date);
            return this.cacheDate.setFullYear(gD.year) && this.cacheDate.setMonth(gD.month) && this.cacheDate.setDate(gD.date) && this;
        };


        _P.setSeconds = function (seconds) {
            return this.cacheDate.setSeconds(seconds) && this;
        };


        _P.setTime = function (time) {
            return this.cacheDate.setTime(time) && this;
        };


        _P.setUTCDate = function (v) {
            return this.cacheDate.setUTCDate(v) && this;
        };


        _P.setUTCFullYear = function (v) {
            return this.cacheDate.setUTCFullYear(v) && this;
        };


        _P.setUTCHours = function (v) {
            return this.cacheDate.setUTCHours(v) && this;
        };


        _P.setUTCMilliseconds = function (v) {
            return this.cacheDate.setUTCMilliseconds(v) && this;
        };


        _P.setUTCMinutes = function (v) {
            return this.cacheDate.setUTCMinutes(v) && this;
        };


        _P.setUTCMonth = function (v) {
            return this.cacheDate.setUTCMonth(v) && this;
        };


        _P.setUTCSeconds = function (v) {
            return this.cacheDate.setUTCSeconds(v) && this;
        };


        _P.setYear = function (faYear) {
            var fD, gD;
            fD = _D.gregorianToJalali(this.cacheDate.getFullYear(), this.cacheDate.getMonth(), this.cacheDate.getDate());
            gD = _D.jalaliToGregorian(faYear, fD.month, fD.date);
            return this.cacheDate.setFullYear(gD.year) && this.cacheDate.setMonth(gD.month) && this.cacheDate.setDate(gD.date) && this;
        };


        _P.toDateString = function () {
            return this.toString('ddd MMM dd yyyy');
        };


        _P.toGMTString = function () {
            return this.cacheDate.toGMTString();
        };


        _P.toISOString = function () {
            return this.toString('yyyy-MM-ddT') + this.getUTCHours() + ':' + this.getUTCMinutes() + ':' + this.getUTCSeconds() + '.' + this.getUTCMilliseconds() + 'Z';
        };


        /**
        * @description  Get the ISO Date number for Jalali date
        * @method
        * @public
        * @return {String} 
        */
        _P.toISODate = function () {
            return this.toString('yyyy-MM-dd');
        };


        _P.toJSON = function () {
            return this.toISOString();
        };


        _P.toLocaleDateString = function () {
            return this.cacheDate.toLocaleDateString();
        };


        _P.toLocaleString = function () {
            return this.cacheDate.toLocaleString();
        };


        /**
        * @description  jalali date to string 
        * @public
        * @method
        * @param format format date
        * @return {String} 
        */
        _P.toString = function (format) {
            if (typeof format !== 'undefined') {
                return (DateToString.eval(this, format)) || this.cacheDate;
            } else {
                return (DateToString.eval(this, 'ddd MMM dd yyyy ') + this.toTimeString()) || this.cacheDate;
            }
        };


        _P.toTimeString = function () {
            return this.cacheDate.toTimeString();
        };


        _P.toUTCString = function () {
            return this.cacheDate.toUTCString();
        };


        _P.UTC = function () {
            return this.cacheDate.UTC();
        };


        _P.valueOf = function () {
            return this.cacheDate.valueOf();
        };







        /* -=-=-=-=-=-=-=-=-=-=-=-=-= Start Formatting =-=-=-=-=-=-=-=-=-=-=-=-=-*/
        /** 
         * @private
         * @class
         * @description DateToString
         */
        var DateToString = (function () {

            /**
            * @constant
            */
            var formatStringRE = new RegExp(
                "(([a-zA-Z])\\2*)|" + // 1, 2
                "(\\(" + "(('.*?'|\\(.*?\\)|.)*?)" + "\\))|" + // 3, 4, 5 (allows for 1 level of inner quotes or parens)
                "('(.*?)')" // 6, 7
            );


            /**
            * @constant
            */
            var locales = {
                fa: {
                    monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
                    monthNamesShort: ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'],
                    dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', '\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647', 'جمعه'],
                    dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
                }
            };


            /**
            * @constructor
            */
            function DateToString() { }


            /**
            * @static
            * @method
            * @param {String} str 
            */
            DateToString.eval = function (date, formatString) {
                return _format(formatString, date);
            };


            /**
            * @function
            * @private 
            * @param {String} val 
            * @return {Number}
            */
            function _zeroDel(val) {
                return parseInt(val.replace(/\D/g, ''), 10);
            }


            /**
            * @function
            * @private
            * @param {Number} n 
            * @param {Number} len 
            * @return {String}
            */
            function _zeroPad(n, len) {
                len = len || 2;
                n += '';
                while (n.length < len) {
                    n = '0' + n;
                }
                return n;
            }


            /**
            * @function
            * @private
            * @param {String} formatString 
            * @param {Date} date 
            * @return {String}
            */
            function _format(formatString, date) {
                var m;
                var subout;
                var out = '';
                while (m = formatString.match(formatStringRE)) {
                    out += formatString.substr(0, m.index);
                    if (m[1]) { // consecutive alphabetic characters
                        out += _processTokenString(m[1], date);
                    } else if (m[3]) { // parenthesis
                        subout = _format(m[4], date);
                        if (_zeroDel(subout)) { // if any of the numbers are non-zero. or no numbers at all
                            out += subout;
                        }
                    } else { // else if (m[6]) { // single quotes
                        out += m[7] || "'"; // if inner is blank, meaning 2 consecutive quotes = literal single quote
                    }
                    formatString = formatString.substr(m.index + m[0].length);
                }
                return out + formatString;
            }


            /**
            * @function
            * @private
            * @param {String} tokenString 
            * @param {Date} date 
            * @return {String}
            */
            function _processTokenString(tokenString, date) {
                var end = tokenString.length;
                var replacement;
                var out = '';
                while (end > 0) {
                    replacement = _getTokenReplacement(tokenString.substr(0, end), date);
                    if (replacement !== undefined) {
                        out += replacement;
                        tokenString = tokenString.substr(end);
                        end = tokenString.length;
                    } else {
                        end--;
                    }
                }
                return out + tokenString;
            }


            /**
            * @function
            * @private
            * @param {String} token 
            * @param {Date} date 
            * @return {Number}
            */
            function _getTokenReplacement(token, date) {
                switch (token) {
                    case 's':
                        return date.getSeconds();
                    case 'ss':
                        return _zeroPad(date.getSeconds() + '');
                    case 'm':
                        return date.getMinutes();
                    case 'mm':
                        return _zeroPad(date.getMinutes() + '');
                    case 'h':
                        return (date.getHours() % 12 || 12);
                    case 'hh':
                        return _zeroPad((date.getHours() % 12 || 12) + '');
                    case 'H':
                        return date.getHours();
                    case 'HH':
                        return _zeroPad(date.getHours() + '');
                    case 'd':
                        return date.getDate();
                    case 'dd':
                        return _zeroPad(date.getDate());
                    case 'ddd':
                        return locales.fa.dayNamesShort[date.getDay()];
                    case 'dddd':
                        return locales.fa.dayNames[date.getDay()];
                    case 'M':
                        return (date.getMonth() + 1);
                    case 'MM':
                        return _zeroPad((date.getMonth() + 1));
                    case 'MMM':
                        return locales.fa.monthNamesShort[date.getMonth()];
                    case 'MMMM':
                        return locales.fa.monthNames[date.getMonth()];
                    case 'yy':
                        return parseInt((date.getFullYear() + '').substring(2));
                    case 'yyyy':
                        return date.getFullYear();
                    case 't':
                        return (date.getHours() >= 12) ? 'P' : 'A';
                    case 'tt':
                        return (date.getHours() >= 12) ? 'PM' : 'AM';
                }

            }
            return DateToString;
        })();
        /* -=-=-=-=-=-=-=-=-=-=-=-=-= End Formatting =-=-=-=-=-=-=-=-=-=-=-=-=-*/



        return FarsiDate;
    })();
})(Date, String);
