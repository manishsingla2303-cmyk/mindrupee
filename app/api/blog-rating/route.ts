import { type NextRequest, NextResponse } from 'next/server'

// In-memory storage for ratings (replace with database in production)
const blogRatings: {
  [slug: string]: Array<{ rating: number; timestamp: string }>
} = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, rating, title } = body

    if (!slug || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating data' },
        { status: 400 }
      )
    }

    // Store the rating
    if (!blogRatings[slug]) {
      blogRatings[slug] = []
    }

    blogRatings[slug].push({
      rating,
      timestamp: new Date().toISOString(),
    })

    console.log(`[v0] Blog rating saved - Slug: ${slug}, Rating: ${rating}/5, Title: ${title}`)

    return NextResponse.json({
      success: true,
      message: 'Rating saved successfully',
    })
  } catch (error) {
    console.error('Error processing blog rating:', error)
    return NextResponse.json(
      { error: 'Failed to save rating' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      )
    }

    const ratings = blogRatings[slug] || []
    const averageRating =
      ratings.length > 0
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
        : null

    return NextResponse.json({
      slug,
      totalRatings: ratings.length,
      averageRating,
      ratings,
    })
  } catch (error) {
    console.error('Error fetching blog ratings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}
