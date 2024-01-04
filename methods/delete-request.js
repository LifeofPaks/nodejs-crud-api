const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  const idIndex = req.url.split("/").length - 1;
  const id = req.url.split("/")[idIndex];
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  );
  
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        title: "UUID is not Valid",
        message: "Invalid UUID",
      })
    );
  } else if (regexV4.test(id) && baseUrl === "/api/movies") {
    const index = req.movies.findIndex((movie) => movie.id === id);

    if (index === -1) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          title: "Not Found",
          message: " Movie not available",
        })
      );
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(204, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(req.movies));
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: " Route not available",
      })
    );
  }
};
