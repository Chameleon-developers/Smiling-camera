var mysql = require('mysql');
module.exports = function () {  
    var con =  mysql.createConnection({ 
        host : 'localhost',
        user : 'root',
        password : '',
        database : ''
    }); 

    con.on('error',function (err) {  
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Connection closed');
        }else{
            console.log(err);
        }
    })

    return con;
}

/* 
class Database {
    constructor() {
        this.connection = mysql.createConnection( { 
            host : 'localhost',
            user : 'root',
            password : '',
            database : ''
        }); 
        
        this.connection.on('error',function (err) {  
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                console.log('Connection closed');
            }else{
                console.log(err);
            }
        } );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports.db_prom = function(){
    return new Database()
} */