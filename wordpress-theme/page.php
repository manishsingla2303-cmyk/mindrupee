<?php
/**
 * Page Template
 *
 * @package Mindrupee
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<article class="page-content" style="padding: 60px 0;">
    <div class="container" style="max-width: 800px;">
        <?php while (have_posts()) : the_post(); ?>
            <h1 style="font-size: 2.5rem; margin-bottom: 32px;"><?php the_title(); ?></h1>
            
            <div style="font-size: 1.125rem; line-height: 1.8; color: var(--text-secondary);">
                <?php the_content(); ?>
            </div>
        <?php endwhile; ?>
    </div>
</article>

<?php get_footer(); ?>
