// Manage core logic by this variable
var Settlement = [];
Settlement.array_merge = function()
{
	var args = Array.prototype.slice.call(arguments),
		argl = args.length,
		arg,
		retObj = {},
		k = '',
		argil = 0,
		j = 0,
		i = 0,
		ct = 0,
		toStr = Object.prototype.toString,
		retArr = true;
	for (i = 0; i < argl; i++)
	{
		if (toStr.call(args[i]) !== '[object Array]')
		{
			retArr = false;
			break;
		}
	}
	if (retArr)
	{
		retArr = [];
		for (i = 0; i < argl; i++)
		{
			retArr = retArr.concat(args[i]);
		}
		return retArr;
	}
	for (i = 0, ct = 0; i < argl; i++)
	{
		arg = args[i];
		if (toStr.call(arg) === '[object Array]')
		{
			for (j = 0, argil = arg.length; j < argil; j++)
			{
				retObj[ct++] = arg[j];
			}
		}
		else
		{
			for (k in arg)
			{
				if (arg.hasOwnProperty(k))
				{
					if (parseInt(k, 10) + '' === k)
					{
						retObj[ct++] = arg[k];
					}
					else
					{
						retObj[k] = arg[k];
					}
				}
			}
		}
	}
	return retObj;
}
//---------------------------------
// kalkicode.com 
// These methods have not been changed by our tools.
// file_exists
// is_array
//----------------------------

namespace Proxy;

// based off of this:
// http://v3.golaravel.com/api/source-class-Laravel.Config.html#3-235
var Config = (function()
{
    private static config = {};
    Config.get = function(key, default = null)
    {
        return self.has(key) ? static::$config[key] : default;
    };
    Config.set = function(key, value)
    {
        self::$config[key] = value;
    };
    Config.has = function(key)
    {
        return typeof static::$config[key] !== 'undefined';
    };
    Config.load = function(path)
    {
        if (file_exists(path)) {
            // Successful includes, unless overridden by the included file, return 1.
            data = require path;
            if (is_array(data)) {
                self::$config = Settlement.array_merge(self::$config, data);
            }
        }
    };
Config.class = "Config";
return Config;
})();
