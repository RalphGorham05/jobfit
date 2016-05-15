Meteor.startup(function () {
 process.env.MAIL_URL = 'smtp://postmaster@sandboxbf71083cbdc44a4c9ebcfd82601ba1d2.mailgun.org:c28807c983f8c2566445a9f4ab57cfa2@smtp.mailgun.org:587';});

//get object type
 function get_type(thing){
     if(thing===null)return "[object Null]"; // special case
     return Object.prototype.toString.call(thing);
 }



Meteor.methods(
{
  'type'(thing){
    if(thing===null)return "[object Null]"; // special case
     return Object.prototype.toString.call(thing);
  },

  'addUserRole'(userid, role)
  {
    Roles.addUsersToRoles(userid,role);


  },



  'insert_company'(company)
  {
  	var inserted = Company.insert(company);
  	return inserted;
  },

  'insert_survey'(company, remote, curr_form, user_type)
  {
    var inserted = EmployerSurvey.insert({
      'company': company,
      'remote': remote,
      'cur_or_form': curr_form,
      'user_type': user_type
    });
    return inserted;

  },


  'update_Emp_Survey'(id, survey)
  {
    EmployerSurvey.update(
      {_id: id},
      {$set:
        {
          "work_life_balance": survey[0],
          'job_security': survey[1],
          'development_opportunities': survey[2],
          'workload': survey[3],
          'career_path': survey[4],
          'promotion_criteria': survey[5],
          'promotion_opportunities': survey[6],
          'freedom': survey[7],
          'salary': survey[8],
          'good_sup': survey[9],
          'flex': survey[13],
          'rew_perf': survey[16],
          'mission': survey[10],
          'health': survey[11],
          'rewrecog': survey[15],
          'workspace': survey[12],
          'poor_perfs': survey[14]
        }
      });
  },

  'add_Personal_Survey'(survey)
  {
    var inserted = PersonalSurvey.insert({
      "worklife_self": survey[0],
      'jobsec_self': survey[1],
      'td_self': survey[2],
      'workload_self': survey[3],
      'careerpath_self': survey[4],
      'promocrit_self': survey[5],
      'promotion_opportunities': survey[6],
      'auton_self': survey[7],
      'salary_self': survey[8],
      'goodsup_self': survey[9],
      'flex_self': survey[10],
      'rewperf_self': survey[11],
      'mission_self': survey[12],
      'health_self': survey[13],
      'rewrecog_self': survey[14],
      'workspace_self': survey[15],
      'poorperfs_self': survey[16]

      });
    return inserted;
  },

  'update_userSurvey'(objectID, survey_type)
  {

    if (survey_type == 'personal')
    {
      Meteor.users.update(
        {_id: Meteor.userId()},
        {$push:
          {
            "profile.personal_survey": objectID
          }
        });
    }
    else if (survey_type == 'employer')
    {
      Meteor.users.update(
        {_id: Meteor.userId()},
        {$push:
          {
            "profile.employer_survey": objectID
          }
        });
    }



  },

  'add_job_info'(surveyID, info)
  {
      EmployerSurvey.update(
      {_id: surveyID},
      {$set:
        {
          "job_title": info[0],
          'start_date': info[1],
          'promoted': info[2],
          'promo_date': info[3]
        }
      });


  },

  'add_job_status'(surveyID, status)
  {
      EmployerSurvey.update(
      {_id: surveyID},
      {$set:
        {
          "status": status[0],
          'other': status[2],
          'hours':status[1]
        }
      });


  },

  'add_job_feelings'(surveyID, feelings)
  {
      EmployerSurvey.update(
      {_id: surveyID},
      {$set:
        {
          "job_satisfaction": feelings.job_satisfaction,
          'performance': feelings.performance,
          'career': feelings.career,
          'leaving': feelings.leaving,
          'values': feelings.values,
          'cooperate': feelings.cooperate,
          'assist':feelings.assist,
          'actions':feelings.actions
        }
      });


  },

  'add_occupation'(surveyID, data)
  {
      EmployerSurvey.update(
      {_id: surveyID},
      {$set:
        {
          "occupation": data[1],
          'job_industry': data[0],
          'job_level': data[2]
        }
      });


  },

  'add_reasons_left'(surveyID, choice, reasons)
  {
      EmployerSurvey.update(
      {_id: surveyID},
      {$set:
        {
          "voluntary": choice,
          "reasons_left": reasons.map(r => r)
        }
      });


  },


  'sendEmail'(email)
  {
      // send the email!
      Email.send({to:email, from:'empMatch@gmail.com', subject:'Thank you for signing up for our project', text:'We will share with you some news about us in a near future. See you soon!'});
  },

  'sendVerificationLink'()
  {
    var userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  },

  'checkSurveyDate'(type)
  {
		var surv;
    var user = Meteor.user();
    var survey_array;
    var survCheck;
		//Personal Survey
		if(type == 'personal')
    {
      survey_array = user.profile.personal_survey;
      if (survey_array == null)
      {
        return true;
      }
			survCheck = survey_array.length - 1;
      if (survCheck < 0){
        return false;
      }
      surv = user.profile.personal_survey[survCheck];
      var temp = PersonalSurvey.findOne(surv).timeStamp;

			//console.log(temp);
		}
		//Employer
		else if(type == 'employer')
    {
			survey_array = user.profile.employer_survey;
      if (survey_array == null)
      {
        return true;
      }
      survCheck = survey_array.length - 1;
      if (survCheck < 0){
        return false;
      }
      surv = user.profile.employer_survey[survCheck];
      var temp = EmployerSurvey.findOne(surv).timeStamp;
		}
    else {return false;}

		if(surv == null)
			return false;

		var date = new Date(temp);
		var newdate = new Date(new Date(temp).setMonth(date.getMonth() + 6));
		if(new Date() > newdate)
    {
			return true;
      //good to edit
    }
		return false;
  },

  'get_employer_surveys'()
  {
    var surveys = [];
    var user_eSurveys = Meteor.user().profile.employer_survey;
    if (user_eSurveys == null)
      console.log('null');
    else
    {
      for (number in user_eSurveys)
      {
        var survey = user_eSurveys[number];
        if (survey == null)
        {
            survey = '';
        }

        surveys.push(survey);
      }
    }

    return surveys;

  },

  'get_personal_surveys'()
  {
    var surveys = [];
    var user_pSurveys = Meteor.user().profile.personal_survey;
    for (number in user_pSurveys)
    {
      var survey = user_pSurveys[number];
      if (survey == null)
      {
          survey = '';
      }

      surveys.push(survey);
    }

    return surveys;
  },

  'get_date_rated'()
  {
    var dates = [];
    var surveys = Meteor.call('get_employer_surveys');
    for (num in surveys)
     {
       var id = surveys[num];
       if (id != '')
        dates.push(EmployerSurvey.findOne(id).timeStamp);

     }

     return dates;

  },
 'get_companies_rated'()
  {

     var companies = [];
     var surveys = Meteor.call('get_employer_surveys');

     for (num in surveys)
     {
       var id = surveys[num];
       if (id != '')
        companies.push(EmployerSurvey.findOne(id).company);

     }

     return companies;
  },

 'check_if_company_rated'(name_check)
  {
     var rated = Meteor.call('get_companies_rated');
     if (rated.indexOf(name_check))
     {
       return true;
     }
     else{
      return false;
     }

  },
   'get_personal_detail'(id){
    var pes = PersonalSurvey.findOne(id);

    var returnType = { worklife: 0, jobsec: 0,
        td: 0, workload: 0, careerpath: 0, promocrit: 0,
        promo: 0, auton: 0, salary: 0, goodsup: 0,
        flex: 0, rewperf: 0, mission: 0, health: 0,
        rewrecog: 0, workspace: 0, poorperfs: 0};

    returnType.worklife = pes.worklife_self;
    returnType.jobsec = pes.jobsec_self;
    returnType.td = pes.td_self;
    returnType.workload = pes.workload_self;
    returnType.careerpath = pes.careerpath_self;
    returnType.promocrit = pes.promocrit_self;
    //returnType.promo = pes.promo_self;
    returnType.promo = pes.careless_self;
    returnType.auton = pes.auton_self;
    returnType.salary = pes.salary_self;
    returnType.goodsup = pes.goodsup_self;
    returnType.flex = pes.flex_self;
    returnType.rewperf = pes.rewperf_self;
    returnType.mission = pes.mission_self;
    returnType.health = pes.health_self;
    returnType.rewrecog = pes.rewrecog_self;
    returnType.workspace = pes.workspace_self;
    returnType.poorperfs = pes.poorperfs_self;
    /*for (var key in returnType) {
      // skip loop if the property is from prototype
        if (!returnType.hasOwnProperty(key)) continue;
        returnType[key] *= 20;

    }*/
    return returnType;
  },
  'gather_employers'(){
    var as = EmployerSurvey.find({}).fetch();
    var emps = [];
    var item;
    if(as == null)
      return emps;
    //console.log(as);
    as = emp_null_to_zero(as);

    var temp = { name : as[0].company, count: 1
            , jobsec: as[0].job_security, worklife: as[0].work_life_balance
            , workload: as[0].workload ,careerpath: as[0].career_path
            , td: as[0].development_opportunities, promocrit: as[0].promotion_criteria
            , promo: as[0].promotion_opportunities, auton: as[0].freedom
            , salary: as[0].salary, goodsup: as[0].good_sup, flex: as[0].flex, rewperf: as[0].rew_perf
            , mission: as[0].mission, health: as[0].health, rewrecog: as[0].rewrecog
            , workspace: as[0].workspace, poorperfs: as[0].poor_perfs};
    emps.push(temp);
    var k = 0;
    var ent;
    //console.log(temp);
    for (var key in as) {
      k++;
      if(k == 1){
        continue;
      }
      ent = false;
      // skip loop if the property is from prototype
        if (!as.hasOwnProperty(key)) continue;
        for(var i = 0; i < emps.length; i++){
          if(emps[i].name == as[key].company){

            emps[i].count++;
            var ct = emps[i].count;
            var oct = emps[i].count - 1;
            emps[i].jobsec = ((oct * emps[i].jobsec) + as[key].job_security)/ct;
            emps[i].worklife = ((oct * emps[i].worklife) + as[key].work_life_balance)/ct;
            emps[i].workload = ((oct * emps[i].workload) + as[key].workload)/ct;
            emps[i].careerpath = ((oct * emps[i].careerpath) + as[key].career_path)/ct;
            emps[i].td = (oct * emps[i].td) + as[key].development_opportunities;
            emps[i].td /= ct;
            emps[i].promocrit = (oct * emps[i].promocrit) + as[key].promotion_criteria;
            emps[i].promocrit /= ct;
          emps[i].promo = (oct * emps[i].promo) + as[key].promotion_opportunities;
          emps[i].promo /= ct;
          emps[i].auton = (oct * emps[i].auton ) + as[key].freedom;
          emps[i].auton /= ct;
          emps[i].salary = (oct * emps[i].salary) + as[key].salary;
          emps[i].salary /= ct;
          emps[i].goodsup = (oct * emps[i].goodsup) + as[key].good_sup;
          emps[i].goodsup /= ct;
          emps[i].flex = (oct * emps[i].flex) + as[key].flex;
          emps[i].flex /= ct;
          emps[i].rewperf = (emps[i].rewperf * oct) + as[key].rew_perf;
          emps[i].rewperf /= ct;
          emps[i].mission = (emps[i].mission * oct ) + as[key].mission;
          emps[i].mission /= ct;
          emps[i].health = (emps[i].health * oct) + as[key].health;
          emps[i].health /= ct;
          emps[i].rewrecog = (emps[i].rewrecog * oct) + as[key].rewrecog;
          emps[i].rewrecog /=ct;
          emps[i].workspace = (oct * emps[i].workspace) + as[key].workspace;
          emps[i].workspace /= ct;
          emps[i].poorperfs = (oct * emps[i].workspace) +  as[key].poor_perfs;
          emps[i].poorperfs /= ct;

          /*for(var j = 2; j < emps[i].length; j++){
            emps[i][j] /= emps[i].count;
          }*/
          ent = true;
          break;
          }


        }
        if(ent == false){
          var x;
          x = { name : as[key].company, count: 1
            , jobsec: as[key].job_security, worklife: as[key].work_life_balance
            , workload: as[key].workload ,careerpath: as[key].career_path
            , td: as[key].development_opportunities, promocrit: as[key].promotion_criteria
            , promo: as[key].promotion_opportunities, auton: as[key].freedom
            , salary: as[key].salary, goodsup: as[key].good_sup, flex: as[key].flex
            , rewperf: as[key].rew_perf, mission: as[key].mission
            , health: as[key].health, rewrecog: as[key].rewrecog
            , workspace: as[key].workspace, poorperfs: as[key].poor_perfs };
          emps.push(x);
        }



    }


    return emps;
  }

 /*
 'isAdmin'()
 {
    var user = this.userId;
    console.log(user);
    var foundUser = Meteor.users.find({'_id': user});
    //console.log(foundUser);
    var role = foundUser.roles;
    //console.log(role);
 }
  */


});

