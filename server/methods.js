Meteor.methods(
{

  'addUser'(email, password, type)
  {
    Accounts.createUser(
      {
      email: email,
      password: password
      },
      function(error)
      {
        if(error)
        {
          console.log(error);
          if(error.reason == '"Email already exists."'){
            validator.showErrors({
              email: 'That email is already in the system'
            });
          }

        }
        else
        {
            Router.go("/information");

            var userId = Meteor.userId();
            Roles.addUsersToRoles(userId,type);
        }

      });


  },



  'insert_company'(company)
  {
  	var inserted = Company.insert(company);
  	return inserted;
  },

  'insert_survey'(company, remote, curr_form)
  {
    var inserted = EmployerSurvey.insert({
      'company': company,
      'remote': remote,
      'cur_or_form': curr_form
    });
    return inserted;

  },


  'add_Survey'(id, survey)
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
          'good_sup': survey[9]
        }
      });
  },

  'update_userSurvey'(object)
  {
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$push:
        {
          "profile.employer_survey": object
        }
      });
  }



});
