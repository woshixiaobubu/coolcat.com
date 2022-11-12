//主库
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'quziquzi',
    database: 'bcjj'
});

//防止注入：'SELECT * FROM user WHERE ?', WHERE
exports.qww = function query_with_w(SQL, W, callback) {
    pool.getConnection(function (err, connection) {
        if (err) return callback(err,'');
        
        // Use the connection
        connection.query(SQL, W, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}

//正常操作
exports.query = function query(SQL, callback) {
    pool.getConnection(function (err, connection) {
        if (err) return callback(err,'');
        
        // Use the connection
        connection.query(SQL, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}

