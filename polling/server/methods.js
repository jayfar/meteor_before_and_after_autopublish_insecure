Meteor.methods({
	vote: function (pollID, action) {
		Polls.update(
	     	{ _id: pollID }, 
	      	{ $inc: action }
	    );
	},
	newPoll: function (newPoll) {
	     Polls.insert(newPoll);
	}
});