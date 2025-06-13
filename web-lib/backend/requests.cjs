const {Pool} = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'postgres',
    port: 5432,
});

async function sentApplication(req, res){
    const {userName, userEmail, userMessage} = req.body;

    //Проверка на стороне сервера
    if (!(userName && userMessage && userEmail)){
        throw new Error('Проверьте введённые поля!');
    }

    try{
        await pool.query(
            `INSERT INTO applications ("userName", "userMail", "userMessage") VALUES ($1, $2, $3)`,
            [userName, userEmail, userMessage]
        );
    }
    catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так...',
            error: e
        });
    }
}

async function getApplications(req, res){
    try {
        const applications = await pool.query(
            `SELECT * FROM applications`
        );
        res.status(200).json(applications.rows);
    }
    catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так...',
            error: e
        });
    }
}

module.exports = {sentApplication, getApplications};