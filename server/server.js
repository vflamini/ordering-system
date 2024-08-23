const express = require("express");
const app = express();
const port = process.env.port || 5000;
const util = require("util");
const path = require("path");
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

const { db, pool } = require('./config/db');

app.use((req, res, next) => {
  // Set headers to allow all origins
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/get/:table/:col/:value', (req,res) => {
	const table = req.params.table;
	const col = req.params.col;
	const value = req.params.value;
	db.query('SELECT * FROM ?? WHERE ?? = ?', [table, col, value], (err,result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
  })
})

app.get('/api/getcol/:getcol/:table/:col/:value', (req,res) => {
	const table = req.params.table;
	const col = req.params.col;
	const value = req.params.value;
  const getCol = req.params.getcol;
	db.query('SELECT ? FROM ?? WHERE ?? = ?', [getcol, table, col, value], (err,result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
  })
})

app.post('/api/update/:table/:col/:value/:id/:target', (req,res) => {
  const table = req.params.table;
  const col = req.params.col;
  const value = req.params.value;
  const id = req.params.id;
  const target = req.params.target;

  db.query(`UPDATE ?? SET ?? = ? WHERE ?? = ?`, [table, col, value, id, target], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})

app.post('/api/insert/:table/:col/:value', (req,res) => {
  const table = req.params.table;
  const col = req.params.col;
  const value = req.params.value;

  db.query('INSERT INTO ?? (??) VALUES (?)', [table, col, value], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})

app.post('/api/create/order', (req,res) => {
  const order = {
    order_date: req.body.date,
    person_name: req.body.orderer,
    item_name: req.body.item,
    company: req.body.company,
    link: req.body.link,
    catalog_number: req.body.catalogNumber,
    list_price: req.body.listPrice,
    quantity: req.body.quantity,
    total_price: req.body.totalPrice,
    comments: req.body.comments,
    urgent: req.body.urgent
  };

  const grants = req.body.grant;
  const teams = req.body.team;

  const columns = Object.keys(order);
  const values = Object.values(order);

  const orderSql = `INSERT INTO orders (${columns.map(() => '??').join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({eror: 'Database connection failed'});
    }
    connection.beginTransaction(err => {
      if (err) {
        connection.release();
        return res.status(500).json({eror: 'Failed to start transaction'});
      }
    })
    connection.query(orderSql, [...columns, ...values], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          connection.release();
          return res.status(500).json({ error: 'Failed to insert order' });
        });
      }
      const orderId = result.insertId;
      const grantSql = `INSERT INTO grant_order(order_id, grant_name, grant_percentage) VALUES ${grants.map((grant) => `(${orderId}, '${grant.name}', ${grant.percentage})`).join(', ')}`;
      connection.query(grantSql, [], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            return res.status(500).json({ error: 'Failed to insert grants' });
          });
        }
        const teamSql = `INSERT INTO team_order(order_id, team_name) VALUES ${teams.map((team) => `(${orderId}, '${team}')`).join(', ')}`;
        connection.query(teamSql, [], (err, result) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              return res.status(500).json({ error: 'Failed to insert teams' });
            });
          }
          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return res.status(500).json({ error: 'Failed to commit transaction' });
              });
            }

            connection.release();
            res.status(200).json({ 
              message: 'Order created and order details inserted successfully!', 
              orderId: orderId 
            });
          });
        })
      })
    })
  })
  // db.query(orderSql, [...columns, ...values], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send('Error inserting into the database');
  //   }
  //   res.send(result);
  // })
}) 

app.listen(port, () => {console.log(`Server is running on ${port}`)});