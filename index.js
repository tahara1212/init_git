$(function () {
    var dialog = document.getElementById('myDialog');  
    document.getElementById('show').onclick = function() {  dialog.showModal();  };  
    document.getElementById('hide').onclick = function() {  dialog.close();      };
});