const { last } = require('lodash');
const db = require('./db');

/**
 * @param {Object} options
 * @param {string} [options.table1_key]
 * @param {string} [options.table2_key]
 * @param {Array} [options.fields]
 */
async function joinTwoTable(table1, table2, options = {}){
    await db(table1)
    const {
        table1_key,
        table2_key,
        fields = []
    } = options;
    try {
        return await db(table1)
            .join(table2, table1_key, table2_key)
            .select(fields);
    }catch(err){
        throw new CustomError(err.message, 'error');
    }
}

async function getAllColumnName(table){
    try {
        const table_info =  await db.raw(`PRAGMA table_info(${table})`);
        const column_name = [];

        table_info.forEach(element => {
            column_name.push(element.name);
        });

        return column_name;

    } catch (error) {
        throw new CustomError(err.message, 'error');
    }
}

async function getAlasHakDataForm() {
    try {
        return await db('Alas_Hak')
        .leftJoin('AlasHak_Clients', 'AlasHak_Clients.alasHak_id', 'Alas_Hak.id')
        .leftJoin('Clients', 'AlasHak_Clients.client_id', 'Clients.id')
        .select('Alas_Hak.*', 
            'Clients.id as client_id', 'Clients.first_name as first_name', 
            'Clients.last_name as last_name'
        );
    } catch (error) {
        console.log(error)
    }
}


(async ()=>{
    console.log('db connecting')
    
    try {
          

        // await db('cars').insert({
        //     name : 'Evolution 8',
        //     user_name : 'alan'
        // });
        // await db('users').insert({
        //     username: 'alan',
        //     first_name: 'Farlan',
        //     last_name: 'Fadillah',
        //     email: 'farlanF@gmail.com',
        //     hash: '$2b$12$W3XvsSzPMVGK/cnkakSkhe.3vkSsLF.YIPTeErQxC9ZP7ACnuskAG',
        //     isAdmin: null
        // });

        // await db('users')
        //     .where({username : 'alan'})
        //     .update({
        //         isAdmin : true
        //     })

        // const newData = {
        //     email : 'farlanF@gmail.com',
        //     last_name : 'Farlan'
        // }

        // await db.schema.createTable('A', table=>{
        //     table.increments('id').primary();
        //     table.string('name');
        // })

        // await db.schema.createTable('B', table=>{
        //     table.increments('id').primary();
        //     table.string('name');
        // })

        // await db.schema.createTable('A_B', table =>{
        //     table.integer('A_id').notNullable();
        //     table.integer('B_id').notNullable();

        //     table.foreign('A_id').references('A.id').onDelete('CASCADE');
        //     table.foreign('B_id').references('B.id').onDelete('CASCADE');
        // })


        // await db('users').update(newData).where({username : 'alan'});




        // console.log(await db('users').select('*'));
        // console.log(await db('cars').select('*'));

        // console.log('Join Table');

        


        // const table = await db("users").join('cars', 'cars.user_name', 'users.username').select('first_name as First Name', 'last_name as Last Name', 'email as Email', 'cars.name as Car Name');
        // const table = await joinTwoTable('users', 'cars', {
        //     table2_key : 'users.username',
        //     table1_key : 'cars.user_name',
        //     fields : [
        //         'first_name',
        //         'last_name',
        //         'cars.name',
        //         'email'
        //     ] 
        // })
        
        // console.log(table);
        // console.table(table);

        // await db('A').insert({
        //     name : 'alan'
        // });

        // await db('B').insert({
        //     name : 'aa'
        // });

        // await db('A_B').insert({
        //     A_id : 1,
        //     B_id : 2
        // });


        // console.table(await db('A'));
        // console.table(await db('B'));
        // console.table(await db('A_B'));


        // const table = await db('B')
        // .leftJoin('A_B', 'B.id', 'A_B.B_id')
        // .leftJoin('A', 'A_B.A_id', 'A.id')
        // .select('*');

        // const grouped = table.reduce((acc, row) => {
        //     if (!acc['users']) acc['users'] = [];
        //     acc['users'].push({ id: row.id, name: row.name });
        //     return acc;
        // }, {
        //     A_name : table[0]['A Name']
        // });

        // console.log(table);

        const table = await getAlasHakDataForm();
        // console.log(table);
        const columNames = await getAllColumnName('Alas_Hak');
        

        const result = table.reduce((acc, row)=>{
            for(const colName of columNames){
                acc[colName] = row[colName];            
            }
            if(!acc['Clients']) acc['Clients'] = [];

            console.log(row)
            acc['Clients'].push({
                client_id : row.client_id,
                first_name : row.first_name,
                last_name : row.last_name
            });

            return acc;
        }, {});

        console.log(result);

    } catch (error) {
        console.log(error.message)
    }
})();