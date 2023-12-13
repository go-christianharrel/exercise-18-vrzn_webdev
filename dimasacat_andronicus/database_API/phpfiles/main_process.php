<?php
include 'create.php';
include 'read.php';
include 'update.php';
include 'delete.php';

    $action = $_REQUEST['action'] ?? '';

    switch ($action) {
        case 'POST':
            echo createCharacter();
            break;
        case 'GET':
            echo readCharacters();
            break; 
        case 'PATCH':
            updateCharacter();
            break;   
        case 'DELETE';
            echo deleteCharacter();   
            break; 
        default:
            echo 'Invalid action';
            break;
}