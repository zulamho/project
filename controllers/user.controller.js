const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (candidate) {
        return res.status(401).json({ error: `Пользователь с логином ${login} уже существует!` });
      }

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        login: login,
        password: hash,
      });
      res.json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при регистрации: " + error.toString(),
      });
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({
      login,
    });

    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин!" });
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный пароль!" });
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };
    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    res.json({ token });
  },

  // createUser: async (req, res) => {
  //   try {
  //     await User.create({
  //       name: req.body.name,
  //     });
  //     res.send("Пользователь добавлен");
  //   } catch (err) {
  //     res.json(err);
  //   }
  // },

  getUser: async (req, res) => {
    try {
      const get = await User.find().lean();
      res.render(get);
    } catch (err) {
      res.json(err);
    }
  },
  editUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id);
      res.json("Пользователь изменен");
    } catch (err) {
      res.json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.json("Пользователь удален");
    } catch (err) {
      res.json(err);
    }
  },
};
