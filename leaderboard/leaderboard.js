// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){

  Template.leaderboard.helpers({
    gamer: function(){
      return GamersList.find();
    }
  })

  Template.leaderboard.events({
    'click': function(){
      console.log("I work!");
    }
  });

}

if(Meteor.isServer){

}