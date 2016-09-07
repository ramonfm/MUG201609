// Performs a recursive search on a collection. The stage matches the
// connectFromField of one document to the connectToField of other documents in
// the collection. Then, for any matching document, the $graphLookup uses the
// connectFromField of the matching document to match to the the connectToField of
// other documents, and continues until no new documents are encountered or until
// a specified depth. To each output document, the $graphLookup adds a new array
// field that contains the traversal results of the recursive search for that
// document.


db.airports.drop()
db.airports.insert({ "_id" : 0, "airport" : "JFK", "connects" : [ "BOS", "ORD" ] })
db.airports.insert({ "_id" : 1, "airport" : "BOS", "connects" : [ "JFK", "PWM" ] })
db.airports.insert({ "_id" : 2, "airport" : "ORD", "connects" : [ "JFK" ] })
db.airports.insert({ "_id" : 3, "airport" : "PWM", "connects" : [ "BOS", "LHR" ] })
db.airports.insert({ "_id" : 4, "airport" : "LHR", "connects" : [ "PWM" ] })

db.travelers.drop()
db.travelers.insert({ "_id" : 1, "name" : "Alice",   "nearestAirport" : "JFK" })
db.travelers.insert({ "_id" : 2, "name" : "Bob",     "nearestAirport" : "JFK" })
db.travelers.insert({ "_id" : 3, "name" : "Charlie", "nearestAirport" : "BOS" })

// For each document in the travelers collection, the following operation looks up
// a the nearestAirport value in the airports collection, and recursively matches
// the connects field to the airport fields in documents in the airports
// collection. The operation specifies a maximum number of recursion to 2.

db.travelers.aggregate( [
   {
      $graphLookup: {
         from: "airports",
         startWith: "$nearestAirport",
         connectFromField: "connects",
         connectToField: "airport",
         maxDepth: 2,
         depthField: "numConnections",
         as: "destinations"
      }
   }
] ).pretty()
