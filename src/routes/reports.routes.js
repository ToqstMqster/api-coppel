import { Router } from "express";
import {
    getCompanies,
    getCountries, 
    getStates,
    postReport,
    getLastFolio,
    getPasswordByFolio,
    getCommStateReport,
    getEmployeeData,
    getReportListByEmpID,
    getReportData,
    updateReport,
    getPasswordByEmail,
    createUser,
} from '../controllers/reports.controller'

const router = Router();

router.get("/companies", getCompanies);

router.get("/countries", getCountries);

router.get("/states", getStates);

router.get("/folio", getLastFolio);

router.post("/reports", postReport);

router.get("/password/:folio", getPasswordByFolio);

router.get("/CommState/:folio", getCommStateReport);

router.get("/employee/:correo", getEmployeeData);

router.get("/empReportList/:id", getReportListByEmpID);

router.get("/reportData/:folio", getReportData);

router.put("/updateReport/:folio", updateReport);

router.get("/passwordEmail/:email", getPasswordByEmail);

router.post("/createUser", createUser);


export default router;