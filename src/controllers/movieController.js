const AppError = require("../utils/AppError");
const knex = require("../database/knex/index.js");

class MovieController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const [movieAlreadyExists] = await knex("movies")
      .where({ title })
      .select("*");

    if (movieAlreadyExists) {
      throw new AppError("Movie already exists", 400);
    }

    if (rating < 0 || rating > 5) {
      throw new AppError("Rating must be between 0 and 5", 400);
    }

    const [note_id] = await knex("movies").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tag = tags.map((tag) => {
      return {
        note_id,
        user_id,
        name: tag,
      };
    });
    await knex("movies_flag").insert(tag);
    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movies").where({id}).delete();

    return response.json();
  }

  async show(request, response) {
    const { user_id } = request.params;

    const [movie] = await knex("movies")
      .where({ user_id })
      .select("*");

    return response.json(movie);
  }
}

module.exports = MovieController;
