<?php

namespace App\Controllers;

class CommentsController
{
    private $db;

    /**
     * Dependeny Injection (DI): http://www.phptherightway.com/#dependency_injection
     * If this class relies on a database-connection via PDO we inject that connection
     * into the class at start. If we do this TodoController will be able to easily
     * reference the PDO with '$this->db' in ALL functions INSIDE the class
     * This class is later being injected into our container inside of 'App/container.php'
     * This results in we being able to call '$this->get('Todos')' to call this class
     * inside of our routes.
     */
    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    //This gets all comments but limits it to 20 and sorts them in descending order
    public function getAll()
    {
        $getAll = $this->db->prepare('SELECT * FROM comments ORDER BY commentID DESC LIMIT 20');
        $getAll->execute();
        $allComments = $getAll->fetchAll();
        
        return $allComments;
    }

    //This just gets one comment that matches '/comments/{is}'
    public function getOne($id)
    {
        $getOne = $this->db->prepare('SELECT * FROM comments WHERE commentID = :commentID');
        $getOne->execute([':commentID' => $id]);
        return $getOne->fetch();
    }

    //This adds a comment
    public function post($comments)
    {

        $addOne = $this->db->prepare(
            'INSERT INTO comments (content, createdAt, createdBy) VALUES (:content, :createdAt, :createdBy)'
        );

        $addOne->execute([
          ':content'  => $comments['content'],
          ':createdAt' => $comments['createdAt'],
          ':createdBy' => $comments['createdBy']
        ]);
    }

    //This deletes the chosen comment
    public function delete($id)
    {
        $deleteOne = $this->db->prepare(
            'DELETE FROM comments WHERE commentID = :commentID '
        );
        $deleteOne->execute([
        ':commentID'  => $id
        ]);
    }
}
