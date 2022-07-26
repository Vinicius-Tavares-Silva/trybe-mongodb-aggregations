db.trips.aggregate([
  {
    $addFields: {
      dayofweek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: {
        dayOfWeek: "$dayofweek",
        nomeEstacao: "$startStationName",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
  { $limit: 1 },
]);
