// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){

  Template.leaderboard.helpers({
    gamer: function(){
      return GamersList.find();
    },

    selectedClass: function(){
      var gamerId = this._id;
      var selectedGamer = Session.get('selectedGamer')

      if(selectedGamer === gamerId){
        return "selected"
      }
    }

  });

  Template.leaderboard.events({
    'click li.gamer': function(){
      var gamerId = this._id;
      Session.set('selectedGamer', gamerId);
      var selectedGamer = Session.get('selectedGamer');
      console.log(selectedGamer);
    }
  });

}

if(Meteor.isServer){

}