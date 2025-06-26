const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')
const PORT = 3000
const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'guilhermedev123',
    database: 'team-tracker'
})

db.connect((err) => {
    if (err) console.log('Erro ao conectar ao banco: ', err)
    else console.log('Conectado ao banco de dados')
})

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.static('public'))

const hbs = exphbs.create({
    helpers: {
        formatDate: function (date) {
            if (!date) return ''
            const d = new Date(date)
            return d.toLocaleDateString('pt-BR')
        }
    }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    const search = req.query.search || ''

    let sql = 'SELECT * FROM team'
    let params = []

    if (search) {
        sql += ' WHERE name LIKE ?'
        params.push(`%${search}%`)
    }

    db.query(sql, params, (err, results) => {
        if ('Erro ao buscar funcionário: ', err) {
            console.error(err)
            return res.status(500).send('Erro ao buscar funcionários')
        }
        res.render('home', { employee: results, search })
    })
})

app.post('/team/employee', (req, res) => {
    const { name, role, email, phone, start_date, status, department, notes } = req.body
    const statusBoolean = status === 'true' ? 1 : 0

    const sql = 'INSERT INTO team (name, role, email, phone, start_date, status, department, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    const data = [name, role, email, phone, start_date, statusBoolean, department, notes]

    db.query(sql, data, (err) => {
        if ('Errp ao inserir no banco: ', err) {
            console.log(err)
            return res.status(500).send('Erro ao inserir no banco')
        }
        res.redirect('/')
    })
})

app.get('/team/details/:id', (req, res) => {
    const id = req.params.id

    const sql = 'SELECT * FROM team WHERE id = ?'

    db.query(sql, [id], (err, results) => {
        if ('Erro nos details: ', err) {
            console.log(err)
            return res.status(500).send('Erro ao buscar funcionário')
        }

        if (results.length === 0) {
            return res.status(404).send('Funcionário não encontrado')
        }

        const employee = results[0]
        res.render('details', { employee })
    })
})

app.post('/team/updateemployee', (req, res) => {
    const { id, name, role, email, phone, start_date, status, department, notes } = req.body
    const statusBoolean = status === 'true' ? 1 : 0

    const sql = 'UPDATE team SET name = ?, role = ?, email = ?, phone = ?, start_date = ?, status = ?, department = ?, notes = ? WHERE id = ?'
    const data = [name, role, email, phone, start_date, statusBoolean, department, notes, id]

    db.query(sql, data, (err) => {
        if ('Erro para atualização: ', err) {
            console.log(err)
            return res.status(500).send('Erro ao atualizar funcionário')
        }
        res.redirect('/')
    })
})

app.post('/team/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = 'DELETE FROM team WHERE id = ?'

    db.query(sql, [id], (err) => {
        if (err) {
            console.log('Erro ao deletar: ', err)
            return res.status(500).send('Erro ao deletar funcionário')
        }
        res.redirect('/')
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
