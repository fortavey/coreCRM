<?php
$haystack = __FILE__;
$needle = 'testcore';
$testcore = strripos($haystack, $needle);

if($testcore) {
    header( 'Access-Control-Allow-Origin: *'  );
    header( 'Access-Control-Allow-Methods: GET' );
    header( 'Access-Control-Allow-Credentials: true' );
}

// Проверка авторизован ли пользователь на главной странице
add_action('wp_ajax_is_login', 'fort_is_login');

if($testcore) add_action('wp_ajax_nopriv_is_login', 'fort_is_login'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function fort_is_login() {
    echo json_encode([
        'res' => 1,
        'user' => wp_get_current_user(),
    ]);
    wp_die();
}

// Вывод доменов
add_action('wp_ajax_get_domains', 'get_domains');

if($testcore) add_action('wp_ajax_nopriv_get_domains', 'get_domains'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function get_domains() {
    $arr = [];
    $query = new WP_Query( [ 'post_type' => 'domains', 'posts_per_page' => -1 ] );

    function countHoursBetweenDates($d1, $d2)
        {
            $d1_ts = strtotime($d1);
            $d2_ts = strtotime($d2);

            $seconds = abs($d1_ts - $d2_ts);
            
            return floor($seconds / 3600);
        }
    
    while ( $query->have_posts() ) {
        $query->the_post();

        $hostID = get_field('hosting')->ID;
        $payment_time = get_field('payment_time', $hostID);

        $item = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'date' => get_the_date('d.m.Y'),
            'hosting' => get_field('hosting'),
            'registrator' => get_field('registrator'),
            'status' => get_field('status'),
            'hosting_payment' => $payment_time,
            'hours_left' => countHoursBetweenDates($payment_time, date('Y-m-d h:i:s')),
            'is_end' => date('Y-m-d') > $payment_time,
            'engine' => get_field('engine'),
            'country' => get_field('country')
        ];
    
        array_push($arr, $item);
    }
    
    wp_reset_postdata();

    echo json_encode($arr);

    wp_die();
}


// Настройки вывода Email
function emails_config($query){
    $arr = [];

    while ( $query->have_posts() ) {
        $query->the_post();
        $email_ID = get_the_ID();

        $item = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'password' => get_field('password'),
            'email_dop' => get_field('email_dop'),
            'pass_dop' => get_field('pass_dop'),
            'phone_dop' => get_field('phone_dop'),
        ];
    
        array_push($arr, $item);
    }
    
    wp_reset_postdata();

    echo json_encode($arr);
}

// Настройки вывода хостинга
function hosting_config($query){
    $arr = [];

    while ( $query->have_posts() ) {
        $query->the_post();
        $host_ID = get_the_ID();

        $item = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'email' => get_field('email'),
            'link_account' => get_field('link_account'),
            'password' => get_field('password'),
            'isp_link' => get_field('isp_link'),
            'isp_login' => get_field('isp_login'),
            'isp_pass' => get_field('isp_pass'),
            'ftp' => get_field('ftp'),
            'ftp_login' => get_field('ftp_login'),
            'ftp_password' => get_field('ftp_password'),
            'domains' => [],
            'payment_time' => get_field('payment_time')
        ];

        $domain_query = new WP_Query( [ 'post_type' => 'domains', 'posts_per_page' => -1 ] );

        while ( $domain_query->have_posts() ) {
            $domain_query->the_post();
            if($host_ID === get_field('hosting')->ID) array_push($item['domains'], get_the_title());
        }
    
        wp_reset_postdata();

        array_push($arr, $item);
    }
    
    wp_reset_postdata();

    echo json_encode($arr);
}


// Настройки вывода регистратора
function registrator_config($query){
    $arr = [];

    while ( $query->have_posts() ) {
        $query->the_post();
        $host_ID = get_the_ID();

        $item = [
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'email' => get_field('email'),
            'password' => get_field('password'),
            'domains' => []
        ];

        $domain_query = new WP_Query( [ 'post_type' => 'domains', 'posts_per_page' => -1 ] );

        while ( $domain_query->have_posts() ) {
            $domain_query->the_post();
            if($host_ID === get_field('registrator')->ID) array_push($item['domains'], get_the_title());
        }
    
        wp_reset_postdata();

        array_push($arr, $item);
    }
    
    wp_reset_postdata();

    echo json_encode($arr);
}

