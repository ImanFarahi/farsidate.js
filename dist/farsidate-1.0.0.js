/**
 * Javascript Farsi Date Extension  
 * (c) 2018 Iman Farahi
 * MIT Licensed.
 * farsidate-1.0.0.js
 * website: http://farsidate.ir
 * email: professionalprogrammer.ir@gmail.com
 * fa = farsi = persian
 */

/*
Calculates the Jalali Date from Current Date Object.

    @return 
        faYear: Jalali Year
        faMonth: Jalali Month
        faDate: Jalali Date
*/
Date.prototype.toFarsiDate = function () {
    var gy, gm, gd, gy2, g_d_m, faYear, faMonth, faDate, days;
    gy = this.getFullYear();
    gm = this.getMonth() + 1;
    gd = this.getDate();
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    if (gy > 1600) {
        faYear = 979;
        gy -= 1600;
    } else {
        faYear = 0;
        gy -= 621;
    }
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    faYear += 33 * (parseInt(days / 12053));
    days %= 12053;
    faYear += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        faYear += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    faMonth = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    faDate = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));

    return {'faYear': faYear, 'faMonth': faMonth, 'faDate': faDate};
};

/*
Calculates the Date Object from Jalali Date.

    @param faYear Jalaali year (\d{4})
    @param faMonth Jalaali month (1 to 12)
    @param faDate Jalaali day (1 to 29/31)
    @return Current Object
*/
Date.prototype.farsiDateTo = function (faYear, faMonth, faDate) {
    var gy, gm, gd, days, sal_a, v;
    if (faYear > 979) {
        gy = 1600;
        faYear -= 979;
    } else {
        gy = 621;
    }
    days = (365 * faYear) + ((parseInt(faYear / 33)) * 8) + (parseInt(((faYear % 33) + 3) / 4)) + 78 + faDate + ((faMonth < 7) ? (faMonth - 1) * 31 : ((faMonth - 7) * 30) + 186);
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
    return this.setFullYear(gy) && this.setMonth(gm - 1) && this.setDate(gd) && this;
};

