Meteor.publish('polls', function() {
   return Polls.find();
  // Limit data sent back to client (which is really the point of this)
  // return Polls.find({}, {limit:1});
  //return Polls.find({_id: "4hbHtWETjmRNSF7HC"});
});