export async function GET(request: Request) {
    return new Response('Hello, Next.js!', {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Origin': '*',
        },
        status: 200,
    })
}
