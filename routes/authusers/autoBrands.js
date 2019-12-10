
module.exports=async (req,res)=>{
    const cars = require('../../support/cars.json')
    res.json(cars)
}