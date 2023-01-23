exports.loginUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(email).toLowerCase())){
    return res.status(400).json({
      status: 400,
      message: 'Email Address Is Not Exists',
    });
  }
  try {
    const client = await pool.connect()
    let query = `
      SELECT email FROM users WHERE email=$1;
    `
    let response = await client.query(query, [email]);
    client.release();
    if (response.rows.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Email Address Is Not Exists',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: response.rows,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};
