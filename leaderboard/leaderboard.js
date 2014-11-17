// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){

  Template.leaderboard.helpers({
    gamer: function(){
      return GamersList.find({}, {sort: {score: -1, name: 1} });
    },

    selectedClass: function(){
      var gamerId = this._id;
      var selectedGamer = Session.get('selectedGamer')

      if(selectedGamer === gamerId){
        return "selected"
      }
    },

    'showSelectedGamer': function(){
      var selectedGamer = Session.get('selectedGamer');
      return GamersList.findOne(selectedGamer)
    }

  });

  Template.leaderboard.events({
    'click li.gamer': function(){
      var gamerId = this._id;
      Session.set('selectedGamer', gamerId);

      var selectedGamer = Session.get('selectedGamer');
      console.log(selectedGamer);
    },

    'click #increment': function(){
      var selectedGamer = Session.get('selectedGamer');
      GamersList.update({_id: selectedGamer}, {$inc: {score: 1} });
    },

    'click #decrement': function(){
      var selectedGamer = Session.get('selectedGamer');
      GamersList.update({_id: selectedGamer}, {$inc: {score: -1} });
    }
  });

  Template.addGamerForm.events({
    'submit form': function(event){
      event.preventDefault();
      console.log(event.type);
    }
  });

}

if(Meteor.isServer){

}