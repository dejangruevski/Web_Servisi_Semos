const Tweet = require('../pkg/tweets/viewSchema');

exports.getAll = async (req, res) => {
  try {
    let tweets = await Tweet.find();
    res.status(200).json({
      status: 'success',
      data: {
        tweets
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    console.log(req.semos);
    const tweets = await Tweet.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tweets
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const tweets = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tweets,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const newTweet = await Tweet.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tweets: newTweet,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.delete = async (req, res) => {
  try {
    await Tweet.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};