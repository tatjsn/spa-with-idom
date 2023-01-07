import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));
app.use(express.static('app/public'));

function render({ name }) {
  return `
<html>
  <head>
    <script type="module" src="/main.js"></script>
  </head>
  <body>
    <div spa-app>
      ${name ? name : ''}
      <form method="post">
        <!-- Comment -->
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Submit</button>
        <div style="width:100%;height:0;padding-bottom:93%;position:relative;"><iframe src="https://giphy.com/embed/ND6xkVPaj8tHO" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cat-money-cash-ND6xkVPaj8tHO">via GIPHY</a></p>
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
