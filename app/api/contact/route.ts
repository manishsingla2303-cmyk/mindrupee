import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, preferredDateTime, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[v0] Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Server configuration error. Please check environment variables.' },
        { status: 500 }
      )
    }

    // Create Supabase client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
              // This can be ignored if you have middleware refreshing user sessions.
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

    console.log('[v0] Inserting contact submission:', { name, email, phone, preferredDate, preferredTime })

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
      console.error('[v0] Supabase error:', error)
      return NextResponse.json(
        { error: `Failed to save submission: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('[v0] Submission saved successfully:', data)

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        // Important: Replace with your verified domain email
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
        const toEmail = process.env.RESEND_TO_EMAIL || 'manish.singla2303@gmail.com'

        const emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${preferredDateTime ? `<p><strong>Preferred Date/Time:</strong> ${new Date(preferredDateTime).toLocaleString()}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `

        console.log('[v0] Sending email from:', fromEmail, 'to:', toEmail)

        const emailResponse = await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `New Contact Form Submission from ${name}`,
          html: emailContent,
        })

        console.log('[v0] Email sent successfully:', emailResponse)
      } catch (emailError) {
        console.error('[v0] Email sending error:', emailError)
        // Don't fail the submission if email fails to send
      }
    } else {
      console.warn('[v0] RESEND_API_KEY not configured. Skipping email notification.')
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully!', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
