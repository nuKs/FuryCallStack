describe("FuryCallStack", function() {

  it("may specify the promise framework", function() {
    expect(FuryCallStack._promiseFn).toBe(null);

    FuryCallStack.setPromiseFn(when.promise);

    expect(FuryCallStack._promiseFn).toBe(when.promise);
  });

  xdescribe("constructor", function() {

    xit("may specify the method call prototype", function() {
      function _fn() {}
      function _resolveFn() {}
      function _rejectFn() {}

      var stack = new FuryCallStack({
        object: this,
        fn: _fn,
        args: arguments,
        $then: _resolveFn,
        $catch: _rejectFn
      });

      // @todo test
    });

    xit("should define $then stack.next as default", function() {

    });

  });

  describe("#push", function() {

    it("should add the method call to the stack", function() {
      var stack = new FuryCallStack();

      function fn() {}
      function _someCallback() {}

      stack.push({
        object: this,
        fn: fn,
        args: arguments,
        $then: stack.parallel,
        $catch: stack.end,
        $3: _someCallback
      });

      // @todo test
    });

    xit("should inherit the method call prototype", function() {

    });

  });

  describe("#exec", function() {

    // it("should exec every method call in LIFO order", function() {
    //   var stack = new FuryCallStack({
    //     object: obj
    //   });
    //   var obj = {};
    //   var param1 = {
    //     data: 'hehe'
    //   };
    //   var fn1 = function() {};
    //   var fn2 = function() {};

    //   stack.push({
    //     fn: fn1,
    //     $then: stack.next
    //   });

    //   stack.push({
    //     fn: fn2,
    //     args: arguments
    //   });

    //   stack.exec(param1).then(function() {

    //   });

    // });
    describe("[async:promise]", function() {

      var obj;
      var prehook1;
      var prehook2;
      var stack;

      beforeEach(function() {
        obj = {
          fn: sinon.stub().returns('hehehe !')
        };
        prehook1 = sinon.stub().returns(when.resolve());
        prehook2 = sinon.stub().returns(when.resolve());

        stack = new FuryCallStack({
          object: obj
        });

        stack.push({
          fn: obj.fn
        });
        stack.push({
          fn: prehook1,
          $then: stack.next
        });
        stack.push({
          fn: prehook2,
          $then: stack.next
        });
      });

      afterEach(function() {
      });

      it("should execute the stack asynchronously", function(done) {
        var p = stack.exec();

        expect(obj.fn.called).toBe(false);
        expect(prehook1.called).toBe(false);
        expect(prehook2.called).toBe(true);

        p
        .then(function() {
          expect(obj.fn.called).toBe(true);
          expect(prehook1.called).toBe(true);
          expect(prehook2.called).toBe(true);
        })
        .done(done, function(err) {
          throw err;
        });
      });

      it("should execute the stack in sequential order", function(done) {
        var p = stack.exec();

        p
        .then(function() {
          expect(prehook2.calledBefore(prehook1)).toBe(true);
          expect(prehook1.calledBefore(obj.fn)).toBe(true);
        })
       .done(done, function(err) {
          throw err;
       });

      });

      xit("should return a promise resolving after the last executed call", function() {

      });

    });

    describe("[sync]", function() {

      it("should return the last executed call result", function() {
        var obj = {
          fn: function() {
            return 'hehehe !';
          }
        };
        var prehook = function() {};
        var stack = new FuryCallStack({
          object: obj
        });

        stack.push({
          fn: obj.fn
        });
        stack.push({
          fn: prehook
        });

        expect(stack.exec()).toBe('hehehe !');
      });

    });

    xit("may overide the method call properties", function() {

    });

    xit("may overide the method call arguments", function() {

    });

    xit("should return a promise resolved when everything is finished", function() {

    });

    xdescribe("[sync]", function() {
      xit("should execute the calls", function() {

      });
    });
    xdescribe("[async:callback]", function() {
      xit("should execute the calls sequencialy when callback mode is defined", function() {

      });
    });
    xdescribe("[async:promise]", function() {
      xit("should execute the calls sequencialy when promise mode is defined", function() {

      });
    });

  });

  xdescribe("#reset", function() {

    xit("should empty the stack", function() {

    });

  });

});