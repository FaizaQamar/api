const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const getUsers = (req,res)=>{
    pool.query('SELECT * FROM students ORDER BY s_id ASC', (err, results)=>{
        if(!err){
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    });
};

const getUserById = (req,res)=>{
    const id = parseInt(req.params.id);
    console.log(id);
    pool.query('SELECT * FROM students WHERE s_id = $1', [id],(err, result)=>{
        if(!err){
        console.log(result.rows);
        res.status(200).json(result.rows[0]);}
        else{
            console.log(err);
            throw err;
        }
    });
};

const getBooks = (req,res)=>{
    pool.query('SELECT * FROM books ORDER BY b_id ASC', (err, results)=>{
        if(!err){
            res.status(200).json(results.rows);
        }
    });
};

const getBookById = (req,res)=>{
    const id = parseInt(req.params.id);
    console.log(id);
    pool.query('SELECT * FROM books WHERE b_id = $1', [id],(err, result)=>{
        //res.status(200).json(result.rows);
        var obj = result.rows[0];
    var s_id = result.rows[0].s_id;
    pool.query('SELECT * FROM students WHERE s_id =$1', [s_id], (err,result)=>{
        if(!err){
            obj.fname = result.rows[0].fname;
            obj.lname = result.rows[0].lname;
            console.log(obj);
            res.status(200).json(obj);
        }
    });
    });
};

const editUserById =  (req,res) =>{
    const id = parseInt(req.params.id)
    console.log(id);
  const { fname, lname } = req.body;
  pool.query(
    'UPDATE students SET fname = $1, lname = $2 WHERE s_id = $3',
    [fname, lname, id],
    (error, results) => {
      if (error) {
          console.log(error);
        throw error;
      }
      else{
          console.log("success", results);
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  )
};

const editBookById =  (req,res) =>{
    const id = parseInt(req.params.id)
    console.log(id);
  const { title, author, dob, dor, s_id } = req.body;
  pool.query(
    'UPDATE books SET title = $1, author = $2, dob = $3, dor = $4, s_id=$5 WHERE b_id = $6',
    /*'UPDATE books SET title = $1, author = $2 WHERE b_id = $3',*/
    [title, author,dob, dor, s_id, id],
    (error, results) => {
      if (error) {
          console.log(error);
        throw error;
      }
      else{
          console.log("success", results);
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  )
};

module.exports = {getUsers, getUserById, getBooks, getBookById, editUserById, editBookById};