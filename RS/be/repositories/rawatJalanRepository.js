const db = require('../config/db.config');

const getAll = async () => {
    const [result] = await db.execute(
        `SELECT rj.*, p.*, d.* FROM rawat_jalan rj
        JOIN pasien p ON p.id_pasien = rj.pasien_id_pasien
        JOIN dokter d ON d.id_dokter = rj.dokter_id_dokter`
    );
    return result;
};

const getById = async (id_rawat_jalan) => {
    const [result] = await db.execute(
        'SELECT * FROM rawat_jalan WHERE id_rawat_jalan = ?',
        [id_rawat_jalan]
    );
    return result
};

const insert = async (rawat_jalan) => {
    const [result] = await db.execute(
        'CALL add_rawat_jalan(?, ?)',
        [
            rawat_jalan.pasien_id_pasien, 
            rawat_jalan.dokter_id_dokter
        ]
    );
    return result;
}

const update = async (id_rawat_jalan, rawat_jalan) => {
    const [result] = await db.execute(
        'CALL update_rawat_jalan(?, ?)',
        [
            id_rawat_jalan,
            rawat_jalan.diagnosis, 
        ]
    );
    return result;
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
};