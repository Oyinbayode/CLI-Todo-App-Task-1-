#!/usr/bin/env node
const chalk = require('chalk')

const yargs = require('yargs')
    .command('add', '<Input Todo>', {
      title: {
        description: 'Todo Title',
        type: 'string',
        demandOption: true
      },
      body: {
        description: 'Todo Body',
        type: 'string',
      },
    })
    .command('list', 'Lists all entries of TODO')
    .command('view', 'View a Single Todo by Index', {
      index: {
        description: 'Todo Index',
        type: 'string',
        demandOption: true
      }
    })
    .command('remove', 'Remove a Single Todo', {
      index: {
        description: 'Todo Index',
        type: 'string',
        demandOption: true
      }
    })
    .command('deleteAll', 'Deletes all entries')
    .command('toggle', 'If task is completed or not, Sets to true or false', {
      index: {
        description: 'Todo Index',
        type: 'string',
        demandOption: true
      }
    })
    .demandCommand(1)
    .argv;

const Todo = require('./todo');

console.log(`\n ===${chalk.bgRedBright(chalk.black('TODO APP STARTED'))}=== \n`);
// Gets Command
const command = yargs._[0];

// If command is Add
// Fetch The title, body and create todo
if (command === 'add' || command === 'a') {
  let title = yargs.title;
  let body = yargs.body;

  // Create todo List
  Todo.add(title, body);
  console.log('ToDo Added!')
}

// If command is List
if (command === 'list' || command === 'l') {
  // Fetch all data from DB
  const db = Todo.list();

  // Log Data to be viewed
  if (db.length === 0) {
    console.log('No Task At Hand☺ \nYou can add an entry')
  } else {
    for (let i in db) {
      const notify = db[i].completed ? 'Task Completed' : 'Task Not Completed';
  
      let changeColor = db[i].completed ? chalk.blueBright : chalk.redBright
      console.log(changeColor((`[${i}]: ${db[i].title} (${notify})`)));
    }
    if (db.length > 1) {
      console.log(`${db.length} Inputs!`);
    } else console.log(`${db.length} Input!`);
  }
  }
  

// If Command is View
if (command === 'view' || command === 'v') {
  const index = yargs.index;
  // Log TODO}
  if (Todo.list().length === 0 || index >= Todo.list().length) {
    console.log('Please Add a Task\nNo Task Found')
  } else console.log(Todo.view(index));
}

// If Command is Remove
if (command === 'remove' || command === 'r') {
  // Fetch all data from DB
  const db = Todo.list();

  if (db.length === 0 || yargs.index >= db.length) {
    console.log('Please Add a Task\nNo Task Found')
  } else {
    Todo.remove(yargs.index);
    console.log('ToDo Deleted!');
  }
  
}

// If command is DeleteAll
if (command === 'deleteAll' || command === 'd') {
  const db = Todo.list();

  Todo.removeAll();
  console.log('All Entries Deleted!')
}

// If command is toggle
if (command === 'toggle' || command === 't') {
  // Toggle todo Status
  if (Todo.list().length === 0 || yargs.index >= Todo.list().length) {
    console.log('Please Add a Task\nNo Task Found')
  } else {
    Todo.alt(yargs.index);
  console.log('Status Updated!')
  }
  
}

