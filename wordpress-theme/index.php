<?php
/**
 * Main Template
 *
 * @package Mindrupee
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<section class="blog-section" style="padding-top: 60px;">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title"><?php _e('Blog', 'mindrupee'); ?></h1>
            <p class="section-description"><?php _e('Expert insights to help you make informed investment decisions', 'mindrupee'); ?></p>
        </div>

        <div class="blog-grid">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <article class="blog-card">
                        <a href="<?php the_permalink(); ?>">
                            <div class="blog-image">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('medium_large'); ?>
                                <?php else : ?>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3BADE5" stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                        <polyline points="21 15 16 10 5 21"/>
                                    </svg>
                                <?php endif; ?>
                            </div>
                            <div class="blog-content">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) :
                                ?>
                                    <span class="blog-category"><?php echo esc_html($categories[0]->name); ?></span>
                                <?php endif; ?>
                                <h3><?php the_title(); ?></h3>
                                <p><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
                                <div class="blog-meta">
                                    <span><?php echo get_the_date(); ?></span>
                                    <span>•</span>
                                    <span><?php echo ceil(str_word_count(get_the_content()) / 200); ?> <?php _e('min read', 'mindrupee'); ?></span>
                                </div>
                            </div>
                        </a>
                    </article>
                <?php endwhile; ?>
            <?php else : ?>
                <p><?php _e('No posts found.', 'mindrupee'); ?></p>
            <?php endif; ?>
        </div>

        <?php the_posts_pagination(array(
            'mid_size'  => 2,
            'prev_text' => '&larr; ' . __('Previous', 'mindrupee'),
            'next_text' => __('Next', 'mindrupee') . ' &rarr;',
        )); ?>
    </div>
</section>

<?php get_footer(); ?>
