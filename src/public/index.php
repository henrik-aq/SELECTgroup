<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

/**
 * Require the autoload script, this will automatically load our classes
 * so we don't have to require a class everytime we use a class. Evertime
 * you create a new class, remember to runt 'composer update' in the terminal
 * otherwise your classes may not be recognized.
 */
require_once '../../vendor/autoload.php';

/**
 * Here we are creating the app that will handle all the routes. We are storing
 * our database config inside of 'settings'. This config is later used inside of
 * the container inside 'App/container.php'
 */

$container = require '../App/container.php';
$app = new \Slim\App($container);
$auth = require '../App/auth.php';
require '../App/cors.php';


/********************************
 *          ROUTES              *
 ********************************/


$app->get('/', function ($request, $response, $args) {
    /**
     * This fetches the 'index.php'-file inside the 'views'-folder
     */
    return $this->view->render($response, 'index.php');
});


/**
 * I added basic inline login functionality. This could be extracted to a
 * separate class. If the session is set is checked in 'auth.php'
 */
$app->post('/login', function ($request, $response, $args) {
    /**
     * Everything sent in 'body' when doing a POST-request can be
     * extracted with 'getParsedBody()' from the request-object
     * https://www.slimframework.com/docs/v3/objects/request.html#the-request-body
     */
    $body = $request->getParsedBody();
    $fetchUserStatement = $this->db->prepare('SELECT * FROM users WHERE username = :username');
    $fetchUserStatement->execute([
        ':username' => $body['username']
    ]);
    $user = $fetchUserStatement->fetch();
    if (password_verify($body['password'], $user['password'])) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['userID'] = $user['userID'];
        $_SESSION['username'] = $user['username'];
        $url = 'views/entry_page.php';
        return $response->withJson(['data' => [ $user['userID'], $user['username'] ]])->withHeader('Location', $url);
    }
    return $response->withJson(['error' => 'wrong password']);
});

/**
 * Basic implementation, implement a better response
 */
$app->get('/logout', function ($request, $response, $args) {
    // No request data is being sent
    session_destroy();
    $url = '../index.php';
    return $response->withHeader('Location', $url);
});


/**
 * The group is used to group everything connected to the API under '/api'
 * This was done so that we can check if the user is authed when calling '/api'
 * but we don't have to check for auth when calling '/signin'
 */
$app->group('/api', function () use ($app) {

// -------------------------------- ENTRIES ROUTES --------------------------------

    // Entries - Get last 20 entries - GET http://localhost:XXXX/api/entries
    $app->get('/entries', function ($request, $response, $args) {	
        $allEntries = $this->entries->getAll();
        /**
         * Wrapping the data when returning as a safety thing
         * https://www.owasp.org/index.php/AJAX_Security_Cheat_Sheet#Server_Side
         */
        return $response->withJson(['data' => $allEntries]);
    });

    // Entries - Get one chosen entry - GET http://localhost:XXXX/api/entries/{id}
    $app->get('/entries/{id}', function ($request, $response, $args) {
        $id = $args['id'];
        $singleEntry = $this->entries->getOne($id);
        return $response->withJson(['data' => $singleEntry]);
    });

    // Entries - Post entry på database - POST http://localhost:XXXX/api/entries
    $app->post('/entries', function ($request, $response, $args) {
        /**
         * Everything sent in 'body' when doing a POST-request can be
         * extracted with 'getParsedBody()' from the request-object
         * https://www.slimframework.com/docs/v3/objects/request.html#the-request-body
         */
        $body = $request->getParsedBody();
        $newEntry = $this->entries->post($body);
        return $response->withJson(['data' => $newEntry]);
    });

    // Entries - Delete chosen entry - DELETE http://localhost:XXXX/api/entries/{id}
    $app->delete('/entries/{id}', function ($request, $response, $args) {
        $id = $args['id'];
        $this->entries->delete($id);
    });

    //Entries - Update chosen entry - PATCH http://localhost:XXXX/api/entries/{id}
    $app->patch('/entries/{id}', function ($request, $response, $args) {
        $body = $request->getParsedBody();
        $id = $args['id'];
        $newEntry = $this->entries->update($body, $id);
        return $response->withJson(['data' => $newEntry]);
    });

    //Entries - Get all entries by a user specified user - GET http://localhost:XXXX/api/users/{id}/entries
    $app->get('/users/{id}/entries', function ($request, $response, $args) {
        $allEntriesByUser = $this->entries->getEntriesById($args['id']);
        return $response->withJson($allEntriesByUser);
    });

// --------------------------- END ENTRIES ROUTES --------------------------------------

// --------------------------- COMMENTS ROUTES -----------------------------------------

    // Comments - Get the 20 last comments - GET http://localhost:XXXX/api/comments
    $app->get('/comments', function ($request, $response, $args) {
        $allComments = $this->comments->getAll();
        return $response->withJson(['data' => $allComments]);
    });

    // Comments - Get chosen entry - GET http://localhost:XXXX/api/comments/{id}
    $app->get('/comments/{id}', function ($request, $response, $args) {
        $id = $args['id'];
        $singleComment = $this->comments->getOne($id);
        return $response->withJson(['data' => $singleComment]);
    });

    // Comments - Post comment to database - POST http://localhost:XXXX/api/comments
    $app->post('/comments', function ($request, $response, $args) {
        $body = $request->getParsedBody();
        $newComment = $this->comments->post($body);
        return $response->withJson(['data' => $newComment]);
    });

    // Comments - Delete chosen comment - DELETE http://localhost:XXXX/api/comments{id}
    $app->delete('/comments/{id}', function ($request, $response, $args) {
        $id = $args['id'];
        $this->comments->delete($id);
    });

    //Comments - Get all comments connected to a specific entry defined by the user - GET http://localhost:XXXX/api/entries/{id}/comments
    $app->get('/entries/{id}/comments', function ($request, $response, $args) {
        $allCommentsByEntry = $this->comments->getCommentsById($args['id']);
        return $response->withJson($allCommentsByEntry);
    });

// ---------------------- END COMMENTS ROUTES ------------------------------------------

// ----------------------- USER ROUTES ------------------------------------------------
 
    //Users - Get all users - GET http://localhost:XXXX/api/users
    $app->get('/users', function ($request, $response, $args) {
        $allUsers = $this->users->getAll();
        return $response->withJson($allUsers);
    });

    //Users - Get one specified user - GET http://localhost:XXXX/api/users/{id}
    $app->get('/users/{id}', function ($request, $response, $args) {
        $allUsers = $this->users->getOne($args['id']);
        return $response->withJson($allUsers);
    });

    //Users - Register a user - POST http://localhost:XXXX/api/register
    $app->post('/register', function ($request, $response, $args) {
        $body = $request->getParsedBody();
        $newUser = $this->users->register($body);
        $url = '../index.php';
        return $response->withJson(['data' => $newUser])->withHeader('Location', $url); //The withHeader part redirects after data is sent
    });
});

$app->run();
