db.col.drop()

db.col.insert({x: "foO"})
db.col.insert({x: "Foo"})
db.col.insert({x: "FOO"})

print("--- Case sensitive ---")
db.col.find({x:"foo"})

print("--- Case insensitive ---")
db.col.find({x:"FOO"}).collation({locale : "en", strength : 2})


print("--- Lowercase first ---")
db.col.find().sort({x:1}).collation({locale:"en" , caseFirst:"lower"})


print("--- Uppwercase first ---")
db.col.find().sort({x:1}).collation({locale:"en" , caseFirst:"upper"})