// Вывод Email-ов
add_action('wp_ajax_get_emails', 'get_emails');
if($testcore) add_action('wp_ajax_nopriv_get_emails', 'get_emails'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function get_emails() {
    $query = new WP_Query( [ 'post_type' => 'emails', 'posts_per_page' => -1 ] );
    emails_config($query);
    wp_die();
}


// Вывод хостингов
add_action('wp_ajax_get_hostings', 'get_hostings');
if($testcore) add_action('wp_ajax_nopriv_get_hostings', 'get_hostings'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function get_hostings() {
    $query = new WP_Query( [ 'post_type' => 'hostings', 'posts_per_page' => -1 ] );
    hosting_config($query);
    wp_die();
}



// Вывод одного хостинга
add_action('wp_ajax_get_hosting', 'get_hosting');
if($testcore) add_action('wp_ajax_nopriv_get_hosting', 'get_hosting'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function get_hosting() {
    $id = empty( $_GET['id'] ) ? false : esc_attr( $_GET['id'] );
    $query = new WP_Query( [ 'post_type' => 'hostings', 'p' => $id ] );
    hosting_config($query);
    wp_die();
}


// Вывод регистраторов
add_action('wp_ajax_get_registrators', 'get_registrators');
if($testcore) add_action('wp_ajax_nopriv_get_registrators', 'get_registrators'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function get_registrators() {
    $query = new WP_Query( [ 'post_type' => 'registrators', 'posts_per_page' => -1 ] );
    registrator_config($query);
    wp_die();
}

// Вывод одного регистратора
add_action('wp_ajax_get_registrator', 'get_registrator');
if($testcore) add_action('wp_ajax_nopriv_get_registrator', 'get_registrator'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function get_registrator() {
    $id = empty( $_GET['id'] ) ? false : esc_attr( $_GET['id'] );
    $query = new WP_Query( [ 'post_type' => 'registrators', 'p' => $id ] );
    registrator_config($query);
    wp_die();
}

// Обновление статуса домена
add_action('wp_ajax_update_status', 'update_status');
if($testcore) add_action('wp_ajax_nopriv_update_status', 'update_status'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function update_status() {
    $id = empty( $_GET['id'] ) ? false : esc_attr( $_GET['id'] );
    $status = empty( $_GET['status'] ) ? false : esc_attr( $_GET['status'] );

    if($id && $status) {
        $update = update_field('status', $status, $id);
        echo json_encode($update);
    }

    wp_die();
}

// Удаление домена
add_action('wp_ajax_remove_domain', 'remove_domain');
if($testcore) add_action('wp_ajax_nopriv_remove_domain', 'remove_domain'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function remove_domain() {
    $id = empty( $_GET['id'] ) ? false : esc_attr( $_GET['id'] );

    if($id) {
        $remove = wp_trash_post( $id );
        echo json_encode($remove);
    }

    wp_die();
}

// Добавить Email
add_action('wp_ajax_add_email', 'add_email');
if($testcore) add_action('wp_ajax_nopriv_add_email', 'add_email'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function add_email() {
    $title = empty( $_GET['title'] ) ? false : esc_attr( $_GET['title'] );

    $post_data = [
        'post_title'    => $title,
        'post_status'   => 'publish',
        'post_type'     => 'emails',
        'post_author'   => $user_ID,
        'ping_status'   => get_option('default_ping_status'),
        'post_parent'   => 0,
        'menu_order'    => 0,
        'to_ping'       => '',
        'pinged'        => '',
        'post_password' => '',
        'post_excerpt'  => '',
    ];
    
    $post_id = wp_insert_post(  wp_slash( $post_data ) );
    
    // Пароль от основного Email
    $password_value = empty( $_GET['password_value'] ) ? false : esc_attr( $_GET['password_value'] );
    $password = update_field( "password", $password_value, $post_id );
    
    // Дополнительный Email
    $email_dop_value = empty( $_GET['email_dop_value'] ) ? false : esc_attr( $_GET['email_dop_value'] );
    $email_dop = update_field( "email_dop", $email_dop_value, $post_id );
    
    // Пароль Дополнительного Email
    $pass_dop_value = empty( $_GET['pass_dop_value'] ) ? false : esc_attr( $_GET['pass_dop_value'] );
    $pass_dop = update_field( "pass_dop", $pass_dop_value, $post_id );
    
    // Телефон Дополнительного Email
    $phone_dop_value = empty( $_GET['phone_dop_value'] ) ? false : esc_attr( $_GET['phone_dop_value'] );
    $phone_dop = update_field( "phone_dop", $phone_dop_value, $post_id );


    echo json_encode([
        'title' => $post_id,
        'password' => $password,
        'email_dop' => $email_dop,
        'pass_dop' => $pass_dop,
        'phone_dop' => $phone_dop,
    ]);

    wp_die();
}

// Добавить нового регистратора
add_action('wp_ajax_add_registrator', 'add_registrator');
if($testcore) add_action('wp_ajax_nopriv_add_registrator', 'add_registrator'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function add_registrator() {
    $title = empty( $_GET['title'] ) ? false : esc_attr( $_GET['title'] );

    $post_data = [
        'post_title'    => $title,
        'post_status'   => 'publish',
        'post_type'     => 'registrators',
        'post_author'   => $user_ID,
        'ping_status'   => get_option('default_ping_status'),
        'post_parent'   => 0,
        'menu_order'    => 0,
        'to_ping'       => '',
        'pinged'        => '',
        'post_password' => '',
        'post_excerpt'  => '',
    ];
    
    $post_id = wp_insert_post(  wp_slash( $post_data ) );
    
    // Пароль от аккаунта
    $password_value = empty( $_GET['password_value'] ) ? false : esc_attr( $_GET['password_value'] );
    $password = update_field( "password", $password_value, $post_id );
    
    // Email
    $email_id = empty( $_GET['email_id'] ) ? false : esc_attr( $_GET['email_id'] );
    $email = update_field( "email", $email_id, $post_id );


    echo json_encode([
        'title' => $post_id,
        'password' => $password,
        'email' => $email,
    ]);

    wp_die();
}

// Добавить новый хостинг
add_action('wp_ajax_add_hosting', 'add_hosting');
if($testcore) add_action('wp_ajax_nopriv_add_hosting', 'add_hosting'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function add_hosting() {
    $title = empty( $_GET['title'] ) ? false : esc_attr( $_GET['title'] );

    $post_data = [
        'post_title'    => $title,
        'post_status'   => 'publish',
        'post_type'     => 'hostings',
        'post_author'   => $user_ID,
        'ping_status'   => get_option('default_ping_status'),
        'post_parent'   => 0,
        'menu_order'    => 0,
        'to_ping'       => '',
        'pinged'        => '',
        'post_password' => '',
        'post_excerpt'  => '',
    ];
    
    $post_id = wp_insert_post(  wp_slash( $post_data ) );
    
    // Аккаунт

    // Ссылка от аккаунта
    $link_account_value = empty( $_GET['link_account_value'] ) ? false : esc_attr( $_GET['link_account_value'] );
    $link_account = update_field( "link_account", $link_account_value, $post_id );

    // Пароль от аккаунта
    $password_value = empty( $_GET['password_value'] ) ? false : esc_attr( $_GET['password_value'] );
    $password = update_field( "password", $password_value, $post_id );
    
    // Email
    $email_id = empty( $_GET['email_id'] ) ? false : esc_attr( $_GET['email_id'] );
    $email = update_field( "email", $email_id, $post_id );

    // ISP панель

    // Ссылка
    $isp_link_value = empty( $_GET['isp_link_value'] ) ? false : esc_attr( $_GET['isp_link_value'] );
    $isp_link = update_field( "isp_link", $isp_link_value, $post_id );

    // Логин
    $isp_login_value = empty( $_GET['isp_login_value'] ) ? false : esc_attr( $_GET['isp_login_value'] );
    $isp_login = update_field( "isp_login", $isp_login_value, $post_id );

    // Пароль
    $isp_pass_value = empty( $_GET['isp_pass_value'] ) ? false : esc_attr( $_GET['isp_pass_value'] );
    $isp_pass = update_field( "isp_pass", $isp_pass_value, $post_id );

    // FTP доступ

    // Ссылка
    $ftp_value = empty( $_GET['ftp_value'] ) ? false : esc_attr( $_GET['ftp_value'] );
    $ftp = update_field( "ftp", $ftp_value, $post_id );

    echo json_encode([
        'title' => $post_id,
        'password' => $password,
        'email' => $email,
        'link_account' => $link_account,
        'isp_link' => $isp_link,
        'isp_login' => $isp_login,
        'isp_pass' => $isp_pass,
        'ftp' => $ftp
    ]);

    wp_die();
}



// Добавить новый домен
add_action('wp_ajax_add_domain', 'add_domain');
if($testcore) add_action('wp_ajax_nopriv_add_domain', 'add_domain'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function add_domain() {
    $title = empty( $_GET['title'] ) ? false : esc_attr( $_GET['title'] );

    $post_data = [
        'post_title'    => $title,
        'post_status'   => 'publish',
        'post_type'     => 'domains',
        'post_author'   => $user_ID,
        'ping_status'   => get_option('default_ping_status'),
        'post_parent'   => 0,
        'menu_order'    => 0,
        'to_ping'       => '',
        'pinged'        => '',
        'post_password' => '',
        'post_excerpt'  => '',
    ];
    
    $post_id = wp_insert_post(  wp_slash( $post_data ) );
    
    // Пароль от аккаунта
    $registrator_id = empty( $_GET['registrator_id'] ) ? false : esc_attr( $_GET['registrator_id'] );
    $registrator = update_field( "registrator", $registrator_id, $post_id );

    update_field( "status", 'создан', $post_id );
    update_field( "engine", 'wordpress', $post_id );

    echo json_encode([
        'title' => $post_id,
        'registrator' => $registrator,
    ]);

    wp_die();
}


// Обновление даты платежа хостинга
add_action('wp_ajax_update_host_date', 'update_host_date');
if($testcore) add_action('wp_ajax_nopriv_update_host_date', 'update_host_date'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function update_host_date() {
    $id = empty( $_GET['id'] ) ? false : esc_attr( $_GET['id'] );
    $new_date = empty( $_GET['new_date'] ) ? false : esc_attr( $_GET['new_date'] );

    if($id && $new_date) {
        $update = update_field('payment_time', $new_date, $id);
        echo json_encode($update);
    }

    wp_die();
}


// Обновление хостинга у домена
add_action('wp_ajax_update_domain_host', 'update_domain_host');
if($testcore) add_action('wp_ajax_nopriv_update_domain_host', 'update_domain_host'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function update_domain_host() {
    $domain_id = empty( $_GET['domain_id'] ) ? false : esc_attr( $_GET['domain_id'] );
    $host_id = empty( $_GET['host_id'] ) ? false : esc_attr( $_GET['host_id'] );

    if($domain_id && $host_id) {
        $update = update_field('hosting', $host_id, $domain_id);
        echo json_encode($update);
    }

    wp_die();
}


// Обновление вдижка домена
add_action('wp_ajax_update_engine', 'update_engine');
if($testcore) add_action('wp_ajax_nopriv_update_engine', 'update_engine'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function update_engine() {
    $domain_id = empty( $_GET['domain_id'] ) ? false : esc_attr( $_GET['domain_id'] );
    $new_engine = empty( $_GET['new_engine'] ) ? false : esc_attr( $_GET['new_engine'] );

    if($domain_id && $new_engine) {
        $update = update_field('engine', $new_engine, $domain_id);
        echo json_encode($update);
    }

    wp_die();
}


// Обновление страны у домена
add_action('wp_ajax_update_country', 'update_country');
if($testcore) add_action('wp_ajax_nopriv_update_country', 'update_country'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function update_country() {
    $domain_id = empty( $_GET['domain_id'] ) ? false : esc_attr( $_GET['domain_id'] );
    $new_country = empty( $_GET['new_country'] ) ? false : esc_attr( $_GET['new_country'] );

    if($domain_id && $new_country) {
        $update = update_field('country', $new_country, $domain_id);
        echo json_encode($update);
    }

    wp_die();
}

// update post publish date
// https://koralweb.com/testcore/wp-admin/admin-ajax.php?action=update_date&new_date=2022-12-23&hostings=469,450

add_action('wp_ajax_update_date', 'update_date');
if($testcore) add_action('wp_ajax_nopriv_update_date', 'update_date'); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

function update_date() {
    $hostings = empty( $_GET['hostings'] ) ? false : esc_attr( $_GET['hostings'] );
    $new_date = empty( $_GET['new_date'] ) ? false : esc_attr( $_GET['new_date'] );

    $query = new WP_Query( [ 'post_type' => 'domains', 'posts_per_page' => -1 ] );
    $h = 10;
    $m = 10;
    
    while ( $query->have_posts() ) {
        $query->the_post();

        $postdate = $new_date . ' ' . $h . ':' . $m . ':00';

        $host_id = get_field('hosting')->ID;
        $arr = explode(",", $hostings);

        $update_post = array(
            'ID' => get_the_ID(),
            'post_date' => $postdate
        );
    
        if (in_array(strval($host_id), $arr)) {
            wp_update_post( $update_post );
            if($m > 55) {
                $h = $h + 1;
                $m = 10;
            }else {
                $m = $m + 1;
            }
        }

    
    }
    
    wp_reset_postdata();

    wp_die();
}

