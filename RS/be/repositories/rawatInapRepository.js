const db = require('../config/db.config');

const getAll = async () => {
    const [result] = await db.execute(
        `SELECT * FROM rawat_inap ri
        JOIN pasien p ON p.id_pasien = ri.pasien_id_pasien`
    );
    return result;
};

const getById = async (id_rawat_inap) => {
    const [result] = await db.execute(
        'SELECT * FROM rawat_inap WHERE id_rawat_inap = ?',
        [id_rawat_inap]
    );
    return result
};

const insert = async (rawat_inap) => {
    const [result] = await db.execute(
        'CALL add_rawat_inap(?, ?, ?)',
        [
            rawat_inap.nomor_kamar, 
            rawat_inap.pasien_id_pasien, 
            rawat_inap.dokter_id_dokter
        ]
    );
    return result;
}

const update = async (id_rawat_inap, rawat_inap) => {
    const [result] = await db.execute(
        'CALL update_rawat_inap( ?, ?)',
        [
            id_rawat_inap,
            rawat_inap.diagnosis, 
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