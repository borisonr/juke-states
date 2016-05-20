'use strict';

/* ARTISTS (PLURAL) CONTROLLER */

juke.controller('ArtistsCtrl', function ($scope, $log, ArtistFactory, artists) {

  // $scope.$on('viewSwap', function (event, data) {
  //   if (data.name !== 'allArtists') return $scope.showMe = false;
  //   $scope.showMe = true;
  // });

  // $scope.viewOneArtist = function (artist) {
  //   $rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: artist.id });
  // };

  // ArtistFactory.fetchAll()
  // .then(function (artists) {
    $scope.artists = artists;
  // })
  // .catch($log.error);

});

juke.config(function ($stateProvider) {
  $stateProvider.state('artistList', {
    url: '/artists',
    templateUrl: '/artistsTemplate.html',
    resolve: {  
      artists: function(ArtistFactory){
        return ArtistFactory.fetchAll();
        }
      },
    controller: 'ArtistsCtrl'
  });
});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($scope, $log, ArtistFactory, PlayerFactory, artist) {

  // $scope.$on('viewSwap', function (event, data) {

    // if (data.name !== 'oneArtist') return $scope.showMe = false;
    // $scope.showMe = true;

    // ArtistFactory.fetchById($stateParams.artistId)
    // .then(function (artist) {
      $scope.artist = artist;
    // })
    // .catch($log.error);

  // });

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.artist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  // $scope.viewOneAlbum = function (album) {
  //   $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: album.id });
  // };

});

juke.config(function ($stateProvider) {
  $stateProvider.state('oneArtist', {
    url: '/artists/:artistId',
    templateUrl: '/artistTemplate.html',
    resolve: {  
      artist: function(ArtistFactory, $stateParams){
        return ArtistFactory.fetchById($stateParams.artistId);
        }
      },
    controller: 'ArtistCtrl'
  });
});

juke.config(function ($stateProvider) {
  $stateProvider.state('oneArtist.Albums', {
    url: '/albums',
    template: '<div class="row">'+
              '<div class="col-xs-4" ng-repeat="album in artist.albums">'+
                '<a class="thumbnail" ui-sref="oneAlbum({albumId: album.id})">'+
                  '<img ng-src="{{ album.imageUrl }}">'+
                  '<div class="caption">'+
                    '<h5>'+
                      '<span>{{ album.name }}</span>'+
                    '</h5>'+
                    '<small>{{ album.songs.length }} songs</small>'+
                  '</div>'+
                '</a>'+
              '</div>'+
            '</div>',
    controller: 'ArtistCtrl'
  });
});

juke.config(function ($stateProvider) {
  $stateProvider.state('oneArtist.Songs', {
    url: '/songs',
    templateUrl: '/artistSongsTemplate.html',
    controller: 'ArtistCtrl'
  });
});
