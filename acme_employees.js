const employees = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 },
  { id: 3, name: 'curly', managerId: 1 },
  { id: 5, name: 'groucho', managerId: 3 },
  { id: 6, name: 'harpo', managerId: 5 },
  { id: 8, name: 'shep Jr.', managerId: 4 },
  { id: 99, name: 'lucy', managerId: 1 }
]

const spacer = (text) => {
  if (!text) {
    return console.log('')
  }
  const stars = new Array(5).fill('*').join('')
  console.log(`${stars} ${text} ${stars}`)
}

spacer('findexEmployeeByName Moe')
// given a name and array of employees, return employee

const findexEmployeeByName = (name, employees) => {
  for (let i = 0; i < employees.length; i++) {
    let employee = employees[i]
    if (employee.name === name) {
      return employee
    }
  }
}

console.log(findexEmployeeByName('moe', employees)) //{ id: 1, name: 'moe' }
spacer('')

spacer('findexManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager

const findexManagerFor = (employee, employees) => {
  for (let i = 0; i < employees.length; i++) {
    let manager = employees[i]
    if (employee.managerId === manager.id) {
      return manager
    }
  }
}

console.log(findexManagerFor(findexEmployeeByName('shep Jr.', employees), employees)) //{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findexCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager

const findexCoworkersFor = (employee, employees) => {
  let coworkers = []
  for (let i = 0; i < employees.length; i++) {
    let coworker = employees[i]
    if (employee.managerId === coworker.managerId && employee.id !== coworker.id) {
      coworkers.push(coworker)
    }
  }
  return coworkers
}

console.log(
  findexCoworkersFor(findexEmployeeByName('larry', employees), employees)
) /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer('')

spacer('findexManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager

const findexManagementChainForEmployee = (employee, employees) => {
  let currentEmployee = employee
  let chain = []

  while (currentEmployee.managerId) {
    currentEmployee = findexManagerFor(currentEmployee, employees)
    chain.unshift(currentEmployee)
  }

  return chain
}

console.log(findexManagementChainForEmployee(findexEmployeeByName('moe', employees), employees)) //[  ]
spacer('')

spacer('findexManagementChain for shep Jr.')
console.log(
  findexManagementChainForEmployee(findexEmployeeByName('shep Jr.', employees), employees)
) /*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer('')

spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.

const generateManagementTree = (employees) => {
  let manager = employees.find((employee) => employee.managerId === undefined)
  let workers = employees.filter((employee) => employee.id !== manager.id)
}
console.log(JSON.stringify(generateManagementTree(employees), null, 2))
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('')

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy

const displayManagementTree = (managementTree) => {
  let level = 0
  let result = ''
}

displayManagementTree(
  generateManagementTree(employees)
) /*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
