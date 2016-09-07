db.survey.drop()

db.survey.insert({ _id: 1, empNumber: "abc123", feedback: { management: 3, environment: 3 }, department: "A" })
db.survey.insert({ _id: 2, empNumber: "xyz987", feedback: { management: 2, environment: 3 }, department: "B" })
db.survey.insert({ _id: 3, empNumber: "ijk555", feedback: { management: 3, environment: 4 }, department: "A" })

// The following operation creates a managementRatings view with the _id,
// feedback.management, and department fields:

print("--- createView ---")
db.createView(
   "managementFeedback",
   "survey",
   [ { $project: { "management": "$feedback.management", department: 1 } } ]
)

// Now we can query the view as if it was a collection
print("--- find() on view ---")
db.managementFeedback.find()

// The following operation performs an aggregation on the managementFeedback
// view to group by the department:

print("--- aggregate() on view ---")
db.managementFeedback.aggregate([ { $group: { _id: "$department", count: { $sum: 1 } } } ] ).pretty()

