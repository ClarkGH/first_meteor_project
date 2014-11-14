// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){

  Template.leaderboard.helpers({
    gamer: function(){
        return "This text will run from the template."
    }
  })

}

if(Meteor.isServer){

}