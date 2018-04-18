myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
          console.log('user', response.data);
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.startWeight = response.data.start_weight;
            self.userObject.goalWeight = response.data.goal_weight;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.adjustWeight = function(newWeight, weightType) {
    console.log('new start weight: ', newWeight);
    newWeight = {
      newWeight,
      weightType
    }
    $http.put('/api/user/weight/adjust', newWeight).then(function(response) {
      console.log('done adjusting weight', response);
      self.getuser();
    })
    .catch(function(error) {
      console.log('error adjusting start weight');
    })
    
  }

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
}]);
