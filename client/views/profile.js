Template.profile.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.profileDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.profileDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});
