let express = require("express")
const router = express.Router();
router.use(express.json());


let { registerUser, loginUser, getUserByUsername, deleteUser, addFavorite } = require("../controllers/userController")

router.get("/", async (req, res) => {
    res.status(200).json({
        data: "this is data"
    })

})
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getuser/:email", getUserByUsername)
router.delete("/delete/:id", deleteUser)



module.exports = router;