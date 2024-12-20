import { NextRequest, NextResponse } from 'next/server'

interface CreateUserRequest {
  name: string
  email: string
}

interface CreateUserResponse {
  success: boolean
  data?: CreateUserRequest
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateUserRequest

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json<CreateUserResponse>(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    return NextResponse.json<CreateUserResponse>({
      success: true,
      data: body
    })
  } catch (error) {
    return NextResponse.json<CreateUserResponse>(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
