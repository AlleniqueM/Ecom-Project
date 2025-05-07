const db = require('../database');

class Address {
    constructor(address_id, user_id, street, city, state, postal_code, country) {
        this.address_id = address_id;
        this.user_id = user_id;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postal_code = postal_code;
        this.country = country;
    }

async addAddress(){
        try {
            const query = "INSERT INTO addresses (user_id, street, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?)";
            const result = await db.query(query, {user_id, street, city, state, postal_code, country});
                return result;   
            } catch (error) {
                throw error;
            }
        }
// get all addresses
async getAllAddresses(){
    try {
        const query = "SELECT * FROM addresses";
        const result = await db.query(query);
        return result;
        } catch (error) {
            throw error;
        }
     }

     static async getAddressById(address_id){
        const query = "SELECT * FROM addresses WHERE address_id = ?";
        try {
            const [results] = await db.execute(query, [address_id]);
            if(results.length===0) {
                throw 'Address not found';
            }
        } catch (error) {
            throw error;
        }
     }

// delete address
async deleteAddress(){
    try {
        const query = "DELETE FROM addresses WHERE address_id = ?";
        const result = await db.query(query, {address_id});
        return result;
        } catch (error) {
            throw error;
            }}
// update address
async updateAddress(){
    try {
        const query = "UPDATE addresses SET street = ?, city = ?, state = ?, postal_code = ?, country = ? WHERE address_id = ?";
        const result = await db.query(query, {street, city, state, postal_code, country, address_id});
            return result;
        } catch (error) {
            throw error;
           }

        }
    

}
module.exports = Address;