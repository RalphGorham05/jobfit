//need to make an isAdmin function

function isAdmin()
{
	Meteor.call('isAdmin');
	 //console.log(role);
	 /*
	 if (role = "admin")
	 {
	 	var f = 'true';
	 	return true;
	 }

	 return false;
	 var f = 'false';
	 console.log(f);
	 */

}


//isAdmin();
//onsole.log(Meteor.userId());





//server side publications
Meteor.publish('users', function()
{
    var currentUserId = this.userId;
    if(isAdmin(currentUserId)){
        return Meteor.users.find();
    }else{
      return Meteor.users.find({'_id': currentUserId});
    }
});


Meteor.publish('personal_surveys', function()
{
    var currentUserId = this.userId;
		//var user = Meteor.users.findOne(currentUserId);
		//var p = user.profile.personal_survey[0];

		return PersonalSurvey.find();



    //if(currentUserId){
      //return PersonalSurvey.find();
  	//}

});

Meteor.publish('employer_surveys', function()
{
    var currentUserId = this.userId;


		return EmployerSurvey.find();

    //if(currentUserId){
      //return EmployerSurvey.find();
  	//}

});



Meteor.publish('company', function()
{
    //var currentUserId = this.userId;
    //if(currentUserId){
      return Company.find();
    //}

});
