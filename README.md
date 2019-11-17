# Sarazon

Sarazon is a simple e-commerce app inspired by Amazon.

## Motivation

This is a didactic project I started to practice with the React/Node/Mongo stack. It's been also a good chance to implement routing with ReactRouter and try out PrimeReact UI framework.
The project is currently still in progress.

## Setup

### Prerequisites

To run this project, you need to have MongoDB installed and running on your machine.

### First run

Firts clone the repo.

Next, from the project folder, install the dependencies:

```
npm i
```

Set the environment variable for encrypting JSON web tokens

On Mac:

```
export sarazon_jwtPrivateKey=yourSecureKey
```

On Windows Powershell:

```
$env:sarazon_jwtPrivateKey = 'yourSecureKey'
```

Now populate the Database:

```
node seed.js
```

And then start the server

```
node index.js
```

This will launch the Node server on port 3090. If that port is busy, you can set a different port in config/default.json.

## License

**[MIT license](http://opensource.org/licenses/mit-license.php)**
