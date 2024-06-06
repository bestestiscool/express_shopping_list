const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function(req,res){
  res.json({ items })
})

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400);
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});


router.get("/:name", function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  const foundPrice = items.find(item => item.price === req.params.price)
  if(foundItem === undefined || foundPrice === undefined){
    throw new ExpressError("Item not found", 404)
  }
  res.json({ name: foundItem, price: foundPrice })
})

// router.patch("/:name", function (req, res) {
//   const foundItem = cats.find(cat => cat.name === req.params.name)
//   if (foundItem === undefined) {
//     throw new ExpressError("Cat not found", 404)
//   }
//   foundItem.name = req.body.name 
//   res.json({ cat: foundItem })
// })

// router.delete("/:name", function (req, res) {
//   const foundItem = cats.findIndex(cat => cat.name === req.params.name)
//   if (foundItem === -1) {
//     throw new ExpressError("Cat not found", 404)
//   }
//   cats.splice(foundItem, 1)
//   res.json({ message: "Deleted" })
// })

module.exports = router;