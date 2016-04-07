// Puts this in the head of every page...put this on every page at the end because the pages will load faster
var headTemplate=`
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">   
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <meta name="description" content="An educational website and tool about cultivating the art of serendipity.">
  <meta name="keywords" content="Serendipity,Aiden,Zucker,Pagan,Kennedy,WUSTL,Capstone,Project">
  <meta name="author" content="Aiden Zucker">
  <link href='https://fonts.googleapis.com/css?family=Lora:700' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>

  <script type="text/javascript" src="js/vendor/hammer.min.js"></script>

  <link rel="stylesheet" type="text/css" href="css/style.css">
  `;

  //Puts this in the headER of every page:
var headerTemplate=`<header>
    <nav>
      <a href="index.html" class="logo">S</a>
      <a href="learn.html" >Learn</a>
      <a href="juxtagraph.html" >Juxtagraph</a>
    </nav>
  </header>`;