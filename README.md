# Meteor Project Before and After Autopublish and Insecure packages were removed

I followed this tutorial (https://scotch.io/tutorials/learn-meteor-js-from-scratch-build-a-polling-app), but wanted to take it a step further by updating the code to work again after removing meteor's autopublish and insecure packages. Each of these steps below was a separate git checkin so we can see the exact changes along the way.

Without the autopublish package, we will have to specify explicitly what the server sends to the client. The functions in Meteor that do this are Meteor.publish and Meteor.subscribe. I added a publish.js file on the server with this code:

```javascript
Meteor.publish('polls', function() {
   return Polls.find();
  // Limit data sent back to client (which is really the point of this)
  // return Polls.find({}, {limit:1});
  //return Polls.find({_id: "4hbHtWETjmRNSF7HC"});
});
```

and on the client side, I added subscript code like this:
```javascript
Meteor.subscribe("polls");
```  


Without the insecure package, none of the inputs or buttons work anymore. This is because all client-side database permissions have been revoked. Now we need to rewrite some parts of our app to use methods. I added the following in a new methods.js file on the server:

```javascript
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
```  

and I called these methods on the client in poll-form.js:

```javascript
// create the new poll
Meteor.call('newPoll', newPoll);
```  

and in poll.js:

```javascript
// increment the number of votes for this choice
Meteor.call('vote', pollID, action);
```  
