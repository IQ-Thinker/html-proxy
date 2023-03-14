// Manage core logic by this variable
var Settlement = [];
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
Settlement.count = function(mixed_var, mode)
{
	var key, cnt = 0;
	if (mixed_var === null || typeof mixed_var === 'undefined')
	{
		return 0;
	}
	else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object)
	{
		return 1;
	}
	if (mode === 1)
	{
		mode = 1;
	}
	if (mode != 1)
	{
		mode = 0;
	}
	for (key in mixed_var)
	{
		if (mixed_var.hasOwnProperty(key))
		{
			cnt++;
			if (mode == 1 && mixed_var[key] && 
                (mixed_var[key].constructor === Array || 
                 mixed_var[key].constructor === Object))
			{
				cnt += this.count(mixed_var[key], 1);
			}
		}
	}
	return cnt;
}
Settlement.strtolower = function(str)
{
	return (str + '').toLowerCase();
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
Settlement.sprintf = function()
{
	const regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g
	const args = arguments
	let i = 0
	const format = args[i++]
	const _pad = function(str, len, chr, leftJustify)
	{
		if (!chr)
		{
			chr = ' '
		}
		const padding = (str.length >= len) ? '' : 
        			new Array(1 + len - str.length >>> 0).join(chr)
		return leftJustify ? str + padding : padding + str
	}
	const justify = function(value, prefix, leftJustify, minWidth, padChar)
	{
		const diff = minWidth - value.length
		if (diff > 0)
		{
			// when padding with zeros
			// on the left side
			// keep sign (+ or -) in front
			if (!leftJustify && padChar === '0')
			{
				value = [
					value.slice(0, prefix.length),
					_pad('', diff, '0', true),
					value.slice(prefix.length)
				].join('')
			}
			else
			{
				value = _pad(value, minWidth, padChar, leftJustify)
			}
		}
		return value
	}
	const _formatBaseX = function(value, base, 
                                   leftJustify, minWidth, precision, padChar)
	{
		// Note: casts negative numbers to positive ones
		const number = value >>> 0
		value = _pad(number.toString(base), precision || 0, '0', false)
		return justify(value, '', leftJustify, minWidth, padChar)
	}
	// _formatString()
	const _formatString = function(value, leftJustify, 
                                    minWidth, precision, customPadChar)
	{
		if (precision !== null && precision !== undefined)
		{
			value = value.slice(0, precision)
		}
		return justify(value, '', leftJustify, minWidth, customPadChar)
	}
	// doFormat()
	const doFormat = function(substring, argIndex, 
                               modifiers, minWidth, precision, specifier)
	{
		let number, prefix, method, textTransform, value
		if (substring === '%%')
		{
			return '%'
		}
		// parse modifiers
		let padChar = ' ' // pad with spaces by default
		let leftJustify = false
		let positiveNumberPrefix = ''
		let j, l
		for (j = 0, l = modifiers.length; j < l; j++)
		{
			switch (modifiers.charAt(j))
			{
				case ' ':
				case '0':
					padChar = modifiers.charAt(j)
					break
				case '+':
					positiveNumberPrefix = '+'
					break
				case '-':
					leftJustify = true
					break
				case "'":
					if (j + 1 < l)
					{
						padChar = modifiers.charAt(j + 1)
						j++
					}
					break
			}
		}
		if (!minWidth)
		{
			minWidth = 0
		}
		else
		{
			minWidth = +minWidth
		}
		if (!isFinite(minWidth))
		{
			throw new Error('Width must be finite')
		}
		if (!precision)
		{
			precision = (specifier === 'd') ? 0 : 
            'fFeE'.indexOf(specifier) > -1 ? 6 : undefined
		}
		else
		{
			precision = +precision
		}
		if (argIndex && +argIndex === 0)
		{
			throw new Error('Argument number must be greater than zero')
		}
		if (argIndex && +argIndex >= args.length)
		{
			throw new Error('Too few arguments')
		}
		value = argIndex ? args[+argIndex] : args[i++]
		switch (specifier)
		{
			case '%':
				return '%'
			case 's':
				return _formatString(value + '', 
                                     leftJustify, minWidth, 
                                     precision, padChar)
			case 'c':
				return _formatString(String.fromCharCode(+value), 
                                     leftJustify, minWidth, precision, padChar)
			case 'b':
				return _formatBaseX(value, 2, leftJustify, 
                                    minWidth, precision, padChar)
			case 'o':
				return _formatBaseX(value, 8, leftJustify, 
                                    minWidth, precision, padChar)
			case 'x':
				return _formatBaseX(value, 16, leftJustify,
                                    minWidth, precision, padChar)
			case 'X':
				return _formatBaseX(value, 16, leftJustify, 
                                    minWidth, precision, padChar).toUpperCase()
			case 'u':
				return _formatBaseX(value, 10, leftJustify, 
                                    minWidth, precision, padChar)
			case 'i':
			case 'd':
				number = +value || 0
				// Plain Math.round doesn't just truncate
				number = Math.round(number - number % 1)
				prefix = number < 0 ? '-' : positiveNumberPrefix
				value = prefix + _pad(String(Math.abs(number)), 
                                      precision, '0', false)
				if (leftJustify && padChar === '0')
				{
					// can't right-pad 0s on integers
					padChar = ' '
				}
				return justify(value, prefix, leftJustify, minWidth, padChar)
			case 'e':
			case 'E':
			case 'f': 
			case 'F':
			case 'g':
			case 'G':
				number = +value
				prefix = number < 0 ? '-' : positiveNumberPrefix
				method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(specifier.toLowerCase())]
				textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(specifier) % 2]
				value = prefix + Math.abs(number)[method](precision)
				return justify(value, prefix, 
                               leftJustify, minWidth, padChar)[textTransform]()
			default:
				// unknown specifier, consume that char and return empty
				return ''
		}
	}
	try
	{
		return format.replace(regex, doFormat)
	}
	catch (err)
	{
		return false
	}
}
//---------------------------------
// kalkicode.com 
// These methods have not been changed by our tools.
// preg_match
// trim
// method_exists
// is_callable
// listener
// array_merge_custom
// curl_init
// curl_setopt_array
// curl_exec
// curl_errno
// curl_error
//----------------------------

