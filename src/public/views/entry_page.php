<?php require ('partials/header.php'); ?>
<?php require_once ('partials/nav.php');?>

<?php if (isset($_SESSION["loggedIn"])): ?>
<p>Hej <?php echo $_SESSION['username']?> (Id: <?php echo $_SESSION['userID']?>) </p>
<script>getAllPostsByUser(<?php echo $_SESSION['userID'] ?>);</script>
<script>getAllPosts1();</script>
<template>
  <div class="container">
    <p>Title: </p>
  </div>
</template>
<ul id="entryList"> </ul>
<?php endif; ?>
<?php if (!isset($_SESSION["loggedIn"])): ?>
<p>Nänä. Det här är bara för inloggade!</p>
<?php endif; ?>

<?php require_once ('partials/footer.php'); ?>