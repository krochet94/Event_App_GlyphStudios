const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//Create new user  =>  /api/v1/user
exports.newUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    user,
  });
});

//Get all users => /api/v1/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//Update user => /api/v1/user/:id (put)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
 const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete user => /api/v1/user/:id (delete)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
