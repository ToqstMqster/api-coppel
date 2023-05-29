import { getConnection, sql } from "../database/connection"

const bcryptjs = require('bcryptjs');

export const getCompanies = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM EMPRESA");
        res.json(result.recordset);  
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getCountries = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM PAIS");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getStates = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM ESTADO");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getLastFolio = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT MAX(FOLIO) AS LASTFOLIO FROM DENUNCIA");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getPasswordByFolio = async (req, res) => {
    const { folio } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().
        input("folio", folio).
        query("SELECT CONTRASEÑA FROM DENUNCIA WHERE FOLIO = @folio");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getPasswordByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().
        input("email", email).
        query("SELECT CONTRASEÑA FROM USUARIO WHERE CORREO = @email");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getCommStateReport = async (req, res) => {
    const { folio } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().
        input("folio", folio).
        query("SELECT COMENTARIOS, ESTATUS FROM DENUNCIA WHERE FOLIO = @folio");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getEmployeeData = async (req, res) => {
    const { correo } = req.params;
    try{
        const pool = await getConnection();
        const result = await pool.request().
        input("correo", correo).
        query("SELECT ID_USER, EMP_NOMBRE FROM USUARIO WHERE CORREO = @correo");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getReportListByEmpID = async (req, res) => {
    const { id } = req.params;
    try{
        const pool = await getConnection();
        const result = await pool.request().
        input("id", id).
        query("exec listaDenuncias @id");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getReportData = async (req, res) => {
    const { folio } = req.params;
    try{
        const pool = await getConnection();
        const result = await pool.request().
        input("folio", folio).
        query("exec datosDenuncia @folio");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
    
export const postReport = async (req, res) => {

    const body = req.body

    try {
        const pool = await getConnection();

        const json = JSON.stringify(body);
        const result = await pool
        .request()
        .input("json", sql.VarChar, json)
        .query("exec createReport @json");

      res.send({ isValid: true, data: result.recordset });
    } catch (error) {
      res.send({ isValid: false, message: error.message });
    }
}

export const updateReport = async (req, res) => {
    const body = req.body
    const { folio } = req.params;
    try{
        const pool = await getConnection();

        const json = JSON.stringify(body);
        const result = await pool.request()
        .input("json", sql.VarChar, json)
        .input("folio", sql.Int, folio)
        .query("exec actualizarDenuncia @folio, @json");
        res.json(result.recordset);
    } catch (error) {
        console.log(json)
        res.status(500);
        res.send(error.message);
    }
}

export const createUser = async (req, res) => {
    const password = req.body.contrasena;
    try {
        const pool = await getConnection();

        const passwordHash = await bcryptjs.hash(password, 4)
        req.body.contrasena = passwordHash

        const body = req.body
        const json = JSON.stringify(body);
        const result = await pool
        .request()
        .input("json", sql.VarChar, json)
        .query("exec insertUser @json");

      res.json({ passwordHash: passwordHash });
    } catch (error) {
      res.json({ message: error.message });
    }
}

