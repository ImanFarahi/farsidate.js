/**
 * Javascript Persian Date Extension  
 * (c) 2018 Iman Farahi
 * MIT Licensed.
 * persiandate-0.0.1.js
 * website: http://professionalprogrammer.ir
 * email: professionalprogrammer.ir@gmail.com
 */


Date.prototype.toJalali = function () {
	var gy, gm, gd, gy2, g_d_m, jy, jm, jd, days;
	gy = this.getFullYear();  gm = this.getMonth()+1; gd = this.getDate();
	g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
	if(gy > 1600) {
		jy=979;
		gy-=1600;
	} else {
		jy=0;
		gy-=621;
	}
	gy2=(gm > 2)?(gy+1):gy;
	days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
	jy+=33*(parseInt(days/12053)); 
	days%=12053;
	jy+=4*(parseInt(days/1461));
	days%=1461;
	if(days > 365){
		jy+=parseInt((days-1)/365);
		days=(days-1)%365;
	}
	jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
	jd=1+((days < 186)?(days%31):((days-186)%30));
	
	return [jy, jm, jd];
};


Date.prototype.jalaliToDate = function (jy, jm, jd)
{
	var gy, gm, gd, days, sal_a;
	if(jy > 979) {
		gy=1600;
		jy-=979;
	} else {
		gy=621;
	}
	days=(365*jy) +((parseInt(jy/33))*8) +(parseInt(((jy%33)+3)/4)) +78 +jd +((jm<7)?(jm-1)*31:((jm-7)*30)+186);
	gy+=400*(parseInt(days/146097));
	days%=146097;
	if(days > 36524){
		gy+=100*(parseInt(--days/36524));
		days%=36524;
		if(days >= 365)days++;
	}
	gy+=4*(parseInt(days/1461));
	days%=1461;
	if(days > 365){
		gy+=parseInt((days-1)/365);
		days=(days-1)%365;
	}
	gd=days+1;
	sal_a=[0,31,((gy%4==0 && gy%100!=0) || (gy%400==0))?29:28,31,30,31,30,31,31,30,31,30,31];
	for(gm=0;gm<13;gm++){
		v=sal_a[gm];
		if(gd <= v)break;
		gd-=v;
	}
	return this.setFullYear(gy) && this.setMonth(gm) && this.setDate(gd) && this; 
};

Date.prototype.jLeap = function (jy) {
    return ((jy - (jy > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
};

Date.prototype.leap =function () {
    return this.getFullYear() % 4 === 0 && !(this.getFullYear() % 100 === 0 && this.getFullYear() % 400 !== 0);
};

Date.prototype.jGetDay = function () {
	if (this.getDay() + 2 === 8) {
		return 1;
	} else if (this.getDay() + 2 === 7) {
		return 7;
	} else {
		return this.getDay() + 2;
	}
};

Date.prototype.jDaysInMonth = function (jy, jm) {
	if (jm < 1 || jm > 12) return 0;
	if (jm < 7) return 31;
	if (jm < 12) return 30;
	if (leap_persian(jy)) {
		return 30;
	}
	return 29;
};

Date.prototype.addDays = function( days ) {
    return  this.setTime(864E5 * days + this.valueOf()) && this;
};
Date.prototype.addWeek = function (weeks) {
    return  this.setTime(6048E5 * weeks + this.valueOf()) && this;
};

Date.prototype.startOfWeek = function (p) {
	return this.addDays(((this.getDay() < 6)? ( this.getDay() * -1 - p) : 0)) && this;
};

Date.prototype.jStartOfWeek = function () {
    return this.startOfWeek(1);
};

Date.prototype.clone = function () {
    return new Date(this.getTime());
};

Date.prototype.jGetDaysOfWeek= function(i) { 
	var Sat = this.clone().jStartOfWeek().addWeek(i);
	return [Sat, Sat.clone().addDays(1), Sat.clone().addDays(2),
		 Sat.clone().addDays(3), Sat.clone().addDays(4),Sat.clone().addDays(5), Sat.clone().addDays(6)];
};

Date.prototype.jFormat = function (format) {
    return _format(format, this, 'fa') || this;
};



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
		}
		else if (m[3]) { // parenthesis
			subout = _format(m[4], date, lang);
			if (_zeroDel(subout)) { // if any of the numbers are non-zero. or no numbers at all
				out += subout;
			}
		}
		else { // else if (m[6]) { // single quotes
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
	if(lang == 'fa') {
		switch (token) {
			case 'd'    : return date.toJalali()[2];
			case 'dd'   : return _zeroPad(date.toJalali()[2]);
			case 'ddd'  : return locales.fa.dayNamesShort[date.jGetDay()];
			case 'dddd' : return locales.fa.dayNames[date.jGetDay()];
			case 'M'    : return date.toJalali()[1];
			case 'MM'   : return _zeroPad(date.toJalali()[1]);
			case 'MMM'  : return locales.fa.monthNamesShort[date.jGetDay()];
			case 'MMMM' : return locales.fa.monthNames[date.jGetDay()];
			case 'yy'   : return parseInt((date.toJalali()[0]+'').substring(2));
			case 'yyyy' : return date.toJalali()[0];
		}
	}
}

/* End Formatting
---------------------------------------------------------------------------------*/




















