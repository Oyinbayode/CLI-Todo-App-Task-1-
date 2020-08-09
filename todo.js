
const fs = require('fs');

module.exports = {
  // Add Method
      add(title, body) {
      // Fetch Todo from DB file
      const db = this.list();
      
      // Create New Todo Object
      const newTodo = { title, body, completed: false }
      // Merge Old Data with new Todo
      db.push(newTodo);
      // Store Todo on DB file
      this.save(db);
    },

  // List Method
    list() {
      // Fetch Data From DB
      return JSON.parse(fs.readFileSync('./db.json'));
    },

  // View Method
  view(index) {
    // Fetch Data From DB
    const db = this.list();
    console.log(db[index])
    return `[${index}]: ${db[index].title}`
  },

  // Remove Method
  remove(index) {
    // Fetch Data from DB
    const db = this.list();
    // Remove Todo BY index
    db.splice(index, 1);
    // Save data
    this.save(db);
  },

  //Remove all
  removeAll() {
    const db = this.list()

    // Remove all entries
    db.splice(0, db.length)

    this.save(db);
  },

  // Update Status [True/FAlse] Method
  alt(index) {
    // Fetch All Data
    const db = this.list();

    // Fetch Todo by Index
    const todo = db[index];

    //Switch/Toggle Status
    todo.completed = !todo.completed;

    // Save to DB
    this.save(db);
  },

  // Store Method
  save(data) {
    fs.writeFileSync('./db.json', JSON.stringify(data));
  }
}