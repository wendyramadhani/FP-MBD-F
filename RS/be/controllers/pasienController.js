const pasienService = require('../services/pasienService');

const getAllPasien = async (req, res, next) => {
    try {
        const result = await pasienService.getAllData();
        return res.status(200).json(result);
    } catch (error) {
        console.log('Error retrieving pasien: ', error);
        return res.status(500).json(error);
    }
}

const getPasienById = async (req, res, next) => {
    const { id_pasien } = req.params;

    try {
        const result = await pasienService.getDataById(id_pasien);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving pasien: ', error);
        return res.status(500).json(error);
    }
}

const addPasien = async (req, res, next) => {
    const { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon, asuransi } = req.body;

    if (!nama || !tanggal_lahir || !jenis_kelamin || !alamat || !nomor_telepon || !asuransi) {
        return res.status(400).json({ error: 'All fields must filled' });
    }

    try {
        const pasien = { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon, asuransi };
        const result = await pasienService.insertData(pasien);
        return res.status(200).json({success: true, data: pasien});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updatePasien = async (req, res, next) => {
    const { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon, asuransi } = req.body;
    const { id_pasien } = req.params;

    if (!nama || !tanggal_lahir || !jenis_kelamin || !alamat || !nomor_telepon || !asuransi) {
        return res.status(400).json({ error: 'All fields must filled' });
    }

    try {
        const pasien = { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon, asuransi };
        const result = await pasienService.updateData(id_pasien, pasien);
        return res.status(200).json({success: true, message: 'Success Updating Data', data: pasien});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deletePasien = async (req, res, next) => {
    const { id_pasien } = req.params;

    if (!id_pasien) {
        return res.status(400).json({ error: 'id_pasien is required!' });
    }
    
    try {
        const result = await pasienService.deleteData(id_pasien);

        if (result.affectedRows > 0) {
            return res.status(200).json({ success: true, message: 'Success Deleting Data', id: id_pasien });
        } else {
            return res.status(404).json({ success: false, message: 'Dokter not found!' });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllPasien,
    getPasienById,
    addPasien,
    updatePasien,
    deletePasien,
};