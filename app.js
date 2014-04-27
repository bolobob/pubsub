var PubSub = {
  /**
   * イベントハンドラ登録
   *
   * @param  {String}   event
   * @param  {Function} callback
   * @return {Object}
   */
  subscribe: function(event, callback) {
    var calls = this._callbacks || (this._callbacks = {});
    (this._callbacks[event] || (this._callbacks[event] = [])).push(callback); // １つのイベントに複数のコールバック関数を登録できる

    return this;
  },

  /**
   * イベント発行
   *
   */
  publish: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var event = args.shift();

    var callbacks, i, l;
    if (!this._callbacks) { // subscribeが一度も実行されてない
      return this;
    }
    if (!(callbacks = this._callbacks[event])) { // イベントに対応するハンドラが無い
      return this;
    }

    // 登録してあるコールバック関数をすべて実行
    for (i = 0, l = callbacks.length; i < l; i += i + 1) {
      callbacks[i].apply(this, args);
    }

    return this;
  }
};
