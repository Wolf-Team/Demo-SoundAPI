LIBRARY({
    name: "CheckDeps",
    version: 1,
    api: "CoreEngine",
    shared: false
});
var CheckDeps = /** @class */ (function () {
    function CheckDeps() {
        this.scope = {};
        this.deps = {};
        this.countDeps = 0;
        this.initedDeps = 0;
        this.laucnhing = false;
    }
    CheckDeps.prototype.add = function (apiName, callback) {
        if (callback === void 0) { callback = function (api) { return api; }; }
        if (this.laucnhing) {
            return this;
        }
        this.countDeps++;
        this.deps[apiName] = { callback: callback, loaded: false };
        return this;
    };
    CheckDeps.prototype.launch = function (callback) {
        var _this = this;
        if (this.laucnhing)
            return;
        this.laucnhing = true;
        var _loop_1 = function (depsName) {
            var deps = this_1.deps[depsName];
            ModAPI.addAPICallback(depsName, function (api) {
                _this.scope[depsName] = deps.callback(api);
                deps.loaded = true;
                _this.initedDeps++;
                if (_this.initedDeps == _this.countDeps)
                    callback(_this.scope);
            });
        };
        var this_1 = this;
        for (var depsName in this.deps) {
            _loop_1(depsName);
        }
    };
    return CheckDeps;
}());
EXPORT("CheckDeps", CheckDeps);
