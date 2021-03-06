// schemas for field objects
wlbSchema = new SimpleSchema({
  work_life_balance:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

securitySchema = new SimpleSchema({
  security:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

developmentSchema = new SimpleSchema({
  development:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

workloadSchema = new SimpleSchema({
  workload:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

pathSchema = new SimpleSchema({
  career_path:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

criteriaSchema = new SimpleSchema({
  promotion_criteria:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

opportunitiesSchema = new SimpleSchema({
  promotion_opportunities:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

freedomSchema = new SimpleSchema({
  freedom:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

salarySchema = new SimpleSchema({
  salary:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});

managementSchema = new SimpleSchema({
  management:
  {
    type: Number,
    max: 100,
    min: 0,
  },
  count:
  {
    type: Number
  }

});



//schema to define companies
Company = new Meteor.Collection( 'company' );

CompanySchema = new SimpleSchema({
  companyName:
  {
   type: String,
   autoform:
   {
    label: false
    }
  },

  remote:
  {
    type: String,
    label: 'Do you work remotely?',
    optional: true,
    autoform:
    {
      type: "select-radio",
      options: function () 
      {
        return [
          {label: "Yes", value: 'yes'},
          {label: "No", value: 'no'},
          {label: "Sometimes", value: 'sometime'}
        ];
      }
    }
  },
 address:
 {
   type: String,
   autoform:
   {
    label: false
    }
 },
 city:
 {
   type: String,
   autoform:
   {
    label: false
    }
 },
 state:
 {
   type: String,
   allowedValues:
   [
   'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO',
   'MT','NE','NV','NH','NJ','NM','NY','NC', 'ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WY','DC',
   'AS','GU','MP','PR','UM','VI'
   ],
   autoform:
   {
    label: false,
    options:
    [
    {
      label: 'AL',
      value: 'AL'
    },
    {
      label: 'AK',
      value: 'AK'
    },
    {
      label: 'AZ',
      value: 'AZ'
    },
    {
      label: 'AR',
      value: 'AR'
    },
    {
      label: 'CA',
      value: 'CA'
    },
    {
      label: 'CO',
      value: 'CO'
    },
    {
      label: 'CT',
      value: 'CT'
    },
    {
      label: 'DE',
      value: 'DE'
    },
    {
      label: 'FL',
      value: 'FL'
    },
    {
      label: 'GA',
      value: 'GA'
    },
    {
      label: 'HI',
      value: 'HI'
    },
    {
      label: 'ID',
      value: 'ID'
    },
    {
      label: 'IL',
      value: 'IL'
    },
    {
      label: 'IN',
      value: 'IN'
    },
    {
      label: 'IA',
      value: 'IA'
    },
    {
      label: 'KS',
      value: 'KS'
    },
    {
      label: 'KY',
      value: 'KY'
    },
    {
      label: 'LA',
      value: 'LA'
    },
    {
      label: 'MD',
      value: 'MD'
    },
    {
      label: 'ME',
      value: 'ME'
    },
    {
      label: 'MA',
      value: 'MA'
    },
    {
      label: 'MI',
      value: 'MI'
    },
    {
      label: 'MN',
      value: 'MN'
    },
    {
      label: 'MS',
      value: 'MS'
    },
    {
      label: 'MO',
      value: 'MO'
    },
    {
      label: 'MT',
      value: 'MT'
    },
    {
      label: 'NC',
      value: 'NC'
    },
    {
      label: 'ND',
      value: 'ND'
    },
    {
      label: 'NE',
      value: 'NE'
    },
    {
      label: 'NV',
      value: 'NV'
    },
    {
      label: 'NH',
      value: 'NH'
    },
    {
      label: 'NJ',
      value: 'NJ'
    },
    {
      label: 'NY',
      value: 'NY'
    },
    {
      label: 'OH',
      value: 'OH'
    },
    {
      label: 'OK',
      value: 'OK'
    },
    {
      label: 'OR',
      value: 'OR'
    },
    {
      label: 'PA',
      value: 'PA'
    },
    {
      label: 'RI',
      value: 'RI'
    },
    {
      label: 'SC',
      value: 'SC'
    },
    {
      label: 'SD',
      value: 'SD'
    },
    {
      label: 'TN',
      value: 'TN'
    },
    {
      label: 'TX',
      value: 'TX'
    },
    {
      label: 'UT',
      value: 'UT'
    },
    {
      label: 'VT',
      value: 'VT'
    },
    {
      label: 'VA',
      value: 'VA'
    },
    {
      label: 'WA',
      value: 'WA'
    },
    {
      label: 'WV',
      value: 'WV'
    },
    {
      label: 'WY',
      value: 'WY'
    },
    {
      label: 'DC',
      value: 'DC'
    },
    {
      label: 'AS',
      value: 'AS'
    },
    {
      label: 'GU',
      value: 'GU'
    },
    {
      label: 'MP',
      value: 'MP'
    },
    {
      label: 'PR',
      value: 'PR'
    },
    {
      label: 'UM',
      value: 'UM'
    },
    {
      label: 'VI',
      value: 'VI'
    }



    ]
  }
 },
 zip:
 {
   type: Number,
   autoform:
   {
    label: false
    }
 },
 curr_or_form:
  {
    type: Boolean,
    label: 'Current or Former Employer',
    optional: true,
    autoform:
    {
      type: 'boolean-radios',
      trueLabel: 'Current',
      falseLabel: 'Former',
      value: true
    }
  },
 timeStamp:
 {
   type: Date,
   autoValue: function() {
     if ( this.isInsert ) {
       return new Date;
     }
   }
 },
 updated:
 {
   type: Date,
   optional:true,
   autoValue: function() {
     if ( this.isUpdate ) {
       return new Date;
     }
   }
 },
 work_life_balance:
 {
    type: wlbSchema,
    optional: true
 },
 job_security:
 {
    type: securitySchema,
    optional: true
 },
 development_opportunities:
 {
    type: developmentSchema,
    optional: true
 },
 workload:
 {
    type: workloadSchema,
    optional: true
 },
 career_path:
 {
    type: pathSchema,
    optional: true
 },
 promotion_criteria:
 {
    type: criteriaSchema,
    optional: true
 },
 promotion_opportunities:
 {
    type: opportunitiesSchema,
    optional: true
 },
 freedom:
 {
    type: freedomSchema,
    optional: true
 },
 salary:
 {
    type: salarySchema,
    optional: true
 },
 management:
 {
    type: managementSchema,
    optional: true
 }


});

Company.attachSchema(CompanySchema);


/*
Company.allow(
{
  insert()
  {
    if ( Meteor.user() )
    {
      return true;
    }
    else
    {
      return false;
      console.log('not logged in');
    }
  },
  update()
  {
    // When we will ALLOW updates on the client.
  },
  remove()
  {
    // When we will ALLOW removes on the client.
  }
});


Company.deny(
{
  insert()
  {
    if ( Meteor.user() )
    {
      return false;
    }
    else
    {
      return true;
    }
  },
  update()
  {
    // When we will ALLOW updates on the client.
  },
  remove()
  {
    // When we will ALLOW removes on the client.
  }
});
*/
