# Rellika Kisyula Task App Manager

This Module is part of Learning Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!
---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `config` directory then add a file named `dev.env` and paster these lines. Replace with your credentials

    MONGO_URI=mongodb+srv://<username>:<myRealPassword>@cluster0.mongodb.net/test?w=majority
    JWT_SECRET=a_string_of_your_choice
    SECRET_OR_PUBLIC_KEY=a_string_of_your_choice
    SENDGRIND_API=<sendgridapi>
    PORT=3000

## Running the project

    $ npm run dev

## Simple build for production

    $ yarn build