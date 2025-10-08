module.exports = {
    development : {
        client : 'sqlite3',
        connection :{
            filename : './kantor_2.sqlite3'
        },
        useNullAsDefault : false,
        migrations :{
            directory : './migrations'
        }
    }
}