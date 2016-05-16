//get slider values from 1st page
Template.pSurvey1.events({
	"submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();

      var worklife = AutoForm.getFieldValue('worklife_self','talentsurvey1');
      var jobsec = AutoForm.getFieldValue('jobsec_self','talentsurvey1');
      var td = AutoForm.getFieldValue('td_self','talentsurvey1');
      var workload = AutoForm.getFieldValue('workload_self','talentsurvey1');
      var cpath = AutoForm.getFieldValue('careerpath_self','talentsurvey1');

      //create survey object 
      var survey = {
            'work life balance':{'value': worklife, 'lock': 0, 'skipped': 0},
            'job security':{'value':jobsec, 'lock':0, 'skipped': 0},
            'dev':{'value':td, 'lock':0, 'skipped': 0},
            'work': {'value':workload, 'lock':0, 'skipped': 0},
            'path': {'value':cpath, 'lock':0, 'skipped': 0},
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
              Router.go('tSurvey2View');
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
              Router.go('tSurvey2View');
            else
            {}

          });

        }

        //create session with survey object 
        Session.set('Per_Survey',survey);



        }


});






//get values from 2nd page
Template.pSurvey2.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();



			var crit = AutoForm.getFieldValue('promocrit_self','talentsurvey2');
      var opp = AutoForm.getFieldValue('promo_self','talentsurvey2');
      var free = AutoForm.getFieldValue('auton_self','talentsurvey2');
      var sal = AutoForm.getFieldValue('salary_self','talentsurvey2');
      var sup = AutoForm.getFieldValue('goodsup_self','talentsurvey2');
      

      //grab current survey in order to update
      var survey = Session.get('Per_Survey');


      //update survey object with values from 2nd page
      survey['promotion_criteria'].value = crit;
      survey['promotion_opportunities'].value = opp;
      survey['freedom'].value = free;
      survey['salary'].value = sal;
      survey['good_sup'].value = sup;




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
          Router.go('tSurvey3View');
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
          Router.go('tSurvey3View');
        else
        {}

      });

    }

    Session.set('Per_Survey',survey);



    }
    });


//get values from 3rd page
//same logic as previous
Template.pSurvey3.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();



      var flex = AutoForm.getFieldValue('flex_self','talentsurvey3');
      var perf = AutoForm.getFieldValue('rewperf_self','talentsurvey3');
      var miss = AutoForm.getFieldValue('mission_self','talentsurvey3');
      var health = AutoForm.getFieldValue('health_self','talentsurvey3');
      var recog = AutoForm.getFieldValue('rewrecog_self','talentsurvey3');


      var survey = Session.get('Per_Survey');


      survey['flex'].value = flex;
      survey['rew_perf'].value = perf;
      survey['mission'].value = miss;
      survey['health'].value = health;
      survey['rewrecog'].value = recog;
      
      


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
          Router.go('tSurvey4View');
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
          Router.go('tSurvey4View');
        else
        {}

      });

    }

    Session.set('Per_Survey',survey);



    }
    });
      





//get values from 4th page
Template.pSurvey4.events({
  "submit form": function (event, template) {
      // Prevent default browser form submit
      event.preventDefault();



      var space = AutoForm.getFieldValue('workspace_self','talentsurvey4');
      var poor = AutoForm.getFieldValue('poorperfs_self','talentsurvey4');



      var survey = Session.get('Per_Survey');


      survey['workspace'].value = space;
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
          console.log('done');
          //Router.go('tSurvey4View');

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
          console.log('done');
          //Router.go('tSurvey4View');
        else
        {}

      });

    }
	

      var user = Meteor.userId;


      var survey_values = new Array();
      for (key in survey)
      {
        survey_values.push(survey[key].value);
      }


      //method which checks if survey is allowed (needs to be over 6 months) 
      //if allowed, create personal survey with the values from survey object    
			Meteor.call('checkSurveyDate', 'personal', function(err, editable){
				if (err)
				{
					console.log(err);
				}
				else
				{
					if (editable)
					{
						//allow
						Meteor.call('add_Personal_Survey', survey_values, function(error, insertedSurvey)
			      {
			        if (error)
			        {
			          console.log(error);
			        }
			        else
			        {
								Meteor.call('update_userSurvey', insertedSurvey,'personal');

			        }
			      });

					}
					else
          {
            Session.set('allow_survey', false);
						//Bert.alert('too soon');
					}
				}
			});



  }


});

Template.tSurveyDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});

Template.tSurveyDashboard.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.tSurvey.helpers({
  allowSurvey: function(){
    return Session.get('allow_survey');
  }
});
