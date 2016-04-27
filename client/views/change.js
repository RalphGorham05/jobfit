Template.changePassword.events({
    'submit .change-password': function(event, template) {

        var currentPassword = $('[name=current_password]').val();
        var newPassword = $('[name=new_password]').val()
        var newPasswordRepeated = $('[name=confirm_new_password]').val();

        // validatepasswords better than this
        //if (newPassword !== newPasswordRepeated) {
            //template.find('#form-messages').html("The new passwords don't match!");

            //return false;
        //}

        Accounts.changePassword(currentPassword, newPassword, function(error) {
            if (error) {
                message = 'There was an issue: ' + error.reason;
                Bert.alert(message);
            } else {
                message = 'You reset your password!'
                Bert.alert(message,'success');
            }
        });

        return false;
    }
});


Template.changeDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.changeDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});
