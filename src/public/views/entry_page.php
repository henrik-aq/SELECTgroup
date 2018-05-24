<?php require ('partials/header.php'); ?>
<?php require_once ('partials/nav.php');?>

<?php if (isset($_SESSION["loggedIn"])): ?>
<p class="current-user-online">Du är inloggad som: <?php echo $_SESSION['username']?> </p>

<form action="/entries" method ="POST" id="postForm">
  <h3>Title</h3><br>
  <input type="text" name="title" placeholder="title">
  <br>
  <h3>Content</h3><br>
  <input type="text" name="content" placeholder="content">
  <input type="hidden" name="createdBy" value="<?php echo $_SESSION['userID']?>">
  <br><br>
  <input type="submit" value="post entry" onclick="createOneEntry();">
</form> 

<div id="entryList">

</div>
<?php endif; ?>
<?php if (!isset($_SESSION["loggedIn"])): ?>
<p>Nänä. Det här är bara för inloggade!</p>
<?php endif; ?>

<?php require_once ('partials/footer.php'); ?>