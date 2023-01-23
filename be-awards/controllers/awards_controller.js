exports.findAwards = async (req, res) => {
  const list = ['vouchers', 'products', 'giftcard'];
  const page = parseInt(req.query.current_page) || 1;
  const limit = parseInt(req.query.per_page) || 10;
  const poin = parseInt(req.query.poin) || 500000;
  let types = req.query.types || ''
  let OFFSET = 0;
  if (page === 0) {
    OFFSET = page;
  } else {
    OFFSET = (page - 1) * limit
  }
  let tp = []
  types.split(',').forEach((el) => {
    if (list.includes(el.toLowerCase())) {
      tp.push(el.toLowerCase());
    }
  });
  let stmt = [];
  tp.forEach((d, i) => {
    stmt.push(`$${i + 4}`)
  })
  try {
    const client = await pool.connect()
    let query = `
      SELECT award_id, awards_name, awards_image, poin, award_type FROM awards WHERE poin <= $3 ${types ? `AND award_type IN (${stmt.toString()})` : ''} LIMIT $1 OFFSET $2;
    `
    let prepare = types ? [limit, OFFSET, poin, ...tp] : [limit, OFFSET, poin]
    let response = await client.query(query, prepare);
    client.release();
    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: response.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}