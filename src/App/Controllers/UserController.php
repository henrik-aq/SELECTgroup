<?php

namespace App\Controllers;

class UserController
{
    private $db;
    
    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    public function getAll()
    {
        $getAllUsers = $this->db->prepare(
            "SELECT * FROM users");
        $getAllUsers->execute();
        $allUsers = $getAllUsers->fetchAll();
        return $allUsers;
    }

    public function getOne($id)
    {
        $getOneUser = $this->db->prepare(
            "SELECT * FROM users WHERE userID = :userID");
        $getOneUser->execute([
          ":userID" => $id
        ]);
        $oneUser = $getOneUser->fetch();
        return $oneUser;
    }

    // This posts a user to database, hashes password and adds a timestamp
    public function register($user)
    {
        $addOne = $this->db->prepare(
            "INSERT INTO users (username, password, createdAt)
            VALUES (:username, :password, :createdAt)");
        
        date_default_timezone_set('Europe/Stockholm');
        $date = date("Y-m-d H:i:s");

        $hashedPass = password_hash($user['password'], PASSWORD_BCRYPT);
        $addOne->execute([
          ':username'  => $user['username'],
          ':password' => $hashedPass,
          ':createdAt' => $date,
        ]);
    }
}
