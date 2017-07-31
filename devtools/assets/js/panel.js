(function () {
  var textArea = document.querySelector('[name="IRB"]'),
      editor = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        theme: 'material',
        autofocus: true,
        matchBrackets: true,
        autoCloseBrackets: true
      });

  editor.setOption("extraKeys", {
    "Cmd-Enter": function(cm) {
      var value = cm.getValue();

      Logger.log(value);

      // output.textContent = '=> ' + JSON.stringify(eval(Opal.compile(value)));
      // alert( Opal.compile(value) )
      // alert( JSON.stringify(logs.messages) );

      // alert( eval(Opal.compile(value)) )
    }
  });
}());