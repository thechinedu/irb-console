(function () {
  var log = console.log,
      logs = {
        messages: '',
        messageArr: function () {
          return this.messages.replace(/\n$/, '').split(/\n/);
        },
        clear: function () {
          this.messages = '';
        }
      },
      Logger = {},
      logsDisp = document.querySelector('#output .logs'),
      output = document.querySelector('#output .return-value');

  console.log = function () {
    var args = Array.from(arguments);

    logs.messages += args;

    log.apply(this, args);
  };

  Logger.converRbToJs = function (val) {
    return Opal.compile(val);
  };

  Logger.log = function(val) {
    var jsStr = this.converRbToJs(val),
        val;

    /*
      TODO:

      Noted Bugs
      ====================================================================================
      Opal doesn't handle some errors properly, find a way to throw the appropriate error
      when they occur.

      noted errors:
      ZeroDivisionError
      Opal returns Infinity instead of throwing an error

      ArgumentError
      Opal ignores function arity and doesn't throw an error when expected arguments don't match
      arguments given

    */

    try {
      val = eval(jsStr);

       // If puts or p is called
      logsDisp.innerHTML = logs.messageArr().map(function (msg) {
        return '<span class="log">' + msg + '</span>';
      }).join('');

      if (val.$$id === 4) { // if  value is undefined
        val = 'nil'
      } else if (Array.isArray(val)) {
        val = JSON.stringify( val );
      }

      output.textContent = '=> ' + val;
      output.style.color = '#44aa11';

      logs.clear();
    } catch(ex) {
      output.textContent = '=> ' + ex.name + '. ' + ex.message;
      output.style.color = '#bb1144';
    }
  };

  window.Logger = Logger; // Expose the Logger object to other scripts
}());