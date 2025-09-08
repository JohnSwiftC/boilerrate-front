interface ApiOptions extends RequestInit {
  headers?: Record<string, string>
}

interface CreateUserRequest {
    email: string,
    password: string,
}


interface APICallResponse {
    ok: boolean,
    error?: string,
}

export const createUser = async (req: CreateUserRequest): Promise<APICallResponse> => {

    const request: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    }

    const response = await fetch(`https://api.boilerrate.com/create_user`, request)

    if (!response.ok) {
        return {
            ok: false,
            error: "Sorry, please try again."
        }
    }

    return { ok: true }
}
