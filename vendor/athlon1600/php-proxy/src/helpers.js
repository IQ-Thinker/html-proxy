// Manage core logic by this variable
var Settlement = [];
Settlement.preg_replace = function(pattern, 
	replacement, string)
{
	let _flag = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1);
	_flag = (_flag !== '') ? _flag : 'g';
	const _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1);
	const regex = new RegExp(_pattern, _flag);
	const result = string.replace(regex, replacement);
	return result;
}
Settlement.function_exists = function(funcName)
{
	const $global = (typeof window !== 'undefined' ? window : global)
	if (typeof funcName === 'string')
	{
		funcName = $global[funcName]
	}
	return typeof funcName === 'function'
}
Settlement.stripos = function(fHaystack, fNeedle, fOffset)
{
	const haystack = (fHaystack + '').toLowerCase()
	const needle = (fNeedle + '').toLowerCase()
	let index = 0
	if ((index = haystack.indexOf(needle, fOffset)) !== -1)
	{
		return index
	}
	return false
}
Settlement.explode = function(separator, 
	string, 
	limit )
{
	// Check if given parameter value is valid or not
	if (arguments.length < 2 || 
        typeof separator === 'undefined' || 
        typeof string === 'undefined') {
    	// When not valid
        return null;
	}
	if (separator === '' || 
		separator === false || 
		separator === null) return false;
	if (typeof separator === 'function' || 
		typeof separator === 'object' || 
		typeof string === 'function' || 
		typeof string === 'object')
	{
		return {
			0: ''
		};
	}
	if (separator === true) 
	{
		separator = '1';
	}
	separator += '';
	string += '';
	var s = string.split(separator);
	// When limt are not given
	if (typeof limit === 'undefined') return s;

	if (limit === 0) limit = 1;

	if (limit > 0)
	{
		if (limit >= s.length) return s;
		return s.slice(0, limit - 1).
			concat([s.slice(limit - 1).
			join(separator)]);
	}
	// Negative limit handle
	if (-limit >= s.length) return [];
	s.splice(s.length + limit);
	return s;
}
Settlement.strtolower = function(str)
{
	return (str + '').toLowerCase();
}
function array_map(callback)
{
	var argc = arguments.length,
		argv = arguments,
		glbl = this.window,
		obj = null,
		cb = callback,
		j = 0,
		i = 0,
		k = 1,
		m = 0,
		tmp = [],
		tmp_ar = [];

	if(Array.isArray(argv[i]))
	{
		// Normal array
		j = argv[1].length;
	}
	else {
		j = Object.keys(argv[1]).length;
	}
	while (i < j)
	{
		while (k < argc)
		{
			tmp[m++] = argv[k++][i];
		}
		m = 0;
		k = 1;
		if (callback)
		{
			if (typeof callback === 'string')
			{
				cb = glbl[callback];
			}
			else if (typeof callback === 'object' && callback.length)
			{
				obj = typeof callback[0] === 'string' ? glbl[callback[0]] : callback[0];
				if (typeof obj === 'undefined')
				{
					throw 'Object not found: ' + callback[0];
				}
				cb = typeof callback[1] === 'string' ? obj[callback[1]] : callback[1];
			}
			tmp_ar[i++] = cb.apply(obj, tmp);
		}
		else
		{
			tmp_ar[i++] = tmp;
		}
		tmp = [];
	}
	// Normal array converting into object 
	return Object.assign({}, tmp_ar);
}
Settlement.in_array = function(needle,
 haystack, strict = false)
{
	var key = '';
	// we prevent the double check (strict && arr[key] === ndl) || 
	// (!strict && arr[key] == ndl)
	// in just one for, in order to improve the performance 
	// deciding wich type of comparation will do before walk array
	if (strict)
	{
		for (key in haystack)
		{
			if (haystack[key] === needle)
			{
				return true;
			}
		}
	}
	else
	{
		for (key in haystack)
		{
			if (haystack[key] == needle)
			{
				return true;
			}
		}
	}
	return false;
}
Settlement.preg_quote = function(str, delimiter)
{
	return String(str).replace(
		new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), 
		'\\$&'
	);
}
Settlement.str_repeat = function(input, multiplier)
{
	let y = ''
	while (true)
	{
		if (multiplier & 1)
		{
			y += input
		}
		multiplier >>= 1
		if (multiplier)
		{
			input += input
		}
		else
		{
			break
		}
	}
	return y
}
Settlement.ord = function(text)
{
	var str = text + '',
		code = str.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		// High surrogate 
		// (could change last hex to 0xDB7F to treat 
		//  high private surrogates as single characters)
		var hi = code;
		if (str.length === 1)
		{
			// This is just a high surrogate with 
			// no following low surrogate, so we return its value.
			return code;
			// we could also throw an error as it is
			// not a complete character, but someone may want to know.
		}
		var low = str.charCodeAt(1);
		return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
	}
	if (0xDC00 <= code && code <= 0xDFFF)
	{
		// Low surrogate
		// This is just a low surrogate with no preceding 
		// high surrogate, so we return its value;
		return code;
		// we could also throw an error as it is not a 
		// complete character, but someone may want to know
	}
	return code;
}
Settlement.chr = function(bytevalue)
{
	// Php chr generate a byte string 
	// from a number (0..255).

	// Check whether number is very large
	// 0xFFFF = 65535
	if (bytevalue > 0xFFFF)
	{
		// 0x10000 = 65536
		bytevalue -= 0x10000;
		// 0xD800 = 55296
		// 0xDC00 = 56320
		// 0x3FF  = 1023
		return String.fromCharCode(
			0xD800 + (bytevalue >> 10), 
            0xDC00 + (bytevalue & 0x3FF)
        );
	}
	else if(bytevalue < 0 )
    {
    	// Case : it manage request 
    	// of negative byte value.
        while (bytevalue < 0) {
		    bytevalue += 256;
		}
		bytevalue %= 256;
    }
	// Generate byte string from a number
	return String.fromCharCode(bytevalue);
}
Settlement.empty = function(mixed_var)
{
	var undef, key, i, len;
	var emptyValues = [undef, null, false, 0, '', '0'];
	for (i = 0, len = emptyValues.length; i < len; i++)
	{
		if (mixed_var === emptyValues[i])
		{
			return true;
		}
	}
	if (typeof mixed_var === 'object')
	{
		for (key in mixed_var)
		{
			return false;
		}
		return true;
	}
	return false;
}
Settlement.str_replace = function(search, replace, subject, countObj)
{
	let i = 0
	let j = 0
	let temp = ''
	let repl = ''
	let sl = 0
	let fl = 0
	const f = [].concat(search)
	let r = [].concat(replace)
	let s = subject
	let ra = Object.prototype.toString.call(r) === '[object Array]'
	const sa = Object.prototype.toString.call(s) === '[object Array]'
	s = [].concat(s)
	const $global = (typeof window !== 'undefined' ? window : global)
	$global.$locutus = $global.$locutus ||
	{}
	const $locutus = $global.$locutus
	$locutus.php = $locutus.php ||
	{}
	if (typeof(search) === 'object' && typeof(replace) === 'string')
	{
		temp = replace
		replace = []
		for (i = 0; i < search.length; i += 1)
		{
			replace[i] = temp
		}
		temp = ''
		r = [].concat(replace)
		ra = Object.prototype.toString.call(r) === '[object Array]'
	}
	if (typeof countObj !== 'undefined')
	{
		countObj.value = 0
	}
	for (i = 0, sl = s.length; i < sl; i++)
	{
		if (s[i] === '')
		{
			continue
		}
		for (j = 0, fl = f.length; j < fl; j++)
		{
			if (f[j] === '')
			{
				continue
			}
			temp = s[i] + ''
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
			s[i] = (temp).split(f[j]).join(repl)
			if (typeof countObj !== 'undefined')
			{
				countObj.value += ((temp.split(f[j])).length - 1)
			}
		}
	}
	return sa ? s : s[0]
}
Settlement.microtime = function(get_as_float)
{
	if (typeof performance !== 'undefined' && performance.now)
	{
		var now = (performance.now() + performance.timing.navigationStart) / 1e3;
		if (get_as_float) return now;
		// Math.round(now)
		var s = now | 0;
		return (Math.round((now - s) * 1e6) / 1e6) + ' ' + s;
	}
	else
	{
		var now = (Date.now ? Date.now() : new Date().getTime()) / 1e3;
		if (get_as_float) return now;
		// Math.round(now)
		var s = now | 0;
		return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s;
	}
}
Settlement.round = function(value, precision, mode)
{
	// helper variables
	var m, f, isHalf, sgn;
	// making sure precision is integer
	precision |= 0;
	m = Math.pow(10, precision);
	value *= m;
	// sign of the number
	sgn = (value > 0) | -(value < 0);
	isHalf = value % 1 === 0.5 * sgn;
	f = Math.floor(value);
	if (isHalf)
	{
		switch (mode)
		{
			// PHP_ROUND_HALF_DOWN = 2
			case 2:
				// rounds .5 toward zero
				value = f + (sgn < 0);
				break;
				// PHP_ROUND_HALF_EVEN = 3
			case 3:
				// rouds .5 towards the next even integer
				value = f + (f % 2 * sgn);
				break;
				// PHP_ROUND_HALF_ODD = 4
			case 4:
				// rounds .5 towards the next odd integer
				value = f + !(f % 2);
				break;
			default:
				// rounds .5 away from zero
				value = f + (sgn > 0);
		}
	}
	return (isHalf ? value : Math.round(value)) / m;
}
Settlement.base64_encode = function(text)
{
 	// Tested in chrome browser
  	return window.btoa(unescape(encodeURIComponent(text)));
}
Settlement.rtrim = function(str,characters)
{
  	characters = !characters ? ' \\s\u00A0' : (characters + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
	var re = new RegExp('[' + characters + ']+$', 'g');
	return (str + '').replace(re, '');
}
Settlement.str_pad = function(input, padLength, padString, padType)
{
	let half = ''
	let padToGo
	const _strPadRepeater = function(s, len)
	{
		let collect = ''
		while (collect.length < len)
		{
			collect += s
		}
		collect = collect.substr(0, len)
		return collect
	}
	input += ''
	padString = padString !== undefined ? padString : ' '
	if (padType !== 0 && padType !== 1 && padType !== 2)
	{
		padType = 1
	}
	if ((padToGo = padLength - input.length) > 0)
	{
		if (padType === 0)
		{
			input = _strPadRepeater(padString, padToGo) + input
		}
		else if (padType === 1)
		{
			input = input + _strPadRepeater(padString, padToGo)
		}
		else if (padType === 2)
		{
			half = _strPadRepeater(padString, Math.ceil(padToGo / 2))
			input = half + input + half
			input = input.substr(0, padLength)
		}
	}
	return input
}
Settlement.base64_decode = function(text)
{
 	// Tested in chrome browser
  	return decodeURIComponent(escape(window.atob(text)));
}
Settlement.rawurlencode = function(str)
{
	str = (str + '').toString();
	return encodeURIComponent(str).
	replace(/!/g, '%21').
	replace(/'/g, '%27').
	replace(/\(/g, '%28').
	replace(/\)/g, '%29').
	replace(/\*/g, '%2A');
}
Settlement.rawurldecode = function(str)
{
	return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function()
	{
		return '%25';
	}));
}
Settlement.htmlspecialchars_decode = function(string, quoteStyle)
{
	let optTemp = 0
	let i = 0
	let noquotes = false
	if (typeof quoteStyle === 'undefined')
	{
		quoteStyle = 2
	}
	string = string.toString().replace(/</g, '<').replace(/>/g, '>')
	const OPTS = {
		ENT_NOQUOTES: 0,
		ENT_HTML_QUOTE_SINGLE: 1,
		ENT_HTML_QUOTE_DOUBLE: 2,
		ENT_COMPAT: 2,
		ENT_QUOTES: 3,
		ENT_IGNORE: 4
	}
	if (quoteStyle === 0)
	{
		noquotes = true
	}
	if (typeof quoteStyle !== 'number')
	{
		// Allow for a single string or an array of string flags
		quoteStyle = [].concat(quoteStyle)
		for (i = 0; i < quoteStyle.length; i++)
		{
			// Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
			if (OPTS[quoteStyle[i]] === 0)
			{
				noquotes = true
			}
			else if (OPTS[quoteStyle[i]])
			{
				optTemp = optTemp | OPTS[quoteStyle[i]]
			}
		}
		quoteStyle = optTemp
	}
	if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE)
	{
		// PHP doesn't currently escape if more than one 0, but it should:
		string = string.replace(/�*39;/g, "'")
		// This would also be useful here, but not a part of PHP:
		// string = string.replace(/'|�*27;/g, "'");
	}
	if (!noquotes)
	{
		string = string.replace(/"/g, '"')
	}
	// Put this in last place to avoid escape being double-decoded
	string = string.replace(/&/g, '&')
	return string
}
Settlement.strpos = function(haystack, needle, offset)
{
	const i = (haystack + '').indexOf(needle, (offset || 0))
	return i === -1 ? false : i
}
//---------------------------------
// kalkicode.com 
// These methods have not been changed by our tools.
// trim
// clean_content_type
// strtr
// preg_match
// preg_match_all
// extract
// ob_start
// file_exists
// ob_get_contents
// ob_end_clean
// str_rot_pass
// base64_url_encode
// base64_url_decode
// add_http
// rel2abs
// app_url
// url_encrypt
// parse_url
// preg_replace
//----------------------------

