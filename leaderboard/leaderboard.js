// Keeping the variable global for this example.
GamersList = new Meteor.Collection('gamers');

if(Meteor.isClient){
  console.log("This code only runs in the client")
}

if(Meteor.isServer){
  console.log("This code only runs on the server")
}