namespace Proxy;

use Proxy\Event\ProxyEvent;
use Proxy\Http\Request;
use Proxy\Http\Response;
use Proxy\Config;
var Proxy = (function()
{
    // Proxy script version
    const VERSION = '5.2.0';
    private dispatcher;
    private request;
    private response;
    private output_buffering = true;
    private output_buffer = '';
    private status_found = false;
    Proxy.prototype.__construct = function()
    {
        // do nothing for now
    };
    Proxy.prototype.setOutputBuffering = function(output_buffering)
    {
        this.output_buffering = output_buffering;
    };
    Proxy.prototype.header_callback = function(ch, headers)
    {
        parts = Settlement.explode(":", headers, 2);
        // extract status code
        // if using proxy - we ignore this header: HTTP/1.1 200 Connection established
        if (preg_match('/HTTP\\/[\\d.]+\\s*(\\d+)/', headers, matches) && Settlement.stripos(headers, '200 Connection established') === false) {
            this.response.setStatusCode(matches[1]);
            this.status_found = true;
        } else {
            if (Settlement.count(parts) == 2) {
                name = Settlement.strtolower(parts[0]);
                value = trim(parts[1]);
                // this must be a header: value line
                this.response.headers.set(name, value, false);
            } else {
                if (this.status_found) {
                    // this is hacky but until anyone comes up with a better way...
                    event = new ProxyEvent({'request':this.request,'response':this.response,'proxy':this});
                    // this is the end of headers - last line is always empty - notify the dispatcher about this
                    this.dispatch('request.sent', event);
                }
            }
        }
        return headers.length;
    };
    Proxy.prototype.write_callback = function(ch, str)
    {
        len = str.length;
        this.dispatch('curl.callback.write', new ProxyEvent({'request':this.request,'data':str}));
        // Do we buffer this piece of data for later output or not?
        if (this.output_buffering) {
            this.output_buffer .= str;
        }
        return len;
    };
    // TODO: move this all into its own Dispatcher class?
    // https://github.com/guzzle/guzzle/blob/5.3/src/Event/Emitter.php
    // https://github.com/laravel/framework/blob/5.0/src/Illuminate/Events/Dispatcher.php#L72
    private listeners = {};
    // Proxy instance itself acts as a dispatcher!
    Proxy.prototype.getEventDispatcher = function()
    {
        return this;
    };
    Proxy.prototype.addListener = function(event, callback, priority = 0)
    {
        k__1 = Settlement.default_key(this.listeners[event][priority]);
        this.listeners[event][priority][k__1] = callback;
    };
    Proxy.prototype.addSubscriber = function(subscriber)
    {
        if (method_exists(subscriber, 'subscribe')) {
            subscriber.subscribe(this);
        }
    };
    Proxy.prototype.dispatch = function(event_name, event)
    {
        if (typeof this.listeners[event_name] !== 'undefined') {
            temp = (array) this.listeners[event_name];
            for(var priority in temp) {
            listeners = temp[priority];
                foreach ((array) listeners as listener) {
                    if (is_callable(listener)) {
                        listener(event);
                    }
                }
            }
        }
    };
    Proxy.prototype.forward = function(Request request, url)
    {
        // change request URL
        request.setUrl(url);
        // prepare request and response objects
        this.request = request;
        this.response = new Response();
        options = {CURLOPT_CONNECTTIMEOUT:10,CURLOPT_TIMEOUT:0,CURLOPT_RETURNTRANSFER:false,CURLOPT_HEADER:false,CURLOPT_SSL_VERIFYPEER:false,CURLOPT_SSL_VERIFYHOST:false,CURLOPT_FOLLOWLOCATION:false,CURLOPT_AUTOREFERER:false};
        // this is probably a good place to add custom curl options that way other critical options below would overwrite that
        config_options = Config.get('curl', {});
        options = array_merge_custom(options, config_options);
        options[CURLOPT_HEADERFUNCTION] = {0:this,1:'header_callback'};
        options[CURLOPT_WRITEFUNCTION] = {0:this,1:'write_callback'};
        // Notify any listeners that the request is ready to be sent, and this is your last chance to make any modifications.
        this.dispatch('request.before_send', new ProxyEvent({'request':this.request,'response':this.response}));
        // We may not even need to send this request if response is already available somewhere (CachePlugin)
        if (this.request.params.has('request.complete')) {
            // do nothing?
        } else {
            // any plugin might have changed our URL by this point
            options[CURLOPT_URL] = this.request.getUri();
            // fill in the rest of cURL options
            options[CURLOPT_HTTPHEADER] = Settlement.explode("\r\n", this.request.getRawHeaders());
            options[CURLOPT_CUSTOMREQUEST] = this.request.getMethod();
            options[CURLOPT_POSTFIELDS] = this.request.getRawBody();
            ch = curl_init();
            curl_setopt_array(ch, options);
            // fetch the status - if exception if throw any at callbacks, then the error will be supressed
            result = @curl_exec(ch);
            // there must have been an error if at this point
            if (!result) {
                error = Settlement.sprintf('(%d) %s', curl_errno(ch), curl_error(ch));
                throw new \Exception(error);
            }
            // we have output waiting in the buffer?
            this.response.setContent(this.output_buffer);
            // saves memory I would assume?
            this.output_buffer = null;
        }
        this.dispatch('request.complete', new ProxyEvent({'request':this.request,'response':this.response}));
        return this.response;
    };
Proxy.class = "Proxy";
return Proxy;
})();