use Proxy\Config;
// strip away extra parameters text/html; charset=UTF-8
function clean_content_type(content_type)
{
    return trim(Settlement.preg_replace('@;.*@', '', content_type));
}
if (!Settlement.function_exists('starts_with')) {
    function starts_with(haystack, needles)
    {
        foreach ((array) needles as n) {
            if (n !== '' && Settlement.stripos(haystack, n) === 0) {
                return true;
            }
        }
        return false;
    }
}
if (!Settlement.function_exists('str_before')) {
    function str_before(subject, search)
    {
        return search === '' ? subject : Settlement.explode(search, subject)[0];
    }
}
function is_html(content_type)
{
    return clean_content_type(content_type) == 'text/html';
}
function in_arrayi(needle, haystack)
{
    return Settlement.in_array(Settlement.strtolower(needle), array_map('strtolower', haystack));
}
function re_match(pattern, string)
{
    quoted = Settlement.preg_quote(pattern, '#');
    translated = strtr(quoted, {'\\*':'.*','\\?':'.'});
    return preg_match("#^"+translated+"\$#i", string) === 1;
}
// regular array_merge does not work if arrays have numeric keys...
function array_merge_custom()
{
    arr = {};
    args = arguments;
    foreach ((array) args as arg) {
        for(var key in (array) arg) {
        value = (array) arg[key];
            arr[key] = value;
        }
    }
    return arr;
}
// rotate each string character based on corresponding ascii values from some key
function str_rot_pass(str, key, decrypt = false)
{
    // if key happens to be shorter than the data
    key_len = key.length;
    result = Settlement.str_repeat(' ', str.length);
    for (i = 0; i < str.length; i++) {
        if (decrypt) {
            ascii = Settlement.ord(str[i]) - Settlement.ord(key[i % key_len]);
        } else {
            ascii = Settlement.ord(str[i]) + Settlement.ord(key[i % key_len]);
        }
        result[i] = Settlement.chr(ascii);
    }
    return result;
}
function app_url()
{
    if (Config.get('app_url')) {
        return Config.get('app_url');
    } else {
        return (!Settlement.empty(_SERVER['HTTPS']) ? 'https://' : 'http://')+_SERVER['HTTP_HOST']+_SERVER['PHP_SELF'];
    }
}
function render_string(str, vars = {})
{
    preg_match_all('@{([a-z0-9_]+)}@s', str, matches, 2);
    foreach (matches as match) {
        extract(vars, 3, "_var");
        var_val = {"_var_"+match[1]};
        str = Settlement.str_replace(match[0], var_val, str);
    }
    return str;
}
function render_template(file_path, vars = {})
{
    // variables to be used within that template
    extract(vars);
    ob_start();
    if (file_exists(file_path)) {
        include file_path;
    } else {
        die("Failed to load template: {file_path}");
    }
    contents = ob_get_contents();
    ob_end_clean();
    return contents;
}
function add_http(url)
{
    if (!preg_match('#^https?://#i', url)) {
        url = 'http://'+url;
    }
    return url;
}
function time_ms()
{
    return Settlement.round(Settlement.microtime(true) * 1000);
}
function base64_url_encode(input)
{
    // = at the end is just padding to make the length of the str divisible by 4
    return Settlement.rtrim(strtr(Settlement.base64_encode(input), '+/', '-_'), '=');
}
function base64_url_decode(input)
{
    return Settlement.base64_decode(Settlement.str_pad(strtr(input, '-_', '+/'), input.length % 4, '=', 1));
}
function url_encrypt(url, key = false)
{
    if (key) {
        url = str_rot_pass(url, key);
    } else {
        if (Config.get('encryption_key')) {
            url = str_rot_pass(url, Config.get('encryption_key'));
        }
    }
    return Config.get('url_mode') ? base64_url_encode(url) : Settlement.rawurlencode(url);
}
function url_decrypt(url, key = false)
{
    url = Config.get('url_mode') ? base64_url_decode(url) : Settlement.rawurldecode(url);
    if (key) {
        url = str_rot_pass(url, key, true);
    } else {
        if (Config.get('encryption_key')) {
            url = str_rot_pass(url, Config.get('encryption_key'), true);
        }
    }
    return url;
}
// www.youtube.com TO proxy-app.com/index.php?q=encrypt_url(www.youtube.com)
function proxify_url(url, base_url = '')
{
    url = Settlement.htmlspecialchars_decode(url);
    if (base_url) {
        base_url = add_http(base_url);
        url = rel2abs(url, base_url);
    }
    return app_url()+'?q='+url_encrypt(url);
}
function rel2abs(rel, base)
{
    if (Settlement.strpos(rel, "//") === 0) {
        return "http:"+rel;
    }
    if (rel == "") {
        return "";
    }
    /* return if  already absolute URL */
    if (parse_url(rel, 0) != '') {
        return rel;
    }
    /* queries and  anchors */
    if (rel[0] == '#' || rel[0] == '?') {
        return base+rel;
    }
    /* parse base URL  and convert to local variables:
    	$scheme, $host,  $path */
    extract(parse_url(base));
    /* remove  non-directory element from path */
    @(path = Settlement.preg_replace('#/[^/]*$#', '', path));
    /* destroy path if  relative url points to root */
    if (rel[0] == '/') {
        path = '';
    }
    /* dirty absolute  URL */
    abs = "{host}{path}/{rel}";
    /* replace '//' or  '/./' or '/foo/../' with '/' */
    re = {0:'#(/\\.?/)#',1:'#/(?!\\.\\.)[^/]+/\\.\\./#'};
    for (n = 1; n > 0; abs = preg_replace(re, '/', abs, -1, n)) {
    }
    /* absolute URL is  ready! */
    return scheme+'://'+abs;
}
