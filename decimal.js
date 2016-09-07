db.fruits.drop()
db.fruits.insert( {_id: 1, item: "Apples",  price: NumberDecimal("1.29"), quantity: 4 } )
db.fruits.insert( {_id: 2, item: "Oranges", price: NumberDecimal("9.99"), quantity: 3 } )
db.fruits.insert( {_id: 3, item: "Plums",   price: 6.95, quantity: 7 } )
db.fruits.insert( {_id: 4, item: "Peaches", price: NumberDecimal("7.49"), quantity: 12 } )
db.fruits.insert( {_id: 5, item: "Bananas", price: NumberDecimal("2.99"), quantity: 5 } )

db.fruits.ensureIndex({price:1})
print("--- Decimal type ---")

db.fruits.find( { price: { $type: "decimal" } } ).sort({price:1})
