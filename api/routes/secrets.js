const express = require("express")
const {createSecret, getSecret, getSecretKeycode} = require("../controllers/SecretsController")

const router = express.Router()

router.get("/", getSecret)

router.post('/', createSecret)

router.get('/:key_code', getSecretKeycode)

module.exports = router