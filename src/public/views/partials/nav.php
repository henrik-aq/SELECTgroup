<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand">PHP</a>
    </div>
    <ul class="nav navbar-nav navbar-right">

      <?php if (!isset($_SESSION["loggedIn"])): ?>
        <li><a href="/index.php"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="/index.php"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      <?php endif; ?>
      
      <?php if (isset($_SESSION["loggedIn"])): ?>
        <li><a href="/logout"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
        <form class="navbar-form navbar-right" action="" id="titleForm">
     <div class="input-group">
       <input type="text" class="form-control" placeholder="Search" id="titleInput">
       <div class="input-group-btn">
         <button class="btn btn-default" type="submit">
           <i class="glyphicon glyphicon-search"></i>
         </button>
       </div>
     </div>
   </form> 
      <?php endif; ?>
      
    </ul>
  </div>
</nav>