module.exports=async(req,res)=>{
    // Get The car's mark
    const brand = req.query.brand;
    //Check if it is null or not
    if(!brand){
        return res.status(400).send('You need to choose first a car brand!!!');
    }
    const cars=require('../../support/cars.json');
    const models = require('../../support/car-models.json');
    //Check the brand name is included or not
    if(cars.indexOf(brand)>-1){
        const requiredModels=models.find( element => element.brand==brand);
        res.json(requiredModels);
    }else{
        return res.status(400).send('You need to choose car brand just from the list!!!');
    }
    
}