const pembayaranRepository = require('../repositories/pembayaranRepository');

const getAllData = async () => {
    return await pembayaranRepository.getAll();
};

const getDataById = async (id_pembayaran) => {
    return await pembayaranRepository.getById(id_pembayaran);
};

const addData = async (pembayaran) => {
    return await pembayaranRepository.insert(pembayaran);
};

const updateData = async (id_pembayaran, pembayaran) => {
    return await pembayaranRepository.update(id_pembayaran, pembayaran);
}

module.exports = {
    getAllData,
    getDataById,
    addData,
    updateData,
};