Date.prototype.faIsLeap = function () {
    var faYear = this.toFarsiDate().faYear;
    return ((faYear - (faYear > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
};

Date.prototype.isLeap = function () {
    return this.getFullYear() % 4 === 0 && !(this.getFullYear() % 100 === 0 && this.getFullYear() % 400 !== 0);
};

Date.prototype.faGetDay = function () {
    if (this.getDay() + 2 === 8) {
        return 1;
    } else if (this.getDay() + 2 === 7) {
        return 7;
    } else {
        return this.getDay() + 2;
    }
};

Date.prototype.getDaysInMonth = function () {
    return [31, (this.isLeap(this.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.getMonth()];
};

Date.prototype.faGetDaysInMonth = function () {
    var faMonth = this.toFarsiDate().faMonth;
    if (faMonth < 1 || faMonth > 12) return 0;
    if (faMonth < 7) return 31;
    if (faMonth < 12) return 30;
    if (this.faIsLeap()) {
        return 30;
    }
    return 29;
};

Date.prototype.faStartOfMonth = function () {
    var fD = this.toFarsiDate();
    return this.farsiDateTo(fD.faYear, fD.faMonth, 1);
};

Date.prototype.addDays = function (days) {
    return this.setTime(864E5 * days + this.valueOf()) && this;
};

Date.prototype.addWeeks = function (weeks) {
    return this.addDays(weeks * 7) && this;
};

Date.prototype.addMonths = function (months) {
    var sumM, newM, newY, d = this.getDate();
    sumM = months + (this.getMonth() + 1);
    newY = Math.floor(sumM / 12);
    newM = sumM - (newY * 12);
    newY += this.getFullYear();
    if (newM == 0) {
        newM = 12;
        newY--;
    }
    return this.setDate(1) && this.setMonth((newM - 1)) && this.setFullYear(newY) && this.setDate(Math.min(d, this.getDaysInMonth())) && this;
};

Date.prototype.addYears = function (years) {
    return this.addMonths(years * 12) && this;
};

Date.prototype.faAddMonths = function (months) {
    var sumM, newFaM, newFaY, fD = this.toFarsiDate();
    sumM = months + fD.faMonth;
    newFaY = Math.floor(sumM / 12);
    newFaM = sumM - (newFaY * 12);
    newFaY += fD.faYear;
    if (newFaM == 0) {
        newFaM = 12;
        newFaY--;
    }
    return this.farsiDateTo(newFaY, newFaM, 1) && this.farsiDateTo(newFaY, newFaM, Math.min(fD.faDate, this.faGetDaysInMonth())) && this;
};

Date.prototype.faAddYears = function (years) {
    return this.faAddMonths(years * 12) && this;
};

Date.prototype.startOfWeek = function (p) {
    return this.addDays(((this.getDay() < 6) ? (this.getDay() * -1 - p) : 0)) && this;
};

Date.prototype.faStartOfWeek = function () {
    return this.startOfWeek(1);
};

Date.prototype.clone = function () {
    return new Date(this.getTime());
};

Date.prototype.faGetDaysOfMonth = function () {
    var firstDay = this.clone().faStartOfMonth();
    return [firstDay.clone().faGetDaysOfWeek(),
    firstDay.clone().addWeeks(1).faGetDaysOfWeek(),
    firstDay.clone().addWeeks(2).faGetDaysOfWeek(),
    firstDay.clone().addWeeks(3).faGetDaysOfWeek(),
    firstDay.clone().addWeeks(4).faGetDaysOfWeek(),
    firstDay.clone().addWeeks(5).faGetDaysOfWeek(),
    ];
};

Date.prototype.faGetDaysOfWeek = function () {
    var Sat = this.clone().faStartOfWeek();
    return [Sat, Sat.clone().addDays(1), Sat.clone().addDays(2),
        Sat.clone().addDays(3), Sat.clone().addDays(4), Sat.clone().addDays(5), Sat.clone().addDays(6)
    ];
};

Date.prototype.faFormat = function (format) {
    return _format(format, this, 'fa') || this;
};

Date.isDate = function (input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
};

Date.prototype.toISODate = function () {
    return (this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate());
};

Date.prototype.faToISODate = function () {
    return this.faFormat('yyyy-MM-dd');
};

/* start other */
String.prototype.toFarsiDigits = function () {
    var charCodeZero = '۰'.charCodeAt(0);
    return this.replace(/[0-9]/g, function (w) {
        return String.fromCharCode(parseInt(w) + charCodeZero);
    });
};
/* end other */

/* Start Formatting
---------------------------------------------------------------------------------*/
var formatStringRE = new RegExp(
    "(([a-zA-Z])\\2*)|" + // 1, 2
    "(\\(" + "(('.*?'|\\(.*?\\)|.)*?)" + "\\))|" + // 3, 4, 5 (allows for 1 level of inner quotes or parens)
    "('(.*?)')" // 6, 7
);

var locales = {
    fa: {
        monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        monthNamesShort: ['فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر', 'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف'],
        dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', '\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647', 'جمعه'],
        dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    }
};

function _zeroDel(val) {
    return parseInt(val.replace(/\D/g, ''), 10);
}

function _zeroPad(n, len) {
    len = len || 2;
    n += '';
    while (n.length < len) {
        n = '0' + n;
    }
    return n;
}

function _format(formatString, date, lang) {
    var m;
    var subout;
    var out = '';
    while (m = formatString.match(formatStringRE)) {
        out += formatString.substr(0, m.index);
        if (m[1]) { // consecutive alphabetic characters
            out += _processTokenString(m[1], date, lang);
        } else if (m[3]) { // parenthesis
            subout = _format(m[4], date, lang);
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

function _processTokenString(tokenString, date, lang) {
    var end = tokenString.length;
    var replacement;
    var out = '';
    while (end > 0) {
        replacement = _getTokenReplacement(tokenString.substr(0, end), date, lang);
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

function _getTokenReplacement(token, date, lang) {
    if (lang == 'fa') {
        switch (token) {
            case 'd':
                return date.toFarsiDate().faDate;
            case 'dd':
                return _zeroPad(date.toFarsiDate().faDate);
            case 'ddd':
                return locales.fa.dayNamesShort[date.faGetDay() - 1];
            case 'dddd':
                return locales.fa.dayNames[date.faGetDay() - 1];
            case 'M':
                return date.toFarsiDate().faMonth;
            case 'MM':
                return _zeroPad(date.toFarsiDate().faMonth);
            case 'MMM':
                return locales.fa.monthNamesShort[date.toFarsiDate().faMonth - 1];
            case 'MMMM':
                return locales.fa.monthNames[date.toFarsiDate().faMonth - 1];
            case 'yy':
                return parseInt((date.toFarsiDate().faYear + '').substring(2));
            case 'yyyy':
                return date.toFarsiDate().faYear;
        }
    }
}

/* End Formatting
---------------------------------------------------------------------------------*/
