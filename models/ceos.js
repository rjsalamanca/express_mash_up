const db = require('./conn.js');

class Executives {
    constructor(id, name,year){
        this.id = id;
        this.name = name;
        this.year = year;
    }

    static async getAll(){
        try{
            const response = await db.any(`select * from ceos`);
            return response;
        } catch(err){
            return err.message;
        }
    }
}