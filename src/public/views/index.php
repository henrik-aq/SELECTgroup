<?php require ('partials/header.php'); ?>
<?php require_once ('partials/nav.php');?>

<?php if (isset($_SESSION["loggedIn"])): ?>
<!-- <script>getAllUsers();</script> -->
<p>Du är redan inloggad!</p>
<?php endif; ?>

<?php if (!isset($_SESSION["loggedIn"])): ?>
<p class="info">Registera dig eller logga in om du redan är användare!</p>
<?php require_once ('partials/register.php');?>
<?php require_once ('partials/login.php');?>

<?php endif; ?>

<?php require ('partials/footer.php'); ?>