const mongoose = require("mongoose");
const { Diabetes } = require('../models/diabetes')


async function get_data(req, res){

    const data = await Diabetes.find({});

    if (data.length === 0) return res.status(404).send('No data found !')

    console.log(data)

    res.status(200).send(data)
} 

async function get_average(req, res){
    
    const data = await Diabetes.find({});

    if (data.length === 0) return res.status(404).send('No data found !')

    // console.log(data)

    let pregTotal = 0
    let glucTotal = 0
    let bpTotal = 0
    let skinTotal = 0
    let insulineTotal = 0
    let bmiTotal = 0
    let pedigreeTotal = 0
    let ageTotal = 0
    let averageOutcome = 0

    for (let row of data){
        pregTotal += parseInt(row.Pregnancies)
        glucTotal += parseInt(row.Glucose)
        bpTotal += parseInt(row.BloodPressure)
        skinTotal += parseInt(row.SkinThickness)
        insulineTotal += parseInt(row.Insulin)
        bmiTotal += parseInt(row.BMI)
        pedigreeTotal += parseInt(row.DiabetesPedigreeFunction)
        ageTotal += parseInt(row.Age)
        averageOutcome += parseInt(row.Outcome)
    }

    res.status(200).send(`Average Diabetic Data:\n\tPreganancies:\t${pregTotal/data.length}\n\tGlucose:\t${glucTotal/data.length}\n\tBloodPressure:\t${bpTotal/data.length}\n\tSkinThickness:\t${skinTotal/data.length}\n\tInsulin:\t${insulineTotal/data.length}\n\tBMI:\t${bmiTotal/data.length}\n\tDiabetic Pedigree:\t:${pedigreeTotal/data.length}\n\tAge:\t${ageTotal/data.length}\n\tAverage Outcome:\t${averageOutcome/data.length}`)
}

// TODO: Define Algorithm here
async function algorithm(sample_data) {
    // Do something ...
    //return output
    return
}

async function check_data(req, res) {
    // You can take any number of inoputs from here
    const { name, loca, dob, age, insulin } = req.body


    // checking is data was supplied and not left empty. Logic -> if not name or not loca or not age ... return error
    if(!name || !loca || !age || !insulin) return res.status(401).send('Include name and loca, age, insulin in body ;)')

    // Make a function call to the algorithm here:
    let sample_data = null
    const processed_data = await algorithm(sample_data)

    // send back the processed data below
    res.status(200).send(`Received data: ${name} is ${loca}`)

}

module.exports = {
    get_data,
    get_average,
    check_data
};
