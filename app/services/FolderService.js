(function() {
  'use strict';

  angular.module('folder')
    .service('fsService', ['$rootScope', '$q', fsService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function fsService($rootScope, $q, Folder) {

    this.getPrevPath = function(pathDir){
      var dir = pathDir.split('/');
      dir.pop();
      dir = dir.join('/');
      if (dir == ""){
        dir = "/";
      }
      return dir;
    }

    this.listDirectory = function(pathDir) {
      var fs = require('fs'),
        path = require('path');
      // if (!fs.lstatSync(pathDir).isDirectory()) {
      //   return;
      // }
      var directory = [];
      fs.readdirSync(pathDir).filter(function(file) {
        var item = {};
        item.path = path.join(pathDir, file);
        item.name = file;
        item.isDir = fs.statSync(path.join(pathDir, file)).isDirectory();
        directory.push(item);
        return;
      });
      return directory;
    }
  }

})();
