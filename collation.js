db.col.drop()

// Create a collection with a default collation (French)
db.createCollection("col", {collation : { locale:"fr"}})
db.col.insert({ _id: 1, category: "café" })
db.col.insert({ _id: 2, category: "cafe" })
db.col.insert({ _id: 3, category: "cafE" })

print("--- French sorting ---")
db.col.find().sort( { category: 1 } )

print("--- Binary sorting ---")
db.col.find().sort({category:1}).collation({locale : "simple"})
