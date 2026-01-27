<?php
/**
 * Mindrupee Theme Functions
 *
 * @package Mindrupee
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function mindrupee_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary'   => __('Primary Menu', 'mindrupee'),
        'footer'    => __('Footer Menu', 'mindrupee'),
    ));
}
add_action('after_setup_theme', 'mindrupee_setup');

/**
 * Enqueue Scripts and Styles
 */
function mindrupee_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'mindrupee-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Main stylesheet
    wp_enqueue_style(
        'mindrupee-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );

    // Theme JavaScript
    wp_enqueue_script(
        'mindrupee-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('wp_enqueue_scripts', 'mindrupee_scripts');

/**
 * Register Widget Areas
 */
function mindrupee_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Widget 1', 'mindrupee'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here for footer column 1.', 'mindrupee'),
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Widget 2', 'mindrupee'),
        'id'            => 'footer-2',
        'description'   => __('Add widgets here for footer column 2.', 'mindrupee'),
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'mindrupee_widgets_init');

/**
 * Theme Customizer Settings
 */
function mindrupee_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('mindrupee_hero', array(
        'title'    => __('Hero Section', 'mindrupee'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hero_title', array(
        'default'           => 'Smart Mutual Fund Advice for Your Financial Goals',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hero_title', array(
        'label'   => __('Hero Title', 'mindrupee'),
        'section' => 'mindrupee_hero',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('hero_description', array(
        'default'           => 'Get unbiased, data-driven mutual fund recommendations tailored to your risk profile and financial objectives.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('hero_description', array(
        'label'   => __('Hero Description', 'mindrupee'),
        'section' => 'mindrupee_hero',
        'type'    => 'textarea',
    ));

    // Contact Information
    $wp_customize->add_section('mindrupee_contact', array(
        'title'    => __('Contact Information', 'mindrupee'),
        'priority' => 35,
    ));

    $wp_customize->add_setting('whatsapp_number', array(
        'default'           => '919876543210',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('whatsapp_number', array(
        'label'   => __('WhatsApp Number (with country code)', 'mindrupee'),
        'section' => 'mindrupee_contact',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('contact_email', array(
        'default'           => 'hello@mindrupee.com',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('contact_email', array(
        'label'   => __('Contact Email', 'mindrupee'),
        'section' => 'mindrupee_contact',
        'type'    => 'email',
    ));

    // Regulatory Information
    $wp_customize->add_section('mindrupee_regulatory', array(
        'title'    => __('Regulatory Information', 'mindrupee'),
        'priority' => 40,
    ));

    $wp_customize->add_setting('sebi_registration', array(
        'default'           => 'INA000XXXXXX',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('sebi_registration', array(
        'label'   => __('SEBI Registration Number', 'mindrupee'),
        'section' => 'mindrupee_regulatory',
        'type'    => 'text',
    ));

    $wp_customize->add_setting('regulatory_text', array(
        'default'           => 'Mindrupee is a SEBI Registered Investment Adviser. Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('regulatory_text', array(
        'label'   => __('Regulatory Disclaimer', 'mindrupee'),
        'section' => 'mindrupee_regulatory',
        'type'    => 'textarea',
    ));

    // Social Links
    $wp_customize->add_section('mindrupee_social', array(
        'title'    => __('Social Links', 'mindrupee'),
        'priority' => 45,
    ));

    $social_links = array('twitter', 'linkedin', 'youtube', 'instagram');
    foreach ($social_links as $social) {
        $wp_customize->add_setting($social . '_url', array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control($social . '_url', array(
            'label'   => sprintf(__('%s URL', 'mindrupee'), ucfirst($social)),
            'section' => 'mindrupee_social',
            'type'    => 'url',
        ));
    }
}
add_action('customize_register', 'mindrupee_customize_register');

/**
 * Custom Post Type: Services
 */
function mindrupee_register_services() {
    register_post_type('services', array(
        'labels' => array(
            'name'          => __('Services', 'mindrupee'),
            'singular_name' => __('Service', 'mindrupee'),
            'add_new'       => __('Add New Service', 'mindrupee'),
            'add_new_item'  => __('Add New Service', 'mindrupee'),
            'edit_item'     => __('Edit Service', 'mindrupee'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon'    => 'dashicons-portfolio',
        'rewrite'      => array('slug' => 'services'),
    ));
}
add_action('init', 'mindrupee_register_services');

/**
 * Custom Post Type: Testimonials
 */
function mindrupee_register_testimonials() {
    register_post_type('testimonials', array(
        'labels' => array(
            'name'          => __('Testimonials', 'mindrupee'),
            'singular_name' => __('Testimonial', 'mindrupee'),
            'add_new'       => __('Add New Testimonial', 'mindrupee'),
            'add_new_item'  => __('Add New Testimonial', 'mindrupee'),
            'edit_item'     => __('Edit Testimonial', 'mindrupee'),
        ),
        'public'       => true,
        'has_archive'  => false,
        'supports'     => array('title', 'editor', 'thumbnail'),
        'menu_icon'    => 'dashicons-format-quote',
    ));

    // Add meta box for testimonial details
    add_action('add_meta_boxes', function() {
        add_meta_box(
            'testimonial_details',
            __('Testimonial Details', 'mindrupee'),
            'mindrupee_testimonial_meta_box',
            'testimonials',
            'normal',
            'high'
        );
    });
}
add_action('init', 'mindrupee_register_testimonials');

function mindrupee_testimonial_meta_box($post) {
    wp_nonce_field('mindrupee_testimonial_nonce', 'testimonial_nonce');
    $designation = get_post_meta($post->ID, '_testimonial_designation', true);
    $rating = get_post_meta($post->ID, '_testimonial_rating', true) ?: 5;
    ?>
    <p>
        <label for="testimonial_designation"><?php _e('Designation/Location:', 'mindrupee'); ?></label>
        <input type="text" id="testimonial_designation" name="testimonial_designation" 
               value="<?php echo esc_attr($designation); ?>" class="widefat">
    </p>
    <p>
        <label for="testimonial_rating"><?php _e('Rating (1-5):', 'mindrupee'); ?></label>
        <input type="number" id="testimonial_rating" name="testimonial_rating" 
               value="<?php echo esc_attr($rating); ?>" min="1" max="5" class="small-text">
    </p>
    <?php
}

function mindrupee_save_testimonial_meta($post_id) {
    if (!isset($_POST['testimonial_nonce']) || 
        !wp_verify_nonce($_POST['testimonial_nonce'], 'mindrupee_testimonial_nonce')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (isset($_POST['testimonial_designation'])) {
        update_post_meta($post_id, '_testimonial_designation', sanitize_text_field($_POST['testimonial_designation']));
    }
    if (isset($_POST['testimonial_rating'])) {
        update_post_meta($post_id, '_testimonial_rating', intval($_POST['testimonial_rating']));
    }
}
add_action('save_post_testimonials', 'mindrupee_save_testimonial_meta');

/**
 * Helper Functions
 */
function mindrupee_get_whatsapp_url() {
    $number = get_theme_mod('whatsapp_number', '919876543210');
    return 'https://wa.me/' . $number;
}

function mindrupee_get_social_links() {
    return array(
        'twitter'   => get_theme_mod('twitter_url', ''),
        'linkedin'  => get_theme_mod('linkedin_url', ''),
        'youtube'   => get_theme_mod('youtube_url', ''),
        'instagram' => get_theme_mod('instagram_url', ''),
    );
}
