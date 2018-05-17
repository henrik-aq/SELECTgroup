<?php require ('partials/header.php'); ?>
<?php require_once ('partials/nav.php');?>

<?php if (isset($_SESSION["loggedIn"])): ?>
<p>Hej <?php echo $_SESSION['username']?> (Id: <?php echo $_SESSION['userID']?>) </p>
<script>getAllPosts();</script>
<ul id="entryList"> </ul>
<?php endif; ?>

<?php if (!isset($_SESSION["loggedIn"])): ?>
<p>Nänä. Det här är bara för inloggade!</p>
<?php endif; ?>

<?php require_once ('partials/footer.php'); ?>