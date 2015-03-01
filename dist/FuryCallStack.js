(function() {

  function FuryCallStack(opts) {
    var self = this;

    this._defaultOpts = opts;
    this._stack = [];
  }
  FuryCallStack._promiseFn = null;
  FuryCallStack.setPromiseFn = function(fn) {
    FuryCallStack._promiseFn = fn;
    FuryCall._promiseFn = FuryCall._promiseFn || fn;
  };

  FuryCallStack.prototype.next = 'next';

  FuryCallStack.prototype.push = function(opts) {
    for (var i in this._defaultOpts) {
      if (this._defaultOpts.hasOwnProperty(i) && !opts.hasOwnProperty(i)) {
        opts[i] = this._defaultOpts[i];
      }
    }

    this._stack.push(new FuryCall(opts));
  };

  FuryCallStack.prototype.exec = function(opts) {
    var result = null;

    opts = opts || {};

    for (var i=this._stack.length-1; i>=0; --i) {
      var call = this._stack[i],
          nextCall = call._$then,
          errorCall = call._$catch;

      call._$then = null;

      if (!result || typeof result.then !== 'function') {
        result = call.exec(opts);
      }
      else {
        result.then(call.exec.bind(call, opts), errorCall);
      }

    }

    return result;
  };

  FuryCallStack.prototype.reset = function() {
    this._stack = [];
  };


  if (typeof exports !== 'undefined') {
    exports.module = FuryCallStack;
  }
  else {
    window.FuryCallStack = FuryCallStack;
  }

})();
//# sourceMappingURL=FuryCallStack.js.map