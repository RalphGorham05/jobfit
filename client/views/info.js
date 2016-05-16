Template.infoDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.infoDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});


Template.information.events({
  'click .resend-verification-link' ( event, template ) {
    Meteor.call('sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason);
      } else {
        var email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success', 'growl-top-right');
      }
    });
  }


});

//form validation for pii
Template.pi.onRendered(function(){
    $('#personalInFoForm').validate(

      {
          rules:
          {
            zip:
            {
              required: true,
              zipcodeUS: true,
              valid: false
            },
            gender:
            {
              valid: false
            }
          },

          messages:
          {
              zip:
              {
                required: "You must enter your zip.",
                zipcodeUS: 'Your zip is invalid'
              }
          }

      });
    });


// get values from pi template and add them to currrent user's profile
Template.pi.events({
  "submit form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var zipCode = $('[name=zip]').val();
      var gender = $('[name=gender]').val();

      var currentUserId = Meteor.userId;


      var loggedInUser = Meteor.user();

      /*
      if (Roles.userIsInRole(loggedInUser, 'talent')) {
        // NOTE: This example assumes the user is not using groups.
        console.log('in role');
        return true;

      }
      else {
        console.log('nope');
      }
      */





      // Insert a task into the collection
      Meteor.users.update(
        {_id: Meteor.userId()},
        {$set: {
          "profile.info.zip": zipCode,
          "profile.info.gender": gender
      }
      });


      // Clear form

      event.target.zip.value = '';


      Router.go('educationView');


    }

});

Template.user.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});

// get values of fields in the education template and sets them in user's profile
Template.education.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var school = $('[name=school]').val();
      var degree= $('[name=degree]').val();
      var subject= $('[name=field]').val();
      var level= event.target.level.value;
      var user = Meteor.userId;


      // Add education info to profile
      Meteor.users.update(
        {_id: Meteor.userId()},
        {$set: {
          "profile.education.school": school,
          "profile.education.degree": degree,
          "profile.education.field": subject,
          "profile.education.level": level
        }
        });

      Router.go('skillsView');

    }


});


// get the 5 skill values and add them to user profile
Template.skills.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();


      // Get value from form element
      var skill1 = AutoForm.getFieldValue('skills.0','skillsForm');
      var skill2 = AutoForm.getFieldValue('skills.1','skillsForm');
      var skill3 = AutoForm.getFieldValue('skills.2','skillsForm');
      var skill4 = AutoForm.getFieldValue('skills.3','skillsForm');
      var skill5 = AutoForm.getFieldValue('skills.4','skillsForm');



      // Add skill info to profile
      Meteor.users.update(
        {_id: Meteor.userId()}, {$set:
          {"profile.skills.skills": [skill1, skill2, skill3, skill4, skill5] }
      });

      Router.go('credsView');

    }


});

// get the 5 creds/certs values and add them to user profile
Template.creds.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var cred1 = AutoForm.getFieldValue('creds.0','credsForm');
      var cred2 = AutoForm.getFieldValue('creds.1','credsForm');
      var cred3 = AutoForm.getFieldValue('creds.2','credsForm');


      var user = Meteor.userId;


      // Add skill info to profile
      Meteor.users.update(
        {_id: Meteor.userId()}, {$set:
          {"profile.credentials.creds": [ cred1, cred2, cred3] }
      });



    }


});

// get the occupation values and adds them to current survey
Template.occupationInfo.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var industry = $('[name=industry]').val();
      var occupation= $('[name=occupation]').val();
      var joblevel= $('[name=jobLevel]').val();


      var occupation_info = [industry, occupation, joblevel];

      var user = Meteor.userId;

      var sur = Session.get('Survey');
      Meteor.call('add_occupation', sur, occupation_info);


      event.target.industry.value = "";
      event.target.occupation.value = '';
      event.target.jobLevel.value = '';
      Router.go("jobInfoView");

    }


});
