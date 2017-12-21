<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="./public/style.css">
  <!-- iOS App Banner -->
  <meta name="apple-itunes-app" content="app-id=carrefourStoreID">
  <!-- Android App Banner -->
  <link rel="manifest" href="./public/manifest.json">
</head>

<body>
  <div id="root"></div>
  <script>
    window.__INITIAL_STATE__ = {
      counter: {
        count: 0,
        isIncrementing: false,
        isDecrementing: false
      },
      i18n: {},
      language: {
        current: location.hash.substr(1) || "en",
        languages: []
      }
    }
  </script>
  <script async src="./public/app.min.js"></script>
</body>

</html>