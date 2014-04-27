var PubSub = {
  /**
   * イベントハンドラ登録
   *
   * @param  {String}   event
   * @return {Function} callback
   */
  subscribe: function(event, callback) {
    var calls = this._callbacks || (this._callbacks = {});
    (this._callbacks[event] || (this._callbacks[event] = [])).push(callback);

    return this;
  },

  /**
   * イベント発行
   *
   */
  publish: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var event = args.shift();

    var list, i, l;
    if (!this._callbacks) {
      return this;
    }
    if (!(list = this._callbacks[event])) {
      return this;
    }

    for (i = 0, l = list.length; i < l; i += i + 1) {
      list[i].apply(this, args);
    }

    return this;
  }
};
