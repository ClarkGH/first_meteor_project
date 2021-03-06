// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){

  Meteor.subscribe('theGamers');

  Template.leaderboard.helpers({
    gamer: function(){
      var currentUserId = Meteor.userId();
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
      Meteor.call('modifyGamerScore', selectedGamer, 1)
    },

    'click #decrement': function(){
      var selectedGamer = Session.get('selectedGamer');
      Meteor.call('modifyGamerScore', selectedGamer, -1)
    },

    'click .remove': function(){
      var selectedGamer = Session.get('selectedGamer');
      Meteor.call('removeGamer', selectedGamer)
    }
  });

  Template.addGamerForm.events({
    'submit form': function(event){
      event.preventDefault();
      var gamerNameVar = event.target.gamerName.value;
      var currentUserId = Meteor.userId();
      Meteor.call('insertGamerData', gamerNameVar);
    }
  });

}

if(Meteor.isServer){
  Meteor.publish('theGamers', function(){
    var currentUserId = this.userId;
    return GamersList.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    'insertGamerData': function(gamerNameVar){
      var currentUserId = Meteor.userId();
      GamersList.insert({
        name: gamerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },

    'removeGamer': function(selectedGamer){
      GamersList.remove(selectedGamer)
    },

    'modifyGamerScore': function(selectedGamer, scoreVar){
      GamersList.update({_id: selectedGamer}, {$inc: {score: scoreVar} });
    }
  });

}