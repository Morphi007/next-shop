
import NextAuth,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database";


//const { GITHUB_ID = '', GITHUB_SECRET = '', AUTH0_DOMAIN = '' } = process.env;


declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}


export const authOptions:NextAuthOptions= {
  // Configure one or more authentication providers
 
  providers: [
     // ...add more providers here
 
     Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
     
      async authorize(credentials) {
        const user = await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
        if (user) {
          return { ...user, id: user._id };
        }
        return null;
      },
    }),


    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),


  ],

     //custom page

        pages:{
          signIn:"/auth/login",
          newUser:"/auth/register",
        },


       session:{
        maxAge:259200, //30d
        strategy:"jwt",
        updateAge:86400 //cada dia
       },
       

      //callback
      //callback para guardar la data de la seccion entre otras cosas
    
      callbacks:{

        async jwt({ token, account,user }) {
          // Persist the OAuth access_token and or the user id to the token right after signin
         // console.log({token,account,user})
         
         if(account){
          token.accessToken= account.access_token;

          switch(account.type){

            case 'oauth':
              //todo: crear un suario y verificar la existencia 
              token.user = await dbUsers.oAUthToDbUser(user?.email || "" ,user?.name || "");
              break;

              case 'credentials':
               token.user=user
               break;
          }

         }


          return token
        },
        
        async session({ session, token, user }) {
          //console.log({session,token,user})
          
          session.accessToken= token.accessToken  as any
          session.user=token.user as any;

          return session

      }
      
           } // end callback


      
}





export default NextAuth(authOptions)