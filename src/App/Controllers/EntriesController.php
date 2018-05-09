<?php

namespace App\Controllers;

class EntriesController
{
    private $db;
    
    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function getAll()
    {
        $getAllEntries = $this->db->prepare("SELECT * FROM entries ORDER BY entryID DESC LIMIT 20");
        $getAllEntries->execute();
        $allEntries = $getAllEntries->fetchAll();
        return $allEntries;
    }

    public function getOne($id)
    {
        $getOneEntry = $this->db->prepare("SELECT * FROM entries WHERE entryID = :entryID");
        $getOneEntry->execute([
          ":entryID" => $id
        ]);
        // Fetch -> single resource
        $oneEntry = $getOneEntry->fetch();
        return $oneEntry;
    }

    public function post($entries)
    {
        /**
         * Default 'completed' is false so we only need to insert the 'content'
         */
        $addOne = $this->db->prepare(
            'INSERT INTO entries (title ,content, createdAt, createdBy) VALUES (:title, :content, :createdAt, :createdBy)'
        );

        /**
         * Insert the value from the parameter into the database
         */
        $addOne->execute([
          ':title'  => $entries['title'],
          ':content'  => $entries['content'],
          ':createdAt' => $entries['createdAt'],
          ':createdBy' => $entries['createdBy']
        ]);
    }

    public function delete($id)
    {
        $deleteOne = $this->db->prepare(
            'DELETE FROM entries WHERE entryID = :entryID ');
        
        $deleteOne->execute([
        ':entryID'  => $id
        ]);
    }

    public function update($content, $id)
    {
        $newUpdate = $this->db->prepare('UPDATE entries SET title = :title, content = :content WHERE entryID = :entryID');
        
        $newUpdate->execute([
            ":entryID" => $id,
            ":title" => $content['title'],
            ":content" => $content['content']
      ]);
    }
}

