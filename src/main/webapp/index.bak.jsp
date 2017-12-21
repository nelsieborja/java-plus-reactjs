<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="./public/style.css">
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
  <!--script src="./public/vendor.min.js"></script>
  <script>
    var s = document.createElement("script");
    s.src = "./public/" + ((location.hash.substr(1) || "en") + ".min.js")
    // s.async = true;
    document.body.appendChild(s);
  </script-->
  <script async src="./public/app.min.js"></script>
  <script>
    // document.addEventListener("DOMContentLoaded", function () {
    //   renderOnClient();
    // }, false);
  </script>
</body>

</html>