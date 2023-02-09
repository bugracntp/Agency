const fs = require("fs");
const photoModel = require("../models/photo");

exports.getIndexPage = async (req, res) => {
  const photos = await photoModel.find({});
  res.status(200).render("index", {
    photos,
  });
};

exports.createPost = async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // Bunun için const fs = require('fs'); almamız gerekir.

  let uploadeImage = req.files.photo;
  let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;

  const portfolioInfo = {
    title: req.body.title,
    brief: req.body.brief,
    client: req.body.client,
    category: req.body.category,
    description: req.body.description,
    photo: uploadeImage.name,
  };

  uploadeImage.mv(uploadPath, async () => {
    await photoModel.create(portfolioInfo);
    res.redirect("/");
  }); // adresine yönlendirioruz
};

exports.deletePhoto = async (req, res) => {
  const photo = await photoModel.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public/uploads/" + photo.photo;
  fs.unlinkSync(deletedImage);
  await photoModel.findByIdAndRemove(req.params.id);
  res.redirect(`/`);
};
