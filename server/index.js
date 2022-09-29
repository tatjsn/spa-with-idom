import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));
app.use(express.static('app/public'));

function render({name}) {
  return `
<html>
  <head>
    <script type="module" src="/main.js"></script>
  </head>
  <body>
    <div spa-app>
      ${name ? name: ''}
      <form method="post">
        <!-- Comment -->
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Submit</button>
        <video style="width: 200px" src="/video.webm" autoplay loop>
      </form>
    </div>
    <div spa-loading style="display:none">Loading...</div>
  </body>
</html>
  `;
}

app.get('/', (req, res) => {
  res.send(render({}));
});

app.post('/', (req, res) => {
  res.send(render(req.body));
});

app.listen(8000);
