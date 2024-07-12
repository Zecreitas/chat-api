const {MongoClient, ObjectId} = require("mongodb");
const { param, set } = require("../api");
require("dotenv").config();

let singleton;

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST || "mongodb://localhost:27017");
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE || "chat");
    return singleton;
}

let findAll = async (collection)=>{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    if(obj)
        return obj[0];
    return false;
    
}

let updateOne = async (collection, Object, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: Object});
    return result;
}

module.exports = {findAll};