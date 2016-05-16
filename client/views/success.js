//helper to check if user started a survey 
Template.success.helpers({
  'existingSurvey': function()
  {
    return Session.get('Survey');
  }
});
