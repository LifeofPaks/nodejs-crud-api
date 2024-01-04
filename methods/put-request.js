const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  const idIndex = req.url.split("/").length - 1;
  const id = req.url.split("/")[idIndex];
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  );

  if (!regexV4.test(id)) {
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
    try {
      let body = await requestBodyParser(req);
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
        req.movies[index] = { id, ...body };
        writeToFile(req.movies);
        res.writeHead(204, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(401, {
        "Content-Type": "application/json",
      });
      res.end({
        title: "Validation Failed!",
        message: "Request body is not valid",
      });
    }
  } else {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    res.end({
      title: "Request Unavailable",
      message: "Route not found",
    });
  }
};
