import "./styles.css";

import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { FacebookShareButton, FacebookIcon } from "react-share";

import { parseDate } from "./util";
const mediumRssFeed =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@juninguyen";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "100%",
    margin: "1.5rem",
    backgroundColor: "#fef6e4",
    color: "#f582ae"
  },
  media: {
    height: 300,
    minWidth: "100%"
  }
}));

const App = () => {
  const classes = useStyles();
  const MAX_ARTICLES = 10;

  const [articles, setArticles] = useState();

  useEffect(() => {
    const loadArticles = async () => {
      fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => data.items.filter((item) => item.title.length > 0))
        .then((newArticles) => newArticles.slice(0, MAX_ARTICLES))
        .then((articles) => setArticles(articles))
        .catch((error) => console.log(error));
    };

    loadArticles();
  }, [MAX_ARTICLES]);

  return (
    <Container maxWidth="sm">
      <h2 className="heading">Latest Posts</h2>

      {articles
        ? articles.map((item) => (
            <a
              className="link"
              href={item.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
              title={item.title}
              aria-label={item.link}
              key={item.link}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.thumbnail}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {parseDate(item.pubDate)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <FacebookShareButton url={item.link}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>

                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </a>
          ))
        : "no article shown"}
      <footer>
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️by
        </span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://hellojuninguyen.netlify.app/"
        >
          {" "}
          juniNguyen.
        </a>
      </footer>
    </Container>
  );
};

export default App;
