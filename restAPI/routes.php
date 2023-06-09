<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
}
else{
    $req = array("errorcatcher");
}

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){
//testing
// user-side functions  31/03/23

            // case 'fileupload':
            //     $data = [
            //         'file' => $_FILES,
            //         'product_id' => $_REQUEST['product_id']
            //     ];
            //     echo json_encode($auth->uploadimage($data));
            // break;



            case 'getPetInfo':
                echo json_encode($get->get_common('petinfo_tbl'));
            break;

            case 'getPetlist':
                echo json_encode($get->get_common('petinfo_tbl'));
            break;

            case 'getPetnameList':
                echo json_encode($get->get_specific('petinfo_tbl'));
            break;

            case 'getReminderInfo':
                echo json_encode($get->get_common('reminders_tbl'));
            break;

            case 'getReminderList':
                echo json_encode($get->get_reminderlist('reminders_tbl'));
            break;

            case 'insertNewPet':
                echo json_encode($global->insert('petinfo_tbl',$data));
            break;

            case 'insertNewReminder':
                echo json_encode($global->insert('reminders_tbl',$data));
            break;

            case 'editPet':
                echo json_encode($global->update('petinfo_tbl',$data, NULL));
            break;



            case 'addImagefile':
                echo json_encode($global->file('recipes', $data, NULL));
            break;

            case 'register':
                echo json_encode($auth->register($data));
                break;

            case 'login':
                echo json_encode($auth->login($data));
                break;
            

            case 'createrecipe':
                echo json_encode($global->insert("recipes",$data));
            break;
                
            case 'getRecipeDetails':
                if(count($req)>1){
                    echo json_encode($get->get_recipe('recipes', "user_id = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_recipe('recipes'));
                }   
            break;

            case 'viewRecipeDetails':
                if(count($req)>1){
                    echo json_encode($get->view_recipe_details('recipes', "recipes.id = '$req[1]'"));
                }
                else{
                    echo json_encode($get->view_recipe_details('recipes'));
                }   
            break;

            case 'addtobookmark':
                echo json_encode($global->insert("bookmark",$data));
            break; 

            case 'deletebookmark':
                if(count($req)>1){
                    echo json_encode($global->delete('bookmark', "recipe_id = '$req[1]' AND user_id = '$req[2]'"));
                }
            break;

            case 'deleterecipe':
                if(count($req)>1){
                    echo json_encode($global->delete('recipes', "id = '$req[1]' AND user_id = '$req[2]'"));
                }
            break;

            case 'checkBookmark':
                if (count($req) > 1) {
                    echo json_encode($get->get_common('bookmark', "recipe_id = '$req[1]' AND user_id = '$req[2]'"));
                }
                break;

            case 'getFavoriteRecipes':
                if(count($req)>1){
                    echo json_encode($get->get_favorites_recipe('bookmark', "bookmark.user_id = '$req[1]'"));
                }
            break;

            case 'updateProfile':
                echo json_encode($global->update('users', $data, NULL));
            break;

            case 'getAccount':
                echo json_encode($get->get_common('users', "id = '$req[1]'"));
            break;
                

            case 'username_check':
                // $data = [];
                echo json_encode($get->username_check($data));

                break;

            case 'updateUserPassword':
                echo json_encode($auth->updatePassword($data));
            break;

            case 'fileupload':
                $data = [
                    'file' => $_FILES,
                    'id' => $_REQUEST['id']
                ];
                echo json_encode($global->uploadimage($data));
                break;

            case 'addnewproductnoimage':
                echo json_encode($global->addnewrecipenoimage($data));
                break;

            default:
                echo "request not found";
            break;
        }
    break;
    
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            switch($req[0]){
                 // update customer profile request
                    

                    default:
                        echo "request not found";
                    break;
            }
        break;

    default:
        echo "failed request";
    break;

    
}