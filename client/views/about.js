//event that fires when click logout button
//uses builtin logout function
Template.aboutDashboard.events({
    'click .logout': function(event){
        event.preventDefault();//prevent defaults behaviour of refreshing page
        Meteor.logout();
    }
});

//helper function that returns user's email address
Template.aboutDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});
