
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
    const filteredMovies = req.movies.filter((movie) => movie.id === id);
    if (filteredMovies.length > 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(filteredMovies));
      res.end();
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          title: "UUID is not Valid",
          message: "Invalid UUID",
        })
      );
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
