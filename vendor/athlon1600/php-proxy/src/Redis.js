//---------------------------------
// kalkicode.com 
// These methods have not been changed by our tools.
// call_user_func_array
//----------------------------

namespace Proxy;

var Redis = (function()
{
    protected static client;
    Redis.prototype.__construct = function()
    {
        // do nothing
    };
    Redis.__callStatic = function(method_name, arguments)
    {
        params = {'scheme':'tcp','host':'127.0.0.1','port':6379};
        if (!static::$client) {
            static::$client = new \Predis\Client(params);
        }
        return call_user_func_array({0:static::$client,1:method_name}, arguments);
    };
Redis.class = "Redis";
return Redis;
})();
