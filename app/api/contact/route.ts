import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend inside handler to avoid build-time errors
// const resend = new Resend(process.env.RESEND_API_KEY)


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, preferredDateTime, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    // Parse date and time from preferredDateTime
    let preferredDate = null
    let preferredTime = null

    if (preferredDateTime) {
      const dateTime = new Date(preferredDateTime)
      preferredDate = dateTime.toISOString().split('T')[0] // YYYY-MM-DD
      preferredTime = dateTime.toTimeString().split(' ')[0] // HH:MM:SS
    }

    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: name,
          email,
          contact_number: phone || '',
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          message,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const emailContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${preferredDateTime ? `<p><strong>Preferred Date/Time:</strong> ${new Date(preferredDateTime).toLocaleString()}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'manish.singla2303@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: emailContent,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the submission if email fails to send
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
