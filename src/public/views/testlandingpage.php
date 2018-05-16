<?php require_once ('partials/header.php'); ?>
<script>getAllUsers();</script>
<script>getAllPosts();</script>
<?php require_once ('partials/nav.php');?>

<?php if (isset($_SESSION["loggedIn"])): ?>
<p>Inloggad!!</p>
<?php endif; ?>



<?php require_once ('partials/footer.php'); ?>