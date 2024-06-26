const db = require('../config/db.config');

const getAll = async () => {
    const [result] = await db.execute(
        'SELECT id_pembayaran, biaya, metode_pembayaran, tanggal_pembayaran FROM pembayaran'
    );
    return result;
};

const getById = async (id_pembayaran) => {
    const [result] = await db.execute(
        'SELECT * FROM pembayaran WHERE id_pembayaran = ?',
        [id_pembayaran]
    );
    return result;
};

const insert = async (pembayaran) => {
    const [result] = await db.execute(
        'CALL add_pembayaran(?, ?, ?)',
        [pembayaran.biaya, pembayaran.metode_pembayaran, pembayaran.tanggal_pembayaran]
    );
    return result;
}

const update = async (id_pembayaran, pembayaran) => {
    const [result] = await db.execute(
        `UPDATE pembayaran
        SET biaya = ?,
            metode_pembayaran = ?,
            tanggal_pembayaran = ?
        WHERE id_pembayaran = ?`,
        [pembayaran.biaya, pembayaran.metode_pembayaran, pembayaran.tanggal_pembayaran, id_pembayaran]
    );
    return result;
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
};