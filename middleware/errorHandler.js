const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let errMessage = `Internal Server Error`;

  switch (err.name) {
    case "UserNotFound":
      code = 401;
      errMessage = "Unauthorized";
      break;

    case "JsonWebTokenError":
      code = 401;
      errMessage = "Unauthorized";
      break;

    case "NotInitiator":
      code = 401;
      errMessage = "Only Initiator Can Submit Challenge";
      break;

    case "DataNotFound":
      code = 404;
      errMessage = "Data Not Found";
      break;

    case "MinimumBudget":
      code = 400;
      errMessage = "Minimum Budget is 50000";
      break;

    case "NotParticipant":
      code = 401;
      errMessage = "Only Participan Can Submit Submissions";
      break;

    case "OnlyOneSub":
      code = 401;
      errMessage = "Can Only Submit One Submissions";
      break;

    case "IsParticipant":
      code = 401;
      errMessage = "Only Admin or Initiator can change status";
      break;

    case "LimitReward":
      code = 401;
      errMessage = "Rewards Is Not Available Anymore";
      break;

    case "AlreadyGifted":
      code = 401;
      errMessage = "Rewards Is Already Gifted";
      break;

    default:
      break;
  }

  res.status(code).json({ message: errMessage });
};

module.exports = errorHandler;
