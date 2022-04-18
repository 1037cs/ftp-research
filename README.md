# Researching a FTP server.

It's an application that allows the user to get the following information about the FTP server:
- total size of files hosted on the server;
- total size of files hosted on the server, grouped by their types (file type is determined by its extension);
- directory structure of the FTP server.

The FTP server address, username and password are entered by the user.

## 🌑 How to start the server: 
1. Install **Node.JS**
2. Install **npm** 
3. Write in terminal: 
```npm start```

## 🌕 How to work with the client:
1. Open **index.html** in any browser
2. Input host adress (_default: '91.222.128.11"_)(**port is default 21**)
3. Input login (_default: 'testftp_guest'_)
4. Input password (_default: '12345'_)
5. Click on blue button
6. If nothing happened check the browser-console

Stack of libraries: [express](https://www.npmjs.com/package/express), [basic-ftp](https://www.npmjs.com/package/basic-ftp), [cors](https://www.npmjs.com/package/cors)
