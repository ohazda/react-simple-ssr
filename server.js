import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { SSRProvider } from 'react-aria';

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  // Render the component to a string.
  const html = ReactDOMServer.renderToString(<App />);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${port}`);
});
