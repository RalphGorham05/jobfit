
//get slider values from first group of questions
Template.empFirst.events({
        'submit form': function(event) {

          event.preventDefault();

          //1st group

          var wlb = AutoForm.getFieldValue('work_life_balance','ESurveyForm1');
          var sec = AutoForm.getFieldValue('job_security','ESurveyForm1');
          var dev = AutoForm.getFieldValue('development_opportunities','ESurveyForm1');
          var work = AutoForm.getFieldValue('workload','ESurveyForm1');
          var path = AutoForm.getFieldValue('career_path','ESurveyForm1');

          //creates survey object with all the field values initialized
          //lock if value changes

          var survey = {
            'work life balance':{'value': wlb, 'lock': 0, 'skipped': 0},
            'job security':{'value':sec, 'lock':0, 'skipped': 0},
            'dev':{'value':dev, 'lock':0, 'skipped': 0},
            'work': {'value':work, 'lock':0, 'skipped': 0},
            'path': {'value':path, 'lock':0, 'skipped': 0},
            'promotion_criteria':{'value':-1, 'lock':0, 'skipped': 0},
            'promotion_opportunities':{'value':-1, 'lock':0, 'skipped': 0},
            'freedom':{'value':-1, 'lock':0, 'skipped': 0},
            'salary': {'value':-1, 'lock':0, 'skipped': 0},
            'good_sup': {'value':-1, 'lock':0, 'skipped': 0},
            'mission':{'value':-1, 'lock':0, 'skipped': 0},
            'health':{'value':-1, 'lock':0, 'skipped': 0},
            'workspace':{'value':-1, 'lock':0, 'skipped': 0},
            'flex': {'value':-1, 'lock':0, 'skipped': 0},
            'poor_perfs': {'value':-1, 'lock':0, 'skipped': 0},
            'rewrecog':{'value':-1, 'lock':0, 'skipped': 0},
            'rew_perf':{'value':-1, 'lock':0, 'skipped': 0}
          };

          for (i in survey)
          {
            // log questions skipped
            if (survey[i].value != -1 && survey[i].value == undefined)
              survey[i].skipped = 1;
            // lock questions that were changed
            else if (survey[i].value != -1 && survey[i].value != undefined)
              survey[i].lock = 1;

          }

          skip = [];

          for (k in survey)
          {
            if (survey[k].skipped == 1)
              skip.push(k);
          }


          //confimation alert 
          //check whether user skipped any
          //if did, choose alert with skipped questions
        if (skip.length > 0)
        {
          new Confirmation({
            message: "Are you sure this are the correct values? You will not be able to change once submitted.  You skipped " + skip.length +  " question(s)",
            title: "Confirmation",
            cancelText: "Cancel",
            okText: "Ok",
            success: true, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
          }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if (ok)
              Router.go('rateEmployer2');
            else
            {}

          });
        }

        else
        {
          new Confirmation({
            message: "Are you sure this are the correct values? You will not be able to change once submitted.",
            title: "Confirmation",
            cancelText: "Cancel",
            okText: "Ok",
            success: true, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
          }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if (ok)
              Router.go('rateEmployer2');
            else
            {}

          });

        }

        Session.set('Emp_Survey',survey);


        }
      });

//get slider values from 2nd group of suvrey questions
//used same logic as first group
Template.empSecond.events({
  'submit form': function(event){

    event.preventDefault();

    //2nd group
    var criteria = AutoForm.getFieldValue('promotion_criteria','ESurveyForm2');
    var opp = AutoForm.getFieldValue('promotion_opportunities','ESurveyForm2');
    var freedom = AutoForm.getFieldValue('freedom','ESurveyForm2');
    var salary = AutoForm.getFieldValue('salary','ESurveyForm2');
    var manage = AutoForm.getFieldValue('good_sup','ESurveyForm2');



    var survey = Session.get('Emp_Survey');



    survey['promotion_criteria'].value = criteria;
    survey['promotion_opportunities'].value = opp;
    survey['freedom'].value = freedom;
    survey['salary'].value = salary;
    survey['good_sup'].value = manage;




    for (j in survey)
    {
      // log questions skipped
      if (survey[j].value == undefined)
          survey[j].skipped = 1;
      // lock questions that were changed
      else if (survey[j].value != -1 && survey[j].value != undefined)
        survey[j].lock = 1;

    }

    skip = [];

    for (k in survey)
    {
      if (survey[k].skipped == 1)
        skip.push(k);
    }



  if (skip.length > 0)
  {
    new Confirmation({
      message: "Are you sure this are the correct values? You will not be able to change once submitted.  You skipped " + skip.length +  " question(s)",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
      if (ok)
        Router.go('rateEmployer3');
      else
      {}

    });
  }

  else
  {
    new Confirmation({
      message: "Are you sure this are the correct values? You will not be able to change once submitted.",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
      if (ok)
        Router.go('rateEmployer3');
      else
      {}

    });

  }

  Session.set('Emp_Survey',survey);



    }
    });


