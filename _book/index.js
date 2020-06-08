var array = [1, 2, 3, 3, 1, 2, 4, 5, 6, 32, '123', ''];

var delRepeat = function (array) {
  var arrayType = Object.prototype.toString.call(array).slice(8, -1);
  console.log(arrayType);
  if (arrayType === 'Array') {
    if (array.length < 2) {
      return array;
    }
    var keyList = {};
    for (var i = 0; i < array.length; i++) {
      const item = array[i];
      !keyList[item] && (keyList[item] = array[i]);
    }
    return Object.values(keyList);

  }
  else {
    console.warn('请传入数据');
    return [];
  }
};

console.log(delRepeat(array));

console.log(Array.from(new Set(array)));
console.log(Object.values({
  a: 123,
  b: 13214,
}));
console.log(Object.keys({
  a: 123,
  b: 13214,
}));
var {a, b} = {
  a: 123,
  b: 13214,
};


var quickSort = function (arr, from, to) {
  var l = from;
  var r = to;
  var key = arr[from];
  if (from >= to) {
    return;
  }
  while (l < r) {
    while (arr[r] > key && l < r) {
      r--;
    }
    while (arr[l] <= key && l < r) {
      l++;
    }
    if (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
    }
  }
  [arr[from], arr[l]] = [arr[l], arr[from]];
  quickSort(arr, from, l - 1);
  quickSort(arr, l + 1, to);
}

var quickArr = [6, 1, 2, 6, 7, 9, 3, 4, 5, 10, 6, 8];
quickSort(quickArr, 0, quickArr.length - 1);
console.log('quick', [...quickArr], quickArr.reverse());


var PromiseCustom = function (executor) {
  var _this = this;
  _this.res = undefined;
  _this.err = undefined;
  _this.promiseState = 'pending';
  _this.successList = [];
  _this.failList = [];
  _this.stepVal = undefined;
  var resolve = function (val) {
    if (val instanceof PromiseCustom) {
      return val.then(resolve, reject);
    }
    if (_this.promiseState === 'pending') {
      _this.val = res;
      _this.promiseState = 'fulfilled';
      _this.successList.forEach((successItem) => {
        successItem(val);
      });
    }
  };
  var reject = function (err) {
    if (_this.promiseState === 'pending') {
      _this.err = err;
      _this.promiseState = 'rejected';
      _this.failList.forEach((failItem) => failItem());
    }
  };
  try {
    executor(resolve, reject)
  }
  catch (err) {
    reject(err);
  }

};

PromiseCustom.prototype.then = function (onResolve, onReject) {
  var _this = this;
  var promise2,
    onResolve = typeof onResolve === 'function' ? onResolve : function (v) {
      return v
    },
    onReject = typeof onReject === 'function' ? onReject : function (r) {
      throw r
    };

  if (_this.promiseState === 'resolved') {
    return promise2 = new PromiseCustom(function (reslove, reject) {
      try {
        var returnData = onResolve(_this.res);
        PromiseDeal(promise2,returnData,onResolve,onReject)
      }
      catch (err) {
        reject(err);
      }
    });
  }
  if (_this.promiseState === 'rejected') {
    return promise2 = new PromiseCustom(function (reslove, reject) {
      try {
        var returnData = onReject(_this.res);
        PromiseDeal(promise2,returnData,onResolve,onReject)
      }
      catch (err) {
        reject(err);
      }
    });
  }
  if (_this.promiseState === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      _this.successList.push(function (value) {
        try {
          var returnData = onResolved(value);
        } catch (r) {
          reject(r)
        }
      });

      _this.failList.push(function (reason) {
        try {
          var x = onRejected(reason);
        } catch (r) {
          reject(r)
        }
      })
    })
  }
};

PromiseCustom.prototype.catch = function (onReject) {
  return this.then(null, onReject);
};

var PromiseDeal = function (propmise, returnData, resolve, reject) {
  var then;
  var thenCallerOrThrowError = false;
  if (propmise === returnData) {
    return reject(new Error('监测到循环引用'));
  }
  if (returnData instanceof PromiseCustom) {
    if (returnData.promiseState === 'pending') {
      returnData.then(function (v) {
        PromiseDeal(propmise, v, resolve, reject);
      }, reject);
    }
    else {
      returnData.then(resolve, reject);
    }
    return;
  }

  if (returnData !== null && (typeof returnData === 'object' || typeof returnData === 'function')) {
    try {
      then = returnData.then;
      if (typeof then === 'function') {
        then.call(
          returnData,
          function rs (rsv) {
            if(thenCallerOrThrowError) return;
            thenCallerOrThrowError = true;
            return PromiseDeal(propmise,rsv,resolve,reject)

          },
          function rj(err){
            if (thenCallerOrThrowError) return;
            thenCallerOrThrowError = true;
            return reject(err)
          },
        )
      }
      else{
        resolve(returnData);
      }
    }
    catch (e) {
      if (thenCallerOrThrowError) return;
      thenCallerOrThrowError = true;
      return reject(err)
    }
  }
  else{
    resolve(returnData);
  }
};


var pro = new PromiseCustom(function (resolve, reject) {
  resolve(100);
});

pro.then((res) => {
  return 123;
}).then((res)=>{
  console.log(res);
}).then((res)=>{
  console.log(res);
});
