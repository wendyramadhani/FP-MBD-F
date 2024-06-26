const utilRepository = require('../repositories/utilRepository');

const checkIdPasien = async (id_pasien) => {
    return await utilRepository.checkId(id_pasien);
}

const getTotalPasien = async () => {
    return await utilRepository.totalPasien();
}

const getTotalDokter = async () => {
    return await utilRepository.totalDokter();
}

const getTotalPasienInap = async () => {
    return await utilRepository.totalPasienInap();
}

const getTotalPasienJalan = async () => {
    return await utilRepository.totalPasienJalan();
}

module.exports = {
    checkIdPasien,
    getTotalPasien,
    getTotalDokter,
    getTotalPasienInap,
    getTotalPasienJalan,
}