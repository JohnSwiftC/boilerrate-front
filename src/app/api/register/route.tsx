import { useAuth } from '@/../contexts/AuthContext'

export async function POST(req: Request) {
    const data = await req.json()

    if (!data.email || !data.password || !data.captcha_token) {
        return Response.json({ success: false, error: 'Please fill the captcha' })
    }

    const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET!,
        response: data.captcha_token
        })
    })

    const captchaResult = await captchaResponse.json()

    if (!captchaResult.success) {
        return Response.json({ success: false, error: 'Invalid captcha' })
    }

    const response = await fetch("https://api.boilerrate.com/create_user", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            secret: process.env.BACKEND_REGISTER_SECRET!
        })
    })

    return Response.json(await response.json())
}