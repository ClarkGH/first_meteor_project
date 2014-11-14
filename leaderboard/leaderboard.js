// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){

  Template.leaderboard.helpers({
    gamer: function(){
      return GamersList.find();
    }
  })

}

if(Meteor.isServer){

}