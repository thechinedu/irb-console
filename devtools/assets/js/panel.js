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
      Logger.log( cm.getValue() );
    }
  });
}());