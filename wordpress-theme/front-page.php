<?php
/**
 * Front Page Template
 *
 * @package Mindrupee
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <div class="hero-content">
            <div class="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <?php _e('SEBI Registered Investment Adviser', 'mindrupee'); ?>
            </div>

            <h1 class="hero-title">
                <?php 
                $hero_title = get_theme_mod('hero_title', 'Smart Mutual Fund Advice for Your Financial Goals');
                $parts = explode(' ', $hero_title);
                $highlight_words = array_slice($parts, -2);
                $regular_words = array_slice($parts, 0, -2);
                echo esc_html(implode(' ', $regular_words)) . ' ';
                echo '<span class="highlight">' . esc_html(implode(' ', $highlight_words)) . '</span>';
                ?>
            </h1>

            <p class="hero-description">
                <?php echo esc_html(get_theme_mod('hero_description', 'Get unbiased, data-driven mutual fund recommendations tailored to your risk profile and financial objectives.')); ?>
            </p>

            <div class="hero-buttons">
                <a href="<?php echo esc_url(mindrupee_get_whatsapp_url()); ?>" class="btn btn-primary" target="_blank" rel="noopener">
                    <?php _e('Get Free Consultation', 'mindrupee'); ?>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
                <a href="#services" class="btn btn-outline">
                    <?php _e('Explore Services', 'mindrupee'); ?>
                </a>
            </div>

            <div class="trust-badges">
                <div class="trust-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <?php _e('No Hidden Fees', 'mindrupee'); ?>
                </div>
                <div class="trust-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <?php _e('Direct Plans Only', 'mindrupee'); ?>
                </div>
                <div class="trust-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <?php _e('Unbiased Advice', 'mindrupee'); ?>
                </div>
                <div class="trust-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <?php _e('1000+ Happy Clients', 'mindrupee'); ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Why Trust Section -->
<section class="why-trust-section">
    <div class="container">
        <div class="section-header">
            <p class="section-subtitle"><?php _e('Why Choose Us', 'mindrupee'); ?></p>
            <h2 class="section-title"><?php _e('Why Trust Mindrupee?', 'mindrupee'); ?></h2>
            <p class="section-description"><?php _e('See how we compare to traditional advisory platforms', 'mindrupee'); ?></p>
        </div>

        <div class="comparison-grid">
            <!-- Mindrupee Card -->
            <div class="comparison-card highlight">
                <div class="comparison-card-header">
                    <div class="comparison-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <h3><?php _e('Mindrupee', 'mindrupee'); ?></h3>
                </div>
                <ul class="comparison-list">
                    <li>
                        <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span><?php _e('SEBI Registered Investment Adviser', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span><?php _e('100% Direct Plans - Higher Returns', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span><?php _e('Transparent Fee-Only Model', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span><?php _e('Personalized Financial Planning', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span><?php _e('No Commission Bias', 'mindrupee'); ?></span>
                    </li>
                </ul>
            </div>

            <!-- Others Card -->
            <div class="comparison-card">
                <div class="comparison-card-header">
                    <div class="comparison-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <h3><?php _e('Other Platforms', 'mindrupee'); ?></h3>
                </div>
                <ul class="comparison-list">
                    <li>
                        <svg class="icon-x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span><?php _e('Often Just Distributors, Not Advisers', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span><?php _e('Regular Plans with Hidden Commissions', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span><?php _e('Commission-Based Revenue Model', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span><?php _e('Generic One-Size-Fits-All Advice', 'mindrupee'); ?></span>
                    </li>
                    <li>
                        <svg class="icon-x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span><?php _e('Push High-Commission Products', 'mindrupee'); ?></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="services-section" id="services">
    <div class="container">
        <div class="section-header">
            <p class="section-subtitle"><?php _e('Our Services', 'mindrupee'); ?></p>
            <h2 class="section-title"><?php _e('Comprehensive Mutual Fund Solutions', 'mindrupee'); ?></h2>
            <p class="section-description"><?php _e('Everything you need to build and manage your investment portfolio', 'mindrupee'); ?></p>
        </div>

        <div class="services-grid">
            <?php
            $services = new WP_Query(array(
                'post_type'      => 'services',
                'posts_per_page' => 6,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            ));

            if ($services->have_posts()) :
                while ($services->have_posts()) : $services->the_post();
            ?>
                <div class="service-card">
                    <div class="service-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h3><?php the_title(); ?></h3>
                    <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                    <a href="<?php the_permalink(); ?>" class="service-link">
                        <?php _e('Learn More', 'mindrupee'); ?>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Default services if none exist
                $default_services = array(
                    array(
                        'title' => 'Portfolio Review',
                        'desc'  => 'Get a comprehensive analysis of your existing investments with actionable recommendations.',
                    ),
                    array(
                        'title' => 'Goal-Based Planning',
                        'desc'  => 'Create investment strategies aligned with your specific financial goals and timelines.',
                    ),
                    array(
                        'title' => 'SIP Advisory',
                        'desc'  => 'Start your wealth creation journey with expert-curated SIP recommendations.',
                    ),
                    array(
                        'title' => 'Tax Planning',
                        'desc'  => 'Optimize your investments for tax efficiency with ELSS and other tax-saving options.',
                    ),
                    array(
                        'title' => 'Retirement Planning',
                        'desc'  => 'Build a secure retirement corpus with long-term investment strategies.',
                    ),
                    array(
                        'title' => 'Wealth Management',
                        'desc'  => 'Comprehensive wealth management services for high-net-worth individuals.',
                    ),
                );

                foreach ($default_services as $service) :
            ?>
                <div class="service-card">
                    <div class="service-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h3><?php echo esc_html($service['title']); ?></h3>
                    <p><?php echo esc_html($service['desc']); ?></p>
                    <a href="#contact" class="service-link">
                        <?php _e('Learn More', 'mindrupee'); ?>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<!-- Process Section -->
<section class="process-section" id="how-it-works">
    <div class="container">
        <div class="section-header">
            <p class="section-subtitle"><?php _e('How It Works', 'mindrupee'); ?></p>
            <h2 class="section-title"><?php _e('Start in 4 Simple Steps', 'mindrupee'); ?></h2>
            <p class="section-description"><?php _e('Our streamlined process makes investing simple and stress-free', 'mindrupee'); ?></p>
        </div>

        <div class="process-steps">
            <div class="process-step">
                <div class="step-number">1</div>
                <h4><?php _e('Book Consultation', 'mindrupee'); ?></h4>
                <p><?php _e('Schedule a free call to discuss your financial goals', 'mindrupee'); ?></p>
            </div>
            <div class="process-step">
                <div class="step-number">2</div>
                <h4><?php _e('Risk Assessment', 'mindrupee'); ?></h4>
                <p><?php _e('Complete our risk profiling questionnaire', 'mindrupee'); ?></p>
            </div>
            <div class="process-step">
                <div class="step-number">3</div>
                <h4><?php _e('Get Recommendations', 'mindrupee'); ?></h4>
                <p><?php _e('Receive personalized mutual fund recommendations', 'mindrupee'); ?></p>
            </div>
            <div class="process-step">
                <div class="step-number">4</div>
                <h4><?php _e('Start Investing', 'mindrupee'); ?></h4>
                <p><?php _e('Begin your wealth creation journey with our guidance', 'mindrupee'); ?></p>
            </div>
        </div>
    </div>
</section>

<!-- Blog Section -->
<section class="blog-section">
    <div class="container">
        <div class="section-header">
            <p class="section-subtitle"><?php _e('Knowledge Hub', 'mindrupee'); ?></p>
            <h2 class="section-title"><?php _e('Latest from Our Blog', 'mindrupee'); ?></h2>
            <p class="section-description"><?php _e('Expert insights to help you make informed investment decisions', 'mindrupee'); ?></p>
        </div>

        <div class="blog-grid">
            <?php
            $blog_posts = new WP_Query(array(
                'post_type'      => 'post',
                'posts_per_page' => 3,
            ));

            if ($blog_posts->have_posts()) :
                while ($blog_posts->have_posts()) : $blog_posts->the_post();
            ?>
                <article class="blog-card">
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
                </article>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Default blog posts if none exist
                $default_posts = array(
                    array(
                        'category' => 'Basics',
                        'title'    => 'Understanding Mutual Fund Types',
                        'excerpt'  => 'A comprehensive guide to different types of mutual funds and how to choose the right one for your goals.',
                    ),
                    array(
                        'category' => 'Strategy',
                        'title'    => 'SIP vs Lump Sum: Which is Better?',
                        'excerpt'  => 'Compare the two investment strategies and find out which suits your financial situation better.',
                    ),
                    array(
                        'category' => 'Tax',
                        'title'    => 'Tax-Saving Mutual Funds (ELSS)',
                        'excerpt'  => 'Learn how ELSS funds can help you save taxes while building wealth for the long term.',
                    ),
                );

                foreach ($default_posts as $post_item) :
            ?>
                <article class="blog-card">
                    <div class="blog-image">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3BADE5" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                    </div>
                    <div class="blog-content">
                        <span class="blog-category"><?php echo esc_html($post_item['category']); ?></span>
                        <h3><?php echo esc_html($post_item['title']); ?></h3>
                        <p><?php echo esc_html($post_item['excerpt']); ?></p>
                        <div class="blog-meta">
                            <span><?php echo date('M j, Y'); ?></span>
                            <span>•</span>
                            <span>5 <?php _e('min read', 'mindrupee'); ?></span>
                        </div>
                    </div>
                </article>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials-section">
    <div class="container">
        <div class="section-header">
            <p class="section-subtitle"><?php _e('Testimonials', 'mindrupee'); ?></p>
            <h2 class="section-title"><?php _e('What Our Clients Say', 'mindrupee'); ?></h2>
            <p class="section-description"><?php _e('Real stories from real investors who trust Mindrupee', 'mindrupee'); ?></p>
        </div>

        <div class="testimonials-grid">
            <?php
            $testimonials = new WP_Query(array(
                'post_type'      => 'testimonials',
                'posts_per_page' => 3,
            ));

            if ($testimonials->have_posts()) :
                while ($testimonials->have_posts()) : $testimonials->the_post();
                    $rating = get_post_meta(get_the_ID(), '_testimonial_rating', true) ?: 5;
                    $designation = get_post_meta(get_the_ID(), '_testimonial_designation', true);
            ?>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <?php for ($i = 0; $i < $rating; $i++) : ?>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                        <?php endfor; ?>
                    </div>
                    <blockquote><?php the_content(); ?></blockquote>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <?php echo strtoupper(substr(get_the_title(), 0, 1)); ?>
                        </div>
                        <div class="author-info">
                            <h4><?php the_title(); ?></h4>
                            <?php if ($designation) : ?>
                                <p><?php echo esc_html($designation); ?></p>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Default testimonials
                $default_testimonials = array(
                    array(
                        'name'        => 'Priya Sharma',
                        'designation' => 'IT Professional, Bangalore',
                        'quote'       => 'Mindrupee helped me understand mutual funds in simple terms. Their unbiased advice gave me confidence to start my investment journey.',
                    ),
                    array(
                        'name'        => 'Rajesh Kumar',
                        'designation' => 'Business Owner, Mumbai',
                        'quote'       => 'The portfolio review was eye-opening. I was paying hidden commissions without knowing. Switching to direct plans has already improved my returns.',
                    ),
                    array(
                        'name'        => 'Anita Desai',
                        'designation' => 'Doctor, Delhi',
                        'quote'       => 'Professional, transparent, and genuinely helpful. They don\'t push products—they educate you to make informed decisions.',
                    ),
                );

                foreach ($default_testimonials as $testimonial) :
            ?>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <?php for ($i = 0; $i < 5; $i++) : ?>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                        <?php endfor; ?>
                    </div>
                    <blockquote><?php echo esc_html($testimonial['quote']); ?></blockquote>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <?php echo strtoupper(substr($testimonial['name'], 0, 1)); ?>
                        </div>
                        <div class="author-info">
                            <h4><?php echo esc_html($testimonial['name']); ?></h4>
                            <p><?php echo esc_html($testimonial['designation']); ?></p>
                        </div>
                    </div>
                </div>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
