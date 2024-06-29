const knex = require("../database/knex/index.js");

class movieTagController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("movies_flag").where({ user_id });

    return response.json(tags);
  }
}

module.exports = movieTagController;
