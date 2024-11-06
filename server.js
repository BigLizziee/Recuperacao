const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database:'stockcar'
});

con.connect((err) =>{
    if(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

const teste = (req, res) => {
    res.send("Back-end respondendo");
}


const createclientes = (req, res) => {
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro} =req.body;

    const query = 'INSERT INTO clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'cliente Criado com sucesso', result});
        }

    });
}


const readclientes = (req, res) => {
    con.query("SELECT * FROM clientes",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}


const updateclientes = (req, res) => {
    const {cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;

    const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?'
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'clientes atualizado com sucesso', result});
        }
    });
}



const deleteclientes = (req, res) => {
    let cliente_id = Number(req.params.cliente_id)

const query = `DELETE FROM clientes WHERE cliente_id = ${cliente_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'clientes removido com sucesso', result });
        }
    });
};








const createcarros = (req, res) => {
    const {marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id} = req.body;

    const query = 'INSERT INTO carros (marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id) VALUES(?, ?, ?, ?, ?)';
    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'carros criado com sucesso', result });
        }
    });
};

const readcarros = (req, res) => {
    con.query("SELECT * FROM carros", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatecarros = (req, res) => {
    const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id} = req.body;

    const query = `UPDATE carros SET modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiuclo = ?, cliente_id = ? WHERE marca_veiculo = ?`;
    con.query(query, [modelo_veiculo, ano_veiculo, fabricacao_veiuclo, cliente_id, marca_veiculo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'carros atualizado com sucesso', result });
        }
    });
};

const deletecarros = (req, res) => {
    let carro_id = Number(req.params.carro_id)

    const query = `DELETE FROM carros WHERE carros_id = ${carro_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'carros removido com sucesso', result });
        }
    });
};









const createtelefone = (req, res) => {
    const {cliente_id, numero, tipo} = req.body;

    const query = 'INSERT INTO telefone (cliente_id, numero, tipo) VALUES(?, ?, ?)';
    con.query(query, [cliente_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'telefone criado com sucesso', result });
        }
    });
};

const readtelefone = (req, res) => {
    con.query("SELECT * FROM telefone", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatetelefone = (req, res) => {
    const {telefone_id, cliente_id, numero, tipo } = req.body;

    const query = 'UPDATE telefone SET cliente_id = ?, numero = ?, tipo = ? WHERE telefone_id = ?';
    con.query(query, [cliente_id, numero, tipo, telefone_id ], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'telefone atualizado com sucesso', result });
        }
    });
};

const deletetelefone = (req, res) => {
    let telefone_id = Number(req.params.telefone_id)

    const query = `DELETE FROM telefone WHERE telefone_id = ${telefone_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'telefone removido com sucesso', result });
        }
    });
};



const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);


app.post("/clientes", createclientes);
app.get("/clientes", readclientes);
app.put("/clientes", updateclientes);
app.delete("/clientes/:cliente_id", deleteclientes);

app.post("/carros", createcarros); 
app.get("/carros", readcarros);
app.put("/carros", updatecarros);
app.delete("/carros/:carro_id", deletecarros);

app.post("/telefone", createtelefone);
app.get("/telefone", readtelefone);
app.put("/telefone", updatetelefone);
app.delete("/telefone/:telefone_id", deletetelefone);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});