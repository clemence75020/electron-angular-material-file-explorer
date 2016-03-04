(function() {

  angular
    .module('folder')
    .controller('FolderController', [
      '$rootScope', 'fsService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
      FolderController
    ]);

  function FolderController($rootScope, fsService, $mdSidenav, $mdBottomSheet, $log) {
    var self = this;

    self.selectFolder = selectFolder;
    self.isSelected = isSelected;
    self.navigateFolder = navigateFolder;
    self.toggleList = toggleFolderList;
    self.folderBack = folderBack;
    self.actualPath = $rootScope.fsPrevPath;

    self.folder = function() {
      return fs.readdirSync(__dirname).filter(function(file) {
        var item = fs.statSync(path.join(srcpath, file));
        console.log(item);
        return item;
      });
    };

    self.directory = fsService.listDirectory($rootScope.fsPrevPath);

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleFolderList() {
      $mdSidenav('left').toggle();
    }

    function folderBack() {
      self.navigateFolder($rootScope.fsPrevPath);
    }

    function selectFolder(file) {
      console.log(file);
      self.itemSelected = file;
      //self.selected = angular.isNumber(folders) ? $scope.folders[folder] : folder;
    }

    function isSelected(file) {
      return self.itemSelected === file;
    }

    function navigateFolder(actualPath) {
      console.log("navigate");
      self.directory = fsService.listDirectory(actualPath);
      $rootScope.fsPrevPath = fsService.getPrevPath(actualPath);
      $rootScope.fsActualPath = actualPath;
      self.actualPath = actualPath;
    }

  }

})();
