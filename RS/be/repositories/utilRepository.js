const db = require('../config/db.config');

const checkId = async (id_pasien) => {
    const [result] = await db.execute(
        'SELECT cek_id_pasien(?) AS cekIdRes',
        [id_pasien]
    );
    return result[0].cekIdRes;
}

const totalPasien = async () => {
    const [result] = await db.execute(
        'SELECT COUNT(*) AS total_pasien FROM pasien'
    );
    return result[0].total_pasien;
}

const totalDokter = async () => {
    const [result] = await db.execute(
        'SELECT COUNT(*) AS total_dokter FROM dokter'
    );
    return result[0].total_dokter;
}

const totalPasienInap = async () => {
    const [result] = await db.execute(
        `SELECT COUNT(*) AS pasien_inap FROM pasien p
        JOIN rawat_inap ri ON p.id_pasien = ri.pasien_id_pasien`
    );
    return result[0].pasien_inap;
}

const totalPasienJalan = async () => {
    const [result] = await db.execute(
        `SELECT COUNT(*) AS pasien_jalan FROM pasien p
        JOIN rawat_jalan rj ON p.id_pasien = rj.pasien_id_pasien`
    );
    return result[0].pasien_jalan;
}

module.exports = {
    checkId,
    totalPasien,
    totalDokter,
    totalPasienInap,
    totalPasienJalan,
};