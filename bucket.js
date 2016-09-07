// Categorizes or groups incoming documents into buckets that represent a range of
// values for a specified expression. Each output document contains an _id field,
// whose value is the inclusive lower bound of the bucket range, and by default, a
// count field that contains the number of documents that fall into the bucket.


db.exhibits.drop()
db.exhibits.insert({ _id: 1, title: "The Pillars of Society", "artist" : "Grosz", year: 1926, tags: [ "painting", "satire", "Expressionism", "caricature" ] })
db.exhibits.insert({ _id: 2, title: "Melancholy III", "artist" : "Munch", year: 1902, tags: [ "woodcut", "Expressionism" ] })
db.exhibits.insert({ _id: 3, title: "Dancer", "artist" : "Miro", year: 1925, tags: [ "oil", "Surrealism", "painting" ] })
db.exhibits.insert({ _id: 4, title: "The Great Wave off Kanagawa", artist: "Hokusai", tags: [ "woodblock", "ukiyo-e" ] })

// The following operation groups the input documents by the year field and
// categorizes the documents by the year value into 4 buckets (three
// user-specified buckets and one default bucket).

print("--- $bucket -----------------------------------------------------")
db.exhibits.aggregate( [
   { $bucket: {
         groupBy: "$year",
         boundaries: [ 1900, 1920, 1950 ],
         default: "Unknown",
         output: { years: { $push: "$year" }, count: { $sum: 1 } } } }
] ).pretty()

print("--- $bucketAuto -----------------------------------------------------")
db.exhibits.aggregate( [
   {
     $bucketAuto: {
         groupBy: "$year",
         buckets: 4
     }
   }
] )
