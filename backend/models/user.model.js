// backend/models/user.model.js
const { ObjectId } = require("mongodb");

class User {
  constructor({ _id = new ObjectId(), username, email, password, role = "user", createdAt = new Date() }) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.password = password; // Hasheada
    this.role = role; // "user" o "admin"
    this.createdAt = createdAt;
  }
}

module.exports = User;
