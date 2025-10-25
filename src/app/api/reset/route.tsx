import { useAuth } from '@/../contexts/AuthContext'

export async function POST(req: Request) {
    const data = await req.json()

    if (!data.email || !data.captcha_token) {
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
            secret: process.env.BACKEND_REGISTER_SECRET!
        })
    })

    const serverData = await response.json();

    if (serverData.Success) {
        return Response.json({ success: true })
    } else {
        return Response.json({ success: false, error: serverData.Failure })
    }
}