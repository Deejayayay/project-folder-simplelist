//why is this here
const { json } = require("express");
const { write } = require("fs");
const fs = require("fs/promises");


const filepath = "./listdata.json";
  // Make sure the file exists
  // Read the file
  // convert the buffer to a json object and return it
async function ReadData() {
  try {
    if(!fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK)){
      return null;
    } else {
      const dataIn = await fs.readFile(filepath);
      return JSON.parse(dataIn);
    }
  } catch (error) {
    console.log(error);
    return [];
  } 
}

async function WriteData(dataOut) {
  try {
    await fs.writeFile(filepath, JSON.stringify(dataOut));
    return ;
  } catch (error) {
    return ;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
