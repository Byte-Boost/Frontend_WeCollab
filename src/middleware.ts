import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, isAuthenticatedAsAdmin } from './scripts/utils/auth' 

const protectedRoutes = ['/home','/ticket']
const adminProtectedRoutes = ['/register']

export default function middleware(req: NextRequest, res : NextResponse) {

  if (req.nextUrl.pathname == '/') {
    const response = NextResponse.rewrite(new URL('/', req.nextUrl.origin))
    response.cookies.set('token', '', { maxAge: -1 })
    return response
  }


  if (!isAuthenticated(req) && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
  
  if (!isAuthenticatedAsAdmin(req) && adminProtectedRoutes.includes(req.nextUrl.pathname)){
      const absoluteURL  = new URL("/",req.nextUrl.origin)
      if (isAuthenticated(req)){
        absoluteURL.pathname = '/home'
      }
      return NextResponse.redirect(absoluteURL.toString())
  }
  return NextResponse.next();
}