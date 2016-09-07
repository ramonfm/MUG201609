// Provides the ability to process multiple pipelines on the input documents and
// outputs a document that contains the results of these pipelines. By specifying
// facet-related stages ($bucket, $bucketAuto, and $sortByCount) in these
// pipelines, $facet allows for multi-faceted search.

db.exhibits.drop()
db.exhibits.insert({ _id: 1, title: "The Pillars of Society", "artist" : "Grosz", year: 1926, tags: [ "painting", "satire", "Expressionism", "caricature" ] })
db.exhibits.insert({ _id: 2, title: "Melancholy III", "artist" : "Munch", year: 1902, tags: [ "woodcut", "Expressionism" ] })
db.exhibits.insert({ _id: 3, title: "Dancer", "artist" : "Miro", year: 1925, tags: [ "oil", "Surrealism", "painting" ] })
db.exhibits.insert({ _id: 4, title: "The Great Wave off Kanagawa", artist: "Hokusai", tags: [ "woodblock", "ukiyo-e" ] })

print("--- $facet ---")
db.exhibits.aggregate( [
   {
      $facet: {

         "categorizedByTags": [  { $unwind: "$tags" },  { $sortByCount: "$tags" } ],
         "categorizedByYears": [
            { $match: { year: {$exists: 1 } } },
            { $bucket: { groupBy: "$year", boundaries: [ 1900, 1920, 1950 ] } }
         ],
         "categorizedByYears(Auto)": [ { $bucketAuto: { groupBy: "$year", buckets: 4 } } ]

      }
   }
]).pretty()
