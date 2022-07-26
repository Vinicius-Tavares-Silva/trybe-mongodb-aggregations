db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      "tomatoes.viewer.rating": 1,
      title: 1,
      cast: 1,
      favs_array: {
        $setIntersection: ["$cast", [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ]],
      },
    },
  },
  {
    $match: {
      favs_array: {
        $exists: true,
        $ne: null,
      },
    },
  },
  {
    $project: {
      _id: 0,
      "tomatoes.viewer.rating": 1,
      title: 1,
      cast: 1,
      num_favs: {
        $size: "$favs_array",
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
