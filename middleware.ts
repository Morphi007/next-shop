// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
	const session: any = await getToken({ req, secret: process.env.NEXTAUH_SECRET });

	if (!session) {
		const requestdPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();
		url.pathname = `/auth/login`;
		url.search = `p=${requestdPage}`;
		return NextResponse.redirect(url);
	}

	//validar autorizacion de api admin
	const validRoles = ['admin', 'super-user', 'SEO'];
      
	if (!session) {
		return new NextResponse(JSON.stringify({ Message: "No autorizado" }), {
		  status: 401,
		  headers: {
			"Content-Type": "application/json",
		  },
		});
	  }
		
	  if (req.nextUrl.pathname === '/api/admin/dashboard') {
		if (!validRoles.includes(session.user.role)) {
		  return new NextResponse(JSON.stringify({ Message: "No autorizado" }), {
			status: 403,
			headers: {
			  "Content-Type": "application/json",
			},
		  });
		}
	  }

  //validad administrador 

	if (req.nextUrl.pathname.startsWith('/admin')) {
		if (!validRoles.includes(session.user.role)) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	}
    
  
  if(req.nextUrl.pathname.startsWith("/api/admin")){
    if(!validRoles.includes(session.user.role)){
       return NextResponse.redirect(new URL('/api/auth/unauthorized',req.url));
    }
  }

   return NextResponse.next()

   'Todo: Open' // Pendiente validar que la api se llame con administrador 
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