function emp_null_to_zero(surveys){

  for(var l in surveys){
      if(!surveys[l].hasOwnProperty('job_security'))
      {
        surveys[l].job_security = 0;

      }
      if(!surveys[l].hasOwnProperty('work_life_balance'))
        surveys[l].work_life_balance = 0;
      if(!surveys[l].hasOwnProperty('workload'))
        surveys[l].workload = 0;
      if(!surveys[l].hasOwnProperty('career_path'))
        surveys[l].career_path = 0;
      if(!surveys[l].hasOwnProperty('development_opportunities'))
        surveys[l].development_opportunities = 0;
      if(!surveys[l].hasOwnProperty('promotion_criteria'))
        surveys[l].promotion_criteria = 0;
      if(!surveys[l].hasOwnProperty('promotion_opportunities'))
        surveys[l].promotion_opportunities = 0;
      if(!surveys[l].hasOwnProperty('freedom'))
        surveys[l].freedom = 0;
      if(!surveys[l].hasOwnProperty('salary'))
        surveys[l].salary = 0;
      if(!surveys[l].hasOwnProperty('good_sup'))
        surveys[l].good_sup = 0;
      if(!surveys[l].hasOwnProperty('flex'))
        surveys[l].flex = 0;
      if(!surveys[l].hasOwnProperty('rew_perf'))
        surveys[l].rew_perf = 0;
      if(!surveys[l].hasOwnProperty('mission'))
        surveys[l].mission = 0;
      if(!surveys[l].hasOwnProperty('health'))
        surveys[l].health =0;
      if(!surveys[l].hasOwnProperty('rewrecog'))
        surveys[l].rewrecog = 0;
      if(!surveys[l].hasOwnProperty('workspace'))
        surveys[l].workspace = 0;
      if(!surveys[l].hasOwnProperty('poor_perfs'))
        surveys[l].poor_perfs = 0;
    }
    return surveys;

}
