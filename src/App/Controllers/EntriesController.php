<?php

namespace App\Controllers;

class EntriesController
{
    private $db;
    
    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    //This gets all entries but limits it to 20 and sorts i descending order
    public function getAll()
    {
        $getAllEntries = $this->db->prepare("SELECT * FROM entries ORDER BY entryID DESC LIMIT 20");
        $getAllEntries->execute();
        $allEntries = $getAllEntries->fetchAll();
        return $allEntries;
    }

    // This gets one entry at '/entries/{id}'
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

    //This posts one entry to database
    public function post($entries)
    {
        $addOne = $this->db->prepare(
            'INSERT INTO entries (title ,content, createdAt, createdBy) VALUES (:title, :content, :createdAt, :createdBy)'
        );

        $addOne->execute([
          ':title'  => $entries['title'],
          ':content'  => $entries['content'],
          ':createdAt' => $entries['createdAt'],
          ':createdBy' => $entries['createdBy']
        ]);
    }

    // This deletes one chosen entry at '/entries/{id}'
    public function delete($id)
    {
        $deleteOne = $this->db->prepare(
            'DELETE FROM entries WHERE entryID = :entryID ');
        
        $deleteOne->execute([
        ':entryID'  => $id
        ]);
    }

    /* This function accepts 2 things and updates the chosen entry. 
     * First it accepts an array in content which gives us 'title' and
     * 'content'. But also the entryID at '/entries/{id}'.
     */ 
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

