db.employees.drop()
db.employees.insert({ "_id" : 1, "name" : "Dev" })
db.employees.insert({ "_id" : 2, "name" : "Eliot", "reportsTo" : "Dev" })
db.employees.insert({ "_id" : 3, "name" : "Ron", "reportsTo" : "Eliot" })
db.employees.insert({ "_id" : 4, "name" : "Andrew", "reportsTo" : "Eliot" })
db.employees.insert({ "_id" : 5, "name" : "Asya", "reportsTo" : "Ron" })
db.employees.insert({ "_id" : 6, "name" : "Dan", "reportsTo" : "Andrew" })


db.employees.aggregate( [
   {
      $graphLookup: {
         from: "employees",
         startWith: "$reportsTo",
         connectFromField: "reportsTo",
         connectToField: "name",
         as: "reportingHierarchy"
      }
   }
] ).pretty()
