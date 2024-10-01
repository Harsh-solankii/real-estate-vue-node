const router = require('express').Router();
const {signup,login,logout,logoutfromalldevices, logoutfromotherdevice} = require('../controllers/auth');
const { getchannels, addmessages, getmessages } = require('../controllers/Chat');
const { getcomments, addcomment } = require('../controllers/Common');
const { getsubmittedjobs, acceptreject_job, receive_update, accepted_con_jobs, sendpow, showtaskforthejob, showproposaljobs, addestimate } = require('../controllers/contractor');
const {showestimatejobs, receivepow, getprops, getjobs, addjob, addtask, addproperty, accepted_jobs, checkoutsession, verify_jobs, complete_job} = require('../controllers/property');
const passport = require('passport');
require('../middlewares/auth')(passport)


const multer=require('multer')
const upload = multer({ dest:'./public/uploads/' })

router.post("/signup",signup);

router.post("/login",login);

router.use(passport.authenticate('jwt', { session: false }));

router.get('/getsubmitjobs/:id',getsubmittedjobs);

router.get('/showestimatejobs/:id',showestimatejobs);

router.get("/receivepow/:id/:id2",receivepow);

//common

router.post('/addcomment',addcomment);

//properties

router.get("/props/:id",getprops);

router.get("/jobs/:id",getjobs);
 
router.post("/addjob/:id",addjob);

router.post("/addtask/:id",upload.fields([{ name: 'upload', maxCount: 12 }]),addtask);
    
router.get('/logout',logout);

router.get('/logoutfromother',logoutfromotherdevice);

router.get('/logoutfromall',logoutfromalldevices);


router.post('/addproperty',addproperty);
router.post('/addjob',addjob);

router.get('/acrej/:flag/:id',acceptreject_job);

router.get('/accepted_job/:id',accepted_jobs);

router.get('/verify/:id',verify_jobs);

router.get('/complete/:id',complete_job);

// contractor

router.get('/receive_update/:id',receive_update);

router.get('/accepted_con_job/:id',accepted_con_jobs);

router.post('/addpow/:jobid',upload.fields([{ name: 'powimages', maxCount: 12 }]),sendpow);

router.get('/showtask/:id',showtaskforthejob);

router.get('/proposal_jobs/:id',showproposaljobs);

router.post('/addestimate',addestimate);

// chat

router.get("/channels/:id/:role",getchannels);

router.post("/addmsg",addmessages);

router.get("/getmsgs/:id",getmessages);

// payment

router.post('/create-checkout-session',checkoutsession);

module.exports = router;
