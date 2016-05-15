// Change Bert's time on screen to be two seconds instead of the
// default three and a half.
Bert.defaults.hideDelay = 2000;

// Change Bert's default type to be a warning instead of default.
Bert.defaults.type = 'danger';

// Change Bert's default style to be a growl-top-right
// instead of fixed-top.
Bert.defaults.style = 'growl-top-right';




Template.talentRegistration.events({
        'submit form': function(event) {

          event.preventDefault();

        }
      });


Template.talentRegistration.onRendered(function(){
              var validator = $('.registration').validate({
                  submitHandler: function(event)
                  {
                    var email = $('[name=regEmail]').val();
                    var password = $('[name=regPassword]').val();
                    var usertype = $('input[name=userType]:checked').val();



                    Accounts.createUser({
                        email: email,
                        password: password
                      }, function(error)
                      {
                        if(error)
                        {
                          Bert.alert(error.reason);

                        }
                        else
                        {
                          Bert.alert('Welcome ' + email,'success');
                          /*
                          Meteor.call( 'sendVerificationLink', ( err, response ) =>
                          {
                            if (err)
                            {
                              Bert.alert(err.reason);
                            }
                            else
                            {
                              Bert.alert('Welcome ' + email,'success');
                            }
                          });
                          */

                            var userId = Meteor.userId();
                            Meteor.call('addUserRole', userId, usertype)


                            Router.go("/profile");

                        }

                      });




                  }

              });
            });



// validation rules and messages
$.validator.setDefaults({
    rules: {
            regEmail:
            {
              required: true,
              email: true,
              valid: false
            },

            regPassword:
            {
              required: true,
              minlength: 8,
              valid: true
            },

            matchedpassword:
            {
              required: true,
              equalTo: '#reg_password',
              valid: true
            },

            loginPassword:
            {
              required: true,
              valid: true
            },

            loginEmail:
            {
              required: true,
              email: true,
              valid: false
            }


              },

            messages:
            {
              regEmail:
              {
                required: "You must enter an email address.",
                email: "You've entered invalid email address."
              },

              regPassword:
              {
                required: "You must enter a password.",
                minlength: "Your password must be at least {0} characters.",
                valid: 'Password is not strong enough. Password must contain at least 1 number and 1 letter'
              },

              matchedpassword:
              {
                required: "You must enter matching password",
                equalTo: "Passwords do not match"

              },

              loginEmail:
              {
                required: "You need to enter your email address"
              },

              loginPassword:
              {
                required: "You need to enter your password.",
                valid: 'Incorrect password'
              }

            },

            tooltip_options:
            {
              loginEmail:
              {
                trigger: "click",
                placement: 'bottom',
                html: true
              },
              loginPassword:
              {
                trigger: "hover",
                placement: 'left'
              },

            }
});



//function to check password for criteria of at least 1 number and 1 alphabet
jQuery.validator.addMethod('valid', function(value, element)
    {
        return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
    }, "The password is invalid" );



Template.login.events({
        'submit form': function(event) {

          event.preventDefault();
          console.log('test');


        },

        'click #forgot_pass_button': function(event)
        {
          event.preventDefault();
          Router.go('/forgot');
        }


      });

Template.login.onRendered(function(){
    var validator = $('#login').validate(
      {


          submitHandler: function(event)
          {

            var loginEmail = $('[name=loginEmail]').val();
            var loginPassword = $('[name=loginPassword]').val();


            Meteor.loginWithPassword(loginEmail, loginPassword, function(err){
              if(err)
              {
                //alert(err.reason);
                if(err.reason == "User not found")
                {
                  Bert.alert('User not found');
                  //validator.showErrors({
                    //loginEmail: 'No existing user'
                    //});
                }

                if(err.reason == "Incorrect password"){
                  Bert.alert('Incorrect password');
                  //validator.showErrors({
                    //loginPassword: err.reason
                    //});
                }

              }
              else
              {
                Router.go("/profile");

              }

          });
          }


      });
    });



Template.home.onRendered(function()
{
   $('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template
});




Template.mainDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();

    }
});

Template.mainDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});



Template.email.events({
    'click #btn': function () {
      // if someone click on the button ( tag), then we ask the server to execute the function sendEmail (RPC call)
      Meteor.call('sendEmail', $('#email').val());
      Session.set('done', true);
    }
  });
  Template.email.done = function () { return Session.equals('done', true); }


//get companies user rated and set session variable
Meteor.call('get_companies_rated', function(error,result){
  Session.set('rated_companies', result);
});

Meteor.call('get_date_rated', function(error,dates){
  Session.set('rating_dates', dates);
});

/*
// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove({
  service: "google"
});

Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "1046984722241-buu74qqfs42dvrimo004vlllropr6hlu.apps.googleusercontent.com",
  secret: "z_xtCwnsiRIErRR3YGDGM0i1"
});



Template.google.events({
  "click button": function (event, template) {

      console.log('clicked google login')






    }


});
*/
