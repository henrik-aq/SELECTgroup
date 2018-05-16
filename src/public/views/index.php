<?php require_once ('partials/header.php'); ?>
<script>getAllUsers();</script>
<script>getAllPosts();</script>
<?php require_once ('partials/nav.php');?>

<?php require_once ('partials/login.php');?>


<?php if (!isset($_SESSION["loggedIn"])): ?>
<ul id="userList">
</ul>
<?php endif; ?>

<?php if (isset($_SESSION["loggedIn"])): ?>
<ul id="entryList">
</ul>
<?php endif; ?>

<?php require_once ('partials/footer.php'); ?>