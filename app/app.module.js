var app = angular.module('pub-map', ["ui.router", "ngMap", "ngResource"]);

app.config(function($httpProvider) {
  $httpProvider.defaults.cache = true;
});
app.config(function($logProvider){
    $logProvider.debugEnabled(true);
});