//get slider values from 3rd group
Template.empThird.events({
  'submit form': function(event){

    event.preventDefault();

    //3rd group
    var miss = AutoForm.getFieldValue('mission','ESurveyForm3');
    var health = AutoForm.getFieldValue('health','ESurveyForm3');
    var space = AutoForm.getFieldValue('workspace','ESurveyForm3');
    var flex = AutoForm.getFieldValue('flex','ESurveyForm3');
    var poor = AutoForm.getFieldValue('poor_perfs','ESurveyForm3');


    var survey = Session.get('Emp_Survey');



    survey['mission'].value = miss;
    survey['health'].value = health;
    survey['workspace'].value = space;
    survey['flex'].value = flex;
    survey['poor_perfs'].value = poor;


    for (j in survey)
    {
      // log questions skipped
      if (survey[j].value == undefined)
          survey[j].skipped = 1;
      // lock questions that were changed
      else if (survey[j].value != -1 && survey[j].value != undefined)
        survey[j].lock = 1;

    }

    skip = [];

    for (k in survey)
    {
      if (survey[k].skipped == 1)
        skip.push(k);
    }


  if (skip.length > 0)
  {
    new Confirmation({
      message: "Are you sure this are the correct values? You will not be able to change once submitted.  You skipped " + skip.length +  " question(s)",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
      if (ok)
        Router.go('rateEmployer4');
      else
      {}

    });
  }

  else
  {
    new Confirmation({
      message: "Are you sure this are the correct values? You will not be able to change once submitted.",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
      if (ok)
        Router.go('rateEmployer4');
      else
      {}

    });

  }

  Session.set('Emp_Survey',survey);


    }
    });

//get values from fourth group
// add survey object with the values to current survey
Template.empFourth.events({
  'submit form': function(event){

    event.preventDefault();

    //4th group
    var recog = AutoForm.getFieldValue('rewrecog','ESurveyForm4');
    var perf = AutoForm.getFieldValue('rew_perf','ESurveyForm4');

    var user = Meteor.userId();
    var currentSurvey = Session.get('Survey');

    var survey = Session.get('Emp_Survey');



    survey['rewrecog'].value = recog;
    survey['rew_perf'].value = perf;


    for (l in survey)
    {
      // log questions skipped
      if (survey[l].value == undefined)
          survey[l].skipped = 1;
      // lock questions that were changed
      else if (survey[l].value != -1 && survey[l].value != undefined)
        survey[l].lock = 1;

    }

    skip = [];

    for (k in survey)
    {
      if (survey[k].skipped == 1)
        skip.push(k);
    }


  if (skip.length > 0)
  {
    new Confirmation({
      message: "Are you sure this are the correct values? You will not be able to change once submitted.  You skipped " + skip.length +  " question(s)",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
      if (ok)
      {
        Meteor.call('update_Emp_Survey', currentSurvey, survey_values);

        if(user)
        {
          Meteor.call('update_userSurvey', currentSurvey, 'employer');
          Bert.alert('Ratings added','success');
        }

        else
        {
          Router.go("/success");
        }
      }
      else
      {}

    });
  }

  else
  {
    new Confirmation({
      message: "Are you sure this are the correct values? You will not be able to change once submitted.",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
      if (ok)
      {
        Meteor.call('update_Emp_Survey', currentSurvey, survey_values);

        if(user)
        {
          Meteor.call('update_userSurvey', currentSurvey, 'employer');
          Bert.alert('Ratings added','success');
        }

        else
        {
          Router.go("/success");
        }
      }
      else
      {}

    });

  }

    var survey_values = new Array();
    for (key in survey)
    {
      survey_values.push(survey[key].value);
    }

    console.log(survey);
    console.log(survey_values);



    }
    });



Template.rateEmployer.events({
  'click #matchButton':function(event){
    event.preventDefault();

    Router.go('/match');
  }
});

//helpers
Template.rateEmployer.helpers({
  //check current survey
  'surveyCheck': function()
  {
    return Session.get('Survey');
  },

  //for check for potential editing
  //going back in browser and editing survey
  'survey_completed': function()
  {
    return Session.get('first_added');
  }
});

Template.rateDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }

});

Template.rateEmployer.helpers({
  allowSurvey: function(){
    return Session.get('allow_emp_survey');
  }
});
