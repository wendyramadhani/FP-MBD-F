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

module.exports = {
    checkId
};