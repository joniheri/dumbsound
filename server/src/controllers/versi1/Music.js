const { Music, Artist } = require("../../../models");

const joi = require("joi");

// Function GetMusics
exports.getMusics = async (req, res) => {
  try {
    const getDatas = await Music.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "ArtistId"],
      },
    });

    if (getDatas == null) {
      return res.send({
        response: "Response Failed",
        status: "Data is empty!",
      });
    }

    res.send({
      response: "Response Success",
      status: "Get data Success.",
      dataCount: getDatas.length,
      data: getDatas,
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Get data Error!",
      error: error,
    });
  }
};
// EndGetMusics Function

// Function GetMusicsBelongsToArtist
exports.getMusicsBelongstoArtis = async (req, res) => {
  try {
    // CheckDataFromMiddleware
    const dataAutMiddleware = req.user;
    // EndCheckDataFromMiddleware

    const pathFile = process.env.PATCH_UPLOADS;

    let getDatas = await Music.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (getDatas == null) {
      return res.send({
        response: "Response Failed",
        status: "Data is empty!",
      });
    }

    const parseJSON = JSON.parse(JSON.stringify(getDatas));

    getDatas = parseJSON.map((item) => {
      return {
        ...item,
        thumbnail: pathFile + item.thumbnail,
      };
    });

    res.send({
      response: "Response Success",
      status: "Get data Success.",
      dataCount: getDatas.length,
      dataAutMiddleware,
      data: getDatas,
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Get data Error!",
      error: error,
    });
  }
};
// End Function GetMusicsBelongsToArtist

// Function GetMusicById
exports.getMusictById = async (req, res) => {
  try {
    const { idParam } = req.params;

    const getData = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (getData == null) {
      return res.send({
        response: "Response Failed",
        status: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }

    res.send({
      response: "Response Success",
      status: "Get data Success.",
      idParam: idParam,
      data: getData,
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Get data Error!",
      error: error,
    });
  }
};
// End Function GetMusicById

// Function AddMusic
exports.addMusic = async (req, res) => {
  try {
    const dataAdd = req.body; //Data will Added

    // ChekcValidationInput
    const schema = joi.object({
      title: joi.string().min(1).required(),
      year: joi.string().min(1).required(),
      thumbnail: joi.string(),
      attache: joi.string(),
      artistId: joi.string().min(1).required(),
    });
    const { error } = schema.validate(dataAdd);
    if (error) {
      return res.send({
        response: "Response Failed",
        status: error.details[0].message,
        data: dataAdd,
      });
    }
    // EndChekcValidationInput

    // AddData
    const dataAdded = await Music.create(dataAdd);
    if (!dataAdded) {
      return res.send({
        response: "Response Failed",
        status: `Add data Failed!`,
      });
    }
    // EndAddData

    // GetDataById
    const idMusic = dataAdded.id;
    const getData = await Music.findOne({
      where: {
        id: idMusic,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
    });
    if (getData == null) {
      return res.send({
        response: "Response Failed",
        status: `Data with id ${idMusic} Not Found!`,
        data: null,
      });
    }
    // GetDataById

    res.send({
      response: "Response Success",
      status: "Add data Success.",
      dataAdded: getData,
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Add Data Error!",
      error: error,
    });
  }
};
// End Function AddMusic

// Function AddMusicWithFile
exports.addMusicWithFile = async (req, res) => {
  try {
    const dataAdd = req.body; //Data will Added

    // ChekcValidationInput
    const schema = joi.object({
      title: joi.string().min(1).required(),
      year: joi.string().min(1).required(),
      thumbnail: joi.string(),
      attache: joi.string(),
      artistId: joi.string().min(1).required(),
    });
    const { error } = schema.validate(dataAdd);
    if (error) {
      return res.send({
        response: "Response Failed",
        status: error.details[0].message,
        data: dataAdd,
      });
    }
    // EndChekcValidationInput

    // ModifValueDataInput
    const thumbnail = req.files.imageFile[0].filename;
    const dataWithUpload = {
      ...dataAdd,
      thumbnail,
    };
    // ModifValueDataInput

    // AddData
    const dataAdded = await Music.create(dataWithUpload);
    if (!dataAdded) {
      return res.send({
        response: "Response Failed",
        status: `Add data Failed!`,
      });
    }
    // EndAddData

    // GetDataById
    const idMusic = dataAdded.id;
    const getData = await Music.findOne({
      where: {
        id: idMusic,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "artistId", "ArtistId"],
      },
    });
    if (getData == null) {
      return res.send({
        response: "Response Failed",
        status: `Data with id ${idMusic} Not Found!`,
        data: null,
      });
    }
    // GetDataById

    res.send({
      response: "Response Success",
      status: "Add data Success.",
      dataAdded: getData,
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Add Data Error!",
      error: error,
    });
  }
};
// End Function AddMusicWithFile

// Function UpdateMusic
exports.updateMusic = async (req, res) => {
  try {
    const { idParam } = req.params;

    // CheckDataById
    const getDataById = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (getDataById == null) {
      return res.send({
        response: "Response Failed",
        status: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }
    // EndCheckDataById

    // UpdateData
    const dataUpdate = req.body; //Data will updated
    const dataUpdated = await Music.update(dataUpdate, {
      where: {
        id: idParam,
      },
    });
    if (!dataUpdated) {
      return res.send({
        response: "Response Failed",
        status: `Update Data Failed!`,
        data: null,
      });
    }
    // EndUpdateData

    // getDataAfterUpdateById
    const getDataAfterUpdateById = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    // getDataAfterUpdateById

    if (getDataAfterUpdateById == null) {
      return res.send({
        response: "Response Failed",
        status: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }
    // EndgetUserAfterUpdateById

    res.send({
      response: "Response Success",
      status: "Update data Success.",
      idParam: idParam,
      dataUpdated: getDataAfterUpdateById,
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Update Error!",
      error: error,
    });
  }
};
// End Function UpdateMusic

// Function DeleteArtist
exports.deleteMusic = async (req, res) => {
  try {
    const { idParam } = req.params;

    // CheckDataById
    const getDataById = await Music.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (getDataById == null) {
      return res.send({
        response: "Response Failed",
        status: `Data with id ${idParam} Not Found!`,
        data: null,
      });
    }
    // EndCheckDataById

    // DeleteData
    const deleteData = await Music.destroy({
      where: {
        id: idParam,
      },
    });
    if (!deleteData) {
      return res.send({
        response: "Response Failed",
        status: `Delete data Failed!`,
        data: null,
      });
    }
    // EndDelete

    res.send({
      response: "Response Success",
      status: "Delete data Success.",
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Delete Error!",
      error: error,
    });
  }
};
// End Function DeleteArtist

// Template Function
exports.templateFunction = async (req, res) => {
  try {
    res.send({
      response: "Response Success",
      status: "Success.",
    });
  } catch (error) {
    return res.send({
      response: "Response Failed",
      status: "Error!",
      error: error,
    });
  }
};
// End Template Function
