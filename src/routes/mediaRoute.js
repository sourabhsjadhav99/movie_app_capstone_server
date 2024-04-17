let express = require("express")
const router = express.Router();
router.use(express.json());


let  {postMedia,deleteMedia } =require("../controllers/mediaContoller")

let {jwtAuth} = require("../middlewares/auth")
router.use(jwtAuth)

router.post("/addmedia", postMedia)
router.delete("/delete/:id", deleteMedia)





module.exports = router;