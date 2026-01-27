<?php
/**
 * Single Post Template
 *
 * @package Mindrupee
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<article class="single-post" style="padding: 60px 0;">
    <div class="container" style="max-width: 800px;">
        <?php while (have_posts()) : the_post(); ?>
            <header style="margin-bottom: 40px;">
                <?php
                $categories = get_the_category();
                if (!empty($categories)) :
                ?>
                    <span class="blog-category" style="margin-bottom: 16px; display: inline-block;">
                        <?php echo esc_html($categories[0]->name); ?>
                    </span>
                <?php endif; ?>
                
                <h1 style="font-size: 2.5rem; margin-bottom: 16px;"><?php the_title(); ?></h1>
                
                <div class="blog-meta" style="color: var(--text-muted);">
                    <span><?php echo get_the_date(); ?></span>
                    <span>•</span>
                    <span><?php echo ceil(str_word_count(get_the_content()) / 200); ?> <?php _e('min read', 'mindrupee'); ?></span>
                    <span>•</span>
                    <span><?php _e('By', 'mindrupee'); ?> <?php the_author(); ?></span>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div style="margin-bottom: 40px; border-radius: 16px; overflow: hidden;">
                    <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: auto;')); ?>
                </div>
            <?php endif; ?>

            <div class="post-content" style="font-size: 1.125rem; line-height: 1.8; color: var(--text-secondary);">
                <?php the_content(); ?>
            </div>

            <footer style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border);">
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <?php the_tags('<span style="color: var(--text-muted); margin-right: 8px;">' . __('Tags:', 'mindrupee') . '</span>', ' ', ''); ?>
                </div>
            </footer>
        <?php endwhile; ?>
    </div>
</article>

<?php get_footer(); ?>
