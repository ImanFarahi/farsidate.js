/**
 * Javascript Farsi Date Extension  
 * (c) 2018 Iman Farahi
 * MIT Licensed.
 * farsidate-1.0.0.js
 * website: http://farsidate.ir
 * email: professionalprogrammer.ir@gmail.com
 * fD = farsiDate
 */
Date.prototype.toFarsiDate = function() {
    var gy, gm, gd, gy2, g_d_m, fDY, fDM, fDD, days;
    gy = this.getFullYear();
    gm = this.getMonth() + 1;
    gd = this.getDate();
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    if (gy > 1600) {
        fDY = 979;
        gy -= 1600;
    } else {
        fDY = 0;
        gy -= 621;
    }
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    fDY += 33 * (parseInt(days / 12053));
    days %= 12053;
    fDY += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        fDY += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    fDM = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    fDD = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));

    return [fDY, fDM, fDD];
};

Date.prototype.farsiDateTo = function(fDY, fDM, fDD) {
    var gy, gm, gd, days, sal_a, v;
    if (fDY > 979) {
        gy = 1600;
        fDY -= 979;
    } else {
        gy = 621;
    }
    days = (365 * fDY) + ((parseInt(fDY / 33)) * 8) + (parseInt(((fDY % 33) + 3) / 4)) + 78 + fDD + ((fDM < 7) ? (fDM - 1) * 31 : ((fDM - 7) * 30) + 186);
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

Date.prototype.fDLeap = function(fDY) {
    return ((fDY - (fDY > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
};

Date.prototype.leap = function() {
    return this.getFullYear() % 4 === 0 && !(this.getFullYear() % 100 === 0 && this.getFullYear() % 400 !== 0);
};

Date.prototype.fDGetDay = function() {
    if (this.getDay() + 2 === 8) {
        return 1;
    } else if (this.getDay() + 2 === 7) {
        return 7;
    } else {
        return this.getDay() + 2;
    }
};

Date.prototype.fDDaysInMonth = function() {
    var fDY, fDM;
    [fDY, fDM, ] = this.toFarsiDate();
    if (fDM < 1 || fDM > 12) return 0;
    if (fDM < 7) return 31;
    if (fDM < 12) return 30;
    if (this.fDLeap(fDY)) {
        return 30;
    }
    return 29;
};
Date.prototype.fDStartOfMonth = function() {
    var fDY, fDM;
    [fDY, fDM, ] = this.toFarsiDate();
    return this.FarsiDateTo(fDY, fDM, 1);
};
Date.prototype.addDays = function(days) {
    return this.setTime(864E5 * days + this.valueOf()) && this;
};
Date.prototype.addWeek = function(weeks) {
    return this.setTime(6048E5 * weeks + this.valueOf()) && this;
};

Date.prototype.startOfWeek = function(p) {
    return this.addDays(((this.getDay() < 6) ? (this.getDay() * -1 - p) : 0)) && this;
};

Date.prototype.fDStartOfWeek = function() {
    return this.startOfWeek(1);
};

Date.prototype.clone = function() {
    return new Date(this.getTime());
};

Date.prototype.fDGetDaysOfMonth = function() {
    var fd, dim, d, out;
    fd = this.clone().fDStartOfMonth();
    out = [fd.fDGetDaysOfWeek(),
        fd.clone().addWeek(1).fDGetDaysOfWeek(),
        fd.clone().addWeek(2).fDGetDaysOfWeek(),
        fd.clone().addWeek(3).fDGetDaysOfWeek(),
        fd.clone().addWeek(4).fDGetDaysOfWeek()
    ];
    dim = fd.fDDaysInMonth();
    d = fd.fDGetDay();
    if ((d == 6 && dim == 31) || (d == 0 && dim >= 30)) {
        out.push(fd.clone().addWeek(5).fDGetDaysOfWeek());
    }
    return out;
};

Date.prototype.fDGetDaysOfWeek = function() {
    var Sat = this.clone().fDStartOfWeek();
    return [Sat, Sat.clone().addDays(1), Sat.clone().addDays(2),
        Sat.clone().addDays(3), Sat.clone().addDays(4), Sat.clone().addDays(5), Sat.clone().addDays(6)
    ];
};

Date.prototype.fDFormat = function(format) {
    return _format(format, this, 'fa') || this;
};

Date.isDate = function(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
};

/* start other */
String.prototype.toPersianDigits = function() {
    var charCodeZero = '۰'.charCodeAt(0);
    return this.replace(/[0-9]/g, function(w) {
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
                return date.toFarsiDate()[2];
            case 'dd':
                return _zeroPad(date.toFarsiDate()[2]);
            case 'ddd':
                return locales.fa.dayNamesShort[date.fDGetDay() - 1];
            case 'dddd':
                return locales.fa.dayNames[date.fDGetDay() - 1];
            case 'M':
                return date.toFarsiDate()[1];
            case 'MM':
                return _zeroPad(date.toFarsiDate()[1]);
            case 'MMM':
                return locales.fa.monthNamesShort[date.toFarsiDate()[1] - 1];
            case 'MMMM':
                return locales.fa.monthNames[date.toFarsiDate()[1] - 1];
            case 'yy':
                return parseInt((date.toFarsiDate()[0] + '').substring(2));
            case 'yyyy':
                return date.toFarsiDate()[0];
        }
    }
}

/* End Formatting
---------------------------------------------------------------------------------*/