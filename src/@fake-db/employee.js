import mock from './mock'

const data = {
  employee: [
    {
      Id : 1, 
      FirstName : 'Johnson',
      LastName : 'Morree',
      Department : 'Digital and Payment',
      Supervisor : 'Olu-Johnson Oluwatosin',
      JobTitle : 'Senior Developer',
      Branch : 'Bolton',
      CreatedBy : '1',
      CreatedOn : new Date().toLocaleDateString(),
      ModifiedBy : '1',
      ModifiedOn : new Date().toLocaleDateString(),
      Status : 'Active'
    },
    {
        Id : 2, 
        FirstName : 'Richard',
        LastName : 'Ola-Johnson',
        Department : 'Database Administration',
        Supervisor : 'Olu-Johnson Oluwatosin',
        JobTitle : 'Senior Database Administrator',
        Branch : 'Bolton',
        CreatedBy : '1',
        CreatedOn : new Date().toLocaleDateString(),
        ModifiedBy : '1',
        ModifiedOn : new Date().toLocaleDateString(),
        Status : 'Active'
      },
      {
        Id : 3, 
        FirstName : 'Richard',
        LastName : 'Ola-Johnson',
        Department : 'Database Administration',
        Supervisor : 'Olu-Johnson Oluwatosin',
        JobTitle : 'Senior Database Administrator',
        Branch : 'Bolton',
        CreatedBy : '1',
        CreatedOn : new Date().toLocaleDateString(),
        ModifiedBy : '1',
        ModifiedOn : new Date().toLocaleDateString(),
        Status : 'Active'
      },


  ]
}

// ------------------------------------------------
// GET: Return Employee List
// ------------------------------------------------
mock.onGet('api/v1/employee/getall').reply(config => {
  
  const allData = data.employee.reverse();
  return [
    200,
    {
      allData: allData,
      total: allData.length,
      message : ''
    }
  ]
})

// ------------------------------------------------
// Post: Add Employee
// ------------------------------------------------
mock
  .onPost("api/v1/employee/add")
  .reply(config => {
  
      try{
        if (config.data === null) {
            return [400, config.data]
          } else {
            //convert to json
            const jsondata = JSON.parse(config.data)
            jsondata.Id = data.employee.length + 1
            data.employee.push(jsondata)
          }
          return [200, config.data]
      }
      catch(e){
        return [
          500, {
          message : 'Internals server error',
          status : false
      }
      ]
      }

  })

   // ------------------------------------------------
// UPDATE: return single empmloyee details
// ------------------------------------------------
mock.onGet('api/v1/employee/get').reply(config => {
    debugger;
  try{
       // Get employee id from URL
        const Id = config.Id

        // Convert Id to number
        const employeeId = Number(Id);

        const employeeDetails = data.employee.find(t => t.Id === employeeId)
if(employeeDetails !== undefined)
{
  return [
    200, {
    responseData : employeeDetails,
    message : '',
    status : true
}
]
}
else{
  return [
    404, {
    responseData : undefined,
    message : 'deails not found',
    status : false
}
]
}
       
  }
  catch(e){
    return [
        500, {
        message : 'Internals server error',
        status : false
    }
    ]
  }

})

   // ------------------------------------------------
// UPDATE: Update  empmloyee details
// ------------------------------------------------
mock.onPut('api/v1/employee/update').reply(config => {
    debugger;
    let list = [];
    try{
      if (config.data === null) {
          return [400, config.data]
        } else {
          //convert to json
          const jsondata = JSON.parse(config.data)
          const employeeId = Number(jsondata.Id)
           list = data.employee.map(items =>
            items.Id === employeeId
              ? { ...items, 
                  FirstName : jsondata.FirstName,
                  LastName : jsondata.LastName,
                  Department : jsondata.Department,
                  Supervisor : jsondata.Supervisor,
                  JobTitle : jsondata.JobTitle,
                  Branch : jsondata.Branch,
                  ModifiedBy : '1',
                  ModifiedOn : new Date().toLocaleDateString(),     
                }
              : items
          );
        }
        data.employee = list;
        return [200, config.data]
    }
    catch(e){
      console.log(e);
      return [
        500, {
        message : 'Internals server error',
        status : false
    }
    ]
    }


})

  // ------------------------------------------------
// DELETE: Deletes Employee
// ------------------------------------------------
mock.onDelete('api/v1/employee/delete').reply(config => {
     debugger;
      try{
           // Get employee id from URL
            const Id = config.Id

            // Convert Id to number
            const employeeId = Number(Id);

            const employeeIndex = data.employee.findIndex(t => t.Id === employeeId)
            data.employee.splice(employeeIndex, 1)

            return [
                200, {
                message : 'Employee deleleted successfully',
                status : true
            }
            ]
      }
      catch(e){
        return [
            200, {
            message : 'Error deleletion failed',
            status : false
        }
        ]
      }

})







