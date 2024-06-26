const utilService = require('../services/utilService');

const checkId = async (req, res, next) => {
    const { id_pasien } = req.body;
    try {
        // console.log(id_pasien);
        const checkIdResult = await utilService.checkIdPasien(id_pasien);
        console.log(checkIdResult);
        return res.status(200).json({ result: checkIdResult })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const dashboardData = async (req, res, next) => {
    try {
        const totalPasien = await utilService.getTotalPasien();
        const totalDokter = await utilService.getTotalDokter();
        const totalPasienInap = await utilService.getTotalPasienInap();
        const totalPasienJalan = await utilService.getTotalPasienJalan();

        return res.status(200).json({ 
            total_pasien: totalPasien, 
            total_dokter: totalDokter,
            total_pasien_inap: totalPasienInap,
            total_pasien_jalan: totalPasienJalan
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {
    checkId,
    dashboardData,
};