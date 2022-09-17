const {MongoClient} = require('mongodb');



async function main() {
        /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = 'mongodb+srv://elias:maximo@mycluster.jukoww6.mongodb.net/?retryWrites=true&w=majority'
	const client = new MongoClient(uri)

    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
main().catch(console.error);