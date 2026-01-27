-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT DEFAULT 'Mindrupee Team',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster queries
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, category, excerpt, content, author) VALUES (
  'How to Start Investing in Mutual Funds',
  'how-to-start-investing-mutual-funds',
  'Investing',
  'Learn the fundamentals of mutual fund investing and how to get started with a data-driven approach.',
  '<h2>Getting Started with Mutual Funds</h2><p>Mutual funds are a great way to start your investment journey. In this guide, we''ll walk you through the basics and help you understand how to choose the right funds for your goals.</p>',
  'Mindrupee Team'
);

-- Enable RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- Create policy for authenticated users to manage their posts
CREATE POLICY "Authenticated users can manage posts" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
