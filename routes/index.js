const route = require('express').Router();
const errorHandler = require('../middleware/errorHandler')
const UserController = require('../controllers/usercontroller');
const ChallengeController = require('../controllers/challengecontroller')
const RewardController = require('../controllers/rewardcontroller')
const SubmissionController = require('../controllers/submissioncontroller')
const  {Authentikasi} = require('../middleware/auth')


//users
route.post('/register',UserController.register)
route.post('/login',UserController.login)

route.use(Authentikasi)

//challenges
route.post('/challenges',ChallengeController.postChallenges)
route.get('/challenges', ChallengeController.getChallenges)
route.get('/challenges/:id', ChallengeController.getDetailChallenge)

//reward
route.post('/rewards/:challengeId',RewardController.postRewards)
route.get('/rewards',RewardController.getRewards)
route.get('/rewards/:challengeId',RewardController.getChallengeRewards)

//submissions
route.post('/submissions/:challengeId', SubmissionController.postSubmissions)
route.get('/submissions', SubmissionController.getSubmissions)
route.get('/submissions/:challengeId', SubmissionController.getChallengeSubmissions)
route.get('/submissions/:challengeId/:id',SubmissionController.getDetailSubmissions)
route.patch('/submissions/:id', SubmissionController.statusSubmissions)
route.put('/submissions/:challengeId/:id',SubmissionController.countViews)
route.put('/submissions/rewards/:challengeId/:id', SubmissionController.giveRewards)

route.use(errorHandler)
module.exports = route