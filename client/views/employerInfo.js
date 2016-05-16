/*
{{#if currentUser}}
              {{#if isInRole 'Talent'}}
                {{> jobInfo}}
                {{> empStatus}}

                {{#if isFormer}}
                  {{> reasons_left}}
                {{else}}
                  {{> jobFeeling}}
                {{/if}}

              {{/if}}

            {{/if}}


*/




Template.employerInfo.events({
  "submit form": function(event)
  {
    event.preventDefault();

    //values of the various input fields
    var company = $('[name=companyName]').val();
    var address = $('[name=address]').val();
    var city = $('[name=city]').val();
    var state = $('[name=state]').val();
    var zip = $('[name=zip]').val();
    var remote = event.target.remote.value;
    var current = event.target.curr_or_form.value;

    //declares variable to store the type of user
    var userType;


    /*
    Meteor.call('check_if_company_rated',company, function(error,res){
      if(res)
      {
        Bert.alert('Sorry, already rated this company');
      }
    });
    */


    //creates an object to store company information
    comp =
    {
      'companyName': company,
      'address': address,
      'city': city,
      'state': state,
      'zip': zip
    }

    //checks user's role and assigns that to userType
    //if no Role, then assigns Anon for the anonymous users
    if (Roles.userIsInRole(Meteor.userId(), 'Rep'))
    {
      userType = 'Rep';
    }
    else if (Roles.userIsInRole(Meteor.userId(), 'Talent'))
    {
      userType = 'Talent';
    }

    else
    {
      userType = 'Anon';
    }


    //could fix this section with collection hooks
    //or functions





      //inserts the company object into Company collection and sets the company id as
      // a session variable

      //inserts a new survey into Employer Survey collection and sets the new survey id as
      // a session variable.
      Meteor.call('insert_company', comp, function(error, insertedCompany)
      {
          if (error)
          {
            console.log(error);
          }
          else
          {
            Session.set('current_comp', insertedCompany);

            //check whether it is a current or former employer
            // and sets Session
            if (current == 'true')
            {
              var current_former = 1;
              Session.set('current_or_former', current_former);

              Meteor.call('insert_survey', company, remote, current_former, userType, function(error, insertedSurvey)
              {
                if (error)
                {
                  console.log(error);
                }
                else
                {
                  Session.set('Survey', insertedSurvey);

                }

              });

            }


            else if(current == 'false')
            {
              var current_former = 0;
              Session.set('current_or_former', current_former);

              Meteor.call('insert_survey', company, remote, current_former, userType, function(error, insertedSurvey)
              {
                if (error)
                {
                  console.log(error);
                }
                else
                {
                  Session.set('Survey', insertedSurvey);

                }

              });


            }


          }

      });



    //check user's role to determine path ie. if not user(anonymous) go to rating screen
    var talent_check = Roles.userIsInRole(Meteor.userId(), 'Talent');
    if (talent_check)
    {
      Router.go('occupationView');
    }
    else
      Router.go('/rateEmployer');


    if(!Meteor.userId()){
      Router.go('/rateEmployer');
    }


  }
});


//helper that returns whether its current or former employer
Template.Emp.helpers({
  isFormer: function(curr_or_form) {
    var formerCheck = Session.get('current_or_former')
    if (formerCheck == 0){
      var former = true;
    }
    else{
      var former = false;
    }
    return former;

  }
});


//form validation
Template.employerInfo.onRendered(function(){
        $('#currentCompanyForm').validate(

        {
          rules:
          {
            companyName:
            {
              required: true,
              valid: false
            },
            address:
            {
              required: true,
              valid: false
            },

            city:
            {
              required: true,
              valid: false
            },

            state:
            {
              required: true,
              valid: false
            },

            zip:
            {
              required: true,
              zipcodeUS: true,
              valid: false
              //maxlength: 5
            },

            gender:
            {
              valid: false
            },

            curr_or_form:
            {
              required: true,
              valid: false
            }


          },

          messages:
          {
            companyName:
            {
              required: "No company provided"
            },

            address:
            {
              required: "Address required"
            },

            city:
            {
              required: "City required"
            },

            state:
            {
              required: 'State required'
            },

            zip:
            {
              required: 'Please enter zip',
              zipcodeUS: 'Zip code must be of format XXXXX'
            },

            curr_or_form:
            {
              required: 'Must enter former or current'
            }

          }

          });

      });

//custom method to validate zip code
jQuery.validator.addMethod("zipcodeUS", function(value, element) {
  return this.optional(element) || /\d{5}-\d{4}$|^\d{5}$/.test(value);
}, "The specified US ZIP Code is invalid");





Template.jobInfo.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var p1= AutoForm.getFieldValue('promo_date.0','jobInfoForm');
      var p2= AutoForm.getFieldValue('promo_date.1','jobInfoForm');
      var p3= AutoForm.getFieldValue('promo_date.2','jobInfoForm');
      var p4= AutoForm.getFieldValue('promo_date.3','jobInfoForm');
      var p5= AutoForm.getFieldValue('promo_date.4','jobInfoForm');

      var title = event.target.title.value;
      var sDate= event.target.start_date.value;
      var promo = event.target.promoted.value;

      var promoDates = [p1,p2,p3,p4,p5];

      //get current survey session
      var sur = Session.get('Survey');
      var info = [title, sDate, promo, promoDates]

      //add job information to current survey
      Meteor.call('add_job_info', sur, info);

      //get values from status form
      var status = event.target.status.value;
      var hrs= event.target.hours.value;

      if (AutoForm.getFieldValue('other','statusForm'))
      {
        var other = event.target.other.value;
      }

      var sur = Session.get('Survey');
      var status_info = [status, hrs, other];


      //Add job status to survey
      Meteor.call('add_job_status', sur, status_info);
      //got to job feelings
      Router.go('jobFeelingView');


    }


});


//get values from job feeling survey and create object
// use method to add the object to current survey
Template.jobFeeling.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var per = AutoForm.getFieldValue('performance','feelingsForm');
      var values= AutoForm.getFieldValue('values','feelingsForm');
      var job_sat= AutoForm.getFieldValue('job_satisfaction','feelingsForm');
      var career= AutoForm.getFieldValue('career','feelingsForm');
      var leave= AutoForm.getFieldValue('leaving','feelingsForm');
      var coop= AutoForm.getFieldValue('cooperate','feelingsForm');
      var assist= AutoForm.getFieldValue('assist','feelingsForm');
      var actions= AutoForm.getFieldValue('actions','feelingsForm');


      feelings = {
        "job_satisfaction": job_sat,
        'performance': per,
        'career': career,
        'leaving': leave,
        'values': values,
        'cooperate': coop,
        'assist':assist,
        'actions':actions
      }


      var sur = Session.get('Survey');

      Meteor.call('add_job_feelings', sur, feelings);


      Router.go('/rateEmployer');

    }


});


Template.reasons_left.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var choice = event.target.choice.value;
      var yes = AutoForm.getFieldValue('yes_reasons','reasonsForm');
      var no = AutoForm.getFieldValue('no_reasons','reasonsForm');

      var sur = Session.get('Survey');


      if (yes)
        Meteor.call('add_reasons_left', sur, choice, yes);

      if(no)
        Meteor.call('add_reasons_left', sur, choice, no);


      // Clear form


      Router.go('/rateEmployer');


    }


});

Template.empDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }

});

Template.empDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});
