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
Settlement.strpos = function(haystack, needle, offset)
{
	const i = (haystack + '').indexOf(needle, (offset || 0))
	return i === -1 ? false : i
}
// ------------------------
// Function : default_key
// This is an alternate function which 
// is find default key of map.
// We assume that passing parameter is a 
// Object of javascript.
Settlement.default_key = function (obj) {
	var result = 0;
	Object.entries(obj).map(item => {
		// It's not 100 % accurate when 
		// given key = 1 or key = "1" 
		// both same in javascript.
		// Or key is an string in javascript object.
		const num = Number(item[0]);
	    // Check key is integer and key 
    	// is not less than result
	  	if(Number.isInteger(num) && 
    		num >= result)
    	{
    		// Get new key
    		result = num + 1;
    	}
	})
	// Important set empty 
	// when access [][] 
	// array of array.
	obj[result] = {};
	return result;
}
Settlement.array_shift = function(inputArr)
{
	if (Object.prototype.toString.call(inputArr) === '[object Object]')
	{
		var props = false,
			shift = undefined,
			temp = [],
			int_ct = -1;
		for (var pr in inputArr)
		{
			if (inputArr.hasOwnProperty(pr))
			{
				if (props == false)
				{
					props = true;
					shift = inputArr[pr];
				}
				else
				{
					temp.push(inputArr[pr]);
				}
				delete inputArr[pr];
			}
		}
		int_ct = 0;
		for (var info in temp)
		{
			inputArr[int_ct] = temp[info];
			int_ct++;
		}
		if (!props)
		{
			return null;
		}
		return shift;
	}
	else
	{
		if (inputArr.length === 0)
		{
			return null;
		}
		if (inputArr.length > 0)
		{
			return inputArr.shift();
		}
	}
}
//---------------------------------
// kalkicode.com 
// These methods have not been changed by our tools.
// substr
// preg_match
// substr_replace
//----------------------------

namespace Proxy;

var Html = (function()
{
    Html.remove_scripts = function(html)
    {
        html = Settlement.preg_replace('/<\\s*script[^>]*>(.*?)<\\s*\\/\\s*script\\s*>/is', '', html);
        return html;
    };
    Html.remove_styles = function(html)
    {
        html = Settlement.preg_replace('/<\\s*style[^>]*>(.*?)<\\s*\\/\\s*style\\s*>/is', '', html);
        return html;
    };
    Html.remove_comments = function(html)
    {
        return Settlement.preg_replace('/<!--(.*?)-->/s', '', html);
    };
    Html.find = function(selector, html, start_from = 0)
    {
        html = substr(html, start_from);
        inner_start = 0;
        inner_end = 0;
        pattern = '//';
        if (substr(selector, 0, 1) == '#') {
            pattern = '/<(\\w+)[^>]+id="'+substr(selector, 1)+'"[^>]*>/is';
        } else {
            if (substr(selector, 0, 1) == '.') {
                pattern = '/<(\\w+)[^>]+class="'+substr(selector, 1)+'"[^>]*>/is';
            } else {
                return false;
            }
        }
        if (preg_match(pattern, html, matches, 256)) {
            outer_start = matches[0][1];
            inner_start = matches[0][1] + matches[0][0].length;
            // tag stuff
            tag_name = matches[1][0];
            tag_len = tag_name.length;
            run_count = 300;
            // "open" <tag elements we found so far
            open_count = 1;
            start = inner_start;
            while (open_count != 0 && run_count-- > 0) {
                open_tag = Settlement.strpos(html, "<{tag_name}", start);
                close_tag = Settlement.strpos(html, "</{tag_name}", start);
                // nothing was found?
                if (open_tag === false && close_tag === false) {
                    break;
                }
                //echo "open_tag: {$open_tag}, close_tag {$close_tag}\r\n";
                // found OPEN tag
                if (close_tag === false || open_tag !== false && open_tag < close_tag) {
                    open_count++;
                    start = open_tag + tag_len + 1;
                    //echo "found open tag: ".substr($html, $open_tag, 20)." at {$open_tag} \r\n";
                    // found CLOSE tag
                } else {
                    if (open_tag === false || close_tag !== false && close_tag < open_tag) {
                        open_count--;
                        start = close_tag + tag_len + 2;
                        //echo "found close tag: ".substr($html, $close_tag, 20)." at {$close_tag} \r\n";
                    }
                }
            }
            // something went wrong... don't bother returning anything
            if (open_count != 0) {
                return false;
            }
            outer_end = close_tag + tag_len + 3;
            inner_end = close_tag;
            return {'outer_start':outer_start + start_from,'inner_start':inner_start + start_from,'inner_end':inner_end + start_from,'outer_end':outer_end + start_from};
        }
        return false;
    };
    Html.extract_inner = function(selector, html)
    {
        return self.extract(selector, html, true);
    };
    Html.extract_outer = function(selector, html)
    {
        return self.extract(selector, html, false);
    };
    Html.extract = function(selector, html, inner = false)
    {
        pos = 0;
        limit = 300;
        result = {};
        data = false;
        do {
            data = self.find(selector, html, pos);
            if (data) {
                code = substr(html, inner ? data['inner_start'] : data['outer_start'], inner ? data['inner_end'] - data['inner_start'] : data['outer_end'] - data['outer_start']);
                k__1 = Settlement.default_key(result);
                result[k__1] = code;
                pos = data['outer_end'];
            }
        } while (data && --limit > 0);
        return result;
    };
    Html.remove = function(selector, html)
    {
        return self.replace(selector, '', html, false);
    };
    Html.replace_outer = function(selector, replace, html, matches = NULL)
    {
        return self.replace(selector, replace, html, false, matches);
    };
    Html.replace_inner = function(selector, replace, html, matches = NULL)
    {
        return self.replace(selector, replace, html, true, matches);
    };
    Html.replace = function(selector, replace, html, replace_inner = false, matches = NULL)
    {
        start_from = 0;
        limit = 300;
        data = false;
        replace = (array) replace;
        do {
            data = self.find(selector, html, start_from);
            if (data) {
                r = Settlement.array_shift(replace);
                // from where to where will we be replacing?
                replace_space = replace_inner ? data['inner_end'] - data['inner_start'] : data['outer_end'] - data['outer_start'];
                replace_len = r.length;
                if (matches !== NULL) {
                    k__1 = Settlement.default_key(matches);
                    matches[k__1] = substr(html, replace_inner ? data['inner_start'] : data['outer_start'], replace_space);
                }
                html = substr_replace(html, r, replace_inner ? data['inner_start'] : data['outer_start'], replace_space);
                // next time we resume search at position right at the end of this element
                start_from = data['outer_end'] + (replace_len - replace_space);
            }
        } while (data && --limit > 0);
        return html;
    };
Html.class = "Html";
return Html;
})();
