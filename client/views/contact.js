//logout function using builtin function
Template.contactDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

//helper that returns email address of user
Template.contactDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});
