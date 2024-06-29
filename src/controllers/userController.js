const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex/");

class UserController {
  async create(request, response) {
    const { name, email, password, avatar } = request.body;
    const [userAlreadyExists] = await knex("users").where({ email }).select("*");
    //console.log(userAlreadyExists);
    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }
    const passwordHash = await hash(password, 8);
    await knex("users").insert({ name, email, password: passwordHash, avatar });
    return response.json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;
    const [user] = await knex("users").where({ id }).select("*").first();
    //console.log(user);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const passwordMatch = await compare(old_password, user.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect password", 401);
    }
    if (password && !old_password) {
      throw new AppError("Old password is required", 400);
    }
    if (old_password && password) {
      user.password = await hash(password, 8);
    }

    const [verifyEmail] = await knex("users")
      .where({ email })
      .select("*")
      .first();
    if (verifyEmail && verifyEmail.id !== user.id) {
      throw new AppError("Email already in use", 400);
    }

    await knex("users")
      .where({ id })
      .update({ name, email, password: user.password });

    return response.json();
  }
}

module.exports = UserController